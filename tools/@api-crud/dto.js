const fs = require('fs');
const path = require('path');
const { toKebabCase, toPascalCase } = require('../share');



function generateDTO(type, entityName) {

  const className = toPascalCase(entityName);
  const fileName = toKebabCase(entityName);
  const folder = toKebabCase(entityName);

  const templatePath = path.join(__dirname, 'templates', `${type}.dto.tmpl`);
  const outputPath = path.join(__dirname, '..', '..', 'src', '@api', 'dto', `${folder}`, `${type}-${fileName}.dto.ts`);

  if (!fs.existsSync(templatePath)) {
    console.error(`Template for '${type}' not found!`);
    return;
  }

  let template = fs.readFileSync(templatePath, 'utf8');

  const content = template
    .replace(/{{className}}/g, className)
    .replace(/{{fileName}}/g, fileName);

  fs.writeFileSync(outputPath, content);
  console.log(`${type}.${fileName}.dto.ts generated successfully in /output!`);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Missing parameters!');
  process.exit(1);
}

const [entityName] = args;


const folder = toKebabCase(entityName);
const folderPath = path.join(__dirname, '..', '..', 'src', '@api', 'dto', folder);
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

generateDTO('all', entityName);
generateDTO('create', entityName);
generateDTO('update', entityName);
generateDTO('paginate', entityName);

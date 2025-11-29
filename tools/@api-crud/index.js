const fs = require('fs');
const path = require('path');
const { toPascalCase, toCamelCase, toSnakeCase, toKebabCase } = require('../share');


function generateService(entityName) {

  // Convert entity name formats
  const className = toPascalCase(entityName); // Class name (UserProfile)
  const fileName = toKebabCase(entityName); // File name (user-profile)
  const variableName = toCamelCase(entityName); // Table name (user_profiles)

  const templatePath = path.join(__dirname, 'templates', `service.tmpl`);
  const outputPath = path.join(__dirname, '..', '..', 'src', '@api', 'services', `${fileName}.service.ts`);

  if (!fs.existsSync(templatePath)) {
    console.error(`Template for not found!`);
    return;
  }

  let template = fs.readFileSync(templatePath, 'utf8');


  // Replace placeholders
  const content = template
    .replace(/{{className}}/g, className)
    .replace(/{{fileName}}/g, fileName)
    .replace(/{{fileName}}/g, fileName)
    .replace(/{{variableName}}/g, variableName);

  // Save the generated file
  fs.writeFileSync(outputPath, content);
  console.log(`${fileName}.service.ts generated successfully in /output!`);
}

function generateController(entityName) {

  const className = toPascalCase(entityName); // Class name (UserProfile)
  const fileName = toKebabCase(entityName); // File name (userProfile)
  const variableName = toCamelCase(entityName); // Table name (user_profiles)

  const templatePath = path.join(__dirname, 'templates', `controller.tmpl`);
  const outputPath = path.join(__dirname, '..', '..', 'src', '@api', 'controllers', `${fileName}.controller.ts`);

  if (!fs.existsSync(templatePath)) {
    console.error(`Template for controller not found!`);
    return;
  }

  let template = fs.readFileSync(templatePath, 'utf8');


  const content = template
    .replace(/{{className}}/g, className)
    .replace(/{{variableName}}/g, variableName)
    .replace(/{{fileName}}/g, fileName);

  fs.writeFileSync(outputPath, content);
  console.log(`${fileName}.controller.ts generated successfully in /output!`);
}
// Handle CLI arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Missing parameters!');
  process.exit(1);
}

const [entityName] = args;
generateService(entityName);
generateController(entityName);

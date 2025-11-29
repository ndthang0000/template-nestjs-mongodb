const fs = require('fs');
const path = require('path');
const { toPascalCase, toSnakeCase, toCamelCase, toKebabCase } = require('../share');


// ============================================Schema======================================================

function generateSchema(schemaName, fields) {

  // Format names
  const className = toPascalCase(schemaName); // Class name (UserProfile)
  const fileName = toKebabCase(schemaName); // File name (userProfile)
  const tableName = toSnakeCase(schemaName) + 's';

  const templatePath = path.join(__dirname, 'templates', 'schema.tmpl');
  const outputPath = path.join(__dirname, '..', '..', 'src', '@core', 'mongodb', 'schemas', `${fileName}.schema.ts`);

  // Load the template
  let template = fs.readFileSync(templatePath, 'utf8');


  // Generate fields
  const fieldLines = fields
    .split(',')
    .map((field) => {
      const [name, type] = field.split(':');
      return `\t@Prop()\n\t${name}: ${type};`;
    })
    .join('\n\n');

  // Replace placeholders
  const content = template
    .replace(/{{className}}/g, className)
    .replace(/{{fields}}/g, fieldLines);

  // Save the generated entity
  fs.writeFileSync(outputPath, content);
  console.log(`${schemaName}.entity.ts generated successfully in /output!`);
}

// Handle CLI arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(
    console.log('Missing parameters!')
  );
  process.exit(1);
}

generateSchema(args[0], args[1]);



// ============================================Repository======================================================
function generateRepository(schemaName) {

  // Format names
  const className = toPascalCase(schemaName); // Class name (UserProfile)
  const fileName = toKebabCase(schemaName); // File name (userProfile)
  const tableName = toSnakeCase(schemaName) + 's';
  const variableName = toCamelCase(schemaName); // Variable name (userProfile)


  const templatePath = path.join(__dirname, 'templates', 'repository.tmpl');
  const outputPath = path.join(__dirname, '..', '..', 'src', '@core', 'mongodb', 'repository', `${fileName}.repository.ts`);

  if (!fs.existsSync(templatePath)) {
    console.error(`Repository template not found!`);
    return;
  }

  let template = fs.readFileSync(templatePath, 'utf8');


  // Replace placeholders
  const content = template
    .replace(/{{className}}/g, className)
    .replace(/{{fileName}}/g, fileName)
    .replace(/{{tableName}}/g, tableName)
    .replace(/{{variableName}}/g, variableName);

  // Save the repository file
  fs.writeFileSync(outputPath, content);
  console.log(`${schemaName}.repository.ts generated successfully in /output!`);
}

// Handle CLI arguments
if (args.length < 1) {
  console.log('Missing parameters!');
  process.exit(1);
}

const schemaName = args[0];
generateRepository(schemaName);
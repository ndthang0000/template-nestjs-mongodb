// Convert name formats
function toPascalCase(str) {
  return str
    .replace(/(_\w)/g, (m) => m[1].toUpperCase()) // Convert _word to Word
    .replace(/^./, (m) => m.toUpperCase()); // Capitalize first letter
}

function toCamelCase(str) {
  return str
    .replace(/_./g, (m) => m[1].toUpperCase()) // Convert _word to word
    .replace(/^./, (m) => m.toLowerCase()); // Ensure first character is lowercase
}

function toSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(); // Convert camelCase to snake_case
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add dash between lowercase and uppercase letters
    .replace(/_/g, '-') // Replace underscores with dashes
    .toLowerCase(); // Convert everything to lowercase
}

module.exports = {
  toPascalCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase
}
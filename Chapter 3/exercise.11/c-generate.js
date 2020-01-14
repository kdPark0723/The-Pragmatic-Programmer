const fs = require('fs');

function readLines() {
  const inputFileUri = process.argv[2];
  return fs.readFileSync(inputFileUri).toString().trim().split("\n");
}

function isBeAddedEs(str) {
  return str.endsWith('o') ||
    str.endsWith('x') ||
    str.endsWith('s') ||
    str.endsWith('sh') ||
    str.endsWith('xh');
}

function convertPluralForm(str = '') {
  if (isBeAddedEs(str)) return str + 'es';
  return str + 's';
}

const lines = readLines();

const valueName = lines[0].toLowerCase();
const pluralFormedValueName = convertPluralForm(valueName);
const bigValueName = valueName.toUpperCase();

const values = lines.slice(1, lines.length);

const enumValues = values.reduce((current, value) => current += `    ${value},\n`, '');
const headerFileContent =
  `extern const char* ${bigValueName}_${pluralFormedValueName}[];\n` +
  'typedef enum {\n' +
  enumValues +
  `} ${bigValueName};`;

const arrayValues = values.reduce((current, value) => current += `    \"${value}\",\n`, '');
const sourceFileContent =
  `const char* ${bigValueName}_${pluralFormedValueName}[] = {\n` +
  arrayValues +
  `};`;

fs.writeFileSync('name.h', headerFileContent);
fs.writeFileSync('name.c', sourceFileContent);

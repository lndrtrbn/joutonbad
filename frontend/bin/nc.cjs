#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require("fs");
const path = require("path");

const { componentName } = yargs(hideBin(process.argv))
  .usage("Usage : ./nc.js <command> [options]")
  .command("new <componentName>", "Create new component")
  .demandCommand()
  .help("h")
  .alias("h", "help")
  .example("$0 new Badge", "creates a component Badge")
  .parse();

console.info(
  `[NC] Trying to create new component '${componentName}'`,
);

const componentFolder = path.join(
  __dirname,
  "../src/components",
  componentName,
);

if (fs.existsSync(componentFolder)) {
  console.error("[NC] ERROR: Component already exists");
  process.exit(1);
}

const templatesFolder = path.join(__dirname, "./templates");

if (!fs.existsSync(templatesFolder)) {
  console.error("[NC] ERROR: No templates folder found");
  process.exit(1);
}

let componentTemplate = "";
let styleTemplate = "";

try {
  componentTemplate = fs.readFileSync(
    path.join(templatesFolder, "component.template.txt"),
    "utf8",
  );
} catch (err) {
  console.error("[NC] ERROR: Cannot read component template");
  process.exit(1);
}

try {
  styleTemplate = fs.readFileSync(
    path.join(templatesFolder, "style.template.txt"),
    "utf8",
  );
} catch (err) {
  console.error("[NC] ERROR: Cannot read style template");
  process.exit(1);
}

componentTemplate = componentTemplate.replace(
  /\[component\]/g,
  componentName,
);
styleTemplate = styleTemplate.replace(
  /\[component\]/g,
  componentName,
);

fs.mkdirSync(componentFolder);

console.info(`[NC] Folder '${componentName}' created`);

const componentFile = path.join(
  componentFolder,
  `${componentName}.tsx`,
);

try {
  fs.writeFileSync(componentFile, componentTemplate);
  console.info(`[NC] File '${componentName}.tsx' created`);
} catch (err) {
  console.error("[NC] ERROR: Cannot write component file");
  process.exit(1);
}

const styleFile = path.join(
  componentFolder,
  `${componentName}.style.ts`,
);

try {
  fs.writeFileSync(styleFile, styleTemplate);
  console.info(`[NC] File '${componentName}.style.ts' created`);
} catch (err) {
  console.error("[NC] ERROR: Cannot write style file");
  process.exit(1);
}

console.info(`[NC] Component '${componentName}' ready to be used !`);

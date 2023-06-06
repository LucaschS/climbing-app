const fs = require("node:fs/promises");

async function readData() {
  const data = await fs.readFile("gyms.json", "utf8");
  return JSON.parse(data);
}

async function readCountriesData() {
  const data = await fs.readFile("countries.json", "utf8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("gyms.json", JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;
exports.readCountriesData = readCountriesData;

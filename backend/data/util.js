const fs = require("node:fs/promises");

async function readData() {
  const data = await fs.readFile("gyms.json", "utf8");
  return JSON.parse(data);
}

async function readCavesData() {
  const data = await fs.readFile("caves.json", "utf8");
  return JSON.parse(data);
}

async function readRoutesData() {
  const data = await fs.readFile("routes.json", "utf8");
  return JSON.parse(data);
}

async function readCountriesData() {
  const data = await fs.readFile("countries.json", "utf8");
  return JSON.parse(data);
}

async function readUsersData() {
  const data = await fs.readFile("users.json", "utf-8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("gyms.json", JSON.stringify(data));
}

async function writeCavesData(data) {
  await fs.writeFile("caves.json", JSON.stringify(data));
}

async function writeRoutesData(data) {
  await fs.writeFile("routes.json", JSON.stringify(data));
}

async function writeUserData(data) {
  await fs.writeFile("users.json", JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;

exports.readCavesData = readCavesData;
exports.writeCavesData = writeCavesData;

exports.readRoutesData = readRoutesData;
exports.writeRoutesData = writeRoutesData;

exports.readCountriesData = readCountriesData;

exports.readUsersData = readUsersData;
exports.writeUserData = writeUserData;

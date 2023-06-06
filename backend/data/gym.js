const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();

  if (!storedData.gyms) {
    throw new NotFoundError("Could not find any gyms.");
  }
  return storedData.gyms;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.gyms || storedData.gyms.length === 0) {
    throw new NotFoundError("Could not find any gyms.");
  }

  const gym = storedData.gyms.find((ev) => ev.id === +id); //id jako string dlatego dodałem plus
  if (!gym) {
    throw new NotFoundError("Could not find gym for id " + +id);
  }

  return gym;
}

async function getCountryGyms(countryId) {
  const storedData = await readData();
  if (!storedData.gyms || storedData.gyms.length === 0) {
    throw new NotFoundError("Could not find any gyms.");
  }

  const countryGyms = storedData.gyms.filter((ev) => {
    console.log(countryId, "chujkurwa");
    return ev.cities[0].toLowerCase() === countryId;
  });
  if (!countryGyms) {
    throw new NotFoundError("Could not find gym for id " + countryId);
  }
  console.log(countryGyms, "countryGyms");
  return countryGyms;
}

async function add(data) {
  const storedData = await readData();
  storedData.gyms.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.gyms || storedData.gyms.length === 0) {
    throw new NotFoundError("Could not find any gyms.");
  }

  const index = storedData.gyms.findIndex((ev) => ev.id === +id);
  if (index < 0) {
    throw new NotFoundError("Could not find gym for id " + id);
  }

  storedData.gyms[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.gyms.filter((ev) => ev.id !== +id);
  await writeData({ ...storedData, gyms: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.getCountryGyms = getCountryGyms;
exports.add = add;
exports.replace = replace;
exports.remove = remove;

const { NotFoundError } = require("../util/errors");
const { readCountriesData } = require("./util");

async function getAll() {
  const storedData = await readCountriesData();

  if (!storedData.countries) {
    throw new NotFoundError("Could not find any countries.");
  }
  return storedData.countries;
}

async function get( ) {
  const storedData = await readCountriesData();
  if (!storedData.countries || storedData.countries.length === 0) {
    throw new NotFoundError("Could not find any countries.");
  }

  const country = storedData.countries.find(
    (ev) => ev["alpha-3"].toLowerCase() === id
  ); //id jako string dlatego dodałem plus
  if (!country) {
    throw new NotFoundError("Could not find country for id " + id);
  }

  return country;
}

exports.getAll = getAll;
exports.get = get;

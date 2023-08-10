const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readCavesData, writeCavesData, readUsersData } = require("./util");

async function getAll() {
  const storedData = await readCavesData();

  if (!storedData.caves) {
    throw new NotFoundError("Could not find any caves.");
  }
  return storedData.caves;
}

async function get(id) {
  const storedData = await readCavesData();
  if (!storedData.caves || storedData.caves.length === 0) {
    throw new NotFoundError("Could not find any caves.");
  }

  const cave = storedData.caves.find((ev) => ev.id === +id); //id jako string dlatego dodałem plus
  if (!cave) {
    throw new NotFoundError("Could not find cave for id " + +id);
  }

  return cave;
}

async function getCountryCaves(countryId) {
  const storedData = await readCavesData();
  if (!storedData.caves || storedData.caves.length === 0) {
    throw new NotFoundError("Could not find any caves.");
  }

  //tu był błąd w cities

  const countryCaves = storedData.caves.filter((ev) => {
    return ev.country[0].toLowerCase() === countryId;
  });
  if (!countryCaves) {
    throw new NotFoundError("Could not find cave for id " + countryId);
  }

  return countryCaves;
}

async function add(data) {
  const storedData = await readCavesData();
  storedData.caves.unshift({ ...data, id: generateId() });
  await writeCavesData(storedData);
}

//tu sie zatrzymałem

async function replace(id, countryId, data) {
  const storedData = await readCavesData();

  //wychodzi na to ze nawet jesli nie uzywam countryId to i tak musze go wpisac,.
  // const storedUserData = await readUsersData();

  if (!storedData.caves || storedData.caves.length === 0) {
    throw new NotFoundError("Could not find any caves.");
  }

  const index = storedData.caves.findIndex((ev) => ev.id === +id);
  if (index < 0) {
    throw new NotFoundError("Could not find cave for id " + id);
  }

  if (data.rate) {
    if (!storedData.caves[index].rate) {
      storedData.caves[index] = {
        ...storedData.caves[index],
        rate: [data.rate],
      };
    } else {
      storedData.caves[index] = {
        ...storedData.caves[index],
        rate: [...storedData.caves[index].rate, data.rate],
      };
    }
  }

  if (data.comments) {
    if (!storedData.caves[index].comments) {
      storedData.caves[index] = {
        ...storedData.caves[index],
        comments: [data.comments],
      };
    } else {
      storedData.caves[index] = {
        ...storedData.caves[index],
        comments: [...storedData.caves[index].comments, data.comments],
      };
    }
  }

  if (data && !data.comments && !data.rate) {
    storedData.caves[index] = {
      ...storedData.caves[index],
      ...data,
      id,
    };
  }

  await writeCavesData(storedData);
}

async function remove(id) {
  const storedData = await readCavesData();
  const updatedData = storedData.caves.filter((ev) => ev.id !== +id);
  await writeCavesData({ ...storedData, caves: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.getCountryCaves = getCountryCaves;
exports.add = add;
exports.replace = replace;
exports.remove = remove;

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readRoutesData, writeRoutesData } = require("./util");

async function getAll() {
  const storedData = await readRoutesData();

  if (!storedData.routes) {
    throw new NotFoundError("Could not find any routes.");
  }
  return storedData.routes;
}

async function get(id) {
  const storedData = await readRoutesData();
  if (!storedData.routes || storedData.routes.length === 0) {
    throw new NotFoundError("Could not find any routes.");
  }

  const route = storedData.routes.find((ev) => ev.id === +id); //id jako string dlatego dodałem plus
  if (!route) {
    throw new NotFoundError("Could not find route for id " + +id);
  }

  return route;
}

async function getCountryRoutes(countryId) {
  const storedData = await readRoutesData();
  if (!storedData.routes || storedData.routes.length === 0) {
    throw new NotFoundError("Could not find any routes.");
  }

  const countryRoutes = storedData.routes.filter((ev) => {
    return ev.country[0].toLowerCase() === countryId;
  });
  if (!countryRoutes) {
    throw new NotFoundError("Could not find route for id " + countryId);
  }

  return countryRoutes;
}

async function add(data) {
  const storedData = await readRoutesData();
  storedData.routes.unshift({ ...data, id: generateId() });
  await writeRoutesData(storedData);
}

//tu sie zatrzymałem

async function replace(id, countryId, data) {
  const storedData = await readRoutesData();

  //wychodzi na to ze nawet jesli nie uzywam countryId to i tak musze go wpisac,.
  // const storedUserData = await readUsersData();

  if (!storedData.routes || storedData.routes.length === 0) {
    throw new NotFoundError("Could not find any routes.");
  }

  const index = storedData.routes.findIndex((ev) => ev.id === +id);
  if (index < 0) {
    throw new NotFoundError("Could not find route for id " + id);
  }
  console.log(data, "rate");
  if (data.rate) {
    if (!storedData.routes[index].rate) {
      storedData.routes[index] = {
        ...storedData.routes[index],
        rate: [data.rate],
      };
    } else {
      storedData.routes[index] = {
        ...storedData.routes[index],
        rate: [...storedData.routes[index].rate, data.rate],
      };
    }
  }

  if (data.comments) {
    if (!storedData.routes[index].comments) {
      storedData.routes[index] = {
        ...storedData.routes[index],
        comments: [data.comments],
      };
    } else {
      storedData.routes[index] = {
        ...storedData.routes[index],
        comments: [...storedData.routes[index].comments, data.comments],
      };
    }
  }

  if (data && !data.comments && !data.rate) {
    storedData.routes[index] = {
      ...storedData.routes[index],
      ...data,
      id,
    };
  }

  await writeRoutesData(storedData);
}

async function remove(id) {
  const storedData = await readRoutesData();
  const updatedData = storedData.routes.filter((ev) => ev.id !== +id);
  await writeRoutesData({ ...storedData, routes: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.getCountryRoutes = getCountryRoutes;
exports.add = add;
exports.replace = replace;
exports.remove = remove;

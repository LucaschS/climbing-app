const express = require("express");

const {
  getAll,
  get,
  add,
  replace,
  remove,
  getCountryGyms,
} = require("../data/gym");
// const { checkAuth } = require("../util/auth");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const gyms = await getAll();
    res.json({ gyms: gyms });
  } catch (error) {
    next(error);
  }
});

router.get("/:countryId/:id", async (req, res, next) => {
  try {
    const gym = await get(req.params.id);

    res.json({ gym: gym });
  } catch (error) {
    next(error);
  }
});

router.get("/:countryId", async (req, res, next) => {
  try {
    const countryGyms = await getCountryGyms(req.params.countryId);

    res.json({ countryGyms: countryGyms });
  } catch (error) {
    next(error);
  }
});

// router.use(checkAuth);

// router.post("/", async (req, res, next) => {
//   console.log(req.token);
//   const data = req.body;

//   let errors = {};

//   if (!isValidText(data.title)) {
//     errors.title = "Invalid title.";
//   }

//   if (!isValidText(data.description)) {
//     errors.description = "Invalid description.";
//   }

//   if (!isValidDate(data.date)) {
//     errors.date = "Invalid date.";
//   }

//   if (!isValidImageUrl(data.image)) {
//     errors.image = "Invalid image.";
//   }

//   if (Object.keys(errors).length > 0) {
//     return res.status(422).json({
//       message: "Adding the gym failed due to validation errors.",
//       errors,
//     });
//   }

//   try {
//     await add(data);
//     res.status(201).json({ message: "Gym saved.", gym: data });
//   } catch (error) {
//     next(error);
//   }
// });

// req = require, res = response
router.patch("/:countryId/:id", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  // if (!isValidText(data.name)) {
  //   errors.name = "Invalid name.";
  // }

  // if (!isValidText(data.description)) {
  //   errors.description = "Invalid description.";
  // }

  // if (!isValidDate(data.date)) {
  //   errors.date = "Invalid date.";
  // }

  // if (!isValidImageUrl(data.image)) {
  //   errors.image = "Invalid image.";
  // }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the gym failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(Number(req.params.id), req.params.countryId, data);
    // console.log(data, "data");
    // console.log(req, "req");
    // console.log(res, "res");

    // console.log(next, "next");
    res.json({ message: "Gym updated.", gym: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Gym deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");

const {
  getAll,
  get,
  add,
  replace,
  remove,
  getCountryCaves,
} = require("../data/cave");
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
    const caves = await getAll();
    res.json({ caves: caves });
  } catch (error) {
    next(error);
  }
});

router.get("/:countryId/:id", async (req, res, next) => {
  try {
    const cave = await get(req.params.id);

    res.json({ cave: cave });
  } catch (error) {
    next(error);
  }
});

router.get("/:countryId", async (req, res, next) => {
  try {
    const countryCaves = await getCountryCaves(req.params.countryId);

    res.json({ countryCaves: countryCaves });
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
//       message: "Adding the cave failed due to validation errors.",
//       errors,
//     });
//   }

//   try {
//     await add(data);
//     res.status(201).json({ message: "Cave saved.", cave: data });
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
      message: "Updating the cave failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(Number(req.params.id), req.params.countryId, data);
    // console.log(data, "data");
    // console.log(req, "req");
    // console.log(res, "res");

    // console.log(next, "next");
    res.json({ message: "Cave updated.", cave: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Cave deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

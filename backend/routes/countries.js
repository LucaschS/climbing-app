const express = require("express");

const { getAll, get } = require("../data/country");

const { checkAuth } = require("../util/auth");

const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const countries = await getAll();
    res.json({ countries: countries });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const country = await get(req.params.id);
    res.json({ country: country });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

module.exports = router;

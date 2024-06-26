const express = require("express");
const { generateNewShortURL, getAnalytics, searchAndRedirect } = require("../controllers/url");

const router = express.Router();

router.post("/", generateNewShortURL);

router.get("/:shortId", searchAndRedirect);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;

const router = require("express").Router();
const { sendContactEmail } = require("./contact-controller");

router.post("/", sendContactEmail);

module.exports = router;

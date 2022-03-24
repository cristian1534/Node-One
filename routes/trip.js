const express = require("express");
const router = express.Router();

const {
  create,
  tripsCount,
  listAllTrips,
  removeSoft,
  read,
  update,
} = require("../controllers/trip");

//routes
router.post("/trip", create);
router.get("/trip/total", tripsCount);
router.get("/trip/:count", listAllTrips);
router.patch("/trip/:slug", removeSoft);
router.get("/trip/:slug", read);
router.put("/trip/:slug", update);


module.exports = router;


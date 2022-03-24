const express = require("express");
const router = express.Router();

const {
  create,
  clientsCount,
  listAllClients,
  removeSoft,
  read,
  update,
} = require("../controllers/client");

//routes
router.post("/client", create);
router.get("/client/total", clientsCount);
router.get("/client/:count", listAllClients);
router.patch("/client/:slug", removeSoft);
router.get("/client/:slug", read);
router.put("/client/:slug", update)

module.exports = router;

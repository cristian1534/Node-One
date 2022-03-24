const Client = require("../models/client");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);

    const newClient = await new Client(req.body).save();
    res.status(200).json({
      message: "New Client created",
      data: newClient,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.clientsCount = async (req, res) => {
  let total = await Client.find({ status: "Active" }).estimatedDocumentCount();
  res.status(200).json({
    message: "Total counted",
    count: total,
  });
};

exports.listAllClients = async (req, res) => {
  try {
    let clients = await Client.find({ status: "Active" }).limit(
      parseInt(req.params.count)
    );
    res.status(200).json({
      message: "There are all the Clients",
      data: clients,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Client.findOneAndUpdate(
      { slug: req.params.slug },
      { status: "Inactive" },
      { new: true }
    );
    res.status(200).json({
      message: "Client Removed",
      data: deleted,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.read = async (req, res) => {
  try {
    const client = await Client.findOne({
      slug: req.params.slug,
      status: "Active",
    });
    res.status(200).json({
      message: "Client Found",
      data: client,
    });
  } catch (err) {
    res.status(200).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Client.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Client updated",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

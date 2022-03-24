const Trip = require("../models/trip");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.destiny);

    const newTrip = await new Trip(req.body).save();
    res.status(200).json({
      message: "New Trip Created",
      data: newTrip,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.tripsCount = async (req, res) => {
  let total = await Trip.find({ status: "Active" }).estimatedDocumentCount();
  res.status(200).json({
    message: "Total counted",
    count: total,
  });
};

exports.listAllTrips = async (req, res) => {
  let trips = await Trip.find({ status: "Active" }).limit(
    parseInt(req.params.count)
  );
  res.status(200).json({
    message: "These are all the Trips",
    data: trips,
  });
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Trip.findOneAndUpdate(
      { slug: req.params.slug },
      { status: "Inactive" },
      { new: true }
    );
    res.status(200).json({
      message: "Trip Removed",
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
    const trip = await Trip.findOne({
      slug: req.params.slug,
      status: "Active",
    });
    res.status(200).json({
      message: "Trip Found",
      data: trip,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.destiny) {
      req.body.slug = slugify(req.body.destiny);
    }
    const updated = await Trip.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Trip updated",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

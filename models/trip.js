const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tripSchema = new mongoose.Schema({
    destiny: {
        type: String,
        required: true,
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    leavingStation: {
        type: String,
        required: true,
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],
        text: true
    }, 
    arrivingStation: {
        type: String,
        require: true,
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],
        text: true
    }, 
    description: {
        type: String,
        required: true,
        maxlength: 200,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],
    },
    category: {
        type: ObjectId,
        ref: "Category"
    }, 
    subs: [
        {
            type: ObjectId,
            ref: "Sub"
        }
    ],
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Inactive"]
    }

});

module.exports = mongoose.model("Trip", tripSchema);
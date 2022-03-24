const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [2, "Too Short"],
        maxlength: [32, "Too Long"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    address: {
        type: String,
        required: true,
        minlength: [2, "Too Short"],
        maxlength: [32, "Too Long"]
    },
    telephone: {
        type: Number,
        required: true,
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

module.exports = mongoose.model("Client", clientSchema);


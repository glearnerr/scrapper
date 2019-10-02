const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//data without schema
const dataSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    urlId: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true,
      default: []
    },
    captionIsHidden: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    caption: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "lastUpdatedOn" }
  }
);

module.exports = mongoose.model("Products", dataSchema);

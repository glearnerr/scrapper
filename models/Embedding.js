const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//data without schema
const embeddingSchema = new Schema(
  {
    tcin: {
      type: String,
      required: true
    },
    embedding: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "lastUpdatedOn" }
  }
);

module.exports = mongoose.model("Embedding", embeddingSchema);

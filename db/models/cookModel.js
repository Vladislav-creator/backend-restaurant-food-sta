import mongoose from "mongoose";

const cookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

export const Cook = mongoose.model("Cook", cookSchema);
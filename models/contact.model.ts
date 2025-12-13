
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
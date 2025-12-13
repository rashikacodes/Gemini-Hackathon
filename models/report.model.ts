import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: true,
    },
  },

  trashLevel: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    required: true,
  },

  status: {
    type: String,
    enum: ["REPORTED", "CLEANED"],
    default: "REPORTED",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReportSchema.index({ location: "2dsphere" });

export const Report =  mongoose.models.Report || mongoose.model("Report", ReportSchema);

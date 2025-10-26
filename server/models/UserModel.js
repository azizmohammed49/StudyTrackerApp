import mongoose from "mongoose";
import { generateHash } from "../utils/crypt.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await generateHash(this.password);
  }
  next();
});

export default mongoose.model("User", userSchema);

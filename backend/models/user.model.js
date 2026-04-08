import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;

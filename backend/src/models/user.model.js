import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({

  avatar: {
    type: String,
    default: "https://ik.imagekit.io/Avinash/E-commerce/Screenshot%202026-02-14%20at%203.28.35%E2%80%AFPM.png?updatedAt=1776775229438"
  },

  fullname: {
    type: String,
    default: "User"
  },

  email: {
    type: String,
    unique: true,
    required: true // allows null
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}


const userModel = mongoose.model('user', userSchema);

export default userModel;
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [20, "First name cannot exceed 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxLength: [20, "Last name cannot exceed 20 characters"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: [true, "Mobile number must be unique"],
      trim: true,
      maxLength: [10, "Mobile number cannot exceed 10 characters"],
      //only numbers allowed
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
      maxLength: [50, "Email cannot exceed 50 characters"],
      //simple email validation regex
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: [6, "Password must be at least 6 characters long"],
      maxLength: [20, "Password cannot exceed 20 characters"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("PizzaAppUser", userSchema);

module.exports = User;

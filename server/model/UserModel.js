import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    choices: [
      {
        type: String,
      },
    ],
    language: [
      {
        type: String,
      },
    ],
    profession: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: [validator.isMobilePhone, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Your password must be at least 8 characters long"],
      select: false,
    },
    dob: {
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
      default: "Add your site",
    },
    country: {
      type: String,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",

        required: true,
      },
    ],
    state: {
      type: String,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        default: "www.avatar.jpg",
      },
    },
    coverImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    joined: {
      type: Date,
      default: Date.now,
    },
    otp: {
      type: Number,
    },

    otpExpiration: {
      type: Date,
    },
    numberOfFollowers: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfFollowing: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfTweets: {
      type: Number,
      required: true,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password if not hashed
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method for matching password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// methods for verifying otps
// Methods for verifying otp
userSchema.methods.verifyOtp = function (enteredOtp) {
  if (this.otp === parseInt(enteredOtp) && this.otpExpiration > new Date()) {
    return true; // OTP is valid
  }
  return false; // OTP is invalid or expired
};

// Send user token if login or register
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

// Generating Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;

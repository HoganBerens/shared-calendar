const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true,
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bycrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tickets: [
    { type: mongoose.SchemaTypes.ObjectId, ref: "Ticket", required: true },
  ],
  role: [{ type: String, ref: "Role" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

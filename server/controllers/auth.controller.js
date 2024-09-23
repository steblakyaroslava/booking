const User = require("../models/User");
const bcrypto = require("bcryptjs");

signup = async (req, res) => {
  try {
    const { email, fullname, password, confirm, role } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      throw new Error("The email already exist");
    }

    const saltRounds = 12;

    if (password != confirm) {
      throw new Error("the passwords don`t match");
    }

    const hashedPassword = await bcrypto.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullname,
      role: role || "user",
    });

    console.log(newUser);

    return res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    const isCompare = await bcrypto.compare(password, user.password);

    if (isCompare) {
      if (user.role == "admin") {
        return res.status(200).redirect("/admin");
      } else {
        return res.status(200).redirect("/");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getAdmin = async (req, res) => {
  try {
    const users = User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

getPage = async (req, res) => {
  res.status(200).send("Hello World!");
};

module.exports = {
  signup,
  signin,
  getAdmin,
  getPage,
};

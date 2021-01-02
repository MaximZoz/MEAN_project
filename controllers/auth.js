const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.login = function (req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      passwors: req.body.password,
    },
  });
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    //* пользователь существует, нужно отдать ошибку
    res.status(409).json({
      message: "Такой email уже занят, попробуйте другой",
    });
  } else {
    // * нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      // обработать ошибку
    }
  }
};

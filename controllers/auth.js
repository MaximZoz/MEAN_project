module.exports.login = function (req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      passwors: req.body.password,
    },
  });
};

module.exports.register = function (req, res) {
  res.status(200).json({
    register: "from contriller",
  });
};

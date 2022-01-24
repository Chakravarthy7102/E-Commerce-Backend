const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { token } = req.body;
  //verify token
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        res
          .status(404)
          .json({ status: "error", error: err, msg: "token is not valid" });
        return;
      }
      console.log(payload);
      req.user = payload;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: "error", error: "You are not authenticated" });
  }
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    const user = req.user;
    if (user.id === req.params.id || user.isAdmin) {
      next();
    } else {
      res.status(403).json({ status: "error", msg: "Not authorized" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndUser };

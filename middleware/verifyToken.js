const jwt = require("jsonwebtoken");

// JWT token verifiacation.
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

// token verification for both the user and the admin these routes are basically common universally for valid users
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

//verifies the user trying to acces the route is admin or not is yes admin is allowed to do stuff
const verifyTokenIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const user = req.user;
    if (user.isAdmin) {
      next();
    } else {
      res.status(403).json({ status: "error", msg: "Not authorized" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndUser, verifyTokenIsAdmin };

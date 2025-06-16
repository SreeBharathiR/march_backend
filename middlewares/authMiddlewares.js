const jwt = require("jsonwebtoken");

// Login user check
const protect = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "Fail",
        message: "Session expired. Login again",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    next();
  } catch (error) {
    next(error);
  }
};

// User role check
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = { protect, authorize };

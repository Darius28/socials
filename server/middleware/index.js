import expressJwt from "express-jwt";

export const validJwt = expressJwt({
  getToken: (req, res) => req.cookies.token,
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
});

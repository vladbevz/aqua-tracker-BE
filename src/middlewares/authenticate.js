import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import UserCollection from "../db/models/User.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ", 2);

  if (!authorization || bearer !== "Bearer" || !token) {
    return next(createHttpError(401, "Invalid authorization header"));
  }

  try {
    const { id } = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    const user = await UserCollection.findById(id);
    if (!user) {
      return next(createHttpError(401, "User not found"));
    }

    if (!user.accessToken || user.accessToken !== token) {
      return next(createHttpError(401, "Invalid or expired token"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, "Invalid token"));
  }
};

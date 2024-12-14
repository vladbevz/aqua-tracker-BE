
import createHttpError from "http-errors";
import UserCollection from "../db/models/User.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ", 2);

  if (!authorization || bearer !== "Bearer" || !token) {
    return next(createHttpError(401, "Authorization header is missing or invalid"));
  }

  try {  
    const user = await UserCollection.findOne({accessToken: token });
    if (!user) {
      return next(createHttpError(401, "User not found"));
    }
    console.log( "user", user);
    
    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, "Invalid token"));
  }
};

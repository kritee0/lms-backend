import jwt from "jsonwebtoken";
const jwtsecretKey = "kritee";
export const generateToken = async (user) => {
  try {
    jwt.sign(user, "jwtsecretKey");
    return token;
  } catch (error) {
    console.log(error);
  }
};

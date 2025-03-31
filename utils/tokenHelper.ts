import { Request } from "express";
import jwt from "jsonwebtoken";
import { VendorPayload } from "../dto";
import { APP_SECRET } from "../config";

export const generateToken = (payload: VendorPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "1h" });
};

export const verifyToken = async (req: Request) => {
  try {
    const header = req.headers["authorization"];
    // console.log("signedToken", header);
    if (header) {
      // get last for token
      const token = header.split(" ") || [];
      const jasonToken = token[token.length - 1];
      if (token) {
        const payload = (await jwt.verify(
          jasonToken,
          APP_SECRET
        )) as VendorPayload;
        req.user = payload;
        return true;
      }
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
  return false;
};

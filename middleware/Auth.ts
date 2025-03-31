import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto/Authen.dto";
import { verifyToken } from "../utils/tokenHelper";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await verifyToken(req);
  if (validate) {
    next();
    return;
  }
  res.json({ message: "Unauthorized" });
  return;
};

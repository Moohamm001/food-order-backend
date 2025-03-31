import express, { Request, Response, NextFunction } from "express";
import {
  GetVendorProfile,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin,
} from "../controllers";
import { Authenticate } from "../middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ messageFromVendor: "Vendor Home Page" });
});

router.post("/login", VendorLogin);

// use Authenticate middleware for all routes below
router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

export { router as vendorRouter };

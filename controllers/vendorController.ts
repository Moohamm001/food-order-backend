import express, { NextFunction } from "express";
import { Login, VendorUpdateProfile } from "../dto";
import { FindVendor } from "./adminController";
import { validatePassword } from "../utils/passwordHelper";
import { generateToken } from "../utils/tokenHelper";

export const VendorLogin = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const { email, password } = <Login>req.body;

  // find vendor by email
  const existingVendor = await FindVendor("", email);
  if (existingVendor) {
    const existingPassword = existingVendor.password;
    const existingSalt = existingVendor.salt;
    const isValidPassword = await validatePassword(
      password,
      existingPassword,
      existingSalt
    );

    if (isValidPassword) {
      //gen token
      const token = generateToken({
        _id: existingVendor.id,
        name: existingVendor.name,
        foodType: existingVendor.foodType,
        email: existingVendor.email,
      });

      res.json(token);
      return;
    }
    res.status(401).json({ message: "Invalid Password" });
    return;
  }
  res.status(404).json({ message: "Vendor Email Not Found" });
  return;
};

export const GetVendorProfile = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const vendor = await FindVendor(user._id, user.email);
    if (vendor) {
      res.json(vendor);
      return;
    }
  }
  res.status(404).json({ message: "Vendor Not Found" });
};

export const UpdateVendorProfile = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { name, foodType, address, phoneNumber } = <VendorUpdateProfile>(
      req.body
    );
    const user = req.user;
    if (user) {
      const vendor = await FindVendor(user._id, user.email);
      if (vendor) {
        vendor.name = name;
        vendor.foodType = foodType;
        vendor.address = address;
        vendor.phoneNumber = phoneNumber;

        const result = await vendor.save();
        res.json(result);
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fail to update" });
    return;
  }
  res.status(404).json({ message: "Vendor Not Found" });
  return;
};

export const UpdateVendorService = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const vendor = await FindVendor(user._id);
      if (vendor) {
        vendor.serviceAvailable = !vendor.serviceAvailable;
        const result = await vendor.save();
        res.json(result);
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fail to update" });
    return;
  }
  res.status(404).json({ message: "Vendor Not Found" });
};

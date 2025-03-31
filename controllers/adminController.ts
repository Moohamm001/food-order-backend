import { NextFunction, Request, Response } from "express";
import { VendorDto } from "../dto";
import { vendor } from "../models";
import { generateSalt, generateHashPassword } from "../utils/passwordHelper";
import { mapToVendorModel } from "../utils/mapperDto";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      ownerName,
      foodType,
      pinCode,
      address,
      phoneNumber,
      email,
      password,
    } = <VendorDto>req.body;

    // Check if the vendor already exists
    const existingVendor = await FindVendor("", email);

    if (existingVendor !== null) {
      console.log("Vendor already exists");
      res
        .status(400)
        .json({ message: `Email ${existingVendor?.email} already exists` });
      return;
    }

    const salt = await generateSalt();
    const hashPassword = await generateHashPassword(password, salt);

    const createVendor = await vendor.create({
      name: name,
      ownerName: ownerName,
      foodType: foodType,
      pinCode: pinCode,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      password: hashPassword,
      salt: salt,
      serviceAvailable: false,
      coverImage: [],
      rating: 0,
    });

    // const mappedVendor = mapToVendorModel(createVendor);
    // if(!mappedVendor) {
    //     res.status(500).json({ message: "Can't Map Vendor" });
    //     return;
    // }

    res.status(201).json(createVendor);
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const GetVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorData = await vendor.find();
  if (!vendorData) {
    res.status(404).json({ message: "No vendors found" });
    return;
  }
  res.json(vendorData);
};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const venderId = req.params.id;
    const vendorData = await FindVendor(venderId);
    if (!venderId) {
      res.status(400).json({ message: "Vendor ID is required" });
      return;
    }
    res.json(vendorData);
  } catch (error) {
    res.status(400).json({ message: "Invalid Vendor ID" });
    return;
  }
};

export const DeleteAllVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorRes = await vendor.deleteMany({});
  if (!vendorRes) {
    res.status(404).json({ message: "No vendors found" });
    return;
  }
  res.json({ message: "All vendors deleted successfully" });
};

export const FindVendor = async (id?: string, email?: string) => {
  if (id) {
    return await vendor.findById(id);
  } else if (email) {
    return await vendor.findOne({ email: email });
  }
  return null;
};

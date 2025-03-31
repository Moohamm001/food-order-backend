import mongoose from "mongoose";
import { transform } from "typescript";

interface VendorModel extends mongoose.Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pinCode: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: Date;
  salt: string;
  serviceAvailable: boolean;
  coverImage: [string];
  rating: number;
  food: any;
}

const vendorSchema = new mongoose.Schema<VendorModel>(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true },
    pinCode: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: true },
    coverImage: { type: [String] },
    rating: { type: Number },
    food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  },
  {
    // toJSON: {
    //     transform: (doc, ret) => {
    //         delete ret.password;
    //         delete ret.salt;
    //         delete ret.__v;
    //         delete ret.createdAt;
    //         delete ret.updatedAt;
    //         delete ret.pinCode;
    //     }
    // },
    timestamps: true,
    versionKey: false,
  }
);

const vendor = mongoose.model<VendorModel>("vendors", vendorSchema);

export { vendor };

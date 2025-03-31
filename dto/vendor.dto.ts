export interface VendorDto {
  name: string;
  ownerName: string;
  foodType: [string];
  pinCode: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface VendorUpdateProfile {
  name: string;
  foodType: [string];
  address: string;
  phoneNumber: string;
}

export interface VendorPayload {
  _id: string;
  name: string;
  foodType: [string];
  email: string;
}

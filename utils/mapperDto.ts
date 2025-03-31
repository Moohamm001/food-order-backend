export const mapToVendorModel = (createVendor: any) => {
    return {
        name: createVendor.name,
        ownerName: createVendor.ownerName,
        foodType: createVendor.foodType,
        pinCode: createVendor.pinCode,
        address: createVendor.address,
        phoneNumber: createVendor.phoneNumber,
        email: createVendor.email,
        serviceAvailable: createVendor.serviceAvailable,
        coverImage: createVendor.coverImage,
        rating: createVendor.rating,
        food: createVendor.food || [],
    };
};
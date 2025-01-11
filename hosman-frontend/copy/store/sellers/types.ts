export interface ISellersListParams {
  page: number;
  limit: number;
  status: string;
  search?: string;
}

export interface ISellersRegistrationApprovalParams {
  sellerId: string;
  isApproved: boolean;
}

export interface ISellerOnboardingAddressUpdateParams {
  pickupAddress: {
    street: string;
    area: string;
    governorate: string;
    postalCode: string;
    country: string;
    buildingNumber: string;
    additionalInfo: string;
  };
  returnAddress: {
    street: string;
    area: string;
    governorate: string;
    postalCode: string;
    country: string;
    buildingNumber: string;
    additionalInfo: string;
  };
}

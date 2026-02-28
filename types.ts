export type ServiceType = 'BOARDING' | 'house sitting' | 'drop in visits';
export type PricingTabType = 'boarding' | 'visit' | 'housesitting';

export interface PetListing {
  id: string;
  petName: string;
  ownerName: string;
  rating: number;
  serviceType: ServiceType;
  image: string;
  responsesCount: number;
  startDate: string;
  location: string;
  ownerAvatars: string[];
}

export interface Sitter {
  id: string;
  name: string;
  location: string;
  rating: number;
  services: ServiceType[];
  image: string;
  review: {
    text: string;
    author: string;
  };
  tags: string[];
  isVerified: boolean;
  priceFrom: number;
}
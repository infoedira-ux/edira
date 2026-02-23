export type UserRole = "tenant" | "landlord";

export type ListingStatus = "pending" | "active" | "paused" | "removed";

export type ListingType =
  | "Bedsitter"
  | "1 Bedroom"
  | "2 Bedroom"
  | "3 Bedroom"
  | "4+ Bedroom";

export type City = "Nairobi" | "Mombasa" | "Kisumu" | "Nakuru";

export type Amenity =
  | "wifi"
  | "parking"
  | "security"
  | "borehole"
  | "furnished"
  | "gym"
  | "pool"
  | "water"
  | "garden"
  | "ocean-view";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  city?: City;
  bio?: string;
  verified: boolean;
  trust_score: number;
  total_reviews: number;
  created_at: string;
}

export interface Listing {
  id: string;
  landlord_id: string;
  title: string;
  description?: string;
  city: City;
  neighbourhood?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  type: ListingType;
  price: number;
  beds: number;
  baths: number;
  sqft?: number;
  amenities: Amenity[];
  images: string[];
  status: ListingStatus;
  verified: boolean;
  featured: boolean;
  views: number;
  inquiries: number;
  available_from?: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  landlord?: Profile;
  rating?: number;
  reviews?: number;
  is_new?: boolean;
}

export interface SavedListing {
  id: string;
  tenant_id: string;
  listing_id: string;
  created_at: string;
  listing?: Listing;
}

export interface Inquiry {
  id: string;
  listing_id: string;
  tenant_id?: string;
  landlord_id: string;
  channel: "whatsapp" | "call" | "email";
  message?: string;
  status: "new" | "responded" | "closed";
  created_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  landlord_id: string;
  listing_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
  reviewer?: Profile;
}

export interface Payment {
  id: string;
  tenant_id?: string;
  listing_id?: string;
  amount: number;
  type: "deposit" | "viewing_fee" | "subscription";
  mpesa_code?: string;
  status: "pending" | "success" | "failed";
  phone: string;
  created_at: string;
}

export interface SearchFilters {
  city?: City | "";
  type?: ListingType | "";
  maxPrice?: number | "";
  search?: string;
  amenity?: Amenity | "";
}
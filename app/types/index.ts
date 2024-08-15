import { Listing, Reservation, User } from "@prisma/client";

export type safeListing = Omit<
Listing,
'createdAt'
> & {
  createdAt : string
}

export type safeReservations = Omit<
Reservation,
"createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt : string,
  startDate : string,
  endDate : string,
  listing : safeListing

}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt : string,
    updatedAt : string,
    emailVerified : string | null
}

export interface ISearchListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
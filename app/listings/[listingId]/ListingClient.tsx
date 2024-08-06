'use client'
import { categories } from "@/app/components/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/UseLogin";
import { safeListing, SafeUser } from "@/app/types"
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {eachDayOfInterval} from "date-fns"

const intialDateRange = {
  startDate : new Date(),
  endDate : new Date(),
  key : 'selection'
}


interface ListingClientProps{
  reservations? : Reservation[];
  listing: safeListing & {user : SafeUser} 
  currentUser? : SafeUser | null
}


const ListingClient : React.FC<ListingClientProps> = ({
  reservations= [],
    listing,
   currentUser
}) => {
  const LoginModal = useLoginModal();
  const router = useRouter();

   const[loading, setIsLoading] = useState(false)
   const[totalPrice, setTotalPrice] = useState(listing.price)
   const[dateRange, setDateRange] = useState(intialDateRange)

  const disabledDates = useMemo(() => {
    let dates : Date[] = [];
    reservations.forEach((reservation : any) => {
      const range = eachDayOfInterval({
         start : new Date(reservation.startDate),
         end : new Date(reservation.endDate)
      })
      dates = [...dates, ...range]
    } );
    return dates
  },[reservations])
  

    const category = useMemo(() => {
      return categories.find((category) => {
        category.label === listing.category
      })
    },[listing.category]);


    return (
       <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
               <ListingHead
               title={listing.title!}
               imageSrc={listing.imageSrc!}
               locationValue={listing.locationValue}
               id={listing.id}
               currentUser={currentUser!}
               />
               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
               <ListingInfo 
                user={listing.user}
                category={category!}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                 description={listing.description!}/>
               </div>
            </div>
            </div>
       </Container>
    )
}

export default ListingClient
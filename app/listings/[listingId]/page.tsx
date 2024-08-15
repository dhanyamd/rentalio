import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservation from "@/app/actions/getReservation";

interface IParams{
    listingId? : string
}
const ListingPage = async({params} : {params : IParams}) => {
    const listing = await getListingsById(params);
    const reservations = await getReservation(params);

    const currentUser = await getCurrentUser();
    if(!listing){
        return (
            <EmptyState>
            </EmptyState>
        )
    }
    //@ts-ignore
    return <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />;

}

export default ListingPage
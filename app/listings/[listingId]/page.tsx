import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams{
    listingId? : string
}
const ListingPage = async({params} : {params : IParams}) => {
    const listing = await getListingsById(params);

    const currentUser = await getCurrentUser();
    if(!listing){
        return (
            <EmptyState>
            </EmptyState>
        )
    }

    return (
        <ListingClient   
        //@ts-ignore   
        listing = {listing}
        currentUser={currentUser}/>
    )
}

export default ListingPage
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings"
import EmptyState from "../components/EmptyState"
import FavouriteList from "./FavouriteList";


const ListingPage = async() => {
    const listings = await getFavouriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
        return (
            <EmptyState
            title="No favourites found"
            subtitle="Looks like you have no favourite listings!"
            />
        )
    }

    return (
        <FavouriteList 
        listings={listings}
        currentUser={currentUser}
        />
    )
}

export default ListingPage 
import { safeListing, SafeUser } from "../types"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import Container from "../components/Container"

interface FavouriteListProps{
    listings : safeListing[],
    currentUser? : SafeUser | null
}

const FavouriteList : React.FC<FavouriteListProps> = ({
    listings,
    currentUser
}) => {
    return (
      <Container>
          <Heading 
          title="Favourites"
          subtitle="List of places you have favourited!"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
           {listings.map((listing) => (
             <ListingCard 
             key={listing.id}
             data={listing}
             currentUser={currentUser}
             />
           ))}
          </div>

      </Container>
    )
}

export default FavouriteList
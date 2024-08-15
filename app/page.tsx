
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { ISearchListingParams } from "./types";

interface IHomeProps {
  searchParams: ISearchListingParams;
}

export default async function Home({ searchParams }: IHomeProps) {
  const [listings, currentUser] = await Promise.all([
    getListings(searchParams),
    getCurrentUser(),
  ]);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showResets />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              data={listing}
              key={listing.id}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
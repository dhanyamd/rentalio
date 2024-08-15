import { Suspense } from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { ISearchListingParams } from "./types";


export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: ISearchListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return <EmptyState showResets />;
  }


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
        <Suspense>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              data={listing}
              key={listing.id}
            />
          ))}
        </div>
        </Suspense>
      </Container>
    
    </ClientOnly>
  );
}

export default Home
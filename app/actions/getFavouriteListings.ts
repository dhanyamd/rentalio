'use server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getFavouriteListings(){

    try {

        const currrentUser = await getCurrentUser();

        if(!currrentUser){
            return [];
        }
        
        const favourites = await prisma.listing.findMany({
            where : {
                id : {
                    in : [...(currrentUser.favouriteIds || [])]
                }
            }
        });

        const safeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createdAt : favourite.createdAt.toISOString()
        }))
          
        return safeFavourites

    }catch(error : any){
        throw new Error()

    }
}
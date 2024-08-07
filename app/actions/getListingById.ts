import prisma from '@/app/libs/prismadb'

interface IParamas {
    listingId? : string
}

export default async function getListingsById(
    params : IParamas
){
  try{
    const {listingId} = params;
    
    const listing = await prisma.listing.findUnique({
        where :{
            id : listingId
        },
        include :{
            user : true
        }
    })
    if(!listing){
        return null 
    }

    return {
        ...listing,
        createdAt : listing.createdAt.toISOString(),
        category : listing.category,
        user : {
            ...listing.user,
            createdAt : listing.user.createdAt.toISOString(),
            updatedAt : listing.user.updatedAt.toISOString(),
            emailVerified: listing.user.emailVerified?.toISOString || null
        }
    }

  }catch(error : any){
   throw new Error('something went wrong in the getListings part')
  }
}


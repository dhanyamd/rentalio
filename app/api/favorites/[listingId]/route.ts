import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams{
    listingId? : string
}

export async function POST(
    request : Request,
    {params} : {params : IParams} 
){

    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId} = params;

    if(!listingId && typeof listingId !== 'string'){
        throw new Error('Invalid id')
    }

    const favouriteIds = [...(currentUser.favouriteIds || [])];

    favouriteIds.push(listingId);

    const user = await prisma.user.update({
        where:{
            id : currentUser.id
        },
        data: {
          favouriteIds
        }
    })
    return NextResponse.json(user)
}

export async function DELETE(
    request : Request,
    {params} : {params : IParams} 
){
   const currentUser = await getCurrentUser();

   if(!currentUser){
    return NextResponse.error();
   }

   const {listingId} = params;

   if(!listingId && typeof listingId !== 'string'){
    throw new Error('Invalid Id');
   }

   let favouriteIds = [...(currentUser.favouriteIds || [])];

   favouriteIds = favouriteIds.filter((id) => id !== listingId);
   const user = await prisma.user.update({
    where:{
        id : currentUser.id
    },
    data:{
        favouriteIds
    }
   })
   return NextResponse.json(user)
}
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams{
    reservationId? : string
}

export async function DELETE(request : Request, {params} : {params : IParams}){
    const currrentUser = await getCurrentUser();

    if(!currrentUser){
        return NextResponse.error()
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid Id') 
    }

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id: reservationId,
            OR : [
                {userId : currrentUser.id},
                {listing : {userId : currrentUser.id}}
            ]
        }
    })
    return NextResponse.json(reservation)
}
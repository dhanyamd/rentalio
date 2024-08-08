import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";


const ReservationPage = async() => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
        <EmptyState title="Unauthorized" subtitle="Please login!"/>
        )
    }

    const reservations = await getReservation({
        authorId : currentUser.id
    })

    if(reservations?.length === 0){
        return (
            <EmptyState 
            title="No reservations found!"
            subtitle="Looks like you have no reservation on your property"
            />
        )
    }
    return (
        <ReservationClient 
        reservations={reservations}
        currentUser={currentUser}
        />
    )
}

export default ReservationPage
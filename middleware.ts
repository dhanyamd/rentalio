export {default} from 'next-auth'

export const config = {
    matcher : [
        "/trips",
        "/reservations",
        "/properties",
        "/favourites"
    ]
}
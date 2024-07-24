import NextAuth from "next-auth";
import { authoptions } from "./options";

const handler =  NextAuth(authoptions) 

export { handler as GET, handler as POST };
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import authoptions from '../api/auth/[...nextauth]/options';

export const getSession = async () => {
  return await getServerSession(authoptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    return currentUser
      ? {
          ...currentUser,
          createdAt: currentUser.createdAt.toISOString(),
          updatedAt: currentUser.updatedAt.toISOString(),
          emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
      : null;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
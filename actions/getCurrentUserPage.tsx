import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { NextApiRequest } from "next";

const getCurrentUser = async (req: NextApiRequest) => {
  const session = await getSession(req);

  if (!session?.user?.email) {
    return {
      user: null,
      id: null,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!user) {
      return {
        user: null,
        id: null,
      };
    };

    return { user, id: user.id };
  } catch (error: any) {
    console.log("GET_CURRENT_USER_FAILED", { status: 500});
    return { user: null, id: null };
  }
}

export default getCurrentUser
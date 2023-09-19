import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string }}) {
  try {
    const { user } = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    };

    if (!params.serverId) {
      return new NextResponse("ServerId Missing", { status: 400 })
    }

    const server = await prismadb.server.update({
      where: {
        id: params.serverId,
        userId: {
          not: user.id
        },
        members: {
          some: {
            userId: user.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            userId: user.id
          }
        }
      }
    })

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
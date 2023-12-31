import getCurrentUserPage from "@/actions/getCurrentUserPage";
import prismadb from "@/lib/prismadb";
import { NextApiResponseServerIO } from "@/constants/types/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed " });
  }

  try {
    const { user } = await getCurrentUserPage(req);
    const { content, fileUrl } = req.body;
    const { conversationId } = req.query;

    if (!user) {
      return res.status(401).json({ error: "Unauthrozied" });
    }

    if (!content) {
      return res.status(401).json({ error: "Content missing" });
    }

    if (!conversationId) {
      return res.status(401).json({ error: "Conversation ID missing" });
    }

    const conversation = await prismadb.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              userId: user.id,
            },
          },
          {
            memberTwo: {
              userId: user.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
    
    if (!conversation) {
      return res.status(401).json({ error: "Conversation is missing" });
    }

    const member = conversation.memberOne.userId === user.id ? conversation.memberOne : conversation.memberTwo;

    if (!member) {
      return res.status(404).json({ messages: "Member not found " });
    }

    const message = await prismadb.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId: conversationId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGE_POST]", error);
    return res.status(500).json({ messages: "Internal Error" });
  }
}

import {
  BannerColor,
  Member,
  Server,
  User,
  UserDetails,
  UserServerData,
} from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import {
  desensitizationArrayForUserDetails,
  desensitizationArrayforBannerColor,
  desensitizationArrayforServer,
  desensitizationArrayforUser,
  desensitizationArrayforUserServerData,
} from "../../utils/desensitizationDatabaseData";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & {
    user: User;
  })[];
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type UsersWithBannerColor = User & {
  bannerColor: BannerColor[];
};

type DesensitizationUserFieldsUnion =
  (typeof desensitizationArrayforUser)[number];
type DesensitizationBannerColorFieldsUnion =
  (typeof desensitizationArrayforBannerColor)[number];
type DesensitizationUserServerDataFieldsUnion =
  (typeof desensitizationArrayforUserServerData)[number];
type DesensitizationServerFieldsUnion =
  (typeof desensitizationArrayforServer)[number];
type DesensitizationUserDetailsFieldUnion =
  (typeof desensitizationArrayForUserDetails)[number];

export type DesensitizedUser = Omit<User, DesensitizationUserFieldsUnion>;
export type DesensitizedBannerColor = Omit<
  BannerColor,
  DesensitizationBannerColorFieldsUnion
>;
export type DesensitizedUserServerData = Omit<
  UserServerData,
  DesensitizationUserServerDataFieldsUnion
>;
export type DesensitizationServer = Omit<
  Server,
  DesensitizationServerFieldsUnion
>;
export type DesensitizatizedUserDetails = Omit<
  UserDetails,
  DesensitizationUserDetailsFieldUnion
>;

export type DesensitizedUserBannerColor = DesensitizedUser & {
  bannerColor: DesensitizedBannerColor[];
};

export type BannerColorWithUsers = User & {
  bannerColor: BannerColor[];
};

export type DesensitizedUserServerDataBannerColor =
  DesensitizedUserServerData & {
    bannerColor: DesensitizedBannerColor[];
  };

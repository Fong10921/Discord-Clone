"use client";

import UserCard from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUserData } from "@/utils/apiGetRequest";
import { useModal } from "@/hooks/use-modal-store";
import { useSettingPageModal } from "@/hooks/use-setting-page";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface MyAccountProps {
  user: User | undefined;
}

const MyAccount: React.FC<MyAccountProps> = ({ user }) => {
  const { openType } = useSettingPageModal();
  const { onOpen: onOpenModal } = useModal();

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserData,
    initialData: user,
  });

  if (openType !== "myAccount") {
    return null;
  }

  return (
    <div className="relative px-10 pt-[3.75rem] pb-16 flex flex-1 max-h-[740px] min-w-[45rem] min-h-full ">
      <div className="w-full">
        <div className="mb-5 font-bold text-xl w-full">My Account</div>
        <UserCard user={data} />
        <Separator className="space-y-12 my-12 w-full bg-[#4E5058]" />
        <div>
          <div>
            <h1 className="mb-5 font-bold text-xl w-full">
              Password and Authentication
            </h1>
            <Button
              onClick={() =>
                onOpenModal("changePassword", { utils: user?.hashedPassword })
              }
              className="mt-3 mr-3 mb-5 text-sm py-0 tracking-wide px-4 text-white font-[590] h-8 rounded-none"
              variant="primary_discord_blue"
            >
              Change Password
            </Button>
            <h3 className="small-text-1232asd">Two-Factor Authentication</h3>
            <div className="leading-[1.25rem] text-[0.88rem] font-normal cursor-default text-[#B5BAC1] w-[75%] mt-3">
              Protect your Discord account with an extra layer of security. Once
              configured, you&apos;ll be required to enter both password and an
              authenticated code from your mobile phone in order to sign in.
            </div>
            <Button
              className="mt-5 mr-3 text-sm py-0 tracking-wide px-4 text-white font-[590] h-8 rounded-none"
              variant="primary_discord_blue"
            >
              Enable Two-Factor Auth
            </Button>
            <Separator className="space-y-12 my-12 w-full bg-[#4E5058]" />
            <h3 className="small-text-1232asd">Account Removal</h3>
            <div className="leading-[1.25rem] text-[0.88rem] font-normal cursor-default text-[#B5BAC1] w-[75%] mt-3">
              Disabling your account mean you can recover it at any time after
              taking this action.
            </div>
            <div className="flex flex-row pb-16">
              <Button
                variant="primary_red_destructive"
                className="transition mt-3 mr-3 mb-5 text-sm py-0 tracking-wide px-4 text-white font-[590] h-8 rounded-none"
              >
                Disable Account
              </Button>
              <Button
                variant="secondary_red_destructive"
                className="transition mt-3 mr-3 mb-5 text-sm py-0 tracking-wide px-4 text-white font-[590] h-8 rounded-none"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

"use client";

import { useSettingPageModal } from "@/hooks/use-setting-page";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProfileProps {
  user: User;
}

const profileSchema = z.object({
  name: z
    .string()
    .min(
      1,
      "Please make sure your profile name is at least one character long"
    ),
  pronouns: z.string().min(1, "Please make sure your pronouns is not empty"),
});

type profileFormValues = {
  name?: string;
  pronouns?: string;
};

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { openType } = useSettingPageModal();

  const [profile, setProfile] = useState("user");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<profileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name!,
      pronouns: "",
    },
  });

  const {
    formState: { isDirty },
  } = form;

  useEffect(() => {
    if (isDirty) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isDirty]);

  const handleChangeProfile = (profileString: string) => {
    if (profileString === profile) {
      return;
    } else {
      setProfile(profileString);
    }
  };

  const onSubmit: SubmitHandler<profileFormValues> = async (
    data: profileFormValues
  ) => {
    console.log("Submitting");
    return;
  };

  if (openType !== "profile") {
    return;
  }

  return (
    <div className="w-full ">
      <div className="mb-5 font-bold text-xl w-full">Profile</div>
      <div className="flex flex-row space-x-12 flex-1">
        <h1
          onClick={() => handleChangeProfile("user")}
          className={cn(
            `mb-5 pb-4 text-base font-[600] whitespace-nowrap cursor-pointer border-b-2 border-transparent`,
            profile === "user" && "border-[#949CF7]"
          )}
        >
          User Profile
        </h1>
        <h1
          onClick={() => handleChangeProfile("server")}
          className={cn(
            `mb-5 pb-4 text-base font-[600] whitespace-nowrap cursor-pointer border-b-2 border-transparent`,
            profile === "server" && "border-[#949CF7]"
          )}
        >
          Server Profies
        </h1>
      </div>
      {profile === "user" && (
        <div className="flex flex-row">
          <div className="flex flex-col flex-1">
            <h3 className="small-text-1232asd text-xs">Display Name</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="my-4">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Name"
                            {...field}
                            className="rounded-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-[0px] w-[90%]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator className="space-y-12 my-12 bg-[#4E5058] w-[90%]" />
                  <FormField
                    control={form.control}
                    name="pronouns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="small-text-1232asd text-xs">
                          Pronouns
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Add your pronouns"
                            {...field}
                            className="rounded-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-[0px] w-[90%]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator className="space-y-12 my-12 bg-[#4E5058] w-[90%]" />
                  <h3 className="small-text-1232asd text-xs">Avatar</h3>
                  <Button
                    className="mt-5 mr-3 text-sm py-0 tracking-wide px-4 text-white font-[590] h-8 rounded-none"
                    variant="primary_discord_blue"
                  >
                    Change Avatar
                  </Button>
                  <Separator className="space-y-12 my-12 bg-[#4E5058] w-[90%]" />
                  <h3 className="small-text-1232asd text-xs">Banner Color</h3>
                  <Alert
                    className={cn(
                      `absolute p-3 bottom-[-200%] transition-all duration-500`,
                      isVisible ? `alert-visible` : ""
                    )}
                  >
                    <div className="flex flex-row justify-between items-center">
                      <AlertTitle className="pl-2 m-0">
                        Careful - you have unsaved changes!
                      </AlertTitle>
                      <AlertDescription>
                        <div className="flex flex-row space-x-4">
                          <Button
                            className="h-8 bg-transparent hover:underline text-white hover:bg-transparent"
                            onClick={() => form.reset()}
                          >
                            Reset
                          </Button>
                          <Button
                            type="submit"
                            className="h-8 text-white bg-[#248046] hover:bg-[#1A6334] rounded-sm"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex-1">
            <h3 className="small-text-1232asd">Preview</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";
import ActionToolTip from "../ActionToolTip";

export const ChatVideoButton = () => {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        video: isVideo ? undefined : true,
      }
    }, { skipNull: true });

    router.replace(url);
  }

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  return (
    <ActionToolTip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"/>
      </button>
    </ActionToolTip>
  )
}
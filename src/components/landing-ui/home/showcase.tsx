import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento";
import { IconClipboardCopy } from "@tabler/icons-react";
import InteractiveButton from "@/components/ui/interactive-button";
import { QRCode } from "@/components/ui/qr-code";

export function Showcase() {
  return (
    <BentoGrid className="mx-auto max-w-4xl rounded-2xl bg-white px-2 py-4 dark:bg-black">
      <BentoGridItem
        title="Interactive Button"
        header={<Skeleton1 />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className=""
      />
      <BentoGridItem
        title="This is some title"
        header={<Skeleton2 />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-2"
      />
      <BentoGridItem
        title="This is some title"
        header={<Skeleton />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-2"
      />
      <BentoGridItem
        title="This is some title"
        header={<Skeleton />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className=""
      />
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);

const Skeleton1 = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-white dark:bg-black">
    <InteractiveButton>Click Me</InteractiveButton>
  </div>
);

const Skeleton2 = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-white dark:bg-black">
    <QRCode src="qr-cloff-ui.png" />
  </div>
);

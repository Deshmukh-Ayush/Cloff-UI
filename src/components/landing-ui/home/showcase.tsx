"use client";

import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento";
import { IconClipboardCopy } from "@tabler/icons-react";
import InteractiveButton from "@/components/ui/interactive-button";
import { QRCode } from "@/components/ui/qr-code";
import {
  AIInput,
  AIInputAgentPicker,
  AIInputControls,
  AIInputDropdown,
  AIInputLeftControls,
  AIInputRightControls,
  AIInputSubmitButton,
  AIInputTextarea,
} from "@/registry/new-york/items/ai-input/components/ai-input";
import { toast } from "sonner";
import { AvatarStack } from "@/registry/new-york/items/avatar-stack/avatar-stack";

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
        title="QR Code"
        header={<Skeleton2 />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-2"
      />
      <BentoGridItem
        title="AI Input"
        header={<Skeleton3 />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-2"
      />
      <BentoGridItem
        title="Avatar Stack"
        header={<Skeleton4 />}
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

const Skeleton3 = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const appTypes = [
    { label: "Web App", value: "web" },
    { label: "Mobile App", value: "mobile" },
  ];

  const agents = [
    {
      title: "Claude",
      src: "/claude-color.svg",
    },
    {
      title: "Gemini",
      src: "/gemini-icon.svg",
    },
    {
      title: "Grok",
      src: "/grok-icon.svg",
    },
    {
      title: "Co Pilot",
      src: "copilot-icon.svg",
    },
  ];

  const handleSubmit = (text: string) => {
    console.log("Submitted text:", text);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.message("Hey you!! this is just a demo component", {
        description: "use it as you like",
      });
    }, 2000);
  };

  const handleButtonClick = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !isLoading) {
      handleSubmit(trimmedValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-white dark:bg-black">
      <AIInput>
        <AIInputTextarea
          placeholder="Generate onlyfans frontend redesigned...."
          onSubmit={handleSubmit}
          value={inputValue}
          onChange={setInputValue}
        />
        <AIInputControls>
          <AIInputLeftControls>
            <AIInputDropdown
              options={appTypes}
              defaultValue="Web App"
              onChange={(value) => console.log("Selected mode:", value)}
            />
            <AIInputAgentPicker
              agents={agents}
              defaultAgent={agents[0]}
              onChange={(agent) => console.log("Selected agent:", agent)}
            />
          </AIInputLeftControls>
          <AIInputRightControls>
            <AIInputSubmitButton
              onClick={handleButtonClick}
              disabled={!inputValue.trim() || isLoading}
              isLoading={isLoading}
            />
          </AIInputRightControls>
        </AIInputControls>
      </AIInput>
    </div>
  );
};

const Skeleton4 = () => {
  const usersData = [
    {
      name: "Evil Rabbit",
      image: "https://github.com/evilrabbit.png",
    },
    {
      name: "shadcn",
      image: "https://github.com/shadcn.png",
    },
    {
      name: "Manu Paaji",
      image: "https://github.com/manuarora700.png",
    },
    {
      name: "Ayush Deshmukh",
      image: "https://github.com/Deshmukh-Ayush.png",
    },
  ];
  return (
    <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-white dark:bg-black">
      <AvatarStack
        items={usersData}
        title="Contributors"
        subtitle="4 Active Members"
      />
    </div>
  );
};

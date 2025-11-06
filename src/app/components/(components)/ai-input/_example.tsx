"use client";

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
import { useState } from "react";
import { toast } from "sonner";

export default function AIInputDemo() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const appTypes = [
    { label: "Web App", value: "web" },
    { label: "Mobile App", value: "mobile" },
    { label: "Desktop App", value: "desktop" },
    { label: "Website Design", value: "website" },
    { label: "UI/UX Design", value: "uiux" },
    { label: "Backend API", value: "api" },
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
  );
}

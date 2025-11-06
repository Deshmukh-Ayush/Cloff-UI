"use client";

import { Snippet } from "@/components/docs-ui/code-snippet";
import { Heading, SubHeading } from "@/components/docs-ui/heading";
import { Para } from "@/components/docs-ui/para";
import {
  PreviewContent,
  PreviewRoot,
  PreviewTab,
  PreviewTabs,
} from "@/components/docs-ui/preview";
import { PropsTable } from "@/components/docs-ui/props-table";
import { CodeBlock } from "@/components/ui/code-block";
import { Step, Steps } from "@/components/ui/steps";
import { useState } from "react";
import AIInputDemo from "./_example";
import Link from "next/link";
import { OneLiner } from "@/components/docs-ui/one-liner";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const code = `
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
}`;

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/ai-input.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/ai-input.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/ai-input.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/ai-input.json",
  } as const;

  const propsData = [
    // Types
    {
      prop: "Logo",
      type: "{ title: string; src: string }",
      default: "-",
      description:
        "Shape used to represent an AI agent (used by AIInputAgentPicker).",
    },
    {
      prop: "DropdownOption",
      type: "{ label: string; value: string }",
      default: "-",
      description: "Shape used for dropdown options (used by AIInputDropdown).",
    },

    // AIInput
    {
      prop: "children",
      type: "React.ReactNode",
      default: "-",
      description:
        "Content rendered inside the AIInput container (controls, textarea, etc.).",
    },

    // AIInputTextarea
    {
      prop: "placeholder",
      type: "string",
      default: '"Type here....."',
      description: "Placeholder text shown in the textarea.",
    },
    {
      prop: "onSubmit",
      type: "(value: string) => void",
      default: "-",
      description:
        "Called when Enter is pressed (without Shift) with the trimmed text.",
    },
    {
      prop: "value",
      type: "string",
      default: "-",
      description:
        "Controlled value for the textarea. If provided, the textarea updates when it changes.",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      default: "-",
      description: "Called on each change with the new textarea value.",
    },

    // AIInputControls / Left / Right
    {
      prop: "children",
      type: "React.ReactNode",
      default: "-",
      description:
        "Row content for controls (used by AIInputControls, AIInputLeftControls, AIInputRightControls).",
    },

    // AIInputDropdown
    {
      prop: "options",
      type: "DropdownOption[]",
      default: "-",
      description: "Array of options (label/value) shown inside the dropdown.",
    },
    {
      prop: "defaultValue",
      type: "string",
      default: "options[0]?.label",
      description:
        "Initial label displayed in the dropdown (falls back to the first option's label).",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      default: "-",
      description:
        "Callback invoked when an option is selected. Receives the selected option's value.",
    },

    // AIInputAgentPicker
    {
      prop: "agents",
      type: "Logo[]",
      default: "-",
      description: "Array of agent logos to show in the picker.",
    },
    {
      prop: "defaultAgent",
      type: "Logo",
      default: "null",
      description: "Initial selected agent (if any).",
    },
    {
      prop: "onChange",
      type: "(agent: Logo) => void",
      default: "-",
      description:
        "Called when an agent is selected (passes the selected Logo).",
    },

    // AIInputSubmitButton
    {
      prop: "onClick",
      type: "() => void",
      default: "-",
      description: "Click handler for the submit button.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "When true, button is disabled and dimmed.",
    },
    {
      prop: "isLoading",
      type: "boolean",
      default: "false",
      description: "When true, shows a loading state instead of the arrow.",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <Heading>AI Input</Heading>
      <Para className="mt-4">AI Input component for your next AI SaaS.</Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview">
          <AIInputDemo />
        </PreviewContent>

        <PreviewContent value="code">
          <div className="h-full w-full overflow-auto p-4">
            <CodeBlock filename="page.tsx" language="tsx" code={code} />
          </div>
        </PreviewContent>
      </PreviewRoot>
      <OneLiner href="https://khagwal.com/interactions/">
        Inspired by Nitesh Khagwal
      </OneLiner>

      <div className="py-10">
        <SubHeading>Installation</SubHeading>

        <Steps>
          <Step title="Run the following command">
            <Snippet>
              <Snippet.Header>
                <Snippet.Tabs>
                  {(Object.keys(commands) as Array<keyof typeof commands>).map(
                    (pm) => (
                      <Snippet.Tab
                        key={pm}
                        active={activeTab === pm}
                        onClick={() => setActiveTab(pm)}
                      >
                        {pm}
                      </Snippet.Tab>
                    ),
                  )}
                </Snippet.Tabs>
                <Snippet.Action onCopy={handleCopy} copied={copied} />
              </Snippet.Header>

              <Snippet.Content>{commands[activeTab]}</Snippet.Content>
            </Snippet>
          </Step>
        </Steps>

        <SubHeading className="mt-10">Props</SubHeading>
        <PropsTable className="mt-10">
          <PropsTable.Header>
            <PropsTable.HeaderCell>Props</PropsTable.HeaderCell>
            <PropsTable.HeaderCell>Type</PropsTable.HeaderCell>
            <PropsTable.HeaderCell>Default</PropsTable.HeaderCell>
            <PropsTable.HeaderCell>Description</PropsTable.HeaderCell>
          </PropsTable.Header>
          <PropsTable.Body>
            {propsData.map((prop, index) => (
              <PropsTable.Row key={index}>
                <PropsTable.Cell>
                  <PropsTable.Code>{prop.prop}</PropsTable.Code>
                </PropsTable.Cell>
                <PropsTable.Cell>
                  <PropsTable.Code>{prop.type}</PropsTable.Code>
                </PropsTable.Cell>
                <PropsTable.Cell>
                  <PropsTable.Code>{prop.default}</PropsTable.Code>
                </PropsTable.Cell>
                <PropsTable.Cell>{prop.description}</PropsTable.Cell>
              </PropsTable.Row>
            ))}
          </PropsTable.Body>
        </PropsTable>
      </div>
    </div>
  );
}

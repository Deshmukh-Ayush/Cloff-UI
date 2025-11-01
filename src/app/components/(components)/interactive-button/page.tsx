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
import InteractiveButton from "@/registry/new-york/items/interactive-button/components/interactive-button";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const code = `
  import React from 'react'
  import InteractiveButton from @/components/ui/interactive-button.tsx
  
  export default function Page() {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <InteractiveButton>Click Me</InteractiveButton>
      </div>
    )
  }
  
   `;

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/interactive-button.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/interactive-button.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/interactive-button.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/interactive-button.json",
  } as const;

  const propsData = [
    {
      prop: "children",
      type: "React.ReactNode",
      default: "Enter",
      description: "Button lable show in the idle state.",
    },
    {
      prop: "className",
      type: "string",
      default: "undefined",
      description: "Additional CSS classes applied to the button wrapper.",
    },
    {
      prop: "onClick",
      type: "(event: MouseEvent<HTMLButtonElement>) => void | Promise<void>",
      default: "undefined",
      description:
        "Click handler (can be async). If it throws/rejects the button goes to failure",
    },
    {
      prop: "loadingText",
      type: "string",
      default: "Loading...",
      description: "Text shown while in loading state.",
    },
    {
      prop: "loadingText",
      type: "string",
      default: "Loading...",
      description: "Text shown while in loading state.",
    },
    {
      prop: "successText",
      type: "string",
      default: "Sucess!",
      description: "Text shown when action succeeds.",
    },
    {
      prop: "failureText",
      type: "string",
      default: "Failed!!",
      description: "Text shown when action failed.",
    },
    {
      prop: "loadingDuration",
      type: "number (ms)",
      default: "1500",
      description:
        "Delay (ms) after starting loading before switching to success (applied after onClick resolves).",
    },
    {
      prop: "resetDelay",
      type: "number (ms)",
      default: "3000",
      description:
        "Time (ms) the button stays in success or failure before returning to idle.",
    },
    {
      prop: "enableEnterKey",
      type: "boolean",
      default: "false",
      description:
        "If true, pressing Enter triggers the button when state is idle",
    },
    {
      prop: "type",
      type: `"button" | "submit" | "reset"`,
      default: "button",
      description: "Native button type attribute.",
    },
    {
      prop: "form",
      type: "string",
      default: "undefined",
      description: "Forwarded form attribute (form id).",
    },
    {
      prop: "name",
      type: "string",
      default: "undefined",
      description: "Forwarded name attribute.",
    },
    {
      prop: "value",
      type: "string",
      default: "undefined",
      description: "Forwarded value attribute.",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <Heading>Interactive Button</Heading>
      <Para className="mt-4">Multipurpose stateful Interactive button</Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview">
          <div className="text-center">
            <InteractiveButton>Click Me</InteractiveButton>
          </div>
        </PreviewContent>

        <PreviewContent value="code">
          <div className="h-full w-full overflow-auto p-4">
            <CodeBlock
              filename="interactive-button.tsx"
              language="tsx"
              code={code}
            />
          </div>
        </PreviewContent>
      </PreviewRoot>

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

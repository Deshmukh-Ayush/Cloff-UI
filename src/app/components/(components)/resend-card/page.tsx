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
import ResendCard from "@/registry/new-york/items/resend-card/components/resend-card";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);
  const code = `
  import ResendCard from "@/registry/new-york/items/resend-card/components/resend-card";
  import React from "react";
  
  export const ResendCardDemo = () => {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <ResendCard />
      </div>
    );
  };
  
  
   `;

  const propsData = [
    {
      prop: "className",
      type: "string",
      default: "undefined",
      description:
        "Additional class names applied to the trigger button wrapper.",
    },
    {
      prop: "src",
      type: "string",
      default: "-",
      description: "URL or path to the QR code image to display in the modal.",
    },
    {
      prop: "url",
      type: "string",
      default: "-",
      description: "URL string copied to clipboard by the Copy button.",
    },
  ];

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/resend-card.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/resend-card.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/resend-card.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/resend-card.json",
  } as const;

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Heading>QR Code Button</Heading>
      <Para className="mt-4">Beautiful Animated QR Code button</Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview" className="h-[80vh]">
          <ResendCard />
        </PreviewContent>

        <PreviewContent value="code" className="h-[80vh]">
          <div className="h-full w-full overflow-auto p-4">
            <CodeBlock
              filename="qr-code-button.tsx"
              language="tsx"
              code={code}
            />
          </div>
        </PreviewContent>
      </PreviewRoot>

      <div className="mt-30 py-10">
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

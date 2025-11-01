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
import PixedlatedShader from "@/registry/new-york/items/pixelated-shader/components/pixelated-shader";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const code = `
  import React from 'react'
  import PixelatedShader from "@/components/ui/qr-code";
  
  export default function Page() {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <PixelatedShader src="/test.jpg" />
      </div>
    )
  }
  
   `;

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/pixelated-shader.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/pixelated-shader.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/pixelated-shader.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/pixelated-shader.json",
  } as const;

  const propsData = [
    {
      prop: "src",
      type: "string",
      default: "undefined",
      description: "URL or path to the image to display (required).",
    },
    {
      prop: "alt",
      type: "string",
      default: '""',
      description: "Accessible alt text for the image.",
    },
    {
      prop: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the container.",
    },
    {
      prop: "speed",
      type: "number",
      default: "1.5",
      description: "Responsiveness multiplier — higher = snappier movement.",
    },
    {
      prop: "intensity",
      type: "number",
      default: "1.2",
      description: "Strength of distortion/chromatic aberration.",
    },
    {
      prop: "decay",
      type: "number",
      default: "0.08",
      description:
        "Per-frame decay applied to the aberration (larger = quicker fade).",
    },
    {
      prop: "width",
      type: "string | number",
      default: '"100%"',
      description: "Container width (CSS value, e.g. '500px' or 100).",
    },
    {
      prop: "height",
      type: "string | number",
      default: '"auto"',
      description:
        "Container height (CSS). If 'auto', a minHeight of 200px is applied.",
    },
    {
      prop: "objectFit",
      type: "'cover' | 'contain'",
      default: "'cover'",
      description:
        "How the image fits the container: 'cover' fills, 'contain' shows whole image.",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <Heading>Pixelated Shader</Heading>
      <Para className="mt-4">Pixelated Shader with threejs</Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview">
          <div>
            <PixedlatedShader src="/test.jpg" />
          </div>
        </PreviewContent>

        <PreviewContent value="code">
          <div className="h-full w-full overflow-auto p-4">
            <CodeBlock
              filename="qr-code-button.tsx"
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

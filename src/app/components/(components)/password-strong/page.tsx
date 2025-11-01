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
import Password from "@/registry/new-york/items/password-strong/components/password";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const code = `"use client";

import React, { useState } from 'react'
import Password from "@/components/ui/password";
  
export default function Page() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Password 
        value={password} 
        onChange={setPassword}
        onStrengthChange={setStrength}
      />
    </div>
  )
}`;

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/password-strong.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/password-strong.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/password-strong.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/password-strong.json",
  } as const;

  const propsData = [
    {
      prop: "value",
      type: "string",
      default: "undefined",
      description:
        "Controlled password value. When provided, component is controlled and internal state is ignored.",
    },
    {
      prop: "onChange",
      type: "(password: string) => void",
      default: "undefined",
      description:
        "Called when input changes. For controlled usage, update parent state here. For uncontrolled usage, omit and the component manages its own value.",
    },
    {
      prop: "onStrengthChange",
      type: "(score: 0|1|2|3|4|5) => void",
      default: "undefined",
      description:
        "Notified whenever strength score changes. Score is number of satisfied requirements (0–5). 5 = all requirements met (very strong).",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <Heading>Password Strong</Heading>
      <Para className="mt-4">
        Beautiful Password strength measuring component with glowing animated
        dotted background
      </Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview">
          <Password />
        </PreviewContent>

        <PreviewContent value="code">
          <div className="h-full w-full overflow-auto p-4">
            <CodeBlock filename="page.tsx" language="tsx" code={code} />
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

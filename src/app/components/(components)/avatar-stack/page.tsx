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
import { AvatarStack } from "@/registry/new-york/items/avatar-stack/avatar-stack";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const code = `"use client";

import { AvatarStack } from "@/components/completed/avatar-stack";

export default function AvatarStackDemo() {
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
      name: "Maxime Heckel",
      image: "https://github.com/MaximeHeckel.png",
    },
    {
      name: "Ayush Deshmukh",
      image: "https://github.com/Deshmukh-Ayush.png",
    },
  ];
return (
  <div className="flex min-havatar-stacks-center justify-center">
    <AvatarStack
      items={usersData}
      title="Contributors"
      subtitle="4 Active Members"
    />
  </div>
  );
}

  
   `;

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/avatar-stack.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/avatar-stack.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/avatar-stack.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/avatar-stack.json",
  } as const;

  const propsData = [
    {
      prop: "items",
      type: "Array<{ name: string; image: string }>",
      default: "[]",
      description:
        "Array of avatar items to display. Each item should have `name` and `image`.",
    },
    {
      prop: "title",
      type: "string",
      default: "undefined",
      description: "Main title text shown below the avatar stack.",
    },
    {
      prop: "subtitle",
      type: "string",
      default: "undefined",
      description: "Smaller subtitle text shown under the title.",
    },
    {
      prop: "className",
      type: "string",
      default: "''",
      description:
        "Additional CSS classes applied to the avatar stack wrapper.",
    },
  ];

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
      name: "Maxime Heckel",
      image: "https://github.com/MaximeHeckel.png",
    },
    {
      name: "Ayush Deshmukh",
      image: "https://github.com/Deshmukh-Ayush.png",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <Heading>Avatar Stack</Heading>
      <Para className="mt-4">Avatar stack motion interaction</Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview">
          <AvatarStack
            items={usersData}
            title="Contributors"
            subtitle="4 Active Members"
          />
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

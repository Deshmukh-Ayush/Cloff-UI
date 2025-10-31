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
import { CodeBlock } from "@/components/ui/code-block";
import { Step, Steps } from "@/components/ui/steps";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"npm" | "yarn" | "pnpm" | "bun">(
    "bun",
  );
  const [copied, setCopied] = useState(false);

  const code = `
   <div className="text-center">
            <button className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600">
              Interactive Button
            </button>
          </div> `;

  const commands = {
    npm: "npx next-forge@latest init",
    yarn: "yarn dlx next-forge@latest init",
    pnpm: "pnpm dlx next-forge@latest init",
    bun: "bunx next-forge@latest init",
  } as const;

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
            <button className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600">
              Interactive Button
            </button>
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
              <Snippet.Content>{commands[activeTab]}</Snippet.Content>
              <Snippet.Action onCopy={handleCopy} copied={copied} />
            </Snippet>
          </Step>
        </Steps>
      </div>
    </div>
  );
}

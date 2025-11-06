"use client";

import { Snippet } from "@/components/docs-ui/code-snippet";
import { CodeBlock } from "@/components/ui/code-block";
import { Step, Steps } from "@/components/ui/steps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCode } from "@/registry/new-york/items/qr-code/components/qr-code-button";
import React, { useState } from "react";

export const QRCodeDemo = () => {
  return (
    <div className="text-center">
      <QRCode src="/qr-cloff-ui.png" url="www.cloffstudio.com" />
    </div>
  );
};

// Installation

export const QRCodeInstallation = () => {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);
  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/qr-code-button.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/qr-code-button.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/qr-code-button.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/qr-code-button.json",
  } as const;
  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installDeps = `
    npm i motion @tabler/icons-react
  `;
  const installCode = `
    to be continued
  `;
  return (
    <div>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">ClI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli">
          <Steps>
            <Step title="Run the following command">
              <Snippet>
                <Snippet.Header>
                  <Snippet.Tabs>
                    {(
                      Object.keys(commands) as Array<keyof typeof commands>
                    ).map((pm) => (
                      <Snippet.Tab
                        key={pm}
                        active={activeTab === pm}
                        onClick={() => setActiveTab(pm)}
                      >
                        {pm}
                      </Snippet.Tab>
                    ))}
                  </Snippet.Tabs>
                  <Snippet.Action onCopy={handleCopy} copied={copied} />
                </Snippet.Header>

                <Snippet.Content>{commands[activeTab]}</Snippet.Content>
              </Snippet>
            </Step>
          </Steps>
        </TabsContent>
        <TabsContent value="manual">
          <Steps>
            <Step title="Install the following dependecies">
              <CodeBlock filename="terminal" language="bash" code="" />
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
import { QRCodeDemo, QRCodeInstallation } from "./_example";

export default function Page() {
  const code = `
  import { QRCode } from "@/registry/new-york/items/qr-code/components/qr-code-button";
  import React from "react";
  
  export const QRCodeDemo = () => {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <QRCode src="/qr-cloff-ui.png" url="www.cloffstudio.com" />
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

        <PreviewContent value="preview">
          <QRCodeDemo />
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

        <QRCodeInstallation />

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

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
import { OneLiner } from "@/components/docs-ui/one-liner";
import {
  CalendarWidget,
  type Guest,
} from "@/registry/new-york/items/calendar-widget/components/calendar-widget";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const code = `"use client";
import { CalendarWidget, type Guest } from "@/components/ui/calendar-widget";

export const CalendarWidgetDemo = () => {
  return (
    <CalendarWidget
            title="Design Sync"
            timeLabel="In 15 mins"
            timeRange="01:00 PM - 2:30 PM"
            guests={guests}
    />
  )
}`;

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add https://ui.cloffstudio.com/r/calendar-widget.json",
    npm: "npx shadcn@latest add https://ui.cloffstudio.com/r/calendar-widget.json",
    yarn: "yarn shadcn@latest add https://ui.cloffstudio.com/r/calendar-widget.json",
    bun: "bunx --bun shadcn@latest add https://ui.cloffstudio.com/r/calendar-widget.json",
  } as const;

  const propsData = [
    {
      prop: "title",
      type: "string",
      default: "-",
      description: "Event title displayed in the widget (required).",
    },
    {
      prop: "timeLabel",
      type: "string",
      default: "-",
      description: "Short label such as 'In 15 mins' (required).",
    },
    {
      prop: "timeRange",
      type: "string",
      default: "-",
      description:
        "Human readable time range like '01:00 PM - 2:30 PM' (required).",
    },
    {
      prop: "guests",
      type: "Guest[]",
      default: "[]",
      description:
        "Array of guest objects shown when the widget is expanded (see Guest shape below).",
    },
    {
      prop: "layoutId",
      type: "string",
      default: '"container"',
      description:
        "Optional layoutId used for motion layout animations (defaults to 'container').",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Optional additional className applied to the root element.",
    },

    // Guest shape
    {
      prop: "Guest",
      type: "{ id: number | string; name: string; image: string; timezone?: string }",
      default: "-",
      description: "Shape of a guest object used inside `guests`.",
    },
    {
      prop: "Guest.id",
      type: "number | string",
      default: "-",
      description: "Unique identifier for the guest (number or string).",
    },
    {
      prop: "Guest.name",
      type: "string",
      default: "-",
      description: "Guest display name.",
    },
    {
      prop: "Guest.image",
      type: "string",
      default: "-",
      description: "URL to the guest's avatar image.",
    },
    {
      prop: "Guest.timezone",
      type: "string (optional)",
      default: "undefined",
      description:
        "Optional timezone string to display next to the guest's name.",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const guests: Guest[] = [
    {
      id: 1,
      name: "Ayush",
      image: "https://github.com/Deshmukh-Ayush.png",
      timezone: "GMT-2",
    },
    {
      id: 2,
      name: "Shadcn",
      image: "https://github.com/shadcn.png",
      timezone: "GMT-12",
    },
    {
      id: 3,
      name: "Evil Rabbit",
      image: "https://github.com/evilrabbit.png",
      timezone: "GMT+5:30",
    },
  ];
  return (
    <div>
      <Heading>Calendar Widget</Heading>
      <Para className="mt-4">Multipurpose widget for your app.</Para>

      <PreviewRoot className="mt-10" defaultTab="preview">
        <PreviewTabs>
          <div>
            <PreviewTab value="preview">Preview</PreviewTab>
            <PreviewTab value="code">Code</PreviewTab>
          </div>
        </PreviewTabs>

        <PreviewContent value="preview">
          <CalendarWidget
            title="Design Sync"
            timeLabel="In 15 mins"
            timeRange="01:00 PM - 2:30 PM"
            guests={guests}
          />
        </PreviewContent>

        <PreviewContent value="code">
          <div className="h-full w-full overflow-auto p-4">
            <CodeBlock filename="meeting-wid.tsx" language="tsx" code={code} />
          </div>
        </PreviewContent>
      </PreviewRoot>
      <OneLiner href="https://x.com/mrncst">Inspired by Mariana</OneLiner>

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

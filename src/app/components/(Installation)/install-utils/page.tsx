import { Heading, SubHeading } from "@/components/docs-ui/heading";
import { Para } from "@/components/docs-ui/para";
import { CodeBlock } from "@/components/ui/code-block";
import { Step, Steps } from "@/components/ui/steps";

export default function InstallUtils() {
  const code = `npx shadcn@latest init`;
  const code2 = `npm install motion`;
  return (
    <div>
      <Heading>Install Shadcn and Motion</Heading>
      <Para>
        You need to install shadcn and motion.dev (prev: framer motion), since
        all the Cloff UI is built on top of it.
      </Para>

      <SubHeading className="mt-10">Install Shadcn</SubHeading>
      <div>
        <Steps>
          <Step title="Initialize Project">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="bash" filename="terminal" code={code} />
            </div>
          </Step>
          <Step title="Install Motion.dev">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="bash" filename="terminal" code={code2} />
            </div>
          </Step>
        </Steps>
        <Para>Now you are good to go to the next step. 👍</Para>
      </div>
    </div>
  );
}

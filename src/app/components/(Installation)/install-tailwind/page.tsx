import { Heading, SubHeading } from "@/components/docs-ui/heading";
import { Para } from "@/components/docs-ui/para";
import { CodeBlock } from "@/components/ui/code-block";
import { Step, Steps } from "@/components/ui/steps";

export default function InstallTailwind() {
  const code = `npm install tailwindcss @tailwindcss/postcss postcss`;
  const code2 = `@import "tailwindcss"; \n
\n@theme inline {\n/* Configure your theme variables here */\n --font-display: "Inter", "sans-serif";\n--color-primary-500: oklch(0.84 0.18 117.33);\n--spacing: 0.25rem;\n}`;
  const code3 = `export default function Home() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}`;
  return (
    <div>
      <Heading>Install Tailwind CSS.</Heading>
      <Para className="mt-6">
        Note: Skip this part if you&apos;ve already configured it via the nextjs
        installation cli in the previous part.
      </Para>

      <SubHeading className="mt-10">Tailwind CSS v4 Installation</SubHeading>
      <div>
        <Steps>
          <Step title="Install Dependencier">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="bash" filename="bash" code={code} />
            </div>
          </Step>
          <Step title="Add this line to your app/globals.css file">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock
                language="bash"
                filename="globals.css"
                code={code2}
                highlightLines={[1]}
              />
            </div>
          </Step>
          <Step title="You should be able to use tailwind css classes now">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="tsx" filename="app/page.tsx" code={code3} />
            </div>
          </Step>
        </Steps>
        <Para>Now you are good to go to the next step. 👍</Para>
      </div>
    </div>
  );
}

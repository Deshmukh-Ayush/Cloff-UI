import { Heading } from "@/components/docs-ui/heading";
import { Para } from "@/components/docs-ui/para";
import { CodeBlock } from "@/components/ui/code-block";
import { Step, Steps } from "@/components/ui/steps";

export default function InstallationPage() {
  const code = `npx create-next-app@latest`;
  const code2 =
    "What is your project named? my-app \nWould you like to use TypeScript? No / Yes \nWould you like to use ESLint? No / Yes \nWould you like to use Tailwind CSS? No / Yes \nWould you like to use `src/` directory? No / Yes \nWould you like to use App Router? (recommended) No / Yes \nWould you like to customize the default import alias (@/*)? No / Yes \nWhat import alias would you like configured? @/*";
  const code3 = `cd my-app \nnpm run dev`;
  return (
    <div>
      <Heading>Install Nextjs</Heading>
      <Para className="mt-4">Install nextjs with the following cli.</Para>
      <div>
        <Steps>
          <Step title="Initialize Project">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="bash" filename="bash" code={code} />
            </div>
          </Step>
          <Step title="On Installation you'll see the following prompts">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="bash" filename="bash" code={code2} />
            </div>
          </Step>
          <Step title="Run it">
            <div className="mx-auto w-full max-w-3xl">
              <CodeBlock language="bash" filename="bash" code={code3} />
            </div>
          </Step>
        </Steps>
        <Para>Now you are good to go to the next step. 👍</Para>
      </div>
    </div>
  );
}

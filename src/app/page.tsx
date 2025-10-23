import { Container } from "@/components/ui/container";
import { Hero } from "@/components/landing-ui/home/hero";
import { InspiredBy } from "@/components/landing-ui/home/inspired-by";
import { PoweredBy } from "@/components/landing-ui/home/powered-by";
import { Showcase } from "@/components/landing-ui/home/showcase";

export default function Home() {
  return (
    <div className="flex items-center justify-center dark:bg-black">
      <Container className="dark:bg- min-h-screen w-full overflow-hidden border-x border-neutral-300 dark:border-neutral-700">
        <Hero />
        <Showcase />
        <PoweredBy />
        <InspiredBy />
      </Container>
    </div>
  );
}

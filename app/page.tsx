import Hero from "@/components/sections/Hero";
import ValueProp from "@/components/sections/ValueProp";
import Services from "@/components/sections/Services";
import Showcase from "@/components/sections/Showcase";
import Manifesto from "@/components/sections/Manifesto";
import Stats from "@/components/sections/Stats";
import Cta from "@/components/sections/Cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <Services />
      <Showcase />
      <Manifesto />
      <Stats />
      <Cta />
    </>
  );
}

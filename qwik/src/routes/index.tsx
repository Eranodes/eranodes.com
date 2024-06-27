import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero from "../components/hero/hero";
import Testimonials from "../components/testimonials/testimonials";
import SecondaryFooter from "../components/secondary footer/secondary-footer";
export default component$(() => {
  return (
    <>
      <Hero />
      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-aqua"></div>
      <div  id="reviews" class="container"></div>
      <Testimonials/>
      <SecondaryFooter/>
    </>
  );
});

export const head: DocumentHead = {
  title: "",
  meta: [
    {
      name: "description",
      content: "Welcome to EraNodes 24x7 Freemium Hosting!",
    },
  ],
};

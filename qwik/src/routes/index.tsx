import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Statistics from '../components/statistics/statistics';
import Hero from "../components/hero/hero";
import Plans from "../components/plans/plans";
import Testimonials from "../components/testimonials/testimonials";
import Space from "../components/space/space"
import SecondaryFooter from "../components/secondary footer/secondary-footer";
export default component$(() => {
  return (
    <>
      <Hero />
      <Statistics />
      <div id="plans" class="container"></div>
      <Plans />
      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-aqua"></div>
      <div  id="reviews" class="container"></div>
      <Testimonials/>
      <Space/>
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


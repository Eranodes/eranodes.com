import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div id="plans" class="container"></div>
      <div role="presentation" class="ellipsis"></div>
      Explore all our plans
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


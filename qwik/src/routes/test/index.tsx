import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import VPSCalculator from "../../components/calculator/vps/vps"

export default component$(() => {
  return (
    <>
      <div id="plans" class="container"></div>
      <div role="presentation" class="ellipsis"></div>
      <VPSCalculator/>
    </>
  );
});

export const head: DocumentHead = {
  title: "",
  meta: [
    {
      name: "description",
      content: "Custom VPS Test Page",
    },
  ],
};


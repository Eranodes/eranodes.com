import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import SecondaryFooter from "../components/secondary footer/secondary-footer";
import Space from "../components/space/space"
export default component$(() => {
  return (
    <>
    <div class="container container-center">
      <div role="presentation" class="ellipsis ellipsis-404"></div>
      <Space/>
      <Space/>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist!</p>
      <Space/>
      <Space/>
    </div>
    <SecondaryFooter/>
    </>
  );
});

export const head: DocumentHead = {
  title: "404 Not Found",
  meta: [
    {
      name: "description",
      content: "This page does not exist",
    },
  ],
};

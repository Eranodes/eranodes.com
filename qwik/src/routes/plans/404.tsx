import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Space from "../../components/space/space"
export default component$(() => {
  return (
    <>
    <div class="container container-center">
      <div role="presentation" class="ellipsis ellipsis-404"></div>
      <Space/>
      <Space/>
      <h2>404 - Not Found</h2>
      <h3>The plan you are looking for does not exist!</h3>
      <Space/>
      <Space/>
    </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "404 Not Found",
  meta: [
    {
      name: "description",
      content: "This plan does not exist",
    },
  ],
};

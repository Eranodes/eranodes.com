/* eslint-disable qwik/jsx-a */
import { component$ } from "@builder.io/qwik";
import footerstyles from "./footer.module.css";

export default component$(() => {

  return (
    <footer>
      <a class={footerstyles.anchor}><span>&copy; 2024 EraNodes. All rights reserved.</span></a>
    </footer>
  );
});


import Eranodes from '~/media/eranodes.png?jsx';
import { component$ } from "@builder.io/qwik";
import headerstyles from "./header.module.css";
import Navigation from "./nav/nav"

export default component$(() => {
  return (
    <header class={headerstyles.header}>
      <div class={[headerstyles.wrapper].join(" ")}>
        <div class={headerstyles.branding}>
          <div class={headerstyles.logo}>
              <Eranodes alt="EraNodes Icon"/>
          </div>
          <p class={headerstyles.heading}>EraNodes Inc</p>
        </div>
        <Navigation/>
      </div>
    </header>
  );
});

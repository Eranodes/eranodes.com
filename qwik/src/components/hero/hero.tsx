import { component$ } from "@builder.io/qwik";
import {BsDiscord, BsStarFill, BsListUl} from "@qwikest/icons/bootstrap"
import { Link } from '@builder.io/qwik-city';
import herostyles from "./hero.module.css";
import { StringSwitcher } from "../typewriter/typewriter";

export default component$(() => {
  return (
    <div class={[herostyles.hero]}>
      <h1>
        <span class="highlight">Welcome </span> to <span class="highlight">EraNodes </span>
        <br /><span class="highlight">Hosting </span>Services
      </h1>
        <StringSwitcher />
      <p>24/7 Freemium Hosting!</p>
      <div class={herostyles["button-group"]}>
        {/*Plans Button*/}
        <Link href="/#plans" class="button">
          <BsListUl/>  Plans
        </Link>
        {/*Reviews Button*/}
        <Link href="/#reviews" class="button">
          <BsStarFill/>  Reviews
        </Link>
        {/*Discord Button*/}
        <a
          href="https://discord.gg/eranodes"
          target="_blank"
          class="button button-discord"
        >
          <BsDiscord/>  Join the community on discord!
        </a>
      </div>
    </div>
  );
});

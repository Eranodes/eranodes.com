import { component$ } from "@builder.io/qwik";
import {BsDiscord, BsStarFill, BsHddRack, BsHddNetwork, BsPersonWorkspace} from "@qwikest/icons/bootstrap"
import { Link } from '@builder.io/qwik-city';
import herostyles from "./hero.module.css";
import { StringSwitcher } from "../typewriter/typewriter";

export default component$(() => {
  return (
    <div class="container container-center">
      <div class={[herostyles.hero]}>
        <h1>
          <span class="highlight">Welcome </span> to <span class="highlight">EraNodes </span>
          <br /><span class="highlight">Hosting </span>Services
        </h1>
          <StringSwitcher />
        <p>24/7 Freemium Hosting!</p>
        <div class={herostyles["button-group"]}>

          {/*Game Hosting Button*/}
          <a href="/plans/hosting/game/" class={`${herostyles.button} ${herostyles.gameHostingButton} button`}>
            <BsHddNetwork/>  Game Hosting
          </a>

          {/*VPS Hosting Button*/}
          <a href="/plans/hosting/vps/" class={`${herostyles.button} ${herostyles.serverHostingButton} button`}>
            <BsHddRack/>  VPS Hosting
          </a>

          {/*Discord Button*/}
          <a
            href="https://discord.gg/eranodes"
            target="_blank"
            class={`${herostyles.button} ${herostyles.discordButton} button button-discord`}
          >
            <BsDiscord/>  Discord
          </a>

          {/*Reviews Button*/}
          <Link href="/#reviews" class={`${herostyles.button} ${herostyles.reviewsButton} button`}>
            <BsStarFill/>  Reviews
          </Link>

          {/*Development Services Button*/}
          <a href="/plans/dev/" class={`${herostyles.button} ${herostyles.developmentServicesButton} button`}>
            <BsPersonWorkspace/>  Development Services
          </a>

        </div>
      </div>
    </div>
  );
});

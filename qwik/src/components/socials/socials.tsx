import { component$ } from "@builder.io/qwik";
import socialstyles from "./socials.module.css";
import { BsDiscord, BsGithub, BsStarFill } from "@qwikest/icons/bootstrap";

export default component$(() => {
  return (
    <div class={socialstyles.socialIcons}>
      <a href="https://discord.gg/eranodes" class={socialstyles.iconLink} title="Join us on Discord!" target="_blank">
        <BsDiscord class={socialstyles.icon} />
      </a>

      <a href="https://github.com/Eranodes" class={socialstyles.iconLink} title="Develop with us on Github" target="_blank">
        <BsGithub class={socialstyles.icon} />
      </a>

      <a href="https://www.trustpilot.com/review/eranodes.com" class={socialstyles.iconLink} title="Rate us on Trustpilot" target="_blank">
        <BsStarFill class={socialstyles.icon} />
      </a>
    </div>
  );
});

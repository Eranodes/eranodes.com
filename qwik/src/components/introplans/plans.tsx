import { component$ } from "@builder.io/qwik";
import MinecraftPlans from "./mcplans/mcplans"
import VPSPlans from "./vpsplans/vpsplans";
import Space from "../space/space"
import planstyles from "./planstyles.module.css";

export default component$(() => {
  return (
  <>
      <p class={planstyles.mainheading}>Plans</p>
      <VPSPlans/>
      <Space/>
      <MinecraftPlans/>
  </>
  );
});

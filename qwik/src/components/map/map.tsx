import { component$ } from "@builder.io/qwik";
import mapstyles from "./map.module.css";

export default component$(() => {
  return (
    <div class={[mapstyles.mapContainer]}>
      <iframe src="https://www.google.com/maps/d/embed?mid=1qy14SdHIGuQq_nPJQnlyHY5wecR6OoM&ehbc=2E312F" width="100%" height="400"></iframe>
    </div>
  );
});

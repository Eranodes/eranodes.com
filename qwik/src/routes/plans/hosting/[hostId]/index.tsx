import { component$ } from '@builder.io/qwik';
import HostingPlans from "../../../../components/plans/hostingplans/dynamic";

export default component$(() => {
  return (
    <>
      <div class="sticky ellipsis ellipsis-red"></div>
      <HostingPlans/>
      <div class="ellipsis ellipsis-purple"></div>
    </>
  );
});
import { component$ } from '@builder.io/qwik';
import HostingPlans from "../../../components/plans/hostingplans/hostingplans";
import Space from "../../../components/space/space";

export default component$(() => {
  return (
    <>
      <div class="sticky ellipsis ellipsis-red"></div>
      <h1>Explore our hosting services</h1>
      <Space/>
      <HostingPlans/>
      <div class="ellipsis ellipsis-purple"></div>
    </>
  );
});
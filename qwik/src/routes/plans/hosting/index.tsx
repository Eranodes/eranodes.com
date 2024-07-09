// routes/products/index.tsx
import { component$ } from '@builder.io/qwik';
import HostingPlans from "../../../components/plans/hostingplans/hostingplans"
export default component$(() => {
  return (
    <>
      <h1>Explore our hosting services</h1>
      <HostingPlans/>
    </>
  );
});
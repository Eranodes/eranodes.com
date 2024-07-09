import { component$ } from "@builder.io/qwik";
import planstyles from "../planstyles.module.css";
import plansData from '../../../data/introplans.json';

// Define an interface for the plan object
interface Plan {
  name: string;
  color: string;
  price: number;
  nodes: string[];
  specs: {
    ram_gb: number;
    cpu_percentage: number;
    storage_gb: number;
    cpu_name: string;
    backups: number;
    databases: number;
    uplink: number;
  };
}

// Use the Plan interface as the type for the plan parameter
const PlanItem = ({ plan }: { plan: Plan }) => {
  // Define a style object to hold the dynamic CSS properties
  const nameStyle = {
    '--plan-color': plan.color // Set the value of --plan-color to the plan's color
  };

  return (
    <li class={planstyles.card}>
      <div>
        <p class={planstyles.name} style={nameStyle}>{plan.name}</p>
          <p class={planstyles.countries}>{plan.nodes.join(', ')}</p>
            <ul class={planstyles.resources}>
              <li>RAM: {plan.specs.ram_gb} GB</li>
              <li>CPU: {plan.specs.cpu_percentage}%</li>
              <li>Storage: {plan.specs.storage_gb} GB</li>
              <li>{plan.specs.cpu_name}</li>
              <li>Backups: {plan.specs.backups}</li>
              <li>Databases: {plan.specs.databases}</li>
              <li>Uplink: {plan.specs.uplink} Gbit</li>
            </ul>
          <p class={planstyles.price}>${plan.price}</p>
      </div>
    </li>
  );
};

export default component$(() => {
  // Filter Minecraft plans from plansData
  const minecraftPlans = plansData.minecraft_plans;

  return (
    <div class={[planstyles.wrapper].join(" ")}>
      <p class={planstyles.heading}>Minecraft Plans</p>
      <div class={planstyles.plans}>
        {minecraftPlans.map((plan: Plan, index) => (
          <PlanItem key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import planstyles from "../planstyles.module.css";
import plansData from '../../../data/plans.json';

// Define an interface for the plan object
interface Plan {
  name: string;
  color: string;
  price: number;
  nodes: string[];
  specs: {
    ram_gb: number;
    cpu_cores: number;
    cpu_name: string;
    storage_gb: number;
    bandwidth_tb: number;
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
              <li>{plan.specs.ram_gb} GB DDR4 RAM</li>
              <li>{plan.specs.cpu_cores} vCore(s)</li>
              <li>{plan.specs.storage_gb} GB NVMe SSD Storage</li>
              <li>{plan.specs.cpu_name}</li>
              <li>{plan.specs.bandwidth_tb} TB Bandwidth (1Gbps)</li>
              <li>Automated Daily Backups</li>
              <li>Advanced DDOS Protection</li>
            </ul>
          <p class={planstyles.price}>${plan.price}</p>
      </div>
    </li>
  );
};

export default component$(() => {
  // Filter VPS plans from plansData
  const vpsPlans = plansData.vps_plans;

  return (
    <div class={[planstyles.wrapper].join(" ")}>
            <p class={planstyles.heading}>VPS Plans</p>
      <div class={planstyles.plans}>
        {vpsPlans.map((plan: Plan, index) => (
          <PlanItem key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
});

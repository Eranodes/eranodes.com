/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import plansData from '../../../../data/plans.json';
import hostingPlanStyles from './hostingplans.module.css';

interface Plan {
  name: string;
  description: string;
  locations: string[];
  ram: string;
  vCores: number;
  storage: string;
  processor: string;
  bandwidth: string;
  backups: boolean;
  ddos_protection: Boolean;
  price: string;
  link?: string;
}

interface PlansData {
  hosting_plans: {
    [key: string]: Plan[];
  };
}

export default component$(() => {
  const loc = useLocation();
  const hostId = loc.params.hostId;
  const plans = plansData as PlansData;

  let hostingPlans: Plan[] = [];

  switch (hostId) {
    case 'website':
      hostingPlans = plans.hosting_plans.Website || [];
      break;
    case 'ai':
      hostingPlans = plans.hosting_plans.AI || [];
      break;
    case 'game':
      hostingPlans = plans.hosting_plans.Game || [];
      break;
    case 'vps':
      hostingPlans = plans.hosting_plans.VPS || [];
      break;
    case 'vds':
      hostingPlans = plans.hosting_plans.VDS || [];
      break;
    case 'bare-metal':
      hostingPlans = plans.hosting_plans['Bare Metal'] || [];
      break;
    default:
      hostingPlans = [];
  }

  return (
    <div class={hostingPlanStyles.container}>
      <p class={hostingPlanStyles.title}>Hosting plans for {hostId}</p>
      {hostingPlans.length > 0 ? (
        <ul class={hostingPlanStyles.wrapper}>
          {hostingPlans.map((plan) => (
            <li key={plan.name} class={hostingPlanStyles.planItem}>
              <p class={hostingPlanStyles.name}>{plan.name}</p>
              <p class={hostingPlanStyles.description}>{plan.description}</p>
              <p class={hostingPlanStyles.locations}>{plan.locations.join(", ")}</p>
              <div class={hostingPlanStyles.specsBox}>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.ram}`}>RAM: {plan.ram}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.vcores}`}>vCores: {plan.vCores}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.storage}`}>Storage: {plan.storage}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.processor}`}>Processor: {plan.processor}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.bandwidth}`}>Bandwidth: {plan.bandwidth}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.backups}`}>Backups: {plan.backups ? "Yes" : "No"}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.ddos}`}>DDoS Protection: {plan.ddos_protection ? "Yes" : "No"}</p>
              </div>
              <p class={hostingPlanStyles.price}>Price: {plan.price}</p>
              {plan.link && <a href={plan.link} target="_blank" rel="noopener noreferrer" class={hostingPlanStyles.purchase}>Purchase</a>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hosting plans available for {hostId}.</p>
      )}
    </div>
  );
});

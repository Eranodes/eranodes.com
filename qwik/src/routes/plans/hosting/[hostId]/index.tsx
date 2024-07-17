/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import plansData from '../../../../data/plans.json';
import { BsGeoAltFill, BsMemory, BsCpu, BsNvme, BsPc, BsRouter, BsArchive, BsShieldShaded } from '@qwikest/icons/bootstrap';
import hostingPlanStyles from '../../../../components/plans/plans.module.css';

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
  ddos_protection: boolean;
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

  let formattedHostId: string;

  switch (hostId) {
    case 'website':
      formattedHostId = 'Website';
      hostingPlans = plans.hosting_plans.Website || [];
      break;
    case 'ai':
      formattedHostId = 'AI';
      hostingPlans = plans.hosting_plans.AI || [];
      break;
    case 'game':
      formattedHostId = 'Game';
      hostingPlans = plans.hosting_plans.Game || [];
      break;
    case 'vps':
      formattedHostId = 'VPS';
      hostingPlans = plans.hosting_plans.VPS || [];
      break;
    case 'vds':
      formattedHostId = 'VDS';
      hostingPlans = plans.hosting_plans.VDS || [];
      break;
    case 'bare-metal':
      formattedHostId = 'Bare Metal';
      hostingPlans = plans.hosting_plans['Bare Metal'] || [];
      break;
    default:
      formattedHostId = hostId; // Use the original hostId if no specific formatting is defined
      hostingPlans = [];
  }

  return (
    <div class="container container-center">
      <p class={hostingPlanStyles.title}>{formattedHostId} Hosting Plans</p>
      {hostingPlans.length > 0 ? (
        <ul class={hostingPlanStyles.plans}>
          {hostingPlans.map((plan) => (
            <li key={plan.name} class={hostingPlanStyles.card}>
              <p class={hostingPlanStyles.name}>{plan.name}</p>
              <p class={hostingPlanStyles.description}>{plan.description}</p>
              <p class={hostingPlanStyles.locations}><BsGeoAltFill /> {plan.locations.join(", ")}</p>
              <div class={hostingPlanStyles.specsBox}>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.ram}`}><BsMemory /> RAM: {plan.ram}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.vcores}`}><BsCpu /> vCores: {plan.vCores}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.storage}`}><BsNvme /> Storage: {plan.storage}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.processor}`}><BsPc /> Processor: {plan.processor}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.bandwidth}`}><BsRouter /> Bandwidth: {plan.bandwidth}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.backups}`}><BsArchive /> Backups: {plan.backups ? "Yes" : "No"}</p>
                <p class={`${hostingPlanStyles.specs} ${hostingPlanStyles.ddos}`}><BsShieldShaded /> DDoS Protection: {plan.ddos_protection ? "Yes" : "No"}</p>
              </div>
              {plan.link && <a href={plan.link} target="_blank" rel="noopener noreferrer" class={hostingPlanStyles.price}>{plan.price}</a>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hosting plans available for {formattedHostId}.</p>
      )}
    </div>
  );
});

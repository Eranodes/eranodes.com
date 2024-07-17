import { component$ } from '@builder.io/qwik';
import { BsGeoAltFill, BsMemory, BsCpu, BsNvme, BsPc, BsRouter, BsArchive, BsShieldShaded } from '@qwikest/icons/bootstrap';
import hostingPlans from '../../../data/plans.json';

import hostingStyles from "../plans.module.css";

const HostingCard = ({ plan }: { plan: any }) => (
  <div class={hostingStyles.card}>
    <h3 class={hostingStyles.name}>{plan.name}</h3>
    <p class={hostingStyles.description}><strong>{plan.description}</strong></p>
    <p class={hostingStyles.location}><strong><BsGeoAltFill/>{plan.locations.join(', ')}</strong></p>
    <div class={hostingStyles.specsbox}>      
      <p class={`${hostingStyles.specs} ${hostingStyles.ram}`}><BsMemory/> RAM: <strong>{plan.ram}</strong></p>
      <p class={`${hostingStyles.specs} ${hostingStyles.vcores}`}><BsCpu/> CPU: <strong>{plan.vCores}</strong></p>
      <p class={`${hostingStyles.specs} ${hostingStyles.storage}`}><BsNvme/> Disk: <strong>{plan.storage}</strong></p>
      <p class={`${hostingStyles.specs} ${hostingStyles.processor}`}><BsPc/> {plan.processor}</p>
      <p class={`${hostingStyles.specs} ${hostingStyles.bandwidth}`}><BsRouter/> Bandwidth: <strong> {plan.bandwidth}</strong></p>
      <p class={`${hostingStyles.specs} ${hostingStyles.backups}`}><BsArchive/> Backups: <strong>{plan.backups ? 'Yes' : 'No'}</strong></p>
      <p class={`${hostingStyles.specs} ${hostingStyles.ddos}`}><BsShieldShaded/> DDoS Protection:<strong>{plan.ddos_protection ? 'Yes' : 'No'}</strong></p>
    </div>
    <a class={hostingStyles.price} href={plan.link} target="_blank"><strong>{plan.price}</strong></a>
  </div>
);

export const HostingPlans = component$(() => {
  return (
    <div class={hostingStyles.section}>
      {Object.entries(hostingPlans.hosting_plans).map(([category, plans]) => (
        <div key={category} class={hostingStyles.category}>
          <h2>{category.charAt(0) + category.slice(1)} Plans</h2>
          <div class={hostingStyles.plans}>
            {plans.map((plan: any) => (
              <HostingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default HostingPlans;
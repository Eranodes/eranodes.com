import { component$ } from '@builder.io/qwik';
import { BsGeoAltFill, BsMemory, BsCpu, BsNvme, BsPc, BsRouter, BsArchive, BsShieldShaded } from '@qwikest/icons/bootstrap';
import { useLocation } from '@builder.io/qwik-city';
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
    const loc = useLocation();
    const lastPathSegment = loc.url.pathname.split('/').filter(segment => segment !== '').pop();
  
    let filteredPlans: any[] = [];
    switch (lastPathSegment && lastPathSegment.toLowerCase()) {
        case 'website':
            filteredPlans = hostingPlans.hosting_plans.Website;
            break;
        case 'ai':
            filteredPlans = hostingPlans.hosting_plans.AI;
            break;
        case 'vps':
            filteredPlans = hostingPlans.hosting_plans.VPS;
            break;
        case 'vds':
            filteredPlans = hostingPlans.hosting_plans.VDS;
            break;
        case 'game':
            filteredPlans = hostingPlans.hosting_plans.Game;
            break;
        case 'bare-metal':
            filteredPlans = hostingPlans.hosting_plans['Bare Metal'];
            break;
        default:
            // Default to all plans if no specific category matches
            filteredPlans = [];
            break;
    }
  
    return (
      <div class={hostingStyles.section}>
        {filteredPlans.length > 0 && (
          <div>
            <div class={hostingStyles.plans}>
              {filteredPlans.map((plan: any) => (
                <HostingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  });
  
export default HostingPlans;
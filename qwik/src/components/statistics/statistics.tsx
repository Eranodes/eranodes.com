/* eslint-disable qwik/loader-location */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { CircleDiagram } from '../circlediagram/circlediagram';
import styles from './statistics.module.css';

export interface pteroServerStats {
  pterodactylServerCount: number;
  pterodactylTotalRam: string;
  discordMemberCount: number;
}

// Fetch data from the API
const fetchDataFromAPI = async (): Promise<pteroServerStats | undefined> => {
  try {
    const response = await fetch('https://statsserverapi.eranodes.com/', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData as pteroServerStats;
  } catch (error) {
    console.error('Error fetching server stats:', error);
    return undefined;
  }
};

// Route loader to fetch server stats data
export const useServerStats = routeLoader$<pteroServerStats | undefined>(async () => {
  return await fetchDataFromAPI();
});



export default component$(() => {
  const serverStats = useServerStats();

  // Hide the component when the API is inaccessible
  if (!serverStats.value) {
    return null;
  }


  return (
    <div class={styles.section}>
      <p class={styles.heading}>Our progress so far..</p>
      <div class={styles.circleContainer}>
        <div class={styles.column}>
          <CircleDiagram 
            borderColor="red" 
            gradientStart="#ffffff"
            gradientEnd="#101117"
            opacity={1}
            gradientAngle='320deg'
            value={serverStats.value.pterodactylServerCount} 
            label="Servers Hosted"
          />
          <h3 class={styles.label}>Servers Hosted</h3>
        </div>
        <div class={styles.column}>
          <CircleDiagram 
            borderColor="yellow" 
            gradientStart="#ffffff"
            gradientEnd="#101117"
            opacity={0.6}
            gradientAngle='320deg'
            value={parseInt(serverStats.value.pterodactylTotalRam)} 
            label="Total RAM (GB)" 
          />
          <h3 class={styles.label}>Total Ram (GB)</h3>
        </div>
        <div class={styles.column}>
          <CircleDiagram 
            borderColor="green" 
            gradientStart="#ffffff"
            gradientEnd="#101117"
            opacity={0.3}
            gradientAngle='320deg'
            value={serverStats.value.discordMemberCount} 
            label="Discord Members" 
          />
          <h3 class={styles.label}>Discord Members</h3>
        </div>
      </div>
    </div>
  );
});

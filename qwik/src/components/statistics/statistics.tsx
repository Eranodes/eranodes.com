/* eslint-disable qwik/loader-location */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import styles from './statistics.module.css';

// Interface for the new data structure
interface ServerStats {
  pterodactylServerCount: number;
  pterodactylTotalRam: string;
  discordMemberCount: number;
}

// Fetch data from the new API endpoint
const fetchDataFromAPI = async (): Promise<ServerStats | undefined> => {
  try {
    const response = await fetch('https://statsserverapi.eranodes.com/', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData as ServerStats;
  } catch (error) {
    console.error('Error fetching server stats:', error);
    return undefined; // Ensure that we return undefined in case of error
  }
};

// Route loader to fetch server stats data
export const useServerStats = routeLoader$<ServerStats>(async () => {
  const data = await fetchDataFromAPI();
  if (data === undefined) {
    // Handle the error case by returning default values
    return {
      pterodactylServerCount: 0,
      pterodactylTotalRam: '0',
      discordMemberCount: 0,
    };
  }
  return data;
});

export default component$(() => {
  const serverStats = useServerStats();

  return (
    <div class="container container-center">
      <div class={styles.section}>
        <p class={styles.heading}>Server Statistics</p>
        <p class={styles.detail}>Pterodactyl Server Count: {serverStats.value.pterodactylServerCount}</p>
        <p class={styles.detail}>Pterodactyl Total RAM: {serverStats.value.pterodactylTotalRam} GB</p>
        <p class={styles.detail}>Discord Member Count: {serverStats.value.discordMemberCount}</p>
      </div>
    </div>
  );
});

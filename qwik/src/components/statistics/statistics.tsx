/* eslint-disable qwik/loader-location */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import styles from './statistics.module.css';

interface ServerStats {
  pterodactylServerCount: number;
  pterodactylTotalRam: string;
  discordMemberCount: number;
}

// Fetch data from the API
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
    return undefined;
  }
};

// Route loader to fetch server stats data
export const useServerStats = routeLoader$<ServerStats | undefined>(async () => {
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
      <p class={styles.detail}>Servers hosted : {serverStats.value.pterodactylServerCount}</p>
      <p class={styles.detail}>Total allocated RAM : {serverStats.value.pterodactylTotalRam} GB</p>
      <p class={styles.detail}>Discord members : {serverStats.value.discordMemberCount}</p>
    </div>
  );
});

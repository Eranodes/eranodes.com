import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const pterodactylApiKey = process.env.PTERODACTYL_API_KEY;
const apiUrl = 'https://panel.eranodes.com/api/application/servers';
const nodesApiUrl = 'https://panel.eranodes.com/api/application/nodes';
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordGuildId = process.env.DISCORD_GUILD_ID;

async function fetchpterodactylServerCount() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const numberOfServers = data.meta.pagination.total;
    return numberOfServers;
  } catch (error) {
    console.error('Error fetching server information:', error);
    throw error; // Re-throw the error to handle it where fetchpterodactylServerCount is called
  }
}

async function fetchpterodactylTotalRam() {
  try {
    const response = await fetch(nodesApiUrl, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const nodes = data.data;
    let totalAllocatedRamMB = 0;

    nodes.forEach(node => {
      totalAllocatedRamMB += node.attributes.allocated_resources.memory;
    });

    const totalAllocatedRamGB = totalAllocatedRamMB / 1024;
    return totalAllocatedRamGB.toFixed(2);
  } catch (error) {
    console.error('Error fetching node information:', error);
    throw error; // Re-throw the error to handle it where fetchpterodactylTotalRam is called
  }
}

async function fetchDiscordMemberCount() {
  try {
    const discordApiUrl = `https://discord.com/api/v10/guilds/${discordGuildId}?with_counts=true`;
    const response = await fetch(discordApiUrl, {
      headers: {
        Authorization: `Bot ${discordBotToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const memberCount = data.approximate_member_count || data.member_count; // use member_count as a fallback
    return memberCount;
  } catch (error) {
    console.error('Error fetching Discord server information:', error);
    throw error; // Re-throw the error to handle it where fetchDiscordMemberCount is called
  }
}

async function fetchDataAndSave() {
  try {
    const pterodactylServerCount = await fetchpterodactylServerCount();
    const pterodactylTotalRam = await fetchpterodactylTotalRam();
    const discordMemberCount = await fetchDiscordMemberCount();

    const jsonData = {
      timestamp: new Date().toISOString(),
      pterodactylServerCount,
      pterodactylTotalRam,
      discordMemberCount
    };

    const filename = 'data.json';
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error('Error fetching and saving data:', error);
  }
}

// Initial fetch and save
fetchDataAndSave();

// Schedule to fetch and save data every 10 minutes (600000 milliseconds)
setInterval(fetchDataAndSave, 600000);

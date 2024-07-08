import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';

dotenv.config();

const pterodactylApiKey = process.env.PTERODACTYL_API_KEY;
const apiUrl = 'https://panel.eranodes.com/api/application/servers';
const nodesApiUrl = 'https://panel.eranodes.com/api/application/nodes';
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordGuildId = process.env.DISCORD_GUILD_ID;
const serverPort = process.env.SERVER_PORT || 3000;

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
    throw error;
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
    throw error;
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
    const memberCount = data.approximate_member_count || data.member_count;
    return memberCount;
  } catch (error) {
    console.error('Error fetching Discord server information:', error);
    throw error;
  }
}

async function fetchData() {
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

    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchDataAndSave() {
  try {
    const jsonData = await fetchData();
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

// Create a server to serve the JSON data
http.createServer(async (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    try {
      const jsonData = await fetchData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error fetching data' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

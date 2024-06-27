import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = 'https://panel.eranodes.com/api/application/servers';
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordGuildId = process.env.DISCORD_GUILD_ID;

async function fetchServerData() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const numberOfServers = data.meta.pagination.total;
    console.log(`Number of servers running: ${numberOfServers}`);
  } catch (error) {
    console.error('Error fetching server information:', error);
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
    console.log(`Number of members in the Discord server: ${memberCount}`);
  } catch (error) {
    console.error('Error fetching Discord server information:', error);
  }
}

fetchServerData();
fetchDiscordMemberCount();

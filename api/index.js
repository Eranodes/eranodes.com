import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = 'https://panel.eranodes.com/api/application/servers';

fetch(apiUrl, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  const numberOfServers = data.meta.pagination.total;

  console.log(`Number of servers running: ${numberOfServers}`);
})
.catch(error => {
  console.error('Error fetching server information:', error);
});

import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

const run = await client.actor('getascraper/liepin-scraper').call({
  keyword: 'python',
  city: '010',
  maxItems: 50,
});

console.log(`Run finished: ${run.id}`);
console.log(`Dataset ID: ${run.defaultDatasetId}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(`Total items: ${items.length}`);
console.log(JSON.stringify(items[0], null, 2));

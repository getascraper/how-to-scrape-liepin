import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

Actor.main(async () => {
  const input = await Actor.getInput();
  const { keyword = 'python', city = '010', maxItems = 50 } = input;
  
  console.log(`Starting Liepin scraper for ${keyword} in city ${city}`);
  
  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: maxItems,
    async requestHandler({ page, request, pushData }) {
      const title = await page.title();
      console.log(`Processing: ${title}`);
      
      await pushData({
        url: request.url,
        title,
        scrapedAt: new Date().toISOString(),
      });
    },
  });
  
  await crawler.run([`https://www.liepin.com/zhaopin/?keyword=${encodeURIComponent(keyword)}&city=${city}`]);
  console.log('Liepin scraper finished');
});

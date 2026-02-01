/**
 * Job para sincronizar RSS feeds periodicamente
 * Execute com: node server/jobs/sync-rss.mjs
 */

import { syncRSSFeeds } from "../rss.feeds.ts";

async function runSync() {
  console.log("Iniciando sincronização de RSS feeds...");
  const result = await syncRSSFeeds();
  console.log("Sincronização concluída:");
  console.log(`- Dev.to: ${result.devTo} posts adicionados`);
  console.log(`- Hacker News: ${result.hackerNews} posts adicionados`);
  console.log(`- Total: ${result.total} posts adicionados`);
}

runSync().catch(console.error);

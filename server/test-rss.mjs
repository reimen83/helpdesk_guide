/**
 * Script para testar fetch de RSS feeds
 * Execute com: node server/test-rss.mjs
 */

async function testDevToFeed() {
  try {
    console.log("Testando Dev.to feed...");
    const response = await fetch("https://dev.to/feed");
    console.log("Status:", response.status);
    const xml = await response.text();
    console.log("Primeiros 500 caracteres:");
    console.log(xml.substring(0, 500));
    console.log("\n✓ Dev.to feed OK\n");
  } catch (error) {
    console.error("✗ Erro ao buscar Dev.to feed:", error.message);
  }
}

async function testHackerNewsFeed() {
  try {
    console.log("Testando Hacker News feed...");
    const response = await fetch("https://news.ycombinator.com/rss");
    console.log("Status:", response.status);
    const xml = await response.text();
    console.log("Primeiros 500 caracteres:");
    console.log(xml.substring(0, 500));
    console.log("\n✓ Hacker News feed OK\n");
  } catch (error) {
    console.error("✗ Erro ao buscar Hacker News feed:", error.message);
  }
}

async function main() {
  console.log("=== Testando RSS Feeds ===\n");
  await testDevToFeed();
  await testHackerNewsFeed();
}

main();

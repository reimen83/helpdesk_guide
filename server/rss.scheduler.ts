import { syncRSSFeeds } from "./rss.feeds";

/**
 * Scheduler para sincronizar RSS feeds periodicamente
 * Executa a cada 6 horas (21600000 ms)
 */

let syncInterval: NodeJS.Timeout | null = null;
let isRunning = false;

export async function startRSSScheduler() {
  if (syncInterval) {
    console.log("[RSS Scheduler] Já está rodando");
    return;
  }

  console.log("[RSS Scheduler] Iniciando scheduler de RSS feeds...");

  // Sincroniza imediatamente na inicialização
  await runSync();

  // Depois sincroniza a cada 6 horas (21600000 ms)
  syncInterval = setInterval(async () => {
    await runSync();
  }, 6 * 60 * 60 * 1000); // 6 horas

  console.log("[RSS Scheduler] Scheduler iniciado. Sincronizando a cada 6 horas");
}

export async function stopRSSScheduler() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
    console.log("[RSS Scheduler] Scheduler parado");
  }
}

async function runSync() {
  if (isRunning) {
    console.log("[RSS Scheduler] Sincronização já em progresso, pulando...");
    return;
  }

  isRunning = true;
  const startTime = Date.now();

  try {
    console.log("[RSS Scheduler] Iniciando sincronização de RSS feeds...");
    const result = await syncRSSFeeds();

    const duration = Date.now() - startTime;
    console.log(
      `[RSS Scheduler] Sincronização concluída em ${duration}ms:`
    );
    console.log(`  - Dev.to: ${result.devTo} posts adicionados`);
    console.log(`  - Hacker News: ${result.hackerNews} posts adicionados`);
    console.log(`  - Total: ${result.total} posts adicionados`);
  } catch (error) {
    console.error("[RSS Scheduler] Erro durante sincronização:", error);
  } finally {
    isRunning = false;
  }
}

// Função para sincronizar manualmente
export async function syncNow() {
  console.log("[RSS Scheduler] Sincronização manual solicitada");
  await runSync();
}

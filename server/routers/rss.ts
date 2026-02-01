import { publicProcedure, router } from "../_core/trpc";
import { syncRSSFeeds } from "../rss.feeds";

export const rssRouter = router({
  sync: publicProcedure.mutation(async () => {
    return await syncRSSFeeds();
  }),
});

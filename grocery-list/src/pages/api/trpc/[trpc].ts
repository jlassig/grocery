import * as trpcNext from "@trpc/server/adapters/next"

import { serverRouter } from "@/server/router"
import { createContext } from "@/server/context"
//console.log("what the router looks like:", serverRouter);

export default trpcNext.createNextApiHandler({
  router: serverRouter,
  createContext,
});
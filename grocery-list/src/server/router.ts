import { initTRPC } from '@trpc/server';
import { z } from "zod"

import { Context } from "./context"

const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure; 
// export const serverRouter = router({
//   findAll: publicProcedure
//     .query(async ({ ctx }) => {
//       try {
//         console.log("Executing FindAll procedure");
//         const result = await ctx.prisma.groceryList.findMany();
//         console.log("FindAll Result:", result);
//         return result;
//       } catch (error) {
//         console.error("Error in FindAll:", error);
//         throw error;
//       }

export const serverRouter = router({
findAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        console.log("Executing FindAll procedure");
        const result = await ctx.prisma.groceryList.findMany();
        console.log("FindAll Result:", result);
        return result;
      } catch (error) {
        console.error("Error in FindAll:", error);
        throw error;
      }
     }
     
// export const serverRouter = router({
//   findAll: publicProcedure
//     .query(({ ctx }) => {
//      console.log("inside findAll")
     
//       return ctx.prisma.groceryList.findMany();
//     }
     
     ),
  insertOne: publicProcedure
    .input(z.object({
        title: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
     console.log("inside insertOne")
      return ctx.prisma.groceryList.create({
        data: { title: input.title },
      });
    }
  ),
  updateOne: publicProcedure
    .input(z.object({
        id: z.number(),
        title: z.string(),
        checked: z.boolean(),
    }))
    .mutation(({ input, ctx }) => {
      const { id, ...rest } = input;

      return ctx.prisma.groceryList.update({
        where: { id },
        data: { ...rest },
      });
    }
  ),
  deleteAll: publicProcedure
    .input(z.object({
        ids: z.number().array(),
    }))
    .mutation(({ input, ctx }) => {
      const { ids } = input;

      return ctx.prisma.groceryList.deleteMany({
        where: { id: { in: ids } },
      });
    }
  ),
});

export type ServerRouter = typeof serverRouter;
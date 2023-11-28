import { z } from "zod";
import { type H3Event, readBody, createError } from "h3";

import { ItemType } from "~/utils/types";
import type { Database } from "~/supabase/types.gen";
import { serverSupabaseClient } from "#supabase/server";

const bodySchema = z.object({
  plate: z.object({
    title: z.string(),
    description: z.string(),
  }),
  items: z.array(
    z.object({
      url: z.string().url({ message: "URL is invalid." }),
      type: z.nativeEnum(ItemType, {
        errorMap: () => ({
          message: "URL type is not supported.",
        }),
      }),
      // TODO: figure out if we should receive & save this to db
      metaData: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          favicon: z.string().optional(),
          openGraphImageUrl: z
            .string()
            .url({ message: "OpenGraph image url is invalid." })
            .optional(),
        })
        .optional(),
      description: z.string().max(140, {
        message: "Description cannot be longer than 140 characters.",
      }),
    })
  ),
  author_id: z.number(),
});

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === "PUT") {
    const body = await readBody(event);
    const bodyValid = await bodySchema.safeParseAsync(body);

    if (!bodyValid.success) {
      throw createError({ status: 400, data: bodyValid.error });
    }

    const client = await serverSupabaseClient<Database["public"]>(event);

    const { author_id, plate, items } = bodyValid.data;

    const { data: dbAuthor, error } = await client
      .from("author_profiles")
      .select()
      .eq("id", author_id)
      .limit(1);

    if (!dbAuthor) {
      // TODO: what happens if the author doesn't exist? Bad Request I guess...
    }

    // 1. Create or retrieve author
    // 2. Create the plate
    // 3. Create the items
  }
});

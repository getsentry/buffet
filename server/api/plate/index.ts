import { z } from "zod";
import { type H3Event, readBody, createError } from "h3";

import { enumItemType } from "~/utils/types";
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
      type: z.nativeEnum(enumItemType, {
        errorMap: () => ({
          message: "URL type is not supported.",
        }),
      }),
      description: z.string().max(140, {
        message: "Description cannot be longer than 140 characters.",
      }),
    })
  ),
  author: z.object({
    name: z.string(),
    website: z.string().optional(),
  }),
});

function getIdForItemType(
  itemType: string,
  itemTypes: Database["public"]["Tables"]["item_types"]["Row"][]
) {
  const type = itemTypes.find(({ name }) => name === itemType);

  return type?.id;
}

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === "POST") {
    const dateNow = new Date().toUTCString();
    const insertDates = { date_created: dateNow, last_updated: dateNow };

    const body = await readBody(event);
    const bodyValid = await bodySchema.safeParseAsync(body);

    if (!bodyValid.success) {
      throw createError({ status: 400, data: bodyValid.error });
    }

    const client = await serverSupabaseClient<Database>(event);

    const { author, plate, items } = bodyValid.data;

    const { data: itemTypes, error: itemTypeError } = await client
      .from("item_types")
      .select();

    if (itemTypeError) {
      throw createError({ status: 500, data: itemTypeError });
    }

    const { data: dbAuthor, error: authorError } = await client
      .from("author_profiles")
      .insert(author)
      .select()
      .single();

    if (authorError) {
      throw createError({ status: 500, data: authorError });
    }

    const { data: dbPlate, error: plateError } = await client
      .from("plates")
      .insert({
        ...plate,
        ...insertDates,
        author_profile_id: dbAuthor.id,
      })
      .select()
      .single();

    if (plateError) {
      throw createError({ status: 500, data: plateError });
    }

    const itemsInsert = items.map<
      Database["public"]["Tables"]["items"]["Insert"]
    >((item) => ({
      ...item,
      ...insertDates,
      type: getIdForItemType(item.type, itemTypes),
      plate_id: dbPlate.id,
    }));

    const { error: itemsError } = await client
      .from("items")
      .insert(itemsInsert);

    if (itemsError) {
      throw createError({ status: 500, data: itemsError });
    }

    setResponseStatus(event, 201);
    return { plate_id: dbPlate.id };
  }
});

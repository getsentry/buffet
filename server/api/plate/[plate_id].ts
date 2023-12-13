import { type H3Event, createError } from "h3";

import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/supabase/types.gen";

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === "GET") {
    const client = await serverSupabaseClient<Database>(event);

    const plate_id = getRouterParam(event, "plate_id");

    if (!plate_id) {
      throw createError({ status: 400, message: "Plate ID not provided." });
    }

    const { data: plate, error: plateError } = await client
      .from("plates")
      .select()
      .eq("id", plate_id)
      .single();

    if (!plate) {
      throw createError({ status: 404, message: "Plate not found" });
    }
    if (plateError) {
      throw createError({ status: 500, data: plateError });
    }

    const { data: items } = await client
      .from("items")
      .select()
      .eq("plate_id", plate_id);

    const { data: author } = await client
      .from("author_profiles")
      .select()
      .eq("id", plate.author_profile_id)
      .single();

    setResponseStatus(event, 200);

    return { plate, author, items };
  }
});

<script setup lang="ts">
const route = useRoute();
const { plate_id } = route.params;

const { data } = await useFetch(`/api/plate/${plate_id}`, {
  method: "GET",
  key: "fetch-plate",
});

const parsed = data.value;

if (!parsed) {
  throw createError("Could not obtain plate.");
}

const metaData: Record<number, UrlMetaData> = {};

await Promise.all(
  (parsed.items ?? []).map(async (item) => {
    const { data: meta } = await useFetch(`/api/metadata?url=${item.url}`);
    if (meta && meta.value) {
      metaData[item.id] = meta.value;
    }
  })
);
</script>

<template>
  <div>
    <h1 class="mb-8 font-black text-8xl">{{ parsed.plate.title }}</h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      {{ parsed.plate.description }}
    </p>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      Author: {{ parsed.author?.name }}
    </p>
    <div v-if="parsed.items && parsed.items.length > 0" class="m-auto">
      <ul
        class="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <li
          v-for="item in parsed.items"
          :key="item.id"
          class="overflow-hidden border rounded shadow-xl"
        >
          <!-- currently just for URL types at the moment, will need to do a switch based on type -->
          <a :href="item.url" target="_blank">
            <img
              v-if="metaData[item.id].openGraphImageUrl !== null"
              :src="metaData[item.id].openGraphImageUrl as string"
              :alt="metaData[item.id].title as string"
              class="object-cover w-full h-32 mb-2"
            />
            <div class="p-2 pb-4">
              <h2 class="mb-2 text-sm font-bold">
                {{ metaData[item.id].title }}
              </h2>
              <p class="text-sm">{{ metaData[item.id].description }}</p>
              <p
                v-if="item.description && item.description.length > 0"
                class="mt-4 text-sm italic"
              >
                {{ item.description }}
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

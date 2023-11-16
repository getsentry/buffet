<script setup lang="ts">
// https://vueuse.org/core/useStorage/#usage
import { useStorage } from "@vueuse/core";
import type { Plate } from "../utils/types";

const STORAGE_KEY = "plate_in_progress";

function initNewPlate(): Plate {
  return {
    id: "1234",
    user_id: null,
    title: "",
    description: "",
    author: "",
    items: [],
    socialLinks: {},
  };
}

const plate = useStorage(STORAGE_KEY, initNewPlate()); // second parameter is default value
</script>

<template>
  <div>
    <h1 class="mb-8 font-black text-8xl">Create a plate</h1>

    <p>ID: {{ plate.id }}</p>
    <p>TITLE: {{ plate.title }}</p>
    <p>DESCRIPTION: {{ plate.description }}</p>
    <p>AUTHOR: {{ plate.author }}</p>

    <div>
      <label for="title" class="block">Title</label>
      <input
        id="title"
        v-model="plate.title"
        placeholder="My tasty plate"
        class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
      />
    </div>

    <div>
      <label for="author" class="block">Author</label>
      <input
        id="title"
        v-model="plate.author"
        placeholder="Lazar Nikolov"
        class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
      />
    </div>
  </div>
</template>

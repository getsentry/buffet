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
    socialLinks: {
      website: "",
    },
  };
}

function publishPlate() {
  alert("publishing plate, nothing else happens right now");

  // use plate variable in state
  // send it to supabase
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
    <p>SOCIALLINKS.WEBSITE: {{ plate.socialLinks.website }}</p>

    <div class="mb-8">
      <label for="title" class="block">Title</label>
      <input
        id="title"
        v-model="plate.title"
        placeholder="My tasty plate"
        class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
      />
    </div>

    <div class="mb-8">
      <label for="author" class="block">Author</label>
      <input
        id="title"
        v-model="plate.author"
        placeholder="Lazar Nikolov"
        class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
      />
    </div>

    <div class="mb-8">
      <label for="author" class="block"
        >Your website (optional, include https://)</label
      >
      <!-- TODO: validate input on keyup -->
      <input
        id="title"
        v-model="plate.socialLinks.website"
        placeholder="https://whitep4nth3r.com"
        class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
      />
    </div>

    <button
      class="px-4 py-2 font-mono font-bold text-white border-b-4 rounded border-emerald-700 bg-emerald-500 hover:bg-emerald-400 hover:border-emerald-500 focus:ring focus:ring-emerald-500"
      @click="publishPlate"
    >
      Publish plate
    </button>
  </div>
</template>

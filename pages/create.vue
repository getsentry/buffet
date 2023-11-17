<script setup lang="ts">
// https://vueuse.org/core/useStorage/#usage
import { Field, Form, ErrorMessage, defineRule } from "vee-validate";
import { useStorage } from "@vueuse/core";
import type { Plate } from "../utils/types";

defineRule("required", (value: any, [message]: string) => {
  if (!value || value.length === 0) {
    return message;
  }

  return "";
});

defineRule("url", (value: any, [message]: string) => {
  if (value && value.length > 0 && !value.startsWith("https://")) {
    return message;
  }

  return "";
});

const STORAGE_KEY = "plate_in_progress";

function initNewPlate(): Plate {
  return {
    id: "1234",
    user_id: null,
    title: "",
    description: "",
    author: {
      name: "",
      socialLinks: {
        website: "",
      },
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
    <p>AUTHOR: {{ plate.author.name }}</p>
    <p>SOCIALLINKS.WEBSITE: {{ plate.author.socialLinks.website }}</p>

    <Form>
      <div class="mb-8">
        <label for="title" class="block">Title</label>
        <Field
          id="title"
          v-model="plate.title"
          name="plate.title"
          type="text"
          rules="required:Please enter a title"
          placeholder="My tasty plate"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage name="plate.title" />
      </div>

      <div class="mb-8">
        <label for="author_name" class="block">Author</label>
        <Field
          id="author_name"
          v-model="plate.author.name"
          name="plate.author.name"
          type="text"
          rules="required:Please enter your name"
          placeholder="Lazar Nikolov"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage name="plate.author.name" />
      </div>

      <div class="mb-8">
        <label for="author_website" class="block"
          >Your website (optional, include https://)</label
        >
        <Field
          id="author_website"
          v-model="plate.author.socialLinks.website"
          name="plate.author.socialLinks.website"
          type="text"
          placeholder="https://whitep4nth3r.com"
          rules="url:Please include https:// in your website URL"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage name="plate.author.socialLinks.website" />
      </div>

      <button
        class="px-4 py-2 font-mono font-bold text-white border-b-4 rounded border-emerald-700 bg-emerald-500 hover:bg-emerald-400 hover:border-emerald-500 focus:ring focus:ring-emerald-500"
        type="submit"
      >
        Publish plate
      </button>
    </Form>
  </div>
</template>

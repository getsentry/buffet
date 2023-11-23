<script setup lang="ts">
// https://vueuse.org/core/useStorage/#usage
import { Field, Form, ErrorMessage, defineRule } from "vee-validate";
import { useStorage } from "@vueuse/core";
import { type Plate, ItemType } from "../utils/types";

// TODO - investigate console errors on blur of input fields,
// probably caused by these rules
// inputTypes.contains is not a function
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

defineRule("oneForty", (value: any, [message]: string) => {
  if (value && value.length > 140) {
    return message;
  }

  return "";
});

const STORAGE_KEYS = {
  PLATE: "plate",
  ITEMS: "items",
  ITEM_IN_PROGRESS: "item_in_progress",
};

const plate = useStorage(STORAGE_KEYS.PLATE, initNewPlate());
const items = useStorage<Item[]>(STORAGE_KEYS.ITEMS, []);
const item_in_progress = ref<Item | undefined>(undefined);

function initNewPlate(): Plate {
  return {
    id: 1234, // todo, remove this
    user_id: null,
    fingerprint: "",
    title: "",
    description: "",
    author: {
      name: "",
      website: "",
    },
  };
}

function initItem() {
  item_in_progress.value = {
    ...item_in_progress.value,
    id: 4444,
    user_id: null,
    plate_id: plate.value.id,
    url: "",
    description: "",
    type: ItemType.URL,
    metaData: {
      metaTitle: "",
      metaDescription: "",
      favicon: "",
      openGraphImageUrl: "",
    },
  };
}

function addItem() {
  items.value.push(item_in_progress.value as Item);
  item_in_progress.value = undefined;
}

function publishPlate() {
  alert("publishing plate, nothing else happens right now");
}
</script>

<template>
  <div>
    <h1 class="mb-8 font-black text-8xl">Create a plate</h1>

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
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="plate.title"
        />
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
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="plate.author.name"
        />
      </div>

      <div class="mb-8">
        <label for="author_website" class="block"
          >Your website (optional, include https://)</label
        >
        <Field
          id="author_website"
          v-model="plate.author.website"
          name="plate.author.socialLinks.website"
          type="text"
          placeholder="https://whitep4nth3r.com"
          rules="url:Please include https:// in your website URL"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="plate.author.socialLinks.website"
        />
      </div>

      <div v-if="items.length > 0" class="m-auto border w-96">
        <h2>Current items on plate</h2>
        <ol class="list-decimal">
          <li v-for="item in items" :key="item.id">
            <p>{{ item.description }}</p>
            <pre>{{ item.url }}</pre>
          </li>
        </ol>
      </div>

      <div v-if="item_in_progress !== undefined" class="mb-8 border">
        <!-- bind this select value to item_in_progress.type -->
        <label for="item_type" class="block">Type</label>
        <select
          id="item_type"
          v-model="item_in_progress.type"
          @change="console.log(item_in_progress.type)"
        >
          <option
            v-for="(value, index) in Object.values(ItemType)"
            :key="index"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>

      <div v-if="item_in_progress?.type === 'url'" class="mb-4">
        <h3 class="font-bold">Add a URL</h3>
        <label for="url" class="block">URL (include https://)</label>
        <Field
          id="url"
          v-model="item_in_progress.url"
          name="item_in_progress.url"
          type="text"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
          rules="url:Please include https:// in your website URL"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="item_in_progress.url"
        />

        <label for="url_description" class="block">Description</label>
        <Field
          id="url_description"
          v-model="item_in_progress.description"
          name="item_in_progress.description"
          type="text"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
          rules="oneForty:Please enter fewer than 140 characters"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="item_in_progress.description"
        />

        <button
          class="px-4 py-2 mt-4 font-bold text-white bg-pink-500 rounded-full bg- hover:bg-pink-700 focus:ring focus:ring-emerald-500"
          @click="addItem()"
        >
          Submit
        </button>
      </div>

      <div v-if="item_in_progress === undefined" class="mb-8">
        <button
          class="px-4 py-2 font-bold text-white bg-pink-500 rounded-full bg- hover:bg-pink-700 focus:ring focus:ring-emerald-500"
          @click="initItem()"
        >
          Add item
        </button>
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

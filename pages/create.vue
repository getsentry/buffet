<script setup lang="ts">
// https://vueuse.org/core/useStorage/#usage
import { Field, Form, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import {
  type Plate,
  type Item,
  type UrlMetaData,
  enumItemType,
  type AuthorProfile,
} from "../utils/types";

const plateValidationSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required!"),
    description: z.string().max(140, "Max 140 characters").optional(),
    author: z.string().min(1, "Author is required!"),
    author_website: z
      .string()
      .url({ message: "That doesn't look like a URL 🤨" })
      .or(z.string().length(0)),
  })
);

const itemValidationSchema = toTypedSchema(
  z.object({
    type: z.preprocess((val) => {
      return val as typeof enumItemType;
    }, z.nativeEnum(enumItemType)),
    url: z.string().url(),
    description: z
      .string()
      .max(140, "Woah there. 140 max characters!")
      .optional(),
  })
);

const STORAGE_KEYS = {
  PLATE: "plate",
  AUTHOR: "author",
  ITEMS: "items",
};

const plate = useStorage(STORAGE_KEYS.PLATE, initNewPlate());
const author = useStorage(STORAGE_KEYS.AUTHOR, initNewAuthor());
const items = useStorage<Item[]>(STORAGE_KEYS.ITEMS, []);
const item_in_progress = ref<Item | undefined>(undefined);

function initNewPlate(): Plate {
  return {
    id: null,
    ui_id: uuidv4(),
    title: "",
    description: "",
  };
}
function initNewAuthor(): AuthorProfile {
  return {
    name: "",
    website: "",
  };
}

function initItem() {
  item_in_progress.value = {
    id: 4444,
    ui_id: uuidv4(),
    user_id: null,
    plate_id: null,
    url: "",
    description: "",
    type: enumItemType.URL,
    metaData: {
      title: "",
      description: "",
      favicon: "",
      openGraphImageUrl: "",
    },
  };
}

async function addItem() {
  switch (item_in_progress?.value?.type) {
    case enumItemType.URL: {
      const { data: metaData } = await useFetch(
        `/api/metadata?url=${item_in_progress?.value?.url}`
      );

      item_in_progress.value.metaData = metaData.value as UrlMetaData;

      break;
    }
    default:
      break;
  }

  items.value.push(item_in_progress.value as Item);
  item_in_progress.value = undefined;
}

async function publishPlate() {
  const { data, status } = await useFetch("/api/plate", {
    method: "POST",
    body: JSON.stringify({
      plate: { title: plate.value.title, description: plate.value.description },
      items: items.value.map((item) => ({
        type: item.type,
        url: item.url,
        description: item.description,
      })),
      author: author.value,
    }),
  });

  if (status.value === "success") {
    await navigateTo(`/plate/${data.value?.plate_id}/`);
  }
}
</script>

<template>
  <div>
    <h1 class="mb-8 font-black text-8xl">Create a plate</h1>

    <Form
      v-slot="{ isSubmitting, isValidating }"
      :validation-schema="plateValidationSchema"
      @submit="publishPlate"
    >
      <div class="mb-8">
        <div class="flex flex-col items-end">
          <button
            class="flex items-center px-4 py-2 font-mono font-bold text-white border-b-4 rounded border-emerald-700 bg-emerald-500 disabled:border-slate-700 disabled:bg-slate-500 disabled:cursor-not-allowed hover:bg-emerald-400 hover:border-emerald-500 focus:ring focus:ring-emerald-500"
            type="submit"
            :disabled="isSubmitting || isValidating"
          >
            <svg
              v-if="isSubmitting || isValidating"
              class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Publish plate
          </button>
        </div>
        <div class="mb-8">
          <label for="title" class="block">Title</label>
          <Field
            id="title"
            v-model="plate.title"
            name="title"
            type="text"
            placeholder="My tasty plate"
            class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
          />
          <ErrorMessage
            class="block p-2 mt-2 text-white bg-red-600 rounded"
            name="title"
          />
        </div>

        <div class="mb-8">
          <label for="description" class="block">Description</label>
          <Field
            id="description"
            v-model="plate.description"
            name="description"
            type="text"
            placeholder="Something descriptive!"
            class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
          />
          <ErrorMessage
            class="block p-2 mt-2 text-white bg-red-600 rounded"
            name="description"
          />
        </div>
      </div>

      <div class="mb-8">
        <label for="author" class="block">Author</label>
        <Field
          id="author"
          v-model="author.name"
          name="author"
          type="text"
          placeholder="Lazar Nikolov"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="author"
        />
      </div>

      <div class="mb-8">
        <label for="author_website" class="block"
          >Your website (optional, include https://)</label
        >
        <Field
          id="author_website"
          v-model="author.website"
          name="author_website"
          type="text"
          placeholder="https://whitep4nth3r.com"
          rules="url:Please enter a valid URL including https://"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="author_website"
        />
      </div>

      <div v-if="items.length > 0" class="m-auto">
        <ul
          class="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <li
            v-for="item in items"
            :key="item.id"
            class="overflow-hidden border rounded shadow-xl"
          >
            <!-- currently just for URL types at the moment, will need to do a switch based on type -->
            <a :href="item.url" target="_blank">
              <img
                v-if="item.metaData.openGraphImageUrl !== null"
                :src="item.metaData.openGraphImageUrl as string"
                :alt="item.metaData.title as string"
                class="object-cover w-full h-32 mb-2"
              />
              <div class="p-2 pb-4">
                <h2 class="mb-2 text-sm font-bold">
                  {{ item.metaData.title }}
                </h2>
                <p class="text-sm">{{ item.metaData.description }}</p>
                <p
                  v-if="item.description.length > 0"
                  class="mt-4 text-sm italic"
                >
                  {{ item.description }}
                </p>
                <img
                  v-if="item.metaData.favicon !== null"
                  :src="item.metaData.favicon as string"
                  alt="favicon"
                />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Form>

    <div v-show="item_in_progress === undefined" class="mb-8">
      <button
        class="px-4 py-2 font-bold text-white bg-pink-500 rounded-full bg- hover:bg-pink-700 focus:ring focus:ring-emerald-500"
        @click="initItem()"
      >
        Add item
      </button>
    </div>

    <Form :validation-schema="itemValidationSchema" @submit="addItem">
      <div v-if="item_in_progress !== undefined" class="mb-8 border">
        <label for="item_type" class="block">Type</label>
        <Field
          id="item_type"
          v-model="item_in_progress.type"
          as="select"
          name="type"
        >
          <option
            v-for="(value, index) in Object.values(enumItemType)"
            :key="index"
            :value="value"
          >
            {{ value }}
          </option>
        </Field>
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="type"
        />
      </div>

      <div v-if="item_in_progress?.type === 'url'" class="mb-4">
        <h3 class="font-bold">Add a URL</h3>
        <label for="url" class="block">URL (include https://)</label>
        <Field
          id="url"
          v-model="item_in_progress.url"
          name="url"
          type="text"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="url"
        />

        <label for="url_description" class="block">Description</label>
        <Field
          id="url_description"
          v-model="item_in_progress.description"
          name="description"
          type="text"
          class="block w-full px-4 py-2 border-2 rounded focus:outline-none focus:ring focus:ring-emerald-500"
        />
        <ErrorMessage
          class="block p-2 mt-2 text-white bg-red-600 rounded"
          name="description"
        />

        <button
          class="px-4 py-2 mt-4 font-bold text-white bg-pink-500 rounded-full bg- hover:bg-pink-700 focus:ring focus:ring-emerald-500"
          type="submit"
        >
          Add to plate
        </button>
      </div>
    </Form>
  </div>
</template>

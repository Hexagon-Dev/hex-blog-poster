<template>
  <article class="bg-gray-800 rounded-md p-4">
    <h3 class="text-3xl font-black">
      {{ article?.title ?? 'No title' }}
    </h3>

    <p class="my-4">
      {{ article?.description ?? 'No description' }}
    </p>

    <div class="flex space-x-2">
      <div class="p-2 bg-gray-700 rounded-md">
        CREATED AT {{ article?.created_at ?? 'No date' }}
      </div>

      <div class="p-2 bg-gray-700 rounded-md">
        UPDATED AT {{ article?.updated_at ?? 'No date' }}
      </div>

      <div class="!ml-auto space-x-2">
        <router-link :to="`/articles/${article.id}`" class="btn-default inline-block">
          VIEW
        </router-link>

        <router-link
          v-if="$store.getters['getUser']"
          :to="`/articles/${article.id}/edit`"
          class="btn-default inline-block"
        >
          EDIT
        </router-link>

        <button
          v-if="$store.getters['getUser']"
          class="btn-default"
          @click="deleteArticle(article)"
        >
          DELETE
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { convertSqlToDate } from '@/plugins/utils';
import { deleteDoc, doc } from 'firebase/firestore';
import { articlesCollection } from '@/plugins/firebase';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    convertSqlToDate,
    deleteArticle(article) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you sure you want to delete article "${article.title}"?`)) {
        deleteDoc(doc(articlesCollection, article.id));
      }
    },
  },
};
</script>

<template>
  <article>
    <h2 class="text-3xl font-black">
      {{ article?.title ?? 'No title' }}
    </h2>

    <p class="my-4">
      {{ article?.content ?? 'No content' }}
    </p>

    <div class="flex space-x-2">
      <div class="p-2 bg-gray-600 rounded-md">
        CREATED AT {{ article?.created_at ?? 'No date' }}
      </div>
      <div class="p-2 bg-gray-600 rounded-md">
        UPDATED AT {{ article?.updated_at ?? 'No date' }}
      </div>

      <router-link to="/" class="btn-default !ml-auto">
        BACK
      </router-link>
    </div>
  </article>
</template>

<script>
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';
import { articlesCollection } from '@/plugins/firebase';

export default {
  data() {
    return {
      article: null,
    };
  },
  created() {
    this.article = useDocument(doc(articlesCollection, this.$route.params.id));
  },
};
</script>

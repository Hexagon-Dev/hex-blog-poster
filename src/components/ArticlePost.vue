<template>
  <article class="bg-gray-800 rounded-md p-4">
    <h3 class="text-3xl font-black">{{ article?.title ?? 'No title' }}</h3>

    <p class="my-4">{{ article?.description ?? 'No description' }}</p>

    <div class="flex space-x-2">
      <div class="p-2 bg-gray-700 rounded-md">
        CREATED AT {{ article?.created_at ?? 'No date' }}
      </div>
      <div class="p-2 bg-gray-700 rounded-md">
        UPDATED AT {{ article?.updated_at ?? 'No date' }}
      </div>

      <div class="!ml-auto">
        <router-link :to="`/articles/${article.id}`" class="btn-default">OPEN ARTICLE</router-link>
        <router-link :to="`/articles/${article.id}/edit`" class="btn-default ml-2" v-if="$store.getters['getUser']">EDIT ARTICLE</router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

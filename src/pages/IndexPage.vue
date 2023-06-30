<template>
  <main>
    <h2 class="font-extrabold text-4xl mb-2">
      Articles
    </h2>

    <div v-if="articles" class="flex flex-col space-y-4">
      <ArticlePost
        v-for="article in sortedArticles"
        :key="article.id"
        :article="article"
      />
    </div>

    <Loading v-else class="h-64" />
  </main>
</template>

<script>
import ArticlePost from '@/components/ArticlePost.vue';
import { articlesCollection } from '@/plugins/firebase';
import Loading from '@/components/Loading.vue';
import { convertSqlToDate } from '@/plugins/utils';

export default {
  components: { Loading, ArticlePost },
  data() {
    return { articles: null };
  },
  computed: {
    sortedArticles() {
      return this.articles.slice().sort(
        (a, b) => convertSqlToDate(b.updated_at) - convertSqlToDate(a.updated_at),
      );
    },
  },
  firestore: { articles: articlesCollection },
};
</script>

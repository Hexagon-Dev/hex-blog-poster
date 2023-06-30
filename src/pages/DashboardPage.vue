<template>
  <div class="mx-auto xl:w-1/2 w-full">
    <h2 class="font-extrabold text-4xl mb-2">
      DASHBOARD
    </h2>
    <p class="mb-2">
      {{ $route.params.id ? 'Update' : 'Create new' }} post
    </p>

    <form
      v-if="!loading && form"
      class="flex flex-col space-y-4"
      @submit.prevent="createArticle"
    >
      <div>
        <label for="title" class="block">
          Title
        </label>

        <input
          id="title"
          v-model="form.title"
          type="text"
          class="input-default"
          required
        >
      </div>

      <div>
        <label for="description" class="block">
          Description
        </label>

        <input
          id="description"
          v-model="form.description"
          type="text"
          class="input-default"
          required
        >
      </div>

      <div>
        <label for="content" class="block">
          Content
        </label>

        <textarea
          id="content"
          v-model="form.content"
          class="input-default"
          style="max-height: 20rem;"
          required
        />
      </div>

      <button class="btn-default">
        {{ $route.params.id ? 'UPDATE' : 'CREATE' }} POST
      </button>

      <p class="text-red-600 mt-2">
        {{ error }}
      </p>
    </form>

    <Loading v-else class="h-64" />
  </div>
</template>

<script>
import { updateDoc, addDoc, doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';
import { articlesCollection, firebaseDB } from '@/plugins/firebase';
import Loading from '@/components/Loading.vue';
import { convertDateToSql } from '@/plugins/utils';

export default {
  components: { Loading },
  data() {
    return {
      form: {
        title: '',
        description: '',
        content: '',
      },
      loading: false,
      error: null,
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      this.loading = true;
      this.form = await useDocument(doc(articlesCollection, this.$route.params.id));
      this.loading = false;
    }
  },
  methods: {
    async createArticle() {
      this.error = null;

      this.loading = true;

      const now = convertDateToSql(new Date());

      try {
        if (this.$route.params.id) {
          await updateDoc(
            doc(firebaseDB, 'articles', this.$route.params.id),
            { ...this.form, updated_at: now },
          );
        } else {
          await addDoc(
            articlesCollection,
            { ...this.form, created_at: now, updated_at: now },
          );
        }

        alert(`Article was successfully ${this.$route.params.id ? 'updated' : 'created'}.`);

        this.$router.push('/');
      } catch (error) {
        this.error = 'Failed to create article, please try again later or contact support';
      }

      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="mx-auto xl:w-1/2 w-full">
    <h2 class="font-extrabold text-4xl mb-2">DASHBOARD</h2>
    <p class="mb-2">{{ $route.params.id ? 'Update' : 'Create new' }} post</p>

    <form v-if="!loading && form" class="flex flex-col space-y-4" @submit.prevent="createPost">
      <div>
        <label for="title" class="block">
          Title
        </label>

        <input
          type="text"
          v-model="form.title"
          class="input-default"
          id="title"
          required
        >
      </div>

      <div>
        <label for="description" class="block">
          Description
        </label>

        <input
          type="text"
          v-model="form.description"
          class="input-default"
          id="description"
          required
        >
      </div>

      <div>
        <label for="content" class="block">
          Content
        </label>

        <textarea
          v-model="form.content"
          id="content"
          class="input-default"
          style="max-height: 20rem;"
          required
        />
      </div>

      <button class="btn-default">
        {{ this.$route.params.id ? 'UPDATE' : 'CREATE' }} POST
      </button>

      <p class="text-red-600 mt-2">
        {{ error }}
      </p>
    </form>

    <Loading class="h-64" v-else />
  </div>
</template>

<script>
import { updateDoc, addDoc, doc } from "firebase/firestore";
import { articlesCollection, firebaseDB } from "@/plugins/firebase";
import { useDocument } from "vuefire";
import Loading from '@/components/Loading.vue';

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
    async createPost() {
      this.error = null;

      this.loading = true;

      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

      try {
        let response = null;

        if (this.$route.params.id) {
          response = await updateDoc(
              doc(firebaseDB, 'articles', this.$route.params.id),
              { ...this.form, created_at: now, updated_at: now },
          );
        } else {
          response = await addDoc(
              articlesCollection,
              { ...this.form, created_at: now, updated_at: now },
          );
        }

        alert(`Post was successfully ${this.$route.params.id ? 'updated' : 'created'}.`);

        this.$router.push('/');
      } catch (error) {
        this.error = 'Failed to create post, please try again later or contact support';
        console.error(error);
      }

      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="mx-auto xl:w-1/2 w-full">
    <h2 class="font-extrabold text-4xl mb-2 text-center">
      LOGIN
    </h2>

    <form v-if="!loading" class="flex flex-col space-y-4" @submit.prevent="login">
      <div>
        <label for="email" class="block">EMAIL</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="input-default"
          required
          minlength="3"
        >
      </div>

      <div>
        <label for="password" class="block">PASSWORD</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="input-default"
          required
          minlength="8"
        >
      </div>

      <button :disabled="loading" class="btn-default">
        LOGIN
      </button>
    </form>

    <Loading v-else class="h-64" />

    <p class="text-red-600 mt-2">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loading from '@/components/Loading.vue';

export default {
  components: { Loading },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null,
    };
  },
  created() {
    if (this.$store.getters.getUser) {
      this.$router.push('/');
    }
  },
  methods: {
    async login() {
      this.error = null;

      let response = null;

      this.loading = true;

      try {
        response = await signInWithEmailAndPassword(auth, this.email, this.password);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          this.error = 'User with specified email is not found';
        }

        if (error.code === 'auth/wrong-password') {
          this.error = 'Password is incorrect';
        }
      }
      this.loading = false;

      if (response) {
        await auth.updateCurrentUser(response.user);
        this.$store.commit('setUser', response.user);
        this.$router.push('/');
      } else {
        this.error = 'Unexpected error happened, please try again later or contact support';
      }
    },
  },
};
</script>

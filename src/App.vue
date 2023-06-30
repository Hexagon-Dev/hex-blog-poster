<template>
  <div class="flex flex-col h-full">
    <nav class="p-4 bg-cyan-900 space-x-2 flex items-center">
      <router-link to="/" class="!mr-4">
        HEX-BLOG-POSTER
      </router-link>

      <NavButton path="/" label="HOME" />
      <NavButton path="/dashboard" label="DASHBOARD" :auth-only="true" />
      <NavButton path="/settings" label="SETTING" :auth-only="true" />

      <div class="!ml-auto">
        <NavButton v-if="!user" path="/login" label="LOGIN" />

        <div v-else class="space-x-2 flex">
          <NavButton path="/profile" label="PROFILE" :auth-only="true" />

          <button class="nav-btn bg-cyan-200 hover:bg-cyan-100" @click="logout">
            LOGOUT
          </button>
        </div>
      </div>
    </nav>

    <router-view v-slot="{ Component }" class="m-4 p-4 rounded-md bg-gray-700 text-2xl">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer class="mt-auto p-4 bg-black">
      {{ new Date().getFullYear() }}
      © Rudakevych Vladyslav AKA
      <a href="https://hexagon-dev.com.ua/" target="_blank" class="underline">
        Hexagon-Dev
      </a>
    </footer>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import NavButton from '@/components/NavButton.vue';
import { auth } from '@/plugins/firebase';

export default {
  components: { NavButton },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logout() {
      this.$store.commit('setUser', null);
      signOut(auth);
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <router-link
    v-if="authOnly ? $store.getters['getUser'] : true"
    :to="path"
    class="nav-btn"
    :class="$route.path === path ? 'bg-cyan-50' : 'bg-cyan-200 hover:bg-cyan-100'"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    authOnly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
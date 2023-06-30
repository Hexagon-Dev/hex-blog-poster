<template>
  <div>
    <h2 class="text-3xl font-black mb-2">PROFILE</h2>

    <div>
      <p>EMAIL: {{ user?.email ?? 'NONE' }}</p>
      <p>NAME: {{ user?.displayName ?? 'NONE' }}</p>
      <p>PHONE: {{ user?.phoneNumber ?? 'NONE' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['getUser'];
    }
  }
};
</script>

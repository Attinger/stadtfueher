<template>
  <div>
    {{progress}}
    {{rätsel}}
    <a class="test" @click="inCreamentProgress(2)">Test</a>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    test: '',
  }),
  computed: {
    progress() {
      return this.$store.getters.done;
    },
    rätsel() {
      return this.$store.getters.rätsel;
    }
  },
  methods: {
    inCreamentProgress(payload) {
      this.$store.dispatch('upDateProgress', payload);
    }
  },
};
</script>

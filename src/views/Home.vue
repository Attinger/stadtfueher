<template>
  <div>
    <Header page-title="Rätsel" />
    {{progress}}
    <a class="test" @click="inCreamentProgress(2)">Test</a>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    Header,
  },
  data: () => ({
    test: '',
  }),
  computed: {
    progress() {
      return this.$store.getters.done;
    },
  },
  methods: {
    inCreamentProgress(payload) {
      this.$store.dispatch('upDateProgress', payload);
    }
  },
};
</script>

<template>
  <div>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <Header page-title="Übersicht" />
    </v-app-bar>
    <v-card
        class="mx-auto pa-4 ma-4"
        max-width="95%"
        outlined
        v-for="(task, index) in tasks"
        :key="index"
        :class="task.completed ? 'green' : ''"
    >
      <router-link :to="{ name: 'task', params: task}">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{task.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{task.title}}
            </v-list-item-subtitle>
            <v-list-item-action-text class="text-right" v-if="task.completed">
              Gelöst !
              | {{task.completedDate}} 12.12.2021<br>13:10Uhr
            </v-list-item-action-text>
            <v-list-item-action-text class="text-right" v-else>Noch nicht abgeschlossen</v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-card>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  data: () => ({
  }),
  components: {
    Header,
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.green {
  background-color:green;
}

</style>

<template>
  <div>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon
            dark
            left
            large
            @click="$router.go(-1)"
        >
          mdi-arrow-left
        </v-icon>
      </v-card-actions>
      <Header :page-title="task.title" />
    </v-app-bar>
    <v-card
        class="mx-auto pa-4 ma-4"
        max-width="95%"
        outlined
    >
      <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 text-center mb-1">
          <v-card-text>Sucht den QR-Code in der Nähe um ihn zu scannen!</v-card-text>
          <v-card-text>Gefunden? Dann scannt Ihn.</v-card-text>
          <the-qr-code-scanner></the-qr-code-scanner>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    </v-card>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import TheQrCodeScanner from "../components/TheQrCodeScanner";
export default {
  name: 'task',
  components: {
    Header,
    TheQrCodeScanner
  },
  data: () => ({
    task: {},
  }),
  mounted() {
    if(localStorage.getItem('currentTask')) {
      const getCurrentTask = JSON.parse(localStorage.getItem('currentTask'));
      console.log(getCurrentTask);
      if(this.$route.params.id != getCurrentTask.id || getCurrentTask.id == undefined) {
        const currentTask = JSON.stringify(this.$route.params);
        localStorage.setItem('currentTask', currentTask);
      }
    } else {
      const currentTask = JSON.stringify(this.$route.params);
      localStorage.setItem('currentTask', currentTask);
    }
    const actualTask = JSON.parse(localStorage.getItem('currentTask'));
    this.task = actualTask;
  },
}
</script>

<style scoped>
.v-card__actions {
  cursor: pointer;
}
</style>

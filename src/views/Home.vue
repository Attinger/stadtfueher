<template>
  <div>
    <v-app-bar
        app
        color="primary"
        dark
        class="flex justify-sm-space-between"
    >
      <v-row class="flex align-center">
        <v-col class="no-gutters">
          <Header page-title="Übersicht" class="left" />
        </v-col>
        <v-col class="text-right">
          <router-link :to="{ name: 'map', params: tasks.locations}">
            <v-icon class="text-right">{{ svgPath }}</v-icon>
          </router-link>
        </v-col>
      </v-row>
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
            <v-row>
              <v-col>
                <v-list-item-title class="text-h5 mb-1">
                  {{task.title }}
                </v-list-item-title>
              </v-col>
              <v-col>
                <v-list-item-action-text class="text-right align-center justify-end d-flex"  v-if="hasLok">
                  <v-icon class="ma-2">
                    {{ distancePin }}
                  </v-icon>
                  <v-list-item-action-text>
                    ~ {{task.distance}}km
                  </v-list-item-action-text>
                </v-list-item-action-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item-subtitle>
                  {{task.description}}
                </v-list-item-subtitle>
              </v-col>
              <v-col>
                <v-list-item-action-text class="text-right align-center justify-end d-flex" v-if="task.completed">
                  Abgeschlossen | {{task.completedDate}} 12.12.2021
                </v-list-item-action-text>
                <v-list-item-action-text class="text-right align-center justify-end d-flex" v-else>Noch nicht abgeschlossen</v-list-item-action-text>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-card>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import Header from '@/components/Header.vue';
import { mdiPin } from '@mdi/js';
import { mdiMapMarkerDistance } from '@mdi/js';

export default {
  name: 'Home',
  data: () => ({
    distancePin: mdiMapMarkerDistance,
    svgPath: mdiPin,
    userLong: null,
    userLat: null,
    hasLok: false,
    lokBlocked: '',
    allChallenges: null,
  }),
  components: {
    Header,
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
  },
  methods: {
    async getUserLocation() {
      //Fix: Iphone Location needs to be asked in the settings.
      if(navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(position => {
          this.hasLok = true;
          const userLong = position.coords.longitude;
          const userLat = position.coords.latitude;
          this.comparePosition(userLat, userLong);
        }, error => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("User denied the request for Geolocation.")
              break;
            case error.TIMEOUT:
              console.log("User denied the request for Geolocation.")
              break;
            case error.UNKNOWN_ERROR:
              console.log("User denied the request for Geolocation.")
              break;
          }
        });
      }
    },
    comparePosition(userLong, userLat) {
      for(let i = 0; i < this.tasks.length; i++) {
        const long = this.tasks[i].location.long;
        const lat = this.tasks[i].location.lat;

        let result = this.calcDistance(lat, long, userLat, userLong);
        this.tasks[i].distance = result;
      }
    },
    calcDistance(lat1, lon1, lat2, lon2) {
      //TODO make this code more readable
      const R = 6371; // km
      const dLat = this.toRad(lat2-lat1);
      const dLon = this.toRad(lon2-lon1);
      const lat1Rad = this.toRad(lat1);
      const lat2Rad = this.toRad(lat2);

      const  a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
      const  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;
      return d.toFixed(1);
    },
    toRad(Value){
      return Value * Math.PI / 180;
    },
  },
  mounted() {
    this.getUserLocation();
    //TODO: Check if localStorage already has Tasks, if YES do nothing. If not Do everything. Probably trigger an action in the  Store at this line.
    const allChallenges = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', allChallenges);
  }
};
</script>

<style>
a {
  text-decoration: none;
}

.green {
  background-color:green;
}
</style>

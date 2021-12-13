<template>
  <div>
    <!--TODO: Adjust the navbar in this view. Its buggy mobile, if you scroll out. The map will be ,,above'' the header-->
    <v-app-bar
        app
        color="primary"
        dark
        style="z-index: 99999"
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
      <Header page-title="Map" />
    </v-app-bar>
    <v-card class="dif-height">
      <v-row>
        <v-col>
          <div SameSite="None" id="map">
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>

import * as L from 'leaflet';
import Header from '@/components/Header.vue';

export default {
  name: 'Map',
  data: () => ({
    x: null,
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
    //TODO: provide more logical code. This code doesnt seem to be the smartest.
    const map = L.map('map').setView([48.060523, 8.194542], 13);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYXR0aW5nZXIiLCJhIjoiY2t3eGpwNXpuMGRqMTJ4bGFucGs4Y3k4NCJ9.JiBKWsO1TfmvffEvkhWiRg'
    }).addTo(map);

    const myIcon =  L.icon({
      iconUrl: require('../assets/logo.png'),
      iconSize: [25, 18],
      iconAnchor: [25, 16],
    });

    for(let i = 0; i < this.tasks.length; i++) {
      const name = this.tasks[i].location.name;
      const lang = this.tasks[i].location.long;
      const lat = this.tasks[i].location.lat;

      //TODO : Adjust that. Doesnt work properly on mobile devices yet. Probably the latlng calculation is a bit off
      //TODO:  cause it has the same values as the markers.
      const latlng  = L.latLng(lat, lang);

      //TODO: add navToLoc function.
      const popup = L.popup()
          .setLatLng(latlng)
          .setContent(`<p>Hier befindet sich: ${name}</p><br><a @click="navToLoc">Entdecken?</a>`)
          .openOn(map);

      const x =  L.marker([lang, lat], {icon: myIcon}).addTo(map);

      x.bindPopup(popup).openPopup();
    }
  },
}
</script>

<style>
#map {
  height:95vh;
}

.leaflet-top {
  top: 50%;
  transform: translate(0%, -50%);
}

</style>

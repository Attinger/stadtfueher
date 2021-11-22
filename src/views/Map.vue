<template>
  <div class="test">
    <h1>Hello T! {{coordinates.lat}} {{coordinates.lng}}</h1>
    <iframe src="https://www.google.com/maps/d/embed?mid=1Fnwx21f2v1sxc54K5WiWc0w4JK8uOCF_" width="640" height="480"></iframe>
  </div>
</template>

<script>

export default {
  name: 'Map',
  data: () => ({
    coordinates: {
      lat: 0,
      lng: 0
    }
  }),
  mounted() {
    this.$getLocation({})
    .then(coordinates => {
      this.coordinates = coordinates;
    })
    .catch(error => console.log(error));
  },
}
</script>

<style>
</style>

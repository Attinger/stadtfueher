<template>
  <div>
    <h1>Proof of Concept:</h1>
    <p>Projektmanagment in Softwareprojekten</p>
    <QRCode />
  </div>
</template>

<script>
// @ is an alias to /src
import QRCode from '@/components/TheQrCodeScanner.vue';

export default {
  name: 'Home',
  components: {
    QRCode,
  },
};
</script>

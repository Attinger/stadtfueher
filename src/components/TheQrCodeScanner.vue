<template>
  <div class="content">
    <button class="base-button" @click="loadCam" >Scan QR-Code</button>
    <div class="qr--code" v-if="loadedcam">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
      <div v-if="isLoaded" class="qr--code-loaded">
        <p>Name der Audiodatei : {{audioFileName}}</p>
      </div>
    </div>
    <div class="audio--area" v-if="audioFileName">
      <button class="btn-primary" @click="playAudio">Play Audio</button>
      <div id="song">
        <audio controls id="audio" class="hidden" :src="`https://webuser.hs-furtwangen.de/~attinger/projektMan/audio/${this.audioFileName}.mp3`" autoPlay muted></audio>
      </div>
    </div>
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      isLoaded: false,
      audioFileName: '',
      audioPathName: '',
      rightAudio: false,
      loadedcam: false,
      audioFiles: [{
        name: '',
        path: '',
      }
      ]
    };
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString) {
        this.isLoaded = true;
        this.rightAudio = true;
        this.audioFileName = decodedString;
      }
    },
    loadCam() {
      this.loadedcam = true;
    },
    playAudio() {
      const audio = document.getElementById('audio');
      audio.muted = false;
      audio.play();
    },
  },
};
</script>

<style>
.qr--code {
  max-width:500px;
  max-height:500px;
  border:3px solid black;
  margin:45px auto;
}

.hidden {
  opacity:0;
}
</style>

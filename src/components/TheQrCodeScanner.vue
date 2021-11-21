<template>
  <div class="qr--code">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
    <div v-if="isLoaded" class="qr--code-loaded">
      <p>Name der Audiodatei : {{audioFileName}}</p>
      <div class="audio--area" v-if="audioFileName">
        <button class="btn-primary" @click="test">Play Audio</button>
        <div id="song">
          <audio id="audio" src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>
        </div>
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
      rightAudio: false,
    };
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString === 'Audiofile-one') {
        this.isLoaded = true;
        this.rightAudio = true;
        this.audioFileName = decodedString;
      }
    },

    test() {
      const audio = document.getElementById('audio');
      audio.play();
    },
  },
};
</script>

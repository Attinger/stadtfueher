<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn @click="loadCam">
          Scan QR-Code
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="loadedcam">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="rightAudio">
        <v-dialog
            persistent
            max-width="95%"
            hide-overlay
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="typeText"
            >Beginne mit dem Rätsel</v-btn>
          </template>
          <template v-slot:default="dialog" class="task--modal">
            <v-card>
              <v-toolbar
                  color="primary"
                  dark
                  class="d-flex justify-center"
              >Die Aufgabe!</v-toolbar>
              <v-card-text class="d-flex align-center flex-column">
                <v-icon
                    color="primary"
                    x-large
                    class="ma-4"
                >{{soundIcon}}
                </v-icon>
                <div class="d-flex justify-center ma-4">
                  <p>
                    <span class="type--text">{{ typeValue }}</span>
                    <span class="type--cursor">&nbsp;</span>
                  </p>
                </div>
                <v-btn color="primary" v-if="replayButton" @click="replay">Nochmal anhören</v-btn>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import { mdiVolumeHigh } from '@mdi/js';
import {setTimeout} from "timers";

export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      soundIcon: mdiVolumeHigh,
      isLoaded: false,
      audioFileName: '',
      audioPathName: '',
      rightAudio: true,
      loadedcam: false,
      replayButton: false,
      audioFiles: [{
        name: '',
        path: '',
      }],
      typeValue: '',
      typeArray: ['Lorem Ipsum sit dorem Status quantos extrenum sternum gettum getters yes.'],
      typingSpeed: 50,
      typeArrayIndex: 0,
      charIndex: 0
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
    typeText() {
      if(this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      }
      if(this.charIndex === this.typeArray[this.typeArrayIndex].length) {
        //TODO: CONTINUE here with further actions. start timer for help etc.
        console.log('done');
        this.replayButton = true;
      }
    },
    replay() {
      this.charIndex = 0;
      this.typeValue = '';
      this.typeText();
    }
  },
};
</script>

<style>
.v-dialog  {
  overflow-x:hidden;
}

.type--cursor {
  display: inline-block;
  margin-left: 3px;
  width: 1px;
  background-color: #000;
  animation: cursorBlink 1s infinite;
}

@keyframes cursorBlink {
  49% { background-color: #000; }
  50% { background-color: transparent; }
  99% { background-color: transparent; }
}
</style>

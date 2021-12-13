<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn @click="loadCam">
          Scan QR-Code
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="loadedcam">
      <v-col class=" col-12 qr--code">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </v-col>
      <v-col class="col-12">
        <v-alert type="error" v-if="error">
          {{errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col> <!--v-if="rightAudio -->
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
                    <span class="type--cursor"></span>
                  </p>
                </div>
                <v-btn color="primary" v-if="replayButton" @click="replay">Nochmal anhören</v-btn>
               <!--  <div id="song">
                  <audio controls id="audio" class="hidden" :src="`https://webuser.hs-furtwangen.de/~attinger/projektMan/audio/${task.audiofilename}.mp3`" autoPlay muted></audio>
                </div> -->
              </v-card-text>
              <v-row>
                <v-col class="col-12 ma-auto pa-5 d-flex justify-center flex-column" v-if="checkingSolution">
                  <form v-if="collectSolution">
                    <v-text-field
                        label="Lösungswort"
                        v-model="solution"
                        hide-details="auto"
                        v-if="!rightAnswer"
                    ></v-text-field>
                    <v-btn @click="checkSolution" v-if="!rightAnswer" color="primary" class="d-flex justify-center ma-auto mt-6">
                      Lösung einreichen
                    </v-btn>
                  </form>
                </v-col>
                <v-col class="col-12 text-center" v-if="!checkingSolution">
                  <v-progress-circular
                      indeterminate
                      color="primary"
                  ></v-progress-circular>
                </v-col>
                <v-col class="col-12 text-center" v-if="rightAnswer">
                  <v-alert type="success">
                    Richtig
                  </v-alert>
                </v-col>
                <v-col class="col-12" warning v-if="wrongAnswer">
                  <v-alert type="error">
                    Versuch es erneut.
                  </v-alert>
                </v-col>
              </v-row>
              <v-row  v-if="!rightAnswer">
                <v-col class="col-12 ma-auto d-flex justify-center align-center"  v-if="getHelp">
                  <v-icon
                      class="mr-5"
                      color="primary"
                  >
                    {{question}}
                  </v-icon>
                  <Countdown :date="countDownEnd" @onFinish="finish()"></Countdown>
                </v-col>
              </v-row>
              <v-card-actions class="justify-end mt-15">
                <v-btn
                    text
                    @click="dialog.value = false"
                >Schließen</v-btn>
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
import Countdown from './countdown.vue';

import { mdiVolumeHigh, mdiChatQuestionOutline } from '@mdi/js';
import {setTimeout} from "timers";

export default {
  components: {
    QrcodeStream,
    Countdown
  },
  data() {
    return {
      soundIcon: mdiVolumeHigh,
      question: mdiChatQuestionOutline,
      isLoaded: false,
      audioFileName: '',
      error: false,
      errorMessage: '',
      audioPathName: '',
      rightAudio: false,
      loadedcam: false,
      replayButton: false,
      typeValue: '',
      typeArray: [''],
      typingSpeed: 50,
      typeArrayIndex: 0,
      charIndex: 0,
      collectSolution: false,
      solution: '',
      countDownEnd:null,
      getHelp: false,
      checkingSolution: true,
      rightAnswer: false,
      wrongAnswer: false,
      task: null,
    };
  },
  methods: {
    onDecode(decodedString) {
      if(localStorage.getItem('currentTask')) {
        const actualTask = JSON.parse(localStorage.getItem('currentTask'));
        this.task = actualTask;
        this.typeArray.push(this.task.transskript);
        if (this.task.audiofilename === decodedString) {
          this.rightAudio = true;
        } else {
          this.error = true;
          this.errorMessage = 'Dieser QR Code gehört nicht zu dieser Aufgabe. Überprüfe die Map um zu sehen welche Aufgabe hier erledigt werden muss.'
        }
      }
    },
    loadCam() {
      this.loadedcam = true;
    },
    typeText() {
      if(this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      }
      if(this.charIndex === this.typeArray[this.typeArrayIndex].length) {
        this.replayButton = true;
        this.setTimerForHelp();
        this.collectSolution = true;
      }
    },
    replay() {
      const audio = document.getElementById('audio');
      audio.currentTime = 0;
      audio.play();
      this.charIndex = 0;
      this.typeValue = '';
      this.typeText();
    },
    finish() {
      //TODO: display Help text from Countdown.
      console.log('finish');
    },
    setTimerForHelp() {
      this.countDownEnd = new Date(Date.now() +  3000 * 60);
      this.getHelp = true;
    },
    checkSolution() {
      this.checkingSolution = false;
      this.wrongAnswer = false;
      setTimeout(() => {
        if(this.solution == this.$route.params.solution) {
          this.checkingSolution = true;
          this.wrongAnswer = false;
          this.rightAnswer = true;
          this.setNewState();
        } else {
          this.wrongAnswer = true;
          this.checkingSolution = true;
        }
        this.solution = '';
      }, 2000);
    },
    setNewState() {
      const allTasks = JSON.parse(localStorage.getItem('tasks'));
      const currentTask = JSON.parse(localStorage.getItem('currentTask'));
      currentTask.completed = true;
      for(let i = 0; i < allTasks.length; i+=1) {
        if(allTasks[i].id === currentTask.id ) {
          allTasks[i] = currentTask;
        }
      }
      const x = JSON.stringify(allTasks);
      localStorage.setItem('tasks', x);
      this.changeStoreData(allTasks);
      //TODO: Maybe redirect to front page ?.
    },
    changeStoreData(payload) {
      this.$store.dispatch('task', payload);
    }
  },
  mounted() {
  }
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

.hidden {
  opacity: 0;
}

@keyframes cursorBlink {
  49% { background-color: #000; }
  50% { background-color: transparent; }
  99% { background-color: transparent; }
}
</style>

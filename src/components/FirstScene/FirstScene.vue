<template>
  <div class="main-wrapper">
    <div :class="[isDark ? 'game dark' : 'game']">
      <div @click="openDoor" class="door_1" :class="{'active1': !isDark}">
        <transition name="door">
          <div v-if="firstDoorOpened" class="openedDoor">
            <div class="top-shadow"></div>
            <div class="bottom-shadow"></div>
          </div>
        </transition>
      </div>
      <div class="sandBox" @click="openBox" :class="openedBox ? 'sandbox-opened' : 'sandbox-closed'">
      </div>
      <div class="dresser relative" @click="toggleDresser">
        <img v-if="showOpenedDresser" src="/images/openedDresser.png" alt="">
      </div>

      <img v-if="showNote && !noteReaded" @click="startReadNote" src="/images/note.png" alt=""
           class="note" :class="{'note-animation': showNote }"
           style="z-index: 4000">
      <div @click="changeText" class="door_2" :class="{'active2': secondDoorActive}"></div>
      <div @click="toggleLamp" class="lamp"></div>
      <div class="eye_blincking_up eye_blincking_up_animation"></div>
      <div class="eye_blincking_down eye_blincking_down_animation"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "FirstScene",
  props: {
    keyHanded: String,
  },
  data() {
    return {
      isDark: true,
      firstDoorOpened: false,
      showText: true,
      secondDoorActive: false,
      downing: null,
      yLocation: 0,
      showOpenedDresser: false,
      startDownAction: false,
      image: null,
      openedBox: false,
      noteReaded: false,
      imagePath: null,
      inventar: [],
      elements: [{}, {}, {}],
      showNote: false,
      cursorImage: null,
    }
  },
  computed: {
    bgImage() {
      return this.openedBox ? '/images/openedBoxBG.png' : '/images/first-scene-bg.png';
    }
  },
  mounted() {
    this.$emit('changeCredits', 'Мен қайдамын? Мынау қай жер…Қалай түстім мында? Жан-жақты қарап шығу керек')
    let file = require('@/assets/audios/background-music.mp3');
    let audio = new Audio(file)
    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
    audio.volume = 0.5;
    audio.play();

  },
  methods: {
    toggleLamp(){
      this.isDark = !this.isDark;
      let file2 = require('@/assets/audios/click_sound.mp3')
      let click_audio = new Audio(file2)
      click_audio.play();
    },
    openDoor() {
      if (this.keyHanded) {
        this.isDark = !this.isDark;
        let file2 = require('@/assets/audios/door_open_sound.mp3')
        let door_open_audio = new Audio(file2)
        door_open_audio.play();
        this.firstDoorOpened = !this.firstDoorOpened;
        setTimeout(()=> {
          this.$emit('setLevel', 2)
        }, 300)
      }
    },
    toggleDresser() {
      if (!this.isDark) {
        let file2 = require('@/assets/audios/cupboard_sound.mp3')
        let dresser_audio = new Audio(file2)
        dresser_audio.play();
        this.showOpenedDresser = true;
        this.showNote = true;
        this.startDownAction = true;
      }
    },
    startReadNote() {
      let file3 = require('@/assets/audios/grab_sound.mp3')
      let grab_audio = new Audio(file3)
      grab_audio.play();
      this.displayNote = true;
      this.$emit('displayNoteToggle', true);
      this.$emit('changeNoteImage', '/images/openedNote.png')
      this.addFirstPage();
      this.noteReaded = true;
    },
    changeText() {
      let file3 = require('@/assets/audios/lock_door_sound.mp3')
      let lock_door_audio = new Audio(file3)
      lock_door_audio.play();
      this.$emit('changeCredits', 'Бұл сыртқа шығатын есік. Жабық тұрған секілді. Басқа шығатын жер табу керек.')
    },
    openBox() {
      if (this.noteReaded) {
        this.openedBox = true;
        let file1 = require('@/assets/audios/box_open_sound.mp3')
        let box_audio = new Audio(file1)
        box_audio.play();
        this.$emit('setElementInInventar', {
          index: 1, payload: {
            id: 1,
            image: '/images/keys/key1.png',
            type: 'key'
          }
        })
        this.renderReload++
      }
    },
    addFirstPage() {
      this.$emit('setElementInInventar', {
        index: 0, payload:{
          id: 0,
          image: '/images/note.png',
          full_image: '/images/openedNote.png',
          type: 'note'
        }
      })
    },
    showContext(image) {
      this.image = image;
      this.$emit('showContext', image)
      this.displayNote = true;
    },
    changeCursor(image) {
      console.log('we are here')
      this.cursorImage = image
      this.$emit('changeCursor', image);
    }
  },

}
</script>

<style scoped>

.game {
  border: 5px solid #fff;
  min-width: 1080px;
  min-height: 720px;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../../public/images/first-scene-bg.png");
  position: relative;
}
.sandBox {
  position: absolute;
  width: 110px;
  height: 80px;
  top: 307px;
  right: 460px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}

.sandbox-opened {
  background-image: url("../../../public/images/openedBox.png");
}

.sandbox-closed {
  background-image: url("../../../public/images/closedBox.png");
}

.eye_blincking_up {
  position: absolute;
  width: 100%;
  top: 0;
  height: 0;
  background-color: #000;
}

.eye_blincking_down {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 0;
  background-color: #000;
}

.eye_blincking_up_animation {
  animation: eye_up 4s ease-in;
}
.eye_blincking_down_animation {
  animation: eye_down 4s ease-in;
}

@keyframes eye_up {
  0% { height: 0;}
  10% { height: 350px; }
  50% { height: 0; }
  60% { height: 270px; }
  100 { height: 0; }
}

@keyframes eye_down {
  0% { height: 0;}
  10% { height: 350px; }
  50% { height: 0; }
  60% { height: 270px;}
100 { height: 0; }
}

.note {
  @apply w-6 h-8;
  position: absolute;
  transform: rotate(5deg);
  top: 510px;
  left: 480px;
  cursor: pointer;
}

.note-animation {
  animation: note_falling ease-in 0.55s;
}

@keyframes note_falling {
  0%   {top: 390px; left: 480px }
  /*25%   {top: 445px; left: 475px }*/
  /*50%   {top: 470px; left: 483px }*/
  /*75%  {top: 490px; left: 478px}*/
  100% {top: 510px; left: 480px}
}

.door_1 {
  position: absolute;
  left: 212px;
  bottom: 170px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
  cursor: pointer;
}

.active1:hover {
  /*cursor: pointer;*/
  border: 2px solid deepskyblue;
}

.openedDoor {
  position: relative;
  width: 70%;
  height: 100%;
  background-color: #000;
  box-shadow: 10px 0 5px -2px #363636;
}

.top-shadow {
  position: absolute;
  top: 0;
  right: -55px;
  width: 0;
  height: 0;
  border-top: 10px solid #000;
  border-right: 55px solid transparent;
}

.bottom-shadow {
  position: absolute;
  bottom: 0;
  right: -55px;
  width: 0;
  height: 0;
  border-bottom: 10px solid #000;
  border-right: 55px solid transparent;
}

.door_2 {
  position: absolute;
  right: 180px;
  bottom: 170px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
  cursor: not-allowed;

}

.door-enter-active {
  transition: all 0.3s ease-out;
}

.door-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.door-enter-from,
.door-leave-to {
  opacity: 0;
}

.lamp {
  position: absolute;
  top: 80px;
  left: 540px;
  width: 30px;
  height: 30px;
  border-radius: 100%;

  transition: all .2s ease-in-out;
}

.lamp:hover {
  background-color: #dede78;
  opacity: 0.5;
  cursor: pointer;
}

.dark {
  opacity: 0.3;
}

.dresser {
  width: 140px;
  height: 168px;
  position: absolute;
  bottom: 180px;
  left: 482px;
  z-index: 3000;
  cursor: pointer;
}

.slide-move-enter-active {
  opacity: 1;
  transition: all 3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-move-leave-active {
  opacity: 0;
  transition: all 2s;
}

.slide-move-enter-from,
.slide-move-leave-to {
  opacity: 1;
  transform: translateY(10px);
}
</style>

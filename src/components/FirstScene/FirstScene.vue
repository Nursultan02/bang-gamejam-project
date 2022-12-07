<template>
  <div class="main-wrapper">
    <div :class="[isDark ? 'game dark' : 'game']" :style="`background-image: url(${bgImage})`">
      <div @click="openDoor" class="door_1" :class="{'active1': !isDark}">
        <transition name="door">
          <div v-if="firstDoorOpened" class="openedDoor">
            <div class="top-shadow"></div>
            <div class="bottom-shadow"></div>
          </div>
        </transition>
      </div>
      <div class="sandBox" @click="openBox"></div>
      <div class="dresser cursor-help relative" @click="toggleDresser">
        <img v-if="showOpenedDresser" src="@/assets/images/openedDresser.png" alt="">
        <Transition name="slide-move">
          <img v-if="showNote && !noteReaded" @click="startReadNote" src="@/assets/images/note.png" alt=""
               class="w-12 h-12"
               style="z-index: 4000">
        </Transition>
      </div>
      <div @click="changeText" class="door_2" :class="{'active2': secondDoorActive}"></div>
      <div @click="isDark = !isDark" class="lamp"></div>
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
      showTextTimeOut: null,
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
      return this.openedBox ? require('@/assets/images/openedBoxBG.png') : require('@/assets/images/first-scene-bg.png');
    }
  },
  mounted() {
    this.$emit('changeCredits', 'Мен қайдамын? Мынау қай жер…Қалай түстім мында? Жан-жақты қарап шығу керек')
    this.showTextTimeOut = setTimeout(() => {
      this.showText = false
      this.$emit('showTextToggle', false);
    }, 5000)
    let file = require('@/assets/audios/background-music.mp3');
    let audio = new Audio(file)
    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
    audio.play()

  },
  beforeDestroy() {
    clearTimeout(this.showTextTimeOut)
  },
  methods: {
    openDoor() {
      if (this.keyHanded) {
        this.firstDoorOpened = !this.firstDoorOpened;
        this.$emit('setLevel', 2)
      }
    },
    toggleDresser() {
      if (!this.isDark) {
        this.showOpenedDresser = true;
        this.showNote = true;
        this.startDownAction = true;
      }
    },
    startReadNote() {
      this.displayNote = true;
      this.$emit('displayNoteToggle', true);
      this.$emit('changeNoteImage', require('@/assets/images/openedNote.png'))
      this.addFirstPage();
      this.noteReaded = true;
    },
    changeText() {
      clearTimeout(this.showTextTimeOut)
      this.showText = true;
      this.$emit('changeCredits', 'Бұл сыртқа шығатын есік. Жабық тұрған секілді. Басқа шығатын жер табу керек.')
      this.showTextTimeOut(() => {
        this.showText = false;
      }, 3000)
    },
    openBox() {
      if (this.noteReaded) {
        this.openedBox = true;
        this.$emit('setElementInInventar', {
          index: 1, payload: {
            id: 1,
            image: require('@/assets/images/keys/key1.png'),
            type: 'key'
          }
        })
        this.renderReload++
      }
    },
    addFirstPage() {
      this.$emit('setElementInInventar', {
        index: 0, payload:{
          id: 2,
          image: require('@/assets/images/note.png'),
          full_image: require('@/assets/images/openedNote.png'),
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
  position: relative;
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
  z-index: 3000
}

.sandBox {
  position: absolute;
  width: 120px;
  height: 70px;
  top: 310px;
  right: 450px;
  border: 0;
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

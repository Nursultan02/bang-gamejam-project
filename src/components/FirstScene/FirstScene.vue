<template>
  <div class="main-wrapper" :style="`cursor: ${cursorImage ? `url(${cursorImage}) 20 20, pointer !important` :  'default'}`">
    <img @click="displayNote = false" v-if="displayNote" class=" w-72 h-96 fixed top-5"
         src="@/assets/images/openedNote.png" alt="" style="opacity: 1; z-index: 4000">
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
        <img v-if="showNote" @click="startReadNote" src="@/assets/images/note.png" alt="" class="absolute w-12 h-12"
             style="transition: all 5s; z-index: 4000"
             :style="`top: ${yLocation}px;`">
      </div>
      <div @click="changeText" class="door_2" :class="{'active2': secondDoorActive}"></div>
      <div @click="isDark = !isDark" class="lamp"></div>
    </div>
    <div class="absolute bottom-6 zText" style="min-width: 1080px">
      <textCustom :key="renderReload" :showText="showText"
                  @changeCursor="changeCursor"
                  :elements="elements"
                  :text="text"></textCustom>
    </div>
  </div>
</template>

<script>
import textCustom from '@/components/text'

export default {
  name: "FirstScene",
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
      displayNote: false,
      openedBox: false,
      noteReaded: false,
      imagePath: null,
      inventar: [],
      elements: [{}, {}, {}],
      showNote: false,
      cursorImage: null,
      renderReload: 1,
      text: 'Мен қайдамын? Мынау қай жер…Қалай түстім мында? Жан-жақты қарап шығу керек'
    }
  },
  computed: {
    bgImage() {
      return this.openedBox ? require('@/assets/images/openedBoxBG.png') : require('@/assets/images/first-scene-bg.png');
    }
  },
  mounted() {
    this.showTextTimeOut = setTimeout(() => {
      this.showText = false
    }, 5000)
    let file = require('@/assets/audios/background-music.mp3');
    let audio = new Audio(file)
    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    audio.play()
  },
  beforeDestroy() {
    clearTimeout(this.showTextTimeOut)
  },
  components: {
    textCustom
  },
  methods: {
    openDoor() {
      if(this.cursorImage) {
        this.firstDoorOpened = !this.firstDoorOpened;
        this.$emit('setLevel', 2)
      }
    },
    toggleDresser() {
      if (!this.isDark) {
        this.showOpenedDresser = true;
        this.showNote = true;
        this.yLocation = 140
        this.startDownAction = true;
      }
    },
    startReadNote() {
      this.displayNote = true;
      this.noteReaded = true;
    },
    changeText() {
      clearTimeout(this.showTextTimeOut)
      this.showText = true;
      this.text = 'Бұл сыртқа шығатын есік. Жабық тұрған секілді. Басқа шығатын жер табу керек.';
      this.showTextTimeOut(()=> {
        this.showText = false;
      }, 3000)
    },
    openBox() {
      if(this.noteReaded) {
        this.openedBox = true;

        this.elements[0] = {
          id: 1,
          image: require('@/assets/images/keys/key1.png'),
          type: 'key'
        }
        this.renderReload++
      }
    },
    addFirstPage() {
      this.elements[1] = {
        id: 2,
        image: require('@/assets/images/note.png'),
      }
      this.renderReload++;
    },
    changeCursor(image) {
      this.cursorImage = image;
    }
  },

}
</script>

<style scoped>
.main-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  /*background: rgb(87,0,0);*/
  /*background: linear-gradient(90deg, rgba(87,0,0,1) 0%, rgba(220,0,255,1) 48%, rgba(29,10,24,1) 90%);*/
}

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
</style>

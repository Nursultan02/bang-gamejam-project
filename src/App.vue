<template>
  <div style="height: 100vh" class="main-wrapper"
       :style="`cursor: ${cursorImage ? `url(${cursorImage}) 20 20, pointer !important` :  'default'}`">
    <Transition name="bounce">
      <div v-if="displayNote" class="fixed flex justify-center items-center"
           style="width: 100vw; height: 100vh; z-index: 6000000;  background-color: rgba(0, 0, 0, 0.8);">
        <img @click="displayNote = false" class="-mt-8"
             :src="noteImage" alt="" style="opacity: 1; height: 500px; z-index: 40000000000">
      </div>
    </Transition>
    <start-page @start-scene="setScene(1)" v-if="!level && !cutSceneShow"></start-page>
    <video @ended="setLevel(1)" autoplay height="100%" width="100%"
           v-if="cutSceneShow === 1 && ![1, 2, 3, 4].includes(level)" src="@/assets/videos/Scene1.mp4"></video>
    <FirstScene :keyHanded="cursorImage"
                @setElementInInventar="setElementInInventar"
                @changeCredits="changeCredits"
                @changeNoteImage="changeNoteImage"
                @displayNoteToggle="displayNoteToggle"
                @setLevel="setLevel"
                v-if="level === 1 && !finish"></FirstScene>
    <SecondScene :elementsLength="elements.length"
                 @setFinish="setFinish"
                 :finish="finish"
                 :cursorType="cursorType"
                 :cursorImage="cursorImage"
                 @resetCursor="resetCursor"
                 @changeCredits="changeCredits"
                 @setLevel="setLevel"
                 @setElementInInventar="setElementInInventar"
                 @displayNoteToggle="displayNoteToggle"
                 @changeNoteImage="changeNoteImage"
                 v-if="level === 2 && !finish"></SecondScene>
    <ThirdScene :elementsLength="elements.length"
                @changeCredits="changeCredits"
                @changeNoteImage="changeNoteImage"
                @setLevel="setLevel"
                @displayNoteToggle="displayNoteToggle"
                @setElementInInventar="setElementInInventar"
                v-if="level === 3 && !finish"></ThirdScene>
    <FourthScene :elementsLength="elements.length"
                 @setLevel="setLevel"
                 @displayNoteToggle="displayNoteToggle"
                 @setElementInInventar="setElementInInventar"
                 @changeNoteImage="changeNoteImage"
                 v-if="level === 4 && !finish"></FourthScene>
    <div class="absolute bottom-6 zText" style="min-width: 1080px" v-if="level && cutSceneShow && !finish">
      <textCustom @setCursorType="setCursorType"
          :renderReload="renderReload" :showText="showText"
                  @changeCursor="changeCursor"
                  :elements="elements"
                  @showTextToggle="showTextToggle"
                  @showContext="showContext"
                  :text="text"
      ></textCustom>
    </div>
    <video v-if="finish === 'horror'" style="margin-top: -30px; z-index: 900000000" src="@/assets/videos/horror.mp4"  autoplay height="100%" width="100%"></video>
    <video v-if="finish === 'nice'" style="margin-top: -30px; z-index: 900000000" src="@/assets/videos/niceEnded.mp4"  autoplay height="100%" width="100%"></video>
  </div>
</template>

<script>
import StartPage from '@/components/startTemplate';
import FirstScene from "@/components/FirstScene/FirstScene";
import SecondScene from "@/components/SecondScene/SecondScene";
import ThirdScene from "@/components/ThirdScene/ThirdScene";
import FourthScene from "@/components/FourthScene/FourthScene";
import textCustom from '@/components/text'

export default {
  name: 'App',
  components: {ThirdScene, FourthScene, SecondScene, FirstScene, StartPage, textCustom},
  data() {
    return {
      level: null,
      cutSceneShow: null,
      elements: [],
      renderReload: 1,
      displayNote: false,
      text: '',
      noteImage: null,
      showText: true,
      cursorImage: null,
      cursorType: null,
      finish: null,
    }
  },
  mounted() {
    let level = localStorage.getItem('level');
    if (level) {
      this.level = parseInt(level);
    }
  },
  methods: {
    setScene(val) {
      this.cutSceneShow = val;
    },
    setLevel(val) {
      this.level = val
    },
    showTextToggle(val) {
      this.showText = val;
    },
    changeCursor(val) {
      this.cursorImage = val
    },
    showContext(val) {
      this.noteImage = val
      this.displayNoteToggle(true)
    },
    displayNoteToggle(val) {
      this.displayNote = val
    },
    changeNoteImage(val) {
      this.noteImage = val
    },
    changeCredits(val) {
      this.text = val
    },
    mouseMoving(e) {
      console.log(e);
      if (e.target.className !== 'door_1 active1' && e.srcElement !== e.target) {
        this.resetCursor();
        window.removeEventListener('click', this.mouseMoving)
      }
    },
    setElementInInventar({payload}) {
      let index = this.elements.findIndex(k => k.id === payload.id);
      if (index === -1) {
        this.elements.push(payload);
        this.renderReload++
      }
      console.log(this.elements)
    },
    setCursorType(val) {
      this.cursorType = val
    },
    setFinish(val) {
      this.finish = val;
      this.resetCursor()
    },
    resetCursor() {
      this.cursorImage = null;
    },
  }
}
</script>

<style>
.VueCarousel-dot-container {
  margin-top: 0 !important
}

.VueCarousel-dot {
  margin-top: 0 !important
}

.VueCarousel-slide {
  margin-right: 0 !important;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden
}

.main-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
    background-color: rgba(0, 0, 0, 0.8);
  }
}


</style>

<template>
  <div style="height: 100vh" class="main-wrapper"
       :style="`cursor: ${cursorImage ? `url(${cursorImage}) 20 20, pointer !important` :  'default'}`">
    <Transition name="bounce">
      <div v-if="displayNote" class="fixed flex justify-center items-center"
           style="width: 100vw; height: 100vh; z-index: 6000000;     background-color: rgba(0, 0, 0, 0.8);">
        <img @click="displayNote = false" class="h-96 -mt-8"
             :src="noteImage" alt="" style="opacity: 1; z-index: 40000000000">
      </div>
    </Transition>
    <start-page @start-scene="setScene(1)" v-if="!level && !cutSceneShow"></start-page>
    <video @ended="setLevel(1)" autoplay height="100%" width="100%"
           v-if="cutSceneShow === 1 && ![1, 2, 3, 4].includes(level)" src="@/assets/videos/Scene1.mp4"></video>
    <FirstScene :keyHanded="cursorImage" @setElementInInventar="setElementInInventar" @changeCredits="changeCredits"
                @changeNoteImage="changeNoteImage" @displayNoteToggle="displayNoteToggle" @setLevel="setLevel"
                v-if="level === 1"></FirstScene>
    <SecondScene @resetCursor="resetCursor" @changeCredits="changeCredits" @setLevel="setLevel"
                 v-if="level === 2"></SecondScene>
    <ThirdScene @changeCredits="changeCredits" @changeNoteImage="changeNoteImage" @setLevel="setLevel"
                @displayNoteToggle="displayNoteToggle" @setElementInInventar="setElementInInventar"
                v-if="level === 3"></ThirdScene>
    <FourthScene @setLevel="setLevel" @displayNoteToggle="displayNoteToggle"
                 @setElementInInventar="setElementInInventar" @changeNoteImage="changeNoteImage"
                 v-if="level === 4"></FourthScene>
    <div class="absolute bottom-6 zText" style="min-width: 1080px" v-if="level && cutSceneShow">
      <textCustom :renderReload="renderReload" :showText="showText"
                  @changeCursor="changeCursor"
                  :elements="elements"
                  @showTextToggle="showTextToggle"
                  @showContext="showContext"
                  :text="text"
      ></textCustom>
    </div>
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
      level: 1,
      cutSceneShow: 2,
      elements: [
        // {
        //   index: 3, payload: {
        //     image: require("@/assets/images/third-scene-eye.png"),
        //     type: 'eye'
        //   }
        // },
        // {
        //   id: 2,
        //   image: require('@/assets/images/note.png'),
        //   full_image: require('@/assets/images/openedNote.png'),
        //   type: 'note'
        // },
        // {
        //   id: 1,
        //   image: require('@/assets/images/keys/key1.png'),
        //   type: 'key'
        // },
        // {
        //   image: require('@/assets/images/ThirdScene/blueNote.png'),
        //   full_image: require('@/assets/images/ThirdScene/noteThirdScene.png'),
        //   type: 'note'
        // },
        // {
        //   image: require('@/assets/images/fourthScene/FirstNote.png'),
        //   full_image: require('@/assets/images/fourthScene/openedFirstNote.png'),
        //   type: 'key'
        // }
      ],
      renderReload: 1,
      displayNote: false,
      text: '',
      noteImage: null,
      showText: true,
      cursorImage: null,
    }
  },
    mounted()
    {
      let level = localStorage.getItem('level');
      if (level) {
        this.level = parseInt(level);
      }

    }
  ,
    methods: {
      setScene(val)
      {
        this.cutSceneShow = val;
      }
    ,
      setLevel(val)
      {
        this.level = val
      }
    ,
      showTextToggle(val)
      {
        this.showText = val;
      }
    ,
      changeCursor(val)
      {
        this.cursorImage = val

        if (this.cursorImage) {
          console.log('mouse is active')
          // window.addEventListener('click', this.mouseMoving)
        }
      }
    ,
      showContext(val)
      {
        this.noteImage = val
        this.displayNoteToggle(true)
      }
    ,
      displayNoteToggle(val)
      {
        this.displayNote = val
      }
    ,
      changeNoteImage(val)
      {
        this.noteImage = val
      }
    ,
      changeCredits(val)
      {
        this.text = val
      }
    ,
      mouseMoving(e)
      {
        console.log(e);
        if (e.target.className !== 'door_1 active1' && e.srcElement !== e.target) {
          this.resetCursor();
          window.removeEventListener('click', this.mouseMoving)
        }
      }
    ,
      setElementInInventar({payload})
      {
        this.elements.push(payload);
        console.log(this.elements)
        this.renderReload++
      }
    ,
      resetCursor()
      {
        this.cursorImage = null;
      }
    ,
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

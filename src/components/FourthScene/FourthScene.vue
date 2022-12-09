<template>
  <div class="main-wrapper">
    <div :class="[isDark ? 'game dark' : 'game']">
      <div @mouseenter="mouseEnterOnBed" class="kid_bed" :class="{'kid_bed_moving': !showTree}" @click="showMagicTree"></div>

      <div  class="magic_tree" :class="{'magic_tree_showing': showTree}"></div>

      <div @click="getNodeFromBird" class="bird" :class="{'bird_opened': birdOpened, 'bird_closed': !birdOpened, 'bird_showing': showTree}"></div>
      <img @click="openFirstNote" v-if="showNote && !firstNoteReaded" src="/images/fourthScene/FirstNote.png" class="note" :class="{'note-animation': showNote}" alt="">
      <div class="cupboard" :class="cupboardClosed ? 'closed_cupboard' : 'opened_cupboard'"></div>
      <img v-if="showLiver" @click="addLiver" src="/images/fourthScene/liver.png" class="liver" alt="">
      <img v-if="showSecondNote" @click="openSecondNote" src="/images/fourthScene/FirstNote.png" class="second-note" alt="">

      <div v-if="showTree" class="flower"></div>

      <div v-for="i in 6" @click="handleKeyClick(i)" :class="`petal-${i}`" :key="i"></div>

      <div v-if="elementsLength === 7" @click="goBack" class="back-icon">
        <img src="/images/back-icon-left.png" alt="">
      </div>

      <div @click="toggleLamp" class="lamp_1"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "FourthScene",
  props: {
    elementsLength: Number,
  },
  data(){
    return {
      correctCombination: [1, 2, 6, 5, 4, 3],
      typeCombination: [],
      showTree: false,
      birdOpened: true,
      cupboardClosed: true,
      showNote: false,
      firstNoteReaded: false,
      showLiver: false,
      showSecondNote: false,
      isDark: false,
    }
  },
  methods: {
    toggleLamp(){
      this.isDark = !this.isDark;
      let file2 = require('@/assets/audios/click_sound.mp3')
      let click_audio = new Audio(file2)
      click_audio.play();
    },
    mouseEnterOnBed(){
      if(!this.showTree){
        let file = require('@/assets/audios/bed_shaking_sound.mp3')
        let lamp_audio = new Audio(file)
        lamp_audio.play();
      }
    },
    goBack(){
      this.$emit("setLevel", 2);
    },
    showMagicTree(){
      this.showTree = true;
    },
    getNodeFromBird(){
      setInterval(() => {
        this.birdOpened = !this.birdOpened;
      },1000)
      let file = require('@/assets/audios/bird_sound.mp3')
      let bird_audio = new Audio(file)
      bird_audio.play();
      this.showNote = true;
    },
    reset() {
      this.typeCombination = [];
    },
    openFirstNote() {
      let file = require('@/assets/audios/grab_sound.mp3')
      let grab_audio = new Audio(file)
      grab_audio.play();
      this.$emit('displayNoteToggle', true);
      this.$emit('changeNoteImage', '/images/fourthScene/openedSecondNote.png')
      this.$emit('setElementInInventar', {
        index: 5, payload: {
          image: '/images/fourthScene/FirstNote.png',
          full_image: '/images/fourthScene/openedSecondNote.png',
          type: 'note',
          id: 6
        }
      })
      this.firstNoteReaded = true;
    },
    openSecondNote() {
      let file = require('@/assets/audios/grab_sound.mp3')
      let grab_audio = new Audio(file)
      grab_audio.play();
      this.$emit('displayNoteToggle', true);
      this.$emit('changeNoteImage', '/images/fourthScene/openedFirstNote.png')
      this.$emit('setElementInInventar', {
        index: 5, payload: {
          image: '/images/fourthScene/FirstNote.png',
          full_image: '/images/fourthScene/openedFirstNote.png',
          type: 'note',
          id: 7
        }
      })
      this.showSecondNote = false;
      if(!this.showSecondNote && !this.showLiver && !this.cupboardClosed) {
        // this.$emit('setLevel', 2)
      }
    },
    addLiver() {
      let file = require('@/assets/audios/grab_sound.mp3')
      let grab_audio = new Audio(file)
      grab_audio.play();
      this.$emit('setElementInInventar', {
        index: 5, payload: {
          image: '/images/fourthScene/liver.png',
          title: 'liver',
          type: 'key',
          id: 5
        }
      })
      this.showLiver = false;
      if(!this.showLiver && !this.showSecondNote && !this.cupboardClosed) {
        this.showBackIcon = true;
        // this.$emit('setLevel', 2)
      }
    },
    handleKeyClick(key) {
      console.log(key);
      if (this.typeCombination.length === 6) {
        return
      }

      let file = require('@/assets/audios/click_sound.mp3')
      let click_audio = new Audio(file)
      click_audio.play();

      this.typeCombination.push(key);
      let len = this.typeCombination.length;

      console.log("Длина", len)
      console.log("KEY:", key)

      if (len === 1 && this.correctCombination[0] !== key) {
        console.log('working')
        this.reset();
      }
      if (len === 2 && this.correctCombination[1] !== key) {
        this.reset();
      }
      if (len === 3 && this.correctCombination[2] !== key) {
        this.reset();
      }
      if (len === 4 && this.correctCombination[3] !== key) {
        this.reset();
      }
      if (len === 5 && this.correctCombination[4] !== key) {
        this.reset();
      }
      if (len === 6) {

        if(this.correctCombination[5] === key){
          console.log("WIN")
          let file = require('@/assets/audios/door_open_sound.mp3')
          let door_open_audio = new Audio(file)
          door_open_audio.play();
          this.cupboardClosed = false;
          this.showSecondNote = true;
          this.showLiver = true;

        }else {
          this.reset();
        }
      }
    },
  },
  mounted(){
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
  background-image: url("../../../public/images/fourthScene/fourth-scene-bg.png");
  position: relative;
}

.dark {
  opacity: 0.3;
}

.lamp_1 {
  position: absolute;
  top: 57px;
  left: 519px;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  cursor: pointer;
}


.back-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 30px;
  left: 8px;
  cursor: pointer;
}


.petal-1 {
  position: absolute;
  z-index: 25;
  width: 10px;
  height: 18px;
  top: 145px;
  left: 588px;
  border-radius: 10px;
  transform: rotate(-30deg);
  cursor: pointer;
}

.petal-2 {
  position: absolute;
  z-index: 25;
  width: 15px;
  height: 18px;
  top: 146px;
  left: 605px;
  border-radius: 10px;
  transform: rotate(40deg);
  cursor: pointer;
}

.petal-3 {
  position: absolute;
  z-index: 25;
  width: 10px;
  height: 20px;
  top: 163px;
  left: 608px;
  border-radius: 10px;
  transform: rotate(120deg);
  cursor: pointer;
}

.petal-4 {
  position: absolute;
  z-index: 25;
  width: 10px;
  height: 15px;
  top: 178px;
  left: 603px;
  border-radius: 10px;
  transform: rotate(-30deg);
  cursor: pointer;
}

.petal-5 {
  position: absolute;
  z-index: 25;
  width: 13px;
  height: 20px;
  top: 174px;
  left: 584px;
  border-radius: 10px;
  transform: rotate(30deg);
  cursor: pointer;
}

.petal-6 {
  position: absolute;
  z-index: 25;
  width: 13px;
  height: 20px;
  top: 157px;
  left: 576px;
  border-radius: 10px;
  transform: rotate(-90deg);
  cursor: pointer;
}

.flower {
  position: absolute;
  z-index: 10;
  top: 140px;
  left: 570px;
  width: 60px;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../../public/images/fourthScene/flower.png");
}

.cupboard {
  z-index: 20;
  position: absolute;
  top: 210px;
  left: 440px;
  width: 250px;
  height: 350px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.opened_cupboard {
  background-image: url("../../../public/images/fourthScene/opened_cupboard.png");
}

.closed_cupboard {
  background-image: url("../../../public/images/fourthScene/closed_cupboard.png");
}

.bird {
  position: absolute;
  top: 232px;
  left: 130px;
  width: 65px;
  height: 65px;
  background-image: url("../../../public/images/fourthScene/closed_bird.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  transition: 1.2s ease-in-out;
  cursor: pointer;
}

.bird_showing {
  opacity: 1;
}

.bird_opened {
  background-image: url("../../../public/images/fourthScene/opened_bird.png");
}

.bird_closed {
  background-image: url("../../../public/images/fourthScene/closed_bird.png");
}

.magic_tree {
  position: absolute;
  top: 230px;
  left: -50px;
  width: 270px;
  height: 370px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../../public/images/fourthScene/magic_tree.png");
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}

.magic_tree_showing {
  opacity: 1;
}

.kid_bed {
  position: absolute;
  width: 260px;
  height: 195px;
  left: 55px;
  bottom: 130px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../../public/images/fourthScene/kid_bed.png");
  cursor: pointer;
}

.kid_bed_moving:hover {
  animation: move_kid_bed ease-in-out .1s infinite;
}

@keyframes move_kid_bed {
  0% { left: 52px; }
  50% { left: 58px; }
  100% { left: 55px; }
}

.liver {
  @apply absolute;
  transform: rotate(5deg);
  top: 360px;
  left: 550px;
  z-index: 100000;
  cursor: pointer;
}


.second-note {
  @apply w-6 h-8 absolute;
  transform: rotate(5deg);
  top: 300px;
  left: 550px;
  z-index: 100000;
  cursor: pointer;
}

.note {
  @apply w-6 h-8;
  position: absolute;
  transform: rotate(-5deg);
  top: 535px;
  left: 130px;
  cursor: pointer;
}

.note-animation {
  animation: note_falling 0.55s;
}

@keyframes note_falling {
  0% {
    top: 220px
  }
  /*25%   {top: 445px; left: 475px }*/
  /*50%   {top: 470px; left: 483px }*/
  /*75%  {top: 490px; left: 478px}*/
  100% {
    top: 535px
  }
}

</style>

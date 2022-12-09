<template>
  <div class="main-wrapper">
    <div :class="[isDark ? 'game dark' : 'game']">
      <div class="fire" :style="fireStyle">
        <div class="particle" v-for="i in 50" :key="i"></div>
      </div>
      <div @click="handleKeyClick(1)" class="key-1" :class="showPromts ? 'active-key' : ''"></div>
      <div @click="handleKeyClick(2)" class="key-2" :class="showPromts ? 'active-key' : ''"></div>
      <div @click="handleKeyClick(3)" class="key-3" :class="showPromts ? 'active-key' : ''"></div>
      <div @click="handleKeyClick(4)" class="key-4" :class="showPromts ? 'active-key' : ''"></div>

      <div v-if="!showPromts" class="answer-hider">
      </div>

      <div @mouseenter="mouseEnterOnLamp" @click="setShowPrompts" class="lamp" :class="{'lamp-animating': !showPromts}"></div>
      <div v-if="showNote && !noteReaded">
        <img @click="startReadNote" src="images/ThirdScene/blueNote.png" alt=""
             class="note" :class="{'note-animation': showNote }"
        >
      </div>
      <div  class="eye"></div>

      <div class="claw1"></div>
      <div class="claw2"></div>
      <div class="claw3"></div>
      <div class="claw4"></div>
      <div class="claw5"></div>
      <div @click="addToInventary" v-if="showEye" class="eye-element" :class="giveEye ? 'eye-element-falling' : ''"></div>

      <div v-if="elementsLength === 4" @click="goBack" class="back-icon">
        <img src="../../../public/images/back-icon-right.png" alt="">
      </div>

      <div @click="toggleLamp" class="lamp_1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThirdScene",
  props: {
    elementsLength: Number,
  },
  data() {
    return {
      correctCombination: [3, 2, 1, 4, 1],
      typeCombination: [],
      fireSize: "14px",
      showPromts: false,
      giveEye: false,
      showNote: false,
      noteReaded: false,
      showEye: true,
      audio: null,
      isDark: false,
    };
  },
  mounted() {
    this.$emit("changeCredits", 'Үй иесінің кабинеті секілді. Мұнда не бар екенін көрейік.')
    let file = require('@/assets/audios/fire_sound.mp3')
    this.audio = new Audio(file)
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
    this.audio.play();
  },
  computed: {
    fireStyle() {
      return {
        "font-size": this.fireSize
      }
    }
  },
  methods: {
    toggleLamp(){
      this.isDark = !this.isDark;
      let file2 = require('@/assets/audios/click_sound.mp3')
      let click_audio = new Audio(file2)
      click_audio.play();
    },
    mouseEnterOnLamp(){
      if(!this.showNote){
        let file = require('@/assets/audios/shake_lamp_sound.mp3')
        let lamp_audio = new Audio(file)
        lamp_audio.play();
      }

    },
    goBack(){
      this.$emit("setLevel", 2);
    },
    setShowPrompts() {
      this.showPromts = true;
      setTimeout(()=> {
        this.showNote = true
      }, 200)
    },
    reset() {
      this.fireSize = '14px';
      this.typeCombination = [];
    },
    handleKeyClick(key) {
      console.log(key);
      if (!this.showPromts) {
        return
      }
      let file = require('@/assets/audios/button_push_sound.mp3')
      let button_push_audio = new Audio(file)
      button_push_audio.play();

      this.typeCombination.push(key);
      let len = this.typeCombination.length;
      console.log("Длина", len)
      console.log("KEY:", key)
      if (len === 1) {
        if (this.correctCombination[0] === key) {
          this.fireSize = '12px';
          this.audio.volume = 0.8;
        } else {
          this.reset();
        }
      }
      if (len === 2) {
        if (this.correctCombination[1] === key) {
          this.fireSize = '10px';
          this.audio.volume = 0.6;
        } else {
          this.reset();
        }
      }
      if (len === 3) {
        if (this.correctCombination[2] === key) {
          this.fireSize = '8px';
          this.audio.volume = 0.4;
        } else {
          console.log(this.typeCombination)
          this.reset();
        }
      }
      if (len === 4) {
        if (this.correctCombination[3] === key) {
          this.fireSize = '5px';
          this.audio.volume = 0.2;
        } else {
          this.reset();
        }
      }
      if (len === 5) {
        if (this.correctCombination[4] === key) {
          this.fireSize = '3px';
          this.audio.volume = 0;
          this.giveEye = true;
          let file = require('@/assets/audios/eye_falling_sound.mp3')
          let eye_audio = new Audio(file)
          eye_audio.play();
          console.log('DONE!')
        } else {
          this.reset();
        }
      }
    },
    addToInventary() {
      let file = require('@/assets/audios/grab_sound.mp3')
      let grab_audio = new Audio(file)
      grab_audio.play();
      this.$emit('setElementInInventar', {
        index: 3, payload: {
          image: "images/third-scene-eye.png",
          type: 'key',
          title: 'eye',
          id: 8
        }
      })

      this.showEye = false;
    },
    startReadNote() {
      let file = require('@/assets/audios/grab_sound.mp3')
      let grab_audio = new Audio(file)
      grab_audio.play();
      this.$emit('displayNoteToggle', true);
      this.$emit('changeNoteImage', '/images/ThirdScene/noteThirdScene.png');
      this.$emit('setElementInInventar', {
        index: 2, payload: {
          image: '/images/ThirdScene/blueNote.png',
          full_image: '/images/ThirdScene/noteThirdScene.png',
          type: 'note',
          id: 9
        }
      })
      this.noteReaded = true;
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
  background-image: url("../../../public/images/third-scene-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.dark {
  opacity: 0.3;
}

.lamp_1 {
  position: absolute;
  top: 60px;
  left: 515px;
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
  right: 8px;
  cursor: pointer;
}


.eye-element {
  position: absolute;
  width: 25px;
  height: 25px;
  background-image: url("../../../public/images/third-scene-eye.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  cursor: pointer;
}

.eye-element-falling {
  opacity: 1;
  animation: eye-falling 1.5s ease;
  top: 540px;
  right: 180px;
}

@keyframes eye-falling {
  0% {
    top: 370px;
    width: 30px;
    height: 30px;
  }
  25% {
    top: 540px;
  }
  50% {
    top: 510px;
    right: 170px;
  }
  75% {
    top: 540px;
    right: 175px;
  }
  100% {
    top: 540px;
    right: 180px;
    transform: rotate(-720deg);
  }
}

.eye {
  position: absolute;
  top: 134px;
  right: 164px;
  background-color: #B87333;
  width: 6px;
  height: 6px;
  border-radius: 50%;

  animation: claw_blicking 1s infinite;
}

.claw1 {
  position: absolute;
  top: 10px;
  right: 169px;
  width: 3px;
  height: 20px;
  border-radius: 50% 50% 30% 30%;
  background-color: #B87333;
  transform: rotate(-20deg);

  animation: claw_blicking 1s infinite;
}

@keyframes claw_blicking {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.claw2 {
  position: absolute;
  top: 7px;
  right: 141px;
  width: 3px;
  height: 20px;
  border-radius: 50% 50% 30% 30%;
  background-color: #B87333;
  transform: rotate(22deg);

  animation: claw_blicking 1s infinite;
}

.claw3 {
  position: absolute;
  top: 13px;
  right: 120px;
  width: 3px;
  height: 20px;
  border-radius: 50% 50% 30% 30%;
  background-color: #B87333;
  transform: rotate(40deg);

  animation: claw_blicking 1s infinite;
}

.claw4 {
  position: absolute;
  top: 36px;
  right: 112px;
  width: 3px;
  height: 17px;
  border-radius: 50% 50% 30% 30%;
  background-color: #B87333;
  transform: rotate(43deg);

  animation: claw_blicking 1s infinite;
}

.claw5 {
  position: absolute;
  top: 86px;
  right: 185px;
  width: 3px;
  height: 14px;
  border-radius: 50% 50% 30% 30%;
  background-color: #B87333;
  transform: rotate(-130deg);

  animation: claw_blicking 1s infinite;
}

.lamp {
  position: absolute;
  top: 162px;
  right: 266px;
  width: 30px !important;
  height: 89px !important;
  cursor: pointer;
  background-image: url("../../../public/images/third-scene-lamp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  transition: all .25s ease-in-out;
}

.lamp-animating:hover {
  animation: lamp_animation .2s infinite;
}

@keyframes lamp_animation {
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-5deg);
  }
}

.answer-hider {
  position: absolute;
  top: 236px;
  left: 464px;
  width: 34px;
  height: 249.5px;
  background-color: #30304e;
}

.key-1 {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 260px;
  right: 218px;
  cursor: pointer;
  background-color: #19315a;
}

.key-2 {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 260px;
  right: 167px;
  cursor: pointer;
  caret-color: red;
  background-color: #19315a;
}

.key-3 {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 260px;
  right: 115px;
  cursor: pointer;
  caret-color: red;
  background-color: #19315a;
}

.key-4 {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 260px;
  right: 62px;
  cursor: pointer;
  caret-color: red;
  background-color: #19315a;
}

.active-key {
  opacity: 0;
}

/*body {*/
/*  background-color: #300808;*/
/*  margin: 0;*/
/*}*/

.fire {
  opacity: 0.8;
  filter: blur(0.02em);
  -webkit-filter: blur(0.02em);
  position: absolute;
  bottom: 230px;
  right: 140px;
  width: 20px;
  height: 20px;

  transition: all 0.2s;
}

.particle {
  animation: rise 1s ease-in infinite;
  background-image: radial-gradient(#ff5000 20%, rgba(255, 80, 0, 0) 70%);
  border-radius: 50%;
  mix-blend-mode: screen;
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 5em;
  height: 5em;
}

.particle:nth-of-type(1) {
  animation-delay: 0.4747584992s;
  left: calc((100% - 5em) * 0);
}

.particle:nth-of-type(2) {
  animation-delay: 0.1285312199s;
  left: calc((100% - 5em) * 0.02);
}

.particle:nth-of-type(3) {
  animation-delay: 0.3277711721s;
  left: calc((100% - 5em) * 0.04);
}

.particle:nth-of-type(4) {
  animation-delay: 0.8694147043s;
  left: calc((100% - 5em) * 0.06);
}

.particle:nth-of-type(5) {
  animation-delay: 0.341012885s;
  left: calc((100% - 5em) * 0.08);
}

.particle:nth-of-type(6) {
  animation-delay: 0.1819108914s;
  left: calc((100% - 5em) * 0.1);
}

.particle:nth-of-type(7) {
  animation-delay: 0.4552155287s;
  left: calc((100% - 5em) * 0.12);
}

.particle:nth-of-type(8) {
  animation-delay: 0.9992087792s;
  left: calc((100% - 5em) * 0.14);
}

.particle:nth-of-type(9) {
  animation-delay: 0.6589042582s;
  left: calc((100% - 5em) * 0.16);
}

.particle:nth-of-type(10) {
  animation-delay: 0.5667886593s;
  left: calc((100% - 5em) * 0.18);
}

.particle:nth-of-type(11) {
  animation-delay: 0.6377394676s;
  left: calc((100% - 5em) * 0.2);
}

.particle:nth-of-type(12) {
  animation-delay: 0.0588100113s;
  left: calc((100% - 5em) * 0.22);
}

.particle:nth-of-type(13) {
  animation-delay: 0.8967164081s;
  left: calc((100% - 5em) * 0.24);
}

.particle:nth-of-type(14) {
  animation-delay: 0.8934641475s;
  left: calc((100% - 5em) * 0.26);
}

.particle:nth-of-type(15) {
  animation-delay: 0.1477251067s;
  left: calc((100% - 5em) * 0.28);
}

.particle:nth-of-type(16) {
  animation-delay: 0.316645678s;
  left: calc((100% - 5em) * 0.3);
}

.particle:nth-of-type(17) {
  animation-delay: 0.4554398848s;
  left: calc((100% - 5em) * 0.32);
}

.particle:nth-of-type(18) {
  animation-delay: 0.2327872285s;
  left: calc((100% - 5em) * 0.34);
}

.particle:nth-of-type(19) {
  animation-delay: 0.1704135174s;
  left: calc((100% - 5em) * 0.36);
}

.particle:nth-of-type(20) {
  animation-delay: 0.4504881332s;
  left: calc((100% - 5em) * 0.38);
}

.particle:nth-of-type(21) {
  animation-delay: 0.3558069876s;
  left: calc((100% - 5em) * 0.4);
}

.particle:nth-of-type(22) {
  animation-delay: 0.6109724811s;
  left: calc((100% - 5em) * 0.42);
}

.particle:nth-of-type(23) {
  animation-delay: 0.4528510082s;
  left: calc((100% - 5em) * 0.44);
}

.particle:nth-of-type(24) {
  animation-delay: 0.9268736732s;
  left: calc((100% - 5em) * 0.46);
}

.particle:nth-of-type(25) {
  animation-delay: 0.7110786071s;
  left: calc((100% - 5em) * 0.48);
}

.particle:nth-of-type(26) {
  animation-delay: 0.7876004427s;
  left: calc((100% - 5em) * 0.5);
}

.particle:nth-of-type(27) {
  animation-delay: 0.5368552689s;
  left: calc((100% - 5em) * 0.52);
}

.particle:nth-of-type(28) {
  animation-delay: 0.9208490385s;
  left: calc((100% - 5em) * 0.54);
}

.particle:nth-of-type(29) {
  animation-delay: 0.4771952935s;
  left: calc((100% - 5em) * 0.56);
}

.particle:nth-of-type(30) {
  animation-delay: 0.9255196027s;
  left: calc((100% - 5em) * 0.58);
}

.particle:nth-of-type(31) {
  animation-delay: 0.2284569704s;
  left: calc((100% - 5em) * 0.6);
}

.particle:nth-of-type(32) {
  animation-delay: 0.4962997814s;
  left: calc((100% - 5em) * 0.62);
}

.particle:nth-of-type(33) {
  animation-delay: 0.1845312734s;
  left: calc((100% - 5em) * 0.64);
}

.particle:nth-of-type(34) {
  animation-delay: 0.0789857947s;
  left: calc((100% - 5em) * 0.66);
}

.particle:nth-of-type(35) {
  animation-delay: 0.897189747s;
  left: calc((100% - 5em) * 0.68);
}

.particle:nth-of-type(36) {
  animation-delay: 0.4626522359s;
  left: calc((100% - 5em) * 0.7);
}

.particle:nth-of-type(37) {
  animation-delay: 0.2561782919s;
  left: calc((100% - 5em) * 0.72);
}

.particle:nth-of-type(38) {
  animation-delay: 0.6752678883s;
  left: calc((100% - 5em) * 0.74);
}

.particle:nth-of-type(39) {
  animation-delay: 0.5099427207s;
  left: calc((100% - 5em) * 0.76);
}

.particle:nth-of-type(40) {
  animation-delay: 0.0695083625s;
  left: calc((100% - 5em) * 0.78);
}

.particle:nth-of-type(41) {
  animation-delay: 0.4876069257s;
  left: calc((100% - 5em) * 0.8);
}

.particle:nth-of-type(42) {
  animation-delay: 0.7284629228s;
  left: calc((100% - 5em) * 0.82);
}

.particle:nth-of-type(43) {
  animation-delay: 0.9935912053s;
  left: calc((100% - 5em) * 0.84);
}

.particle:nth-of-type(44) {
  animation-delay: 0.2113934282s;
  left: calc((100% - 5em) * 0.86);
}

.particle:nth-of-type(45) {
  animation-delay: 0.7668240288s;
  left: calc((100% - 5em) * 0.88);
}

.particle:nth-of-type(46) {
  animation-delay: 0.1482300255s;
  left: calc((100% - 5em) * 0.9);
}

.particle:nth-of-type(47) {
  animation-delay: 0.9326473524s;
  left: calc((100% - 5em) * 0.92);
}

.particle:nth-of-type(48) {
  animation-delay: 0.3159385877s;
  left: calc((100% - 5em) * 0.94);
}

.particle:nth-of-type(49) {
  animation-delay: 0.4091354462s;
  left: calc((100% - 5em) * 0.96);
}

.particle:nth-of-type(50) {
  animation-delay: 0.4753228323s;
  left: calc((100% - 5em) * 0.98);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  25% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateY(-10em) scale(0);
  }
}


.note {
  @apply w-8 h-10;
  position: absolute;
  transform: rotate(5deg);
  top: 510px;
  right: 280px;
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
    top: 510px
  }
}

</style>

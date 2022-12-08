<template>
<div class="main-wrapper">
  <div :class="[isDark ? 'game dark' : 'game']">
    <div @click="putTheEye" class="glass" :class="{'cursor-pointer': !cursorType}"></div>
    <div @click="openCentralDoor" :class="canOpen ? 'door_1 active cursor-pointer' : 'door_1 cursor-not-allowed'"></div>
    <div @click="openThirdScene" class="thirdScene hover: cursor-pointer" :class="{'active_scene': activeThird}"></div>
    <div @click="openFourthScene" class="fourthScene hover: cursor-pointer" :class="{'active_scene': activeFourth}"></div>
    <img @click="addToInventary" v-if="activeThird && activeFourth && !lastNoteReaded" src="images/fourthScene/FirstNote.png" alt="" class="last-note">
    <div v-for="i in 18" :key="i + 'star'" :class="`star-${i+1}`"></div>

    <div class="water_bulking">
      <div class="particle" v-for="i in 50" :key="i"></div>
    </div>

    <div @click="toggleLamp" class="lamp_1"></div>
    <div @click="toggleLamp" class="lamp_2"></div>
  </div>
</div>
</template>

<script>

export default {
  name: "SecondScene",
  data(){
    return {
      canOpen: false,
      isDark: false,
      finishType: null,
      activeThird: true,
      activeFourth: false,
      lastNoteReaded: false,
    };
  },
  props: {
    cursorType: String,
    finish: String,
    elementsLength: Number,
  },
  mounted() {
    this.$emit('resetCursor');
    if(this.elementsLength === 4) {
      this.activeThird = false;
      this.activeFourth = true;
    }
    if(this.elementsLength === 7) {
      this.activeThird = false;
      this.activeFourth = false;
    }
  },
  methods: {
    toggleLamp(){
      this.isDark = !this.isDark;
      let file2 = require('@/assets/audios/click_sound.mp3')
      let click_audio = new Audio(file2)
      click_audio.play();
    },
    openThirdScene(){
      if(!this.activeThird) return;
      let file = require('@/assets/audios/stairs_sound.mp3')
      let stairs_audio = new Audio(file)
      stairs_audio.play();
      stairs_audio.addEventListener('ended', ()=> {
        this.$emit('setLevel', 3);
      })
    },
    openFourthScene(){
      if(!this.activeFourth) return;
      let file = require('@/assets/audios/stairs_sound.mp3')
      let stairs_audio = new Audio(file)
      stairs_audio.play();
      stairs_audio.addEventListener('ended', ()=> {
        this.$emit('setLevel', 4);
      })
    },
    putTheEye(){
      let file = require('@/assets/audios/glass_sound.mp3')
      let glass_audio = new Audio(file)
      glass_audio.play();
      console.log(this.cursorImage);
      if(this.cursorType === 'eye') {
        this.finishType = 'horror'
        this.canOpen = !this.canOpen;
        this.$emit('resetCursor')
      }
      else if(this.cursorType === 'liver') {
        this.finishType = 'nice'
        this.canOpen = !this.canOpen;
        this.$emit('resetCursor')
      }
      else {
        this.$emit('changeCredits', 'Мына кесеге қандай да бір зат салса, есік ашылу керек. Бірақ нені?')
      }
      console.log(this.finish, this.cursorType);
    },
    openCentralDoor() {
      let file = require('@/assets/audios/lock_door_sound.mp3')
      let lock_door_audio = new Audio(file)
      lock_door_audio.play();
      if(this.finishType) {
        this.$emit('setFinish', this.finishType)
      }
      else{
        this.$emit('changeCredits', 'Оо... мына есіктен шыға алатын сияқтымын. Бірақ жабық тұр. Ашудың жолын іздеу керек.')
      }
    },
    addToInventary() {
      this.$emit('displayNoteToggle', true);
      this.$emit('changeNoteImage','images/last-note.png');
      this.$emit('setElementInInventar', {
        index: 11, payload: {
          id: 11,
          image: 'images/fourthScene/FirstNote.png',
          full_image: 'images/last-note.png',
          type: 'note'
        }
      })
      this.lastNoteReaded = true;
    },
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
  background-image: url("../../../public/images/second-scene-bg.png");
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
  top: 95px;
  left: 185px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.lamp_2 {
  position: absolute;
  top: 95px;
  right: 185px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.star-1 {
  position: absolute;
  top: 220px;
  left: 247px;
  width: 30px;
  height: 30px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 1s infinite;
}

.star-2 {
  position: absolute;
  top: 250px;
  left: 247px;
  width: 20px;
  height: 20px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 1.2s infinite;
}

.star-3 {
  position: absolute;
  top: 210px;
  left: 247px;
  width: 15px;
  height: 15px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.3s infinite;
}

.star-4 {
  position: absolute;
  top: 265px;
  left: 207px;
  width: 15px;
  height: 15px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 2s infinite;
}

.star-5 {
  position: absolute;
  top: 280px;
  left: 205px;
  width: 25px;
  height: 25px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.3s infinite;
}

.star-6 {
  position: absolute;
  top: 280px;
  left: 250px;
  width: 13px;
  height: 13px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.7s infinite;
}

.star-7 {
  position: absolute;
  top: 220px;
  right: 247px;
  width: 30px;
  height: 30px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 1s infinite;
}

.star-8 {
  position: absolute;
  top: 250px;
  right: 247px;
  width: 20px;
  height: 20px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 1.2s infinite;
}

.star-9 {
  position: absolute;
  top: 210px;
  right: 247px;
  width: 15px;
  height: 15px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.3s infinite;
}

.star-10 {
  position: absolute;
  top: 265px;
  right: 207px;
  width: 15px;
  height: 15px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 2s infinite;
}

.star-11 {
  position: absolute;
  top: 280px;
  right: 205px;
  width: 25px;
  height: 25px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.3s infinite;
}

.star-12 {
  position: absolute;
  top: 280px;
  right: 260px;
  width: 13px;
  height: 13px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.7s infinite;
}

.star-13 {
  position: absolute;
  top: 220px;
  right: 210px;
  width: 13px;
  height: 13px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.7s infinite;
}

.star-14 {
  position: absolute;
  top: 235px;
  right: 194px;
  width: 27px;
  height: 27px;
  background-image: url("../../../public/images/star.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: star_blinking 0.7s infinite;
}

@keyframes star_blinking {
  0%   {opacity: 1;}
  100% {opacity: 0.5;}
}


.door_1 {
  position: absolute;
  left: 410px;
  bottom: 172px;
  width: 255px;
  height: 220px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
}

.active:hover {
  cursor: pointer;
  border: 2px solid deepskyblue;
}
.active{
  @apply bg-gray-900;
}

.glass {
  position: absolute;
  left: 515px;
  top: 190px;
  width: 41px;
  height: 41px;
}

.thirdScene {
  width: 10px;
  height: 150px;
  border-radius: 0 10px 10px 0;
  background-color: #000;
  position: absolute;
  top: 145px;
  left: 0;
}

.fourthScene {
  width: 10px;
  height: 150px;
  border-radius: 10px 0 0 10px;
  position: absolute;
  top: 145px;
  right: 0;
  background-color: #694425

}

.active_scene {
  animation: blicking_door 1s ease-out infinite;
}

@keyframes blicking_door {
  0% {background-color: #694425
  }
  100% {background-color: deepskyblue}
}

.water_bulking {
  font-size: 5px;
  opacity: 0.4;
  filter: blur(0.02em);
  -webkit-filter: blur(0.02em);
  position: absolute;
  top: 185px;
  left: 532px;
  width: 20px;
  height: 20px;

  transition: all 0.2s;
}

.particle {
  animation: rise 1.5s ease-in-out infinite;
  background-image: radial-gradient(#c0c0c0 20%, rgba(255, 80, 0, 0) 70%);
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
  left: calc((10% - 5em) * 0);
}
.particle:nth-of-type(2) {
  animation-delay: 0.1285312199s;
  left: calc((10% - 5em) * 0.02);
}
.particle:nth-of-type(3) {
  animation-delay: 0.3277711721s;
  left: calc((10% - 5em) * 0.04);
}
.particle:nth-of-type(4) {
  animation-delay: 0.8694147043s;
  left: calc((10% - 5em) * 0.06);
}
.particle:nth-of-type(5) {
  animation-delay: 0.341012885s;
  left: calc((10% - 5em) * 0.08);
}
.particle:nth-of-type(6) {
  animation-delay: 0.1819108914s;
  left: calc((10% - 5em) * 0.1);
}
.particle:nth-of-type(7) {
  animation-delay: 0.4552155287s;
  left: calc((10% - 5em) * 0.12);
}
.particle:nth-of-type(8) {
  animation-delay: 0.9992087792s;
  left: calc((10% - 5em) * 0.14);
}
.particle:nth-of-type(9) {
  animation-delay: 0.6589042582s;
  left: calc((10% - 5em) * 0.16);
}
.particle:nth-of-type(10) {
  animation-delay: 0.5667886593s;
  left: calc((10% - 5em) * 0.18);
}
.particle:nth-of-type(11) {
  animation-delay: 0.6377394676s;
  left: calc((10% - 5em) * 0.2);
}
.particle:nth-of-type(12) {
  animation-delay: 0.0588100113s;
  left: calc((10% - 5em) * 0.22);
}
.particle:nth-of-type(13) {
  animation-delay: 0.8967164081s;
  left: calc((10% - 5em) * 0.24);
}
.particle:nth-of-type(14) {
  animation-delay: 0.8934641475s;
  left: calc((10% - 5em) * 0.26);
}
.particle:nth-of-type(15) {
  animation-delay: 0.1477251067s;
  left: calc((10% - 5em) * 0.28);
}
.particle:nth-of-type(16) {
  animation-delay: 0.316645678s;
  left: calc((10% - 5em) * 0.3);
}
.particle:nth-of-type(17) {
  animation-delay: 0.4554398848s;
  left: calc((10% - 5em) * 0.32);
}
.particle:nth-of-type(18) {
  animation-delay: 0.2327872285s;
  left: calc((10% - 5em) * 0.34);
}
.particle:nth-of-type(19) {
  animation-delay: 0.1704135174s;
  left: calc((10% - 5em) * 0.36);
}
.particle:nth-of-type(20) {
  animation-delay: 0.4504881332s;
  left: calc((10% - 5em) * 0.38);
}
.particle:nth-of-type(21) {
  animation-delay: 0.3558069876s;
  left: calc((10% - 5em) * 0.4);
}
.particle:nth-of-type(22) {
  animation-delay: 0.6109724811s;
  left: calc((10% - 5em) * 0.42);
}
.particle:nth-of-type(23) {
  animation-delay: 0.4528510082s;
  left: calc((10% - 5em) * 0.44);
}
.particle:nth-of-type(24) {
  animation-delay: 0.9268736732s;
  left: calc((10% - 5em) * 0.46);
}
.particle:nth-of-type(25) {
  animation-delay: 0.7110786071s;
  left: calc((10% - 5em) * 0.48);
}
.particle:nth-of-type(26) {
  animation-delay: 0.7876004427s;
  left: calc((10% - 5em) * 0.5);
}
.particle:nth-of-type(27) {
  animation-delay: 0.5368552689s;
  left: calc((10% - 5em) * 0.52);
}
.particle:nth-of-type(28) {
  animation-delay: 0.9208490385s;
  left: calc((10% - 5em) * 0.54);
}
.particle:nth-of-type(29) {
  animation-delay: 0.4771952935s;
  left: calc((10% - 5em) * 0.56);
}
.particle:nth-of-type(30) {
  animation-delay: 0.9255196027s;
  left: calc((10% - 5em) * 0.58);
}
.particle:nth-of-type(31) {
  animation-delay: 0.2284569704s;
  left: calc((10% - 5em) * 0.6);
}
.particle:nth-of-type(32) {
  animation-delay: 0.4962997814s;
  left: calc((10% - 5em) * 0.62);
}
.particle:nth-of-type(33) {
  animation-delay: 0.1845312734s;
  left: calc((10% - 5em) * 0.64);
}
.particle:nth-of-type(34) {
  animation-delay: 0.0789857947s;
  left: calc((10% - 5em) * 0.66);
}
.particle:nth-of-type(35) {
  animation-delay: 0.897189747s;
  left: calc((10% - 5em) * 0.68);
}
.particle:nth-of-type(36) {
  animation-delay: 0.4626522359s;
  left: calc((10% - 5em) * 0.7);
}
.particle:nth-of-type(37) {
  animation-delay: 0.2561782919s;
  left: calc((10% - 5em) * 0.72);
}
.particle:nth-of-type(38) {
  animation-delay: 0.6752678883s;
  left: calc((10% - 5em) * 0.74);
}
.particle:nth-of-type(39) {
  animation-delay: 0.5099427207s;
  left: calc((10% - 5em) * 0.76);
}
.particle:nth-of-type(40) {
  animation-delay: 0.0695083625s;
  left: calc((10% - 5em) * 0.78);
}
.particle:nth-of-type(41) {
  animation-delay: 0.4876069257s;
  left: calc((10% - 5em) * 0.8);
}
.particle:nth-of-type(42) {
  animation-delay: 0.7284629228s;
  left: calc((10% - 5em) * 0.82);
}
.particle:nth-of-type(43) {
  animation-delay: 0.9935912053s;
  left: calc((10% - 5em) * 0.84);
}
.particle:nth-of-type(44) {
  animation-delay: 0.2113934282s;
  left: calc((10% - 5em) * 0.86);
}
.particle:nth-of-type(45) {
  animation-delay: 0.7668240288s;
  left: calc((10% - 5em) * 0.88);
}
.particle:nth-of-type(46) {
  animation-delay: 0.1482300255s;
  left: calc((10% - 5em) * 0.9);
}
.particle:nth-of-type(47) {
  animation-delay: 0.9326473524s;
  left: calc((10% - 5em) * 0.92);
}
.particle:nth-of-type(48) {
  animation-delay: 0.3159385877s;
  left: calc((10% - 5em) * 0.94);
}
.particle:nth-of-type(49) {
  animation-delay: 0.4091354462s;
  left: calc((10% - 5em) * 0.96);
}
.particle:nth-of-type(50) {
  animation-delay: 0.4753228323s;
  left: calc((10% - 5em) * 0.98);
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
    transform: translateY(-5em) scale(0);
  }
}

.last-note {
  position: absolute;
  @apply w-6 h-8;
  top: 550px;
  left: 520px;
  z-index: 400000;

}
</style>

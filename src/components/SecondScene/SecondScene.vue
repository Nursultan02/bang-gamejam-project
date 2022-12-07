<template>
<div class="main-wrapper">
  <div class="game">
    <div @click="putTheEye" class="glass"></div>
    <div :class="canOpen ? 'door_1 active' : 'door_1'"></div>
    <div @click="$emit('setLevel', 3)" class="thirdScene hover: cursor-pointer"></div>
    <div @click="$emit('setLevel', 4)" class="fourthScene hover: cursor-pointer"></div>
    <div class="star-1"></div>
    <div class="star-2"></div>
    <div class="star-3"></div>
    <div class="star-4"></div>
    <div class="star-5"></div>
    <div class="star-6"></div>

    <div class="star-7"></div>
    <div class="star-8"></div>
    <div class="star-9"></div>
    <div class="star-10"></div>
    <div class="star-11"></div>
    <div class="star-12"></div>

    <div class="star-13"></div>
    <div class="star-14"></div>
    <div class="star-15"></div>
    <div class="star-16"></div>
    <div class="star-17"></div>
    <div class="star-18"></div>

  </div>
</div>
</template>

<script>
export default {
  name: "SecondScene",
  data(){
    return {
      canOpen: false,
    };
  },
  methods: {
    putTheEye(){
      this.canOpen = !this.canOpen;
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
  background-image: url("../../assets/images/second-scene-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.star-1 {
  position: absolute;
  top: 220px;
  left: 247px;
  width: 30px;
  height: 30px;
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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
  background-image: url("../../assets/images/star.png");
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

.glass {
  position: absolute;
  left: 515px;
  top: 190px;
  width: 41px;
  height: 41px;
}

.glass:hover {
  cursor: grab;
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
  background-color: #000;
  position: absolute;
  top: 145px;
  right: 0;
}
</style>
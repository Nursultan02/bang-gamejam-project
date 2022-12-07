<template>
<div class="main-wrapper">
  <div class="game">
    <div @click="putTheEye" class="glass"></div>
    <div :class="canOpen ? 'door_1 active' : 'door_1'"></div>
    <div @click="$emit('setLevel', 3)" class="thirdScene hover: cursor-pointer"></div>
    <div @click="$emit('setLevel', 4)" class="fourthScene hover: cursor-pointer"></div>
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
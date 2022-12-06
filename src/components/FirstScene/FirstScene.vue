<template>
  <div class="main-wrapper">
    <div :class="isDark ? 'game dark' : 'game'">
      <div class="door_1" :class="{'active1': !isDark}"></div>
      <div class="door_2" :class="{'active2': !isDark}"></div>
      <div @click="isDark = !isDark" class="lamp"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstScene",
  data(){
    return {
      isDark: true,
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
  background-image: url("../../assets/images/first-scene-bg.jfif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.door_1 {
  position: absolute;
  left: 212px;
  bottom: 172px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
}

.active1:hover {
  cursor: pointer;
  border: 2px solid deepskyblue;
}

.door_2 {
  position: absolute;
  right: 180px;
  bottom: 172px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
}

.active2:hover {
  cursor: pointer;
  border: 2px solid deepskyblue;
}

.lamp {
  position: absolute;
  top: 80px;
  left: 545px;
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
</style>

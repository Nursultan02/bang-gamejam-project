<template>
  <div class="main-wrapper">
    <div :class="isDark ? 'game dark' : 'game'">
      <div class="door_1"></div>
      <div class="door_2"></div>
      <div @click="isDark = !isDark" class="lamp"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstScene",
  data(){
    return {
      isDark: false,
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
  background-color: #000000;
}

.game {
  border: 3px solid #b6b6b6;
  width: 1080px;
  height: 720px;
  background-image: url("../../assets/images/first-scene-bg.jfif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}

.door_1 {
  position: absolute;
  left: 440px;
  bottom: 180px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
}

.door_1:hover {
  cursor: pointer;
  border: 2px solid deepskyblue;
}

.door_2 {
  position: absolute;
  right: 407px;
  bottom: 180px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
}

.door_2:hover {
  cursor: pointer;
  border: 2px solid deepskyblue;
}

.lamp {
  position: absolute;
  top: 75px;
  left: 772px;
  width: 30px;
  height: 30px;
  border-radius: 100%;

  transition: all .2s ease-in-out;
}

.lamp:hover {
  background-color: #f8f876;
  opacity: 0.5;
  cursor: pointer;
}

.dark {
  opacity: 0.3;
}
</style>
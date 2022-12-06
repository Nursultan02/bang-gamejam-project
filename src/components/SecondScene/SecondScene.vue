<template>
<div class="main-wrapper">
  <div class="game">
    <div class="door_1"></div>
    <div class="door_2"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "SecondScene"
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
</style>
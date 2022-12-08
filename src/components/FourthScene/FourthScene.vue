<template>
  <div class="main-wrapper">
    <div class="game">
      <div class="kid_bed" :class="{'kid_bed_moving': !showTree}" @click="showMagicTree"></div>
      <div  class="magic_tree" :class="{'magic_tree_showing': showTree}"></div>
      <div @click="getNodeFromBird" class="bird" :class="{'bird_opened': birdOpened, 'bird_closed': !birdOpened, 'bird_showing': showTree}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FourthScene",
  data(){
    return {
      showTree: false,
      birdOpened: true,
    }
  },
  methods: {
    showMagicTree(){
      this.showTree = true;
    },
    getNodeFromBird(){
      setInterval(() => {
        this.birdOpened = !this.birdOpened;
      },100)
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
  background-image: url("../../assets/images/fourthScene/fourth-scene-bg.png");
  position: relative;
}

.bird {
  position: absolute;
  top: 232px;
  left: 130px;
  width: 65px;
  height: 65px;
  background-image: url("../../assets/images/fourthScene/closed_bird.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  transition: 1.2s ease-in-out;
}

.bird_showing {
  opacity: 1;
}

.bird_opened {
  background-image: url("../../assets/images/fourthScene/opened_bird.png");
}

.bird_closed {
  background-image: url("../../assets/images/fourthScene/closed_bird.png");
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
  background-image: url("../../assets/images/fourthScene/magic_tree.png");
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
  background-image: url("../../assets/images/fourthScene/kid_bed.png");
}

.kid_bed_moving:hover {
  animation: move_kid_bed ease-in-out .1s infinite;
}

@keyframes move_kid_bed {
  0% { left: 52px; }
  50% { left: 58px; }
  100% { left: 55px; }
}



</style>
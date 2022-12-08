<template>
  <div class="main-wrapper">
    <div class="game">
      <div class="kid_bed" :class="{'kid_bed_moving': !showTree}" @click="showMagicTree"></div>

      <div  class="magic_tree" :class="{'magic_tree_showing': showTree}"></div>

      <div @click="getNodeFromBird" class="bird" :class="{'bird_opened': birdOpened, 'bird_closed': !birdOpened, 'bird_showing': showTree}"></div>

      <div class="cupboard" :class="cupboardClosed ? 'closed_cupboard' : 'opened_cupboard'"></div>

      <div v-if="showTree" class="flower"></div>

      <div v-for="i in 6" @click="handleKeyClick(i)" :class="`petal-${i}`" :key="i"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FourthScene",
  data(){
    return {
      correctCombination: [1, 2, 6, 5, 4, 3],
      typeCombination: [],
      showTree: false,
      birdOpened: true,
      cupboardClosed: true,
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
    reset() {
      this.typeCombination = [];
    },
    handleKeyClick(key) {
      console.log(key);
      if (this.typeCombination.length === 6) {
        return
      }

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
          this.cupboardClosed = false;
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
  background-image: url("../../assets/images/fourthScene/fourth-scene-bg.png");
  position: relative;
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
  background-image: url("../../assets/images/fourthScene/flower.png");
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
  background-image: url("../../assets/images/fourthScene/opened_cupboard.png");
}

.closed_cupboard {
  background-image: url("../../assets/images/fourthScene/closed_cupboard.png");
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
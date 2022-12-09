<template>
  <div style="position: relative; height: 100%; background-color: #fafcf7; width: 100%; display: flex; justify-content: center; align-items: center">

      <img style="width: 100%; height: 100%" :src="imageBackground" alt="">
    <div style="position: absolute; right: 10%; top: 30%; margin: 0 auto; display: flex; align-items: center; flex-direction: column">
      <h1 style="font-size: 60px; margin-bottom: 10px">AL<span style="color: #5f4381">BWS</span></h1>
      <p class="button-start" @click="startCutScene" style="">{{$t('Начать игру')}}</p>
<!--      <div class="langs">-->
<!--        <span>KAZ</span>-->
<!--        <span>RUS</span>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
export default {
  name: "startTemplate",
  data() {
    return {
       imageBack: '@/assets/startPersonage1.jpeg',
      imageInterval: null,
    }
  },
  computed: {
    imageBackground() {
      return this.imageBack === 2 ? require('@/assets/startPersonage1.jpeg') : require('@/assets/startPersonage2.jpeg')
    }
  },
  mounted() {
    this.imageInterval = setInterval(()=> {
      if(this.imageBack === 1) {
        this.imageBack = 2
      }
      else{
        this.imageBack = 1
      }
    }, 1500)
  },
  beforeDestroy() {
    clearInterval(this.imageInterval);
  },
  methods: {
    startCutScene() {
      this.$emit('start-scene')
    }
  }
}
</script>

<style scoped>
.button-start{
  background-color: #a0967b;
  border-radius: 20px;
  color: #fff;
  margin: auto;
  min-width: 300px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all .3s ease-in-out;
  user-select: none;
}
.button-start:hover{
  background-color: #5f4381 !important;
  color: #ffff !important;
}
</style>

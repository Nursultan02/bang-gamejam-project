<template>
  <div style="height: 100vh" @mousemove="startBackgroundMusic">
    <start-page @start-scene="setScene(1)" v-if="!level && !cutSceneShow"></start-page>
    <video @ended="setLevel(1)" autoplay height="100%" width="100%" v-if="cutSceneShow === 1 && level !== 1" src="@/assets/videos/Scene1.mp4"></video>
    <FirstScene @setLevel="setLevel" v-if="level === 1"></FirstScene>
    <SecondScene @setLevel="setLevel" v-if="level === 2"></SecondScene>
    <ThirdScene v-if="level === 3"></ThirdScene>
    <FourthScene v-if="level === 4"></FourthScene>
  </div>
</template>

<script>
import StartPage from '@/components/startTemplate';
import FirstScene from "@/components/FirstScene/FirstScene";
import SecondScene from "@/components/SecondScene/SecondScene";
import ThirdScene from "@/components/ThirdScene/ThirdScene";
import FourthScene from "@/components/FourthScene/FourthScene";
export default {
  name: 'App',
  components: {ThirdScene, FourthScene, SecondScene, FirstScene, StartPage },
  data() {
    return {
      level: 1,
      cutSceneShow: 2,
    }
  },
  mounted() {
    let level = localStorage.getItem('level');
    if(level) {
      this.level = parseInt(level);
    }

  },
  methods: {
    setScene(val) {
      this.cutSceneShow = val;
    },
    setLevel(val) {
      this.level = val
    },
    startBackgroundMusic() {

    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden
}
</style>

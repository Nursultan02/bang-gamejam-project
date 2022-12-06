<template>
  <div style="height: 100vh">
    <textCustom></textCustom>
    <start-page @start-scene="setScene(1)" v-if="!level && !cutSceneShow"></start-page>
    <video @ended="setLevel(1)" autoplay height="100%" width="100%" v-if="cutSceneShow === 1 && level !== 1" src="@/assets/videos/Scene1.mp4"></video>
    <FirstScene v-if="level === 1"></FirstScene>
  </div>
</template>

<script>
import StartPage from '@/components/startTemplate';
import FirstScene from "@/components/FirstScene/FirstScene";
import textCustom from "@/components/text";
export default {
  name: 'App',
  components: {FirstScene, StartPage, textCustom },
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
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

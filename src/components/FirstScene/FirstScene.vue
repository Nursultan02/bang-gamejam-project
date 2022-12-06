<template>
  <div class="main-wrapper">
    <div :class="isDark ? 'game dark' : 'game'">
      <div @click="openDoor" class="door_1" :class="{'active1': !isDark}">
        <transition name="door">
          <div v-if="firstDoorOpened" class="openedDoor">
            <div class="top-shadow"></div>
            <div class="bottom-shadow"></div>
          </div>
        </transition>
      </div>
      <div class="door_2" :class="{'active2': !isDark}"></div>
      <div @click="isDark = !isDark" class="lamp"></div>
    </div>
    <div class="absolute bottom-10 zText">
      <textCustom text="Мен қайдамын? Мынау қай жер…Қалай түстім мында? Жан-жақты қарап шығу керек"></textCustom>
    </div>
  </div>
</template>

<script>
import textCustom from '@/components/text'

export default {
  name: "FirstScene",
  data() {
    return {
      isDark: true,
      firstDoorOpened: false,
    }
  },
  components: {
    textCustom
  },
  methods: {
    openDoor() {
      this.firstDoorOpened = !this.firstDoorOpened;
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
  overflow: hidden;
  background-image: url("../../assets/images/first-scene-bg.jfif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.door_1 {
  position: absolute;
  left: 212px;
  bottom: 170px;
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

.openedDoor {
  position: relative;
  width: 70%;
  height: 100%;
  background-color: #000;
  box-shadow: 10px 0 5px -2px #363636;

}

.top-shadow {
  position: absolute;
  top: 0;
  right: -55px;
  width: 0;
  height: 0;
  border-top: 10px solid #000;
  border-right: 55px solid transparent;
}

.bottom-shadow {
  position: absolute;
  bottom: 0;
  right: -55px;
  width: 0;
  height: 0;
  border-bottom: 10px solid #000;
  border-right: 55px solid transparent;
}

.door_2 {
  position: absolute;
  right: 180px;
  bottom: 170px;
  width: 185px;
  height: 370px;
  border: 2px solid #000000;
  z-index: 1000;

  transition: .15s ease-in-out;
}

.door-enter-active {
  transition: all 0.3s ease-out;
}

.door-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.door-enter-from,
.door-leave-to {
  opacity: 0;
}

.active2:hover {
  cursor: pointer;
  border: 2px solid deepskyblue;
}

.lamp {
  position: absolute;
  top: 80px;
  left: 540px;
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

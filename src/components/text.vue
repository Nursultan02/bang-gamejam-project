<template>
  <div class="zText box-container">
    <div class="invertar">
      <carousel autoplay :perPage="3" :paginationEnabled="false" navigationEnabled>
        <slide v-for="element in elements" :key="element.id">
          <div class="box">
            <div class="border-2 border-solid border-gray-800 p-2"
                 style="width: 100%; height: 100%; margin: auto; background-color: #F0D0B5">
              <img @click="doAction(element)" :src="element.image" class="" alt="">
            </div>
          </div>
        </slide>
      </carousel>
    </div>

    <div id="text" class="text text-gray-700 font-medium whitespace-pre" :key="renderReload" v-show="showText">
    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'
import Typewriter from 'typewriter-effect/dist/core';

export default {
  name: "textCustom",
  props: {
    text: String,
    showText: Boolean,
    renderReload: Number,
    elements: {
      default: () => [{}, {}, {}],
      type: Array
    },
  },
  data() {
    return {
      textFromParent: ''
    }
  },
  mounted() {
    // this.reloadSwiper();
    this.startTyping();
  },
  watch: {
    text() {
      this.startTyping();
    }
  },
  components: {
    Carousel,
    Slide,
  },
  methods: {
    startTyping() {
      var text = document.getElementById('text');
      var typewriter = new Typewriter(text, {
        delay: 100,
      });

      typewriter
          .pauseFor(10)
          .typeString(this.text)
          .start()
          .pauseFor(3000)
          .deleteAll()
    },
    doAction(element) {
      if (element.type === 'key') {
        this.$emit('changeCursor', element.image)
      }
      if (element.type === 'note') {
        console.log(element.full_image)
        this.$emit('showContext', element.full_image);
      }
    }
  }
}
</script>

<style scoped>
.zText {
  z-index: 2000
}

.text {
  @apply p-4
}

.box {
  width: 80px;
  height: 80px;
  background-color: #CDB7A4;
  @apply border border-solid border-gray-600 p-2;
}

.box-container {
  @apply flex border-4 border-solid border-gray-700 w-full flex-grow;
  background-color: #CDB7A4;
}

.invertar {
  @apply flex w-1/4;
  margin-right: -25px;
}

</style>

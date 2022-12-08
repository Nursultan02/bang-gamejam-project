<template>
  <div class="zText box-container">
    <div class="invertar">
      <!--      <div ref="swiper" :key="elements.length" class="swiper w-64">-->
      <!--        <div class="swiper-wrapper" >-->
      <!---->

      <!--        <div class="swiper-button-prev "></div>-->
      <!--        <div class="swiper-button-next"></div>-->

      <!--        <div class="swiper-scrollbar"></div>-->
      <!--      </div>-->
      <carousel class="w-64" :perPage="3" :paginationEnabled="false" navigationEnabled>
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
    <div class="text text-gray-700 font-medium" :key="renderReload" v-show="showText">
      {{ text }}
    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'

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
  },
  components: {
    Carousel,
    Slide,
  },
  methods: {
    // reloadSwiper() {
    //   new Swiper(this.$refs.swiper, {
    //     // configure Swiper to use modules
    //     modules: [Navigation, Pagination],
    //     // Navigation arrows
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
    //     pagination: {
    //       el: '.swiper-pagination',
    //       clickable: true,
    //     },
    //
    //     // And if we need scrollbar
    //     scrollbar: {
    //       el: '.swiper-scrollbar',
    //     },
    //
    //     slidesPerView: 3,
    //     spaceBetween: 1,
    //   })
    // },
    doAction(element) {
      if (element.type === 'key') {
        this.$emit('changeCursor', element.image)
      }
      if (element.type === 'note') {
        console.log(element.full_image)
        this.$emit('showContext', element.full_image);
      }
      // if (element.type === 'key') {
      //   this.$emit('changeCursor', element.image);
      // }
    }
  }
}
</script>

<style scoped>
.zText {
  z-index: 2000
}

.text {
  @apply border border-solid border-gray-700 p-4
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
  @apply flex;
}

.text {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 1px solid black; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  @apply ml-0 mr-auto;
  letter-spacing: .1em; /* Adjust as needed */
  animation: typing 4.5s steps(40, end),
  blink-caret .75s step-end;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0
  }
  to {
    width: 100%
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to {
    border-color: transparent
  }
  50% {
    @apply border-0 border-r border-gray-600;
  }
  100% {
    @apply border-0
  }
}
</style>

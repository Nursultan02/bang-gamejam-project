<template>
<div class="zText box-container">
  <div class="invertar">
    <div class="box">
      <div class="border-2 border-solid border-gray-800" style="width: 100%; height: 100%; margin: auto; background-color: #F0D0B5"></div>
    </div>
    <div class="box">
      <div class="border-2 border-solid border-gray-800" style="width: 100%; height: 100%; margin: auto; background-color: #F0D0B5"></div>
    </div>
    <div class="box">
      <div class="border-2 border-solid border-gray-800" style="width: 100%; height: 100%; margin: auto; background-color: #F0D0B5"></div>
    </div>
  </div>
  <div class="text text-gray-700 font-medium">
    <span v-show="showText">{{text}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "textCustom",
  props: {
    text: String,
    showText: Boolean
  },
  data() {
    return {
      textFromParent: ''
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.zText{
  z-index: 2000
}
.text{
  @apply border border-solid border-gray-700 p-4
}
.box{
  width: 80px;
  height: 80px;
  background-color: #CDB7A4;
  @apply border border-solid border-gray-600 flex justify-center items-center p-2;
}
.box-container{
  @apply flex border-4 border-solid border-gray-700 w-full flex-grow;
  background-color: #CDB7A4;
}

.invertar{
  @apply flex;
}


.text {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 1px solid black; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  @apply ml-0 mr-auto;
  letter-spacing: .1em; /* Adjust as needed */
  animation:
      typing 4.5s steps(40, end),
      blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { @apply border-gray-600; }
}
</style>

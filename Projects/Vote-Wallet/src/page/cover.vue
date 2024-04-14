<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const imageUrl = require("@/assets/fengmian.png");
const jump = () => {
  router.push("layout");
};
</script>

<template>
  <img :src="imageUrl" alt="" @click="jump" />
</template>

<style scoped>

</style>

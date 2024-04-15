<script setup>
import Button from '../components/Button.vue'
import AccountList from '../components/AccountList.vue'
import { ref, onMounted } from 'vue';
import store from 'store2';

const walletInfo = ref([]);

onMounted(() => {
  walletInfo.value = store.get("walletInfo") || [];
});

</script>

<template>
<div class="container1">
  <img src="@/assets/logo1.png" alt="">
</div>
<div class="container2">
  <Button></Button>
</div>
<div>
<AccountList :walletInfo="walletInfo"></AccountList>
</div>
</template>

<style scoped>
.container1 {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
}
.container2 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
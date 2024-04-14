<script setup>
import { ref, onMounted } from 'vue';

const active = ref(0);
    const icon = [
    {
      active: 'gem',
      inactive:
        'gem-o',
    },
    {
      active: 'gold-coin',
      inactive:
        'gold-coin-o',
    },
    {
      active: 'contact',
      inactive:
        'contact-o',
    }
    ];

</script>

<template>
  <van-nav-bar title="标题" class="topBar"/>
  <router-view></router-view>
<van-tabbar v-model="active" route>
  <van-tabbar-item replace to="/layout/HomePage">
    <span>首页</span>
    <template #icon="props">
      <van-icon :name="props.active ? icon[0].active : icon[0].inactive" />
    </template>
  </van-tabbar-item>

  <van-tabbar-item icon="gold-coin-o" @click="" replace to="/layout/Transaction">
    <span>交易</span>
    <template #icon="props">
      <van-icon :name="props.active ? icon[1].active : icon[1].inactive" />
    </template>
  </van-tabbar-item>

  <van-tabbar-item icon="contact-o" replace to="/layout/Mine"> 
    <span>我的</span>
    <template #icon="props">
      <van-icon :name="props.active ? icon[2].active : icon[2].inactive" />
    </template>
  </van-tabbar-item>
</van-tabbar>
</template>

<style lang="less" scoped>
body {
  // padding: 10px;
}
.topBar {
  --van-nav-bar-background: rgba(246, 246, 246, 0.315);
}
</style>
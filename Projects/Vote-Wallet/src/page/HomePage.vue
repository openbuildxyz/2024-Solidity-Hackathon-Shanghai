<script setup>
import { ref } from "vue";
const value = ref("");
const images = [
  {
    link:"",
    address:require('@/assets/image1.png')
  },
  {
    link:"",
    address:require('@/assets/image2.png')
  },
  {
    link:"",
    address:require('@/assets/image3.png')
  },
];

const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        loading.value = false;

        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };
</script>

<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" />

  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <a :href="image.link">
        <img :src="image.address" />
      </a>
    </van-swipe-item>
  </van-swipe>

  <div class="container">
    <p>资讯</p>
  </div>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</van-pull-refresh>

</template>

<style scoped>
.container {
  margin-left: 10px;
}
p{
  font-weight: bold;
}
</style>

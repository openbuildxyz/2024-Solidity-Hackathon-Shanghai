<script setup>
import { get } from "vant/lib/utils";
import { ref, onMounted } from "vue";
import Web3 from "web3";
import Vote from "../contracts/Vote.json";
import currentAccount from "../web3/web3";
import {getWeb3} from "../web3/web3";

var web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/0fda17b26c574dca81d0069f6150ffe8"
);


const address = "0xb633Cf677b41209BF5721Df490413928e4B33b1D"; // 合约部署地址
const myContract = new web3.eth.Contract(Vote.abi, address);
// ["learnings.ai","Web3-AlarmClock","AA Wallet based onIntent","BuddyGuard"]  

onMounted(async () => {
  let result = await myContract.methods.getBoardInfo().call();
  selectItem.value = result;
  console.log(result);
  console.log(selectItem.value[0]);
});


const showCase = ref(false);
const checked = ref("");
const selectItem = ref([]);
const assianCase = ref(false);
const addressValue = ref("");

const createList = () => {
  showCase.value = true;
};

const assign = () => {
  assianCase.value = true;
};


const confirmSubmit = async () => {
  console.log(checked.value);
  const account = await currentAccount();
  console.log(account);
  const _web3 = await getWeb3();
  const _contract = new _web3.eth.Contract(Vote.abi, address);
  const result = await _contract.methods.vote(checked.value).send({ from: account });
  console.log(result);
};

const confirmAssigan = async () => {
  const arr = eval(addressValue.value);
  const account = await currentAccount();
  myContract.methods
    .mandate(arr)
    .send({ from: account })
    .on("receipt", () => {
      console.log("wanchneg");
    });
};

const items = [
    {
      ProjectName: "xx",
      ProjectFounder: "xx",
      TotalAmount: "xx",
    },
  ]


/**
 * 0xeD270aC0d914497e84059d50e8d5C5D469a738e6
 * 0xA04c263cF26fBea122829d2DaaafD7e278608340
 * 0x767Fe8F6E31267094a18532ed853e2b4058F6F6B
 *
 * ["0xA04c263cF26fBea122829d2DaaafD7e278608340","0x767Fe8F6E31267094a18532ed853e2b4058F6F6B"]
 *
 */
</script>

<template>
  <div class="container1">
    <v-avatar :image="require('@/assets/avatar.png')" size="80"></v-avatar>
  </div>
  <div class="container2">
    <p>Guo cork</p>
  </div>
  <div class="container3">
    <v-btn icon="$vuetify" variant="outlined" @click="createList"></v-btn>
    <v-btn icon="$vuetify" variant="outlined" @click="assign"></v-btn>
  </div>
  <div><v-data-table-virtual :items="items"></v-data-table-virtual></div>
  <van-dialog
    v-model:show="showCase"
    title="开始投票"
    show-cancel-button
    @confirm="confirmSubmit"
  >
    <van-radio-group v-model="checked">
      <van-cell-group inset>
        <van-cell
          :title="item[0]"
          clickable
          @click="checked = index"
          v-for="(item, index) in selectItem"
          :key="index"
        >
          <template #right-icon>
            <van-radio :name="index" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-dialog>

  <van-dialog
    v-model:show="assianCase"
    title="分发选票"
    show-cancel-button
    @confirm="confirmAssigan"
  >
    <van-cell-group inset>
      <van-field v-model="addressValue" label="地址" placeholder="请输入地址" />
    </van-cell-group>
  </van-dialog>
</template>

<style scoped>
.container1 {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
}

.container2 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

p {
  font-size: 40px;
  font-weight: bold;
}
.container3 {
  text-align: center;
  margin-bottom: 10px;
}
</style>


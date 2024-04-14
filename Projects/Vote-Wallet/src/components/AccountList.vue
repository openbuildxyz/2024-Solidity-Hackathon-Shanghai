<script setup>
import { ref, defineProps, computed } from "vue";
const props = defineProps(["walletInfo"]);
import Web3 from "web3";
import { showSuccessToast,showFailToast } from "vant";
import ethwallet, { hdkey } from "ethereumjs-wallet";
import Tx from 'ethereumjs-tx';


var web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/0fda17b26c574dca81d0069f6150ffe8"
);
const show = ref(false);
const password = ref("");
const keystore = ref("");
const verifyPwd = ref("");
const showBottom = ref(false);
const toAddress = ref("");
const showloading = ref(false);
const finalPassword = ref("");
const fromAddress = ref("");

const walletInfoAddressFilter = computed(() => {
  props.walletInfo.forEach(async (item, index) => {
    const originalAddress = item.address;
    const head = item.address.slice(0, 8);
    const tail = item.address.slice(item.address.length - 8);
    item.address = head + "..." + tail;
    item.originalAddress = originalAddress;
    //根据地址获取账户余额
    // const result = await web3.eth.getBalance(originalAddress);
    // item.balance = web3.utils.fromWei(result, "ether");
  });
  return props.walletInfo;
});

// 转账这块还是没有完成 有bug 这块需要继续去看web3.js 里的操作
const transaction = async (Keystore, pass, address) => {
  let walletobj;
  try {
    walletobj = await ethwallet.fromV3(Keystore,pass);
  } catch(error) {
    alert("密码错误");
    return false;
  }

  let key = walletobj.getPrivateKey().toString("hex");
  const bufferKey = Buffer(key, "hex");

  const nonce = await web3.eth.getTransactionCount(address.slice(2));
  const gasPrice = await web3.eth.getGasPrice();
  const value = web3.utils.toWei('0.001', 'ether');  // 这块还是没有完善 不知道用户要转多少钱
  const rawTx = {
        from: address,
        to: toAddress.value,
        nonce,
        gasPrice,
        value,
        data: "0x0000"
    };
  const gas = await web3.eth.estimateGas(rawTx);
  rawTx.gas = gas;
  const tx = new Tx(rawTx);
  tx.sign(bufferKey);
  const serializedTx = tx.serialize();
  const trans = web3.eth.sendSignedTransaction(serializedTx);
  trans.on("transactionHash", (txid) => {
        console.log("交易ID：", txid);
        console.log(`https://sepolia.etherscan.io/tx/${txid}`);
    });
    showloading.value = false;
    showSuccessToast('交易成功');

  
};

const getPassword = (keyStore, pwd,address) => {
  show.value = true;
  keystore.value = keyStore;
  verifyPwd.value = pwd;
  fromAddress.value = address;
};

const confirmPassword = () => {
  if (password.value == verifyPwd.value) {
    showBottom.value = true;
    finalPassword.value = verifyPwd.value;
  } else {
    showFailToast("密码错误");
  }
  password.value = "";
  verifyPwd.value = "";
};

const confirmSend = () => {
  showloading.value = true;
  showBottom.value = false;
  console.log(keystore.value);
  transaction(keystore.value, finalPassword.value,fromAddress.value)
};
</script>

<template>
  <div>
    <van-cell
      :title="item.address"
      icon="location"
      v-for="item in walletInfoAddressFilter"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-button
          size="small"
          class="btn"
          @click="getPassword(item.keyStore, item.password,item.originalAddress)"
          >{{ item.balance }}</van-button
        >
      </template>
    </van-cell>
  </div>
  
  <van-dialog
    v-model:show="show"
    title="验证密码"
    show-cancel-button
    @confirm="confirmPassword"
  >
    <van-cell-group inset>
      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        type="password"
      />
    </van-cell-group>
  </van-dialog>
  <van-popup
    v-model:show="showBottom"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <div class="container"><p class="sign">发送到</p></div>
    <van-field v-model="toAddress" label="地址" placeholder="请输入发送地址" />
    <div class="container"></div>
    <div class="container2">
      <van-button type="primary" class="btn2" @click="confirmSend"
        >确认发送</van-button
      >
    </div>
  </van-popup>
  <van-overlay :show="showloading" z-index="100">
    <div class="wrapper">
      <van-loading type="spinner" />
    </div>
  </van-overlay>
</template>

<style lang="less" scoped>
.btn {
  width: 80px;
}
.container {
  margin-top: 20px;
  margin-bottom: 20px;
}
.sign {
  text-align: center;
  font-weight: bold;
}
.btn2 {
  width: 200px;
}
.container2 {
  text-align: center;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

</style>

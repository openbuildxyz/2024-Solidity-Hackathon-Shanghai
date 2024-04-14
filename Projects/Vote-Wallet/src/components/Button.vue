<script setup>
import { ref } from "vue";
import { showNotify } from "vant";
import * as bip39 from "bip39";
import { showSuccessToast, showFailToast } from "vant";
import ethwallet, { hdkey } from "ethereumjs-wallet";
import store from "store2";

const show = ref(false);
const password = ref("");
const mnemonic = ref("");
const MnemonicValue = ref("");
const showMn = ref(false);
const showCase = ref(false);

const creatwallet = () => {
  password.value = "";
  show.value = true;
};

const confirmPassword = () => {
  if (password.value == "") {
    showNotify({ type: "danger", message: "请输入密码" });
  } else {
    //判断是否创建过账户 目前只运行创建一次
    const walletInfo = store.get("walletInfo");
    if (walletInfo) {
      creatNewAddress()
      showSuccessToast('创建成功');
    } else {
    mnemonic.value = bip39.generateMnemonic();
    showMn.value = true;
    }
  }
};

const confirmMnemonicSave = () => {
  showMn.value = false;
  showCase.value = true;
};

const confirmMnemonic = async () => {
  if (MnemonicValue.value == mnemonic.value) {
    showMn.value = false;
    showCase.value = false;
    //根据助记词生成种子
    const seed = await bip39.mnemonicToSeed(mnemonic.value);
    //根据种子生成钱包
    const hdWallet = hdkey.fromMasterSeed(seed);
    //生成以太坊的密钥对 单一账号  这里可以对接业务 比如：
    // 1. 用户选择接入哪条链
    // 2. 用户选择创建那个账户地址
    const storeWallet = store.get("walletInfo") || []  //判断store中 有没有walletInfo 这个值 有的话取值返回 没有就返回空值 
    const addressIndex = storeWallet.length == 0 ? 0 : storeWallet.length;

    const keyPair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`);
    //通过密钥对获取钱包
    const wallet = keyPair.getWallet();

    //拿到账户地址以及校验地址、私钥、keystore
    const accountAddress = wallet.getAddressString();
    const checkSumAddress = wallet.getChecksumAddressString();
    const privateKey = wallet.getPrivateKey().toString("hex");
    const keyStore = await wallet.toV3(password.value);

    //钱包信息
    const walletInfo = [
      {
        id:addressIndex,
        address: accountAddress,
        privateKey,
        keyStore,
        mnemonic: mnemonic.value,
        balance: 0,
        password: password.value
      },
    ];

    store("walletInfo", walletInfo);
    showSuccessToast('创建成功');
  } else {
    showFailToast("助记词有误!");
    backMnemonic();
    MnemonicValue.value = "";
  }
};

const backMnemonic = () => {
  showCase.value = false;
  showMn.value = true;
};

const creatNewAddress = async () => {
  const walletInfo = store.get("walletInfo");

  mnemonic.value = walletInfo[0]["mnemonic"];

  const seed = await bip39.mnemonicToSeed(mnemonic.value);

  const hdWallet = hdkey.fromMasterSeed(seed);

  const storeWallet = store.get("walletInfo")

  const addressIndex = storeWallet.length;

  const keyPair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`);

  const wallet = keyPair.getWallet();

  const accountAddress = wallet.getAddressString();

  const privateKey = wallet.getPrivateKey().toString("hex");

  const keyStore = await wallet.toV3(password.value);

  const walletInfoObj = 
      {
        id:addressIndex,
        address: accountAddress,
        privateKey,
        keyStore,
        mnemonic: mnemonic.value,
        balance: 0,
        password: password.value
      };

      walletInfo.push(walletInfoObj);
      store("walletInfo", walletInfo);
};
</script>

<template>
  <van-space>
    <van-button type="primary" @click="creatwallet" color="linear-gradient(to right, rgb(253, 200, 48), rgb(243, 115, 53)">创建账户</van-button>
    <van-button type="primary" color="linear-gradient(to right, rgb(253, 200, 48), rgb(243, 115, 53)">导入地址</van-button>
    <van-dialog
      v-model:show="show"
      title="创建账户"
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
  </van-space>

  <template v-if="showMn">
    <p>{{ mnemonic }}</p>
    <van-button size="small" plain type="primary" @click="confirmMnemonicSave"
      >我已经保存</van-button
    >
  </template>

  <van-dialog
    v-model:show="showCase"
    title="请输入助记词"
    show-cancel-button
    @confirm="confirmMnemonic"
    @cancel="backMnemonic"
  >
    <van-cell-group inset>
      <van-field
        v-model="MnemonicValue"
        label="助记词"
        placeholder="请输入助记词"
      />
    </van-cell-group>
  </van-dialog>
</template>

<style lang="less" scoped>
p {
  user-select: all;
}
</style>

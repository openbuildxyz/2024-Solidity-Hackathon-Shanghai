<script setup>
import { ref } from "vue";
import * as bip39 from "bip39";
import ethwallet, { hdkey } from 'ethereumjs-wallet';
import Web3 from 'web3';


//创建助记词
// const mnemonic = bip39.generateMnemonic();
// console.log(mnemonic);  //生成的是整个钱包的助记词 开源使用这个助记词 来生成管理多个账户

const mnemonic = ref("beach book pipe cement brass display afraid mansion benefit what artefact wash");
//生成密钥对 Keypair
bip39.mnemonicToSeed(mnemonic.value).then((seed) => {
    const hdWallet = hdkey.fromMasterSeed(seed);  //hdkey是一个HD钱包生成工具 
    const keyPair = hdWallet.derivePath("m/44'/60'/0'/0/0");

    //获取私钥
    //1. 获取钱包对象
    const wallet = keyPair.getWallet(); //获取到定义的子钱包
    //2. 获取钱包地址
    const lowerCaseAddress = wallet.getAddressString();

    //3. 获取钱包校验地址
    const checkAddress = wallet.getChecksumAddressString();

    //4. 获取私钥
    const priKey = wallet.getPrivateKey().toString("hex");
    console.log(priKey);

    //导出keyStore
    //1. web3.js
    var web3 = new Web3(Web3.givenProvider || "wss://sepolia.infura.io/ws/v3/0fda17b26c574dca81d0069f6150ffe8");
    const keyStore = web3.eth.accounts.encrypt("0x63d94929d62deb5a3314b43669471f478d7c18db8491de7253969b21a3db1703","111111");
    keyStore.then((res) => {
        console.log(JSON.stringify(res));
    })

    //wallet对象
    wallet.toV3("111111").then((res) => {
        console.log(JSON.stringify(res));

        //通过keystore 获得私钥
        //1. web3
        console.log(web3.eth.accounts.decrypt(res,"111111"));
        //2. wallet
        console.log(ethwallet.fromV3(res,"111111"));
    });

    //通过私钥获取地址
    const priKey2 = Buffer(priKey,"hex");
    const wallet3 = ethwallet.fromPrivateKey(priKey2);
    const address1 = wallet3.getAddressString();
    console.log(address1);
})


</script>

<template>
<h1>助记词</h1>
<div>{{ mnemonic }}</div>
<div>路径："m/44'/60'/0'/0/0"</div>
<div>账号地址：0x7d97bced450214de8491c25edb0c88cb9a14d3f2</div>
<div>账号私钥：63d94929d62deb5a3314b43669471f478d7c18db8491de7253969b21a3db1703</div>
</template>

<style scoped>

</style>
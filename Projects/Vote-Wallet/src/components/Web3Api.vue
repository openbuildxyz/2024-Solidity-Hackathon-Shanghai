<script setup>
import Web3 from 'web3';
import { ref } from 'vue';
import Tx from 'ethereumjs-tx';
//实例化web3
var web3 = new Web3(Web3.givenProvider || "wss://sepolia.infura.io/ws/v3/0fda17b26c574dca81d0069f6150ffe8");

//创建账户  注意：这个方法每次执行都会创建新的账号
// const account = web3.eth.accounts.create("123");
// console.log(account);

const address = ref("0x8Bd9E1C5fde436Fc7c4326D357e04a6B593a9908");
const privateKey = ref("0x326d4ef9cb2fd8ae310065816dd6041028594ce232840cb67462cb0b269f8f18");


//获取余额
const mount = ref(-1);
mount.value = await web3.eth.getBalance(address.value);

//单位转化
// const num = web3.utils.toWei('0.3', 'ether');
// console.log(num);


//转账操作
const transaction = async () => {
    //1. 构建转账参数
    //获取账户交易次数  记录该账户的交易次数
    const nonce = await web3.eth.getTransactionCount(address.value);

    //获取预计转账的gas单价
    const gasPrice = await web3.eth.getGasPrice();

    //转账金额 以wei作为单位
    const value = web3.utils.toWei('0.001', 'ether');
    console.log(value);

    //定义交易包数据
    const rawTx = {
        from: address.value,
        to: "0xeD270aC0d914497e84059d50e8d5C5D469a738e6",
        nonce,
        gasPrice,
        value,
        data: "0x0000"
    }

    //2. 生成serializedTx 

    //转化私钥
    const bufferKey = Buffer(privateKey.value.slice(2), "hex");
    //gas估算
    const gas = await web3.eth.estimateGas(rawTx);  //这里由于账户里面没有余额来支付预计的转账费用以及gas的费用 这段代码会报错
    rawTx.gas = gas;
    // ethereumjs-tx 实现加密
    const tx = new Tx(rawTx);
    tx.sign(bufferKey);
    // 生成 serializedTx 用来传输
    const serializedTx = `0x${tx.serialize().toString("hex")}`;
    
    //3. 开始转账
    const trans = web3.eth.sendSignedTransaction(serializedTx);
    //交易结束后触发 看交易的情况
    trans.on("transactionHash", (txid) => {
        console.log("交易ID：", txid);
        console.log(`https://sepolia.etherscan.io/tx/${txid}`);
    });
    //第一个节点确认时触发 
    trans.on("receipt", (res) => {
        console.log("第一个节点确认",res);
    });
    // 有节点确认触发
    trans.on("confirmation",() => {
        console.log("有节点确认");
    });
    
    
};
</script>

<template>
<h1>API</h1>
<div>账号地址：{{ address }}</div>
<div>私钥：{{ privateKey }}</div>
<div>余额：{{ mount }}</div>
<van-button plain type="primary" @click="transaction">开始转账</van-button>
</template>

<style scoped>

</style>
<script setup>
import Web3 from "web3";
import { ref, onMounted } from "vue";
import Mytoken from "../contracts/Mytoken.json";

var web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/0fda17b26c574dca81d0069f6150ffe8"
);

const newContract = new web3.eth.Contract(
  Mytoken.abi,
  "0x41eeC1b08531bb7D78Ad0D90A3753f54EEBd5B4C"
);

// (async () => {
//     const account = await web3.eth.requestAccounts();
//     console.log(account);
// })();

//代币信息
const name = ref("");
const symbol = ref("");
const totalSupply = ref("");
const balanced = ref(0);

console.log(newContract);
const getCoinInfo = async () => {
    // name.value = await newContract.methods.name.call();
    // console.log(name.value);
};

onMounted(async () => {
    await getCoinInfo();
});
</script>

<template></template>

<style scoped></style>

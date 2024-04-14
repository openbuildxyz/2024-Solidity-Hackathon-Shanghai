import Web3 from "web3";
import Vote from "../contracts/Vote.json";

const myWeb3 = async () => {
  var web3 = new Web3(
    Web3.givenProvider ||
      "wss://sepolia.infura.io/ws/v3/0fda17b26c574dca81d0069f6150ffe8"
  );

  const address = "0xf4bB5f91674E44BC895A2Ebc23c589549702A18C"; // 合约部署地址
  const myContract =await new web3.eth.Contract(Vote.abi, address);

  return myContract
}


export default myWeb3;

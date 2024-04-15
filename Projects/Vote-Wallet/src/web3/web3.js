import Web3 from "web3";

const currentAccount = async () => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log("Connected Account:", accounts);

      return account;
}

export const getWeb3 = async () => {
    if (window.ethereum) {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        return web3;
    } else {
        alert("Please install MetaMask!");
    }
};
export default currentAccount;

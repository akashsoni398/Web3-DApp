import React, {useState,useEffect} from 'react';
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);

const App = () => {
  const [account, setAccount] = useState('');
  const [balance,setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState('');


  const connectWallet = async() => {
    try{
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      setAccount(accounts[0]);
      setMessage("Connected to Wallet:"+ accounts[0]);
    }
    catch(error) {
      setMessage("Connection failed. Please check your wallet");
    }
  }


  const getAccountBalance = async() => {
    try {
      const balanceWei = await web3.eth.getBalance(account);
      const balanceETH = web3.utils.fromWei(balanceWei,'ether');
      setBalance(balanceETH);
      setMessage(`Accounts: ${account}, Balance: ${balanceETH} ETH`);
    }
    catch(error) {
      setMessage("Failed to fetch balance. Please try again.")
    }
  }


  useEffect(() => {
    const loadContract = async() => {
      try{
        const contractAddress = '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1';
        const contractABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"address[]","name":"initialSet","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int256","name":"oracleSetHash","type":"int256"},{"indexed":false,"internalType":"address[]","name":"newOracles","type":"address[]"}],"name":"NewOracleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"int8","name":"to_wc","type":"int8"},{"indexed":true,"internalType":"bytes32","name":"to_addr_hash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"SwapEthToTon","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int8","name":"workchain","type":"int8"},{"indexed":true,"internalType":"bytes32","name":"ton_address_hash","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"ton_tx_hash","type":"bytes32"},{"indexed":false,"internalType":"uint64","name":"lt","type":"uint64"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"SwapTonToEth","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"allowBurn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"components":[{"internalType":"int8","name":"workchain","type":"int8"},{"internalType":"bytes32","name":"address_hash","type":"bytes32"}],"internalType":"struct TonUtils.TonAddress","name":"addr","type":"tuple"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"components":[{"internalType":"int8","name":"workchain","type":"int8"},{"internalType":"bytes32","name":"address_hash","type":"bytes32"}],"internalType":"struct TonUtils.TonAddress","name":"addr","type":"tuple"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"digest","type":"bytes32"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct TonUtils.Signature","name":"sig","type":"tuple"}],"name":"checkSignature","outputs":[],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"finishedVotings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFullOracleSet","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"newBurnStatus","type":"bool"},{"internalType":"int256","name":"nonce","type":"int256"}],"name":"getNewBurnStatusId","outputs":[{"internalType":"bytes32","name":"result","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"int256","name":"oracleSetHash","type":"int256"},{"internalType":"address[]","name":"set","type":"address[]"}],"name":"getNewSetId","outputs":[{"internalType":"bytes32","name":"result","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint64","name":"amount","type":"uint64"},{"components":[{"components":[{"internalType":"int8","name":"workchain","type":"int8"},{"internalType":"bytes32","name":"address_hash","type":"bytes32"}],"internalType":"struct TonUtils.TonAddress","name":"address_","type":"tuple"},{"internalType":"bytes32","name":"tx_hash","type":"bytes32"},{"internalType":"uint64","name":"lt","type":"uint64"}],"internalType":"struct TonUtils.TonTxID","name":"tx","type":"tuple"}],"internalType":"struct TonUtils.SwapData","name":"data","type":"tuple"}],"name":"getSwapDataId","outputs":[{"internalType":"bytes32","name":"result","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isOracle","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"oraclesSet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint64","name":"amount","type":"uint64"},{"components":[{"components":[{"internalType":"int8","name":"workchain","type":"int8"},{"internalType":"bytes32","name":"address_hash","type":"bytes32"}],"internalType":"struct TonUtils.TonAddress","name":"address_","type":"tuple"},{"internalType":"bytes32","name":"tx_hash","type":"bytes32"},{"internalType":"uint64","name":"lt","type":"uint64"}],"internalType":"struct TonUtils.TonTxID","name":"tx","type":"tuple"}],"internalType":"struct TonUtils.SwapData","name":"data","type":"tuple"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct TonUtils.Signature[]","name":"signatures","type":"tuple[]"}],"name":"voteForMinting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"oracleSetHash","type":"int256"},{"internalType":"address[]","name":"newOracles","type":"address[]"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct TonUtils.Signature[]","name":"signatures","type":"tuple[]"}],"name":"voteForNewOracleSet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"newBurnStatus","type":"bool"},{"internalType":"int256","name":"nonce","type":"int256"},{"components":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct TonUtils.Signature[]","name":"signatures","type":"tuple[]"}],"name":"voteForSwitchBurn","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        const contractInstance = new web3.eth.Contract(contractABI,contractAddress);
        setContract(contractInstance);
        setMessage('Smart contract loaded');
      }
      catch(error) {
        setMessage("Failed to load smart contract. Please check address and ABI");
      }
    }

    loadContract();
  },[]);


  const sendTransaction = async() => {
    try{
      const amountETH = '0.1';
      const amountWei = web3.utils.toWei(amountETH,'ether');
      await contract.methods.someFunction().send({from:account, value:amountWei});
      setMessage(`Sent ${amountETH} ETH to contract`)
    }
    catch(error) {
      setMessage('Transaction failed');
    }
  }

  return(
    <div>
      <h1>Web3 DApp with ReactJS</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={getAccountBalance}>Check Balance</button>
      <p>{message}</p>
      { account &&
        <div>
          <h3>Smart Contract Interaction</h3>
          <button onClick={sendTransaction}>Send Transaction</button>
        </div>
      }
    </div>
  );
}

export default App;

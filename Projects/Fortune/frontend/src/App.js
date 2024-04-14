import { ethers } from 'ethers';
import './App.css';
import React, { useState } from 'react';
import logo from "./img/img11.png"
import { Button, Form, Input, InputNumber, message, Tooltip } from 'antd';

const MORPHURL = 'https://rpc-testnet.morphl2.io';
const morphProvider = new ethers.JsonRpcProvider(MORPHURL);
const privateKey = '88bd835ba2aec2983e17b96cf0b5701209e8bab348d51d2f00c9e3bd4b7a3010';
const wallet = new ethers.Wallet(privateKey, morphProvider);

// 合约地址
// const contractAddress = ''
// 合约ABI
const contactABIOne = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_techAddr",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allTruesures",
    "outputs": [
      {
        "internalType": "address",
        "name": "ownerAddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "ownerTreature",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "periodTime",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "islive",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "techAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTruesure",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sucessorAddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "peroidTime",
        "type": "uint256"
      }
    ],
    "name": "createSuccessActivity",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkAllSucessActivity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withDrawBack",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "peroidTime",
        "type": "uint256"
      }
    ],
    "name": "ownerDelay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
// 可写合约
// const contract = new ethers.Contract(contractAddress, contactABIOne, wallet)
// 创建钱包

// 创建一个连接到Metamask的Provider实例
// const provider = new ethers.BrowserProvider(window.ethereum);

const { TextArea } = Input;

// const onFinishOneFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };


// 接口类合约交互
// 编码calldata
// const pram1 = contract.interface.encodeFunctionData(”methodName“)
// console.log(`编码结果：${pram1}`)
// const tx1 = {
//   to: contractAddress,
//   data: pram1
// value:ethers.parseEther()
// }
// const txResponse = await wallet.sendTransaction(tx1)
//  const receipt= await returnData.wait()
// if (receipt.status === 1) {
//   tips('success', 'submit success');
// } else {
//   tips('error', 'submit error');
// }





function App() {
  const [myAccout, setAccout] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);


  if (localStorage.getItem('metamask_account') !== null && !myAccout && window.ethereum) {
    const storedAccount = localStorage.getItem('metamask_account');
    setAccout(storedAccount)
  }

  // 获取Signer对象
  // provider.getSigner().then(address => {
  //   setAccout(address.address)
  // }).catch((error) => {
  //   return alert('请先登录metaMask钱包')
  // })
  const waitMs = ms => new Promise(r => setTimeout(r, ms))
  const tips = (type, content) => {
    message[type](content)
  };

  // 连接钱包
  const onClickHandler = async () => {
    if (!window.ethereum) return tips('warning', '还未安装metaMask')
    const provider = new ethers.BrowserProvider(window.ethereum)
    // 读取钱包地址
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    setAccout(account);
    localStorage.setItem('metamask_account', account);
    console.log(`钱包地址: ${account}`)
  }

  // 第一个提交
  const onFinishOne = async (values) => {
    if (!myAccout) return tips('warning', '还未登录关联钱包,需要先connect钱包！');
    if (!values?.escrowAmount || !values?.activeTime || !values?.inheritAddress) return tips('warning', '需填写完整！');
    setLoading1(true)
    const startTime = values?.escrowAmount
    const daysInMonth = new Date(0, values.activeTime, 0).getDate();
    const secondsInDay = 24 * 60 * 60;
    const peroidTime = daysInMonth * secondsInDay;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    console.log('currentTimeInSeconds', currentTimeInSeconds);
    console.log('Success:', values);
    // const transaction = await contract.createSuccessActivity(values.inheritAddress, startTime, peroidTime, values.escrowAmount)
    //  const receipt = await transaction.await()
    // if (receipt.status === 1) {
    //   tips('success', 'submit success');
    // } else {
    //   tips('error', 'submit error');
    // }
    tips('success', 'submit success');
    setLoading1(false)
  };
  // 下面的提交
  const onFinishTwo = async (values) => {
    if (!myAccout) return tips('warning', '还未登录关联钱包,需要先connect钱包！')
    if (!values?.sendAccount || !values?.contractContent || !values?.addressPer) return tips('warning', '需填写完整！');
    setLoading2(true)
    console.log('Success:', values);
    tips('success', 'submit success');
    setLoading2(false)
    // const transaction = await contract.someMethod(values)
    // await transaction.await()
  };
  const waitClick = () => {
    return tips('warning', '此功能开发中！')
  }
  return (
    <div className="App">
      <div className='headWrap'>
        <div className='left-top'>
          <img src={logo} alt="" className='imgLogo' />
          <span className='logoWorld'>
            MyTreasure
          </span>
        </div>
        <div>
          {
            !myAccout ? (<div onClick={onClickHandler} className='connectBtn'>Connect</div>) : (
              // <Tooltip title={myAccout}>
              <span className='myAccout'>Account: {myAccout}</span>
              // </Tooltip>
            )
          }
        </div>
      </div>
      <div className='titleMy titleMys'>Wealth Treasure</div>
      <div className='content'>
        <Form
          className='formStyle'
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
            flexGrow: 1
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishOne}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="escrowAmount"
          >
            <Input placeholder="托管金额" />
          </Form.Item>

          <Form.Item
            name="activeTime"
          >
            <InputNumber placeholder="互动时间/(月)" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="inheritAddress"
          >
            <TextArea rows={1} placeholder="继承人地址" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" size='large' loading={loading1} style={{ backgroundColor: '#36283b', color: '#e57df4', width: '500px' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ height: '2px', background: '#eb7af8', marginTop: '20px' }}></div>
      <div className='titleMy'>Contract Management</div>
      <div className='content'>
        <Form
          className='formStyle'
          name="basic1"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
            flexGrow: 1
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishTwo}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="sendAccount"
          >
            <Input placeholder="转账金额" />
          </Form.Item>

          <Form.Item
            name="contractContent"
          >
            <TextArea rows={4} placeholder="合同内容" />
          </Form.Item>

          <Form.Item
            name="addressPer"
          >
            <Input placeholder="受益人地址" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 1,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" size='large' loading={loading2} style={{ marginLeft: '10px', backgroundColor: '#36283b', color: '#e57df4', width: '120px' }}>
              Submit
            </Button>
            <Button type="primary" size='large' onClick={waitClick} style={{ marginLeft: '20px', backgroundColor: '#36283b', color: '#e57df4', width: '190px' }}>
              Participate Arbitration
            </Button>
            <Button type="primary" size='large' onClick={waitClick} style={{ backgroundColor: '#36283b', color: '#e57df4', width: '160px', marginLeft: '20px', }}>
              Initiate Arbitration
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
}

export default App;

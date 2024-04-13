# SmartMA项目介绍

### 项目概述
一个基于以太坊EVM的去中心化的双均线自动交易系统，通过高抛低收获取收益。

### 技术架构
合约语言：Solidity + Chainlink Automation + Chainlink data history
前端框架：React

### 核心功能

1. 根据双均线的走势交易。

2. 当双均线交叉且短均线大于长均线时，价格上涨，合约进行买单操作。

3. 当双均线交叉且短均线小于长均线时，价格下跌，合约进行卖单操作。

4. 通过读取Chainlink Data History，获取双均线的数值。

5. 采用Chainlink Automation功能，校验函数中获取双均线的数值并进行操作判断，然后自动执行合约的交易策略，无需人工干预。

6. 资金利用率100%，复利效果巨大。

7. 去中心化，合约部署在L2，可以大大减少交易手续费。

### 项目团队
Team Leader & Solidity Contract： [Kevin Lin](https://github.com/tokenlin)  
UI Designer:    [优雅先森(Jay)](https://github.com/Mt-Youya)

### Code link
https://github.com/tokenlin/SmartMA

### Demo link
https://www.loom.com/share/fe8615b7a00144c096d20502d8f3c272?sid=9ae7e93b-dfe6-4756-997e-f344e0658636

### 联系方式
lkw040535@gmail.com
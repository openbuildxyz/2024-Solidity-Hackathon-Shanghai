pragma solidity ^0.8.20;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
// import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol"; 
// import './ButtToken.sol';

library SafeMath {

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }



    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }

  /**
   * @dev gives square root of given x.
   */
  function sqrt(uint256 x)
  internal
  pure
  returns(uint256 y) {
    uint256 z = ((add(x, 1)) / 2);
    y = x;
    while (z < y) {
      y = z;
      z = ((add((x / z), z)) / 2);
    }
  }

  /**
   * @dev gives square. multiplies x by x
   */
  function sq(uint256 x)
  internal
  pure
  returns(uint256) {
    return (mul(x, x));
  }

  /**
   * @dev x to the power of y 
   */
  function pwr(uint256 x, uint256 y)
  internal
  pure
  returns(uint256) {
    if (x == 0)
      return (0);
    else if (y == 0)
      return (1);
    else {
      uint256 z = x;
      for (uint256 i = 1; i < y; i++)
        z = mul(z, x);
      return (z);
    }
  }
}

contract MyTruesure {
    using SafeMath for uint256;
    //项目方地址
    address public techAddr;  

    //合约维护总财富
    uint public totalTruesure;

    struct Owner{
      // 拥有者地址
      address ownerAddr;
      //继承者地址数组
      address[] successor;
      uint ownerTreature;  //拥有者的财产
      uint startTime;   //每一个周期的起始时间戳
      uint periodTime;   //周期时间
      uint8 islive; //继承活动是否有效。0表示无效，1表示有效。同一个拥有者钱包地址可以创建多个继承活动？

    }

    // mapping(uint256 => Owner) allTruesureMap;  //所有财富继承委托
    Owner[] public allTruesures;

    Owner  myOwner;

    // 把map转换为数组
    // function getKeys() public view returns (uint256[] memory) {
    //     uint256 count = 0;
    //     for (uint256 key = 0; key < 2**256; key++) {
    //         if (allTruesureMap[key].length != 0) {
    //             count++;
    //         }
    //     }
 
    //     uint256[] memory keys = new uint256[](count);
    //     count = 0;
    //     for (uint256 key = 0; key < 2**256; key++) {
    //         if (allTruesureMap[key].length != 0) {
    //             keys[count] = key;
    //             count++;
    //         }
    //     }
    //     return keys;
    // }
   
   /**
   * @dev 合约初始化
   * @param _techAddr 项目方地址
   */
    constructor(address _techAddr)  {  //高版本不需要public
        techAddr = _techAddr;
    }

    /**
    * @dev 判断地址是否为合约地址
    * @param _addr 需判断的地址
    * 
    */
    function isContract(address _addr) private view returns(bool result) {
        uint size;
        assembly {
        size := extcodesize(_addr)
        }
        result = size > 0;
    }

    // receive () external payable {   //向合约发送ETH，并且发送者这个地址不能是合约地址，也就是只能是账户地址，直接转账。
    //     uint _eth = msg.value;
    //     bool flag = isContract(msg.sender);
    //     // 如果不是合约地址
    //     if (!flag) {
    //         // 如果转入了eth
    //         if (_eth > 0) {
    //             // 参加评定活动

    //             // scratchWithEthDistribution(msg.sender, address(0x0), _eth); //这里的ETH直接从发送端到目的地址已经连接起来了，中间没有中断的地方，所以不会有问题。
    //         } else {//*如果传入的以太为0，表示要测回以太币
    //             // 撤回坐庄资金


    //             // recallEthCore(msg.sender, 0);
    //         }
    //     }
    // }

  // 进行纯转账时，会触发回退函数。当合约收到以太但没有数据，回退函数就会执行，这是回退函数需要加上payable。
    // fallback () payable external {}



    //创建继承活动
   /*
   * @dev 创建继承活动。
   * @param filmId 电影ID
   */


     event Withdrawal(uint amount, uint when);

    //这个可以试着改为event事件
    function createSuccessActivity( address sucessorAddr,uint startTime,uint peroidTime) external payable {  //注意在智能合约中如果函数添加payable，那么就会在生成封装类时会自动把value这个参数加入到入参中。
      require(isContract(sucessorAddr) == false, "Not a normal user");
      require(peroidTime >86400, "peroidTime id much small,need bigger one day");  //定时太小
      require(msg.value>0, "Eth balance is 0");
      // uint _eth = msg.value;  //考虑只用token还是以太币。注意这里通过msg来获得值，实际也可以通过入参获得，但是msg是永不会出错的值，它是直接从合约消息中直接获得的。
      payable(address(this)).transfer(msg.value); //真实转账操作

      Owner storage owner=myOwner;
      owner.ownerAddr=msg.sender;
      owner.ownerTreature=msg.value;
      owner.startTime=startTime;
      owner.periodTime=peroidTime;
      owner.islive=1;
      // 继承者
      owner.successor.push(sucessorAddr);

      allTruesures.push(owner);
    }


    //检查是否有到期的继承活动，由外部项目方触发即可
    function checkAllSucessActivity() external {
      for (uint i = 0; i < allTruesures.length; i++) {
          if(allTruesures[i].islive==1){//当前活动有效
            uint currentTime=block.timestamp;
            uint diedTime=allTruesures[i].startTime + allTruesures[i].periodTime;
            if(currentTime>=diedTime){  //继承操作开始
              address  payable to=payable(allTruesures[i].successor[0]);
              to.transfer(allTruesures[i].ownerTreature); //
              // ButtToken(_tokenAddr).transfer(address(this), feeValue); //token实际转账
              allTruesures[i].ownerTreature=0;
              allTruesures[i].islive=0;

            }
          }
        }
    }

    //拥有者回退操作
    function withDrawBack() public {
      address ownerAddr=msg.sender;
      uint totalTreasure;
      uint iswithDraw=0;
      for (uint i = 0; i < allTruesures.length; i++) {
          if(allTruesures[i].ownerAddr==ownerAddr){//当前活动有效
            totalTreasure+=allTruesures[i].ownerTreature;
            allTruesures[i].ownerTreature=0;
            allTruesures[i].islive=0;
            iswithDraw=1;
          }
        }
      if(iswithDraw==1){
        emit Withdrawal(totalTreasure ,block.timestamp);
        address  payable to=payable(ownerAddr);
        to.transfer(totalTreasure); //
      }
    }


    //拥有者触发延时
    function ownerDelay(uint peroidTime) public {
      require(peroidTime >86400, "peroidTime id much small,need bigger one day");  //定时太小
      address ownerAddr=msg.sender;
      for (uint i = 0; i < allTruesures.length; i++) {
          if((allTruesures[i].ownerAddr==ownerAddr)&&(allTruesures[i].islive==1)){//当前活动有效
            allTruesures[i].startTime=block.timestamp;
            allTruesures[i].periodTime=peroidTime;
          }
        }
    }



  // 获取当前合约的余额
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}

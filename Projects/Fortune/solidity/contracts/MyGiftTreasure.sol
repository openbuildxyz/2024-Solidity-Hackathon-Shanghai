contract MyGiftTreasure {
   
    //项目方地址
    address public techAddr;  

    //合约维护总财富
    uint public totalGiftTruesure;

    // 正常彩礼对象结构
    struct GiftTreasure{
        // 男方
        address manAddr;
        // 女方
        address feamealAddr;
        uint totalGiftTreasure;
        uint periodTime;   //分发总时间
        uint8 isStateOk; //分发状态是否正常。0表示不正常，1表示正常。


    }

    // 需要仲裁对象结构
    struct VoteTreasure{
        // 男方
        address manAddr;
        // 女方
        address feamealAddr;
        address judgeAddr;  //判定者
        uint totalGiftTreasure;

        uint judgerNum; //判定成员

        
    }








}
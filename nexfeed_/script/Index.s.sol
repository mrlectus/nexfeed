// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Index.sol";

contract DeployFeedback is Script {
    function run() external {
        vm.startBroadcast();
        ProductContract productContract = new ProductContract();
        console2.log("ProductContract deployed to:", address(productContract));
        FeedbackContract feedbackContract = new FeedbackContract(address(productContract));
        console2.log("FeedbackContract deployed to:", address(feedbackContract));
        vm.stopBroadcast();
    }
}

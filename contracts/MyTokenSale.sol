pragma solidity 0.6.0;

import './CrowdSale.sol';

contract MyTokenSale is Crowdsale{
    constructor(
        uint256 rate,    // rate the price of each token
        address payable wallet, // an addrr with which we are going to send the token to
        IERC20 token
    )

        Crowdsale(rate, wallet, token)
        public
    {

    }
}
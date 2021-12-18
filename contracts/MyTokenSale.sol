pragma solidity 0.6.0;

import './CrowdSale.sol';
import './KycContract.sol';

contract MyTokenSale is Crowdsale{
    KycContract kyc;
    constructor(
        uint256 rate,    // rate the price of each token
        address payable wallet, // an addrr with which we are going to send the token to
        IERC20 token,
        KycContract _kyc
    )

        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
        super._preValidatePurchase(beneficiary,weiAmount);
        require(kyc.KycCompleted(msg.sender),"KYC Not Completed ,purchase not allowed");

    }


}
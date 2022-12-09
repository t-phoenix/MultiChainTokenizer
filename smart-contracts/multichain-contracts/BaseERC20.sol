// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./lzContracts/OFT.sol";




contract BaseERC20 is ERC20Permit, ERC20Votes, OFT {
    constructor(string memory name, string memory symbol, uint supply, address owner, address _lzEndpoint) ERC20Permit(name) OFT(name, symbol, _lzEndpoint){
        _mint(owner, supply * 10 ** decimals());
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }


    function circulatingSupply() public view virtual override returns (uint) {
        unchecked {
            return totalSupply() - balanceOf(address(this));
        }
    }

    function _debitFrom(address _from, uint16, bytes memory, uint _amount) internal virtual override returns(uint) {
        address spender = _msgSender();
        if (_from != spender) _spendAllowance(_from, spender, _amount);
        _transfer(_from, address(this), _amount);
        return _amount;
    }

    function _creditTo(uint16, address _toAddress, uint _amount) internal virtual override returns(uint) {
        _transfer(address(this), _toAddress, _amount);
        return _amount;
    }


}
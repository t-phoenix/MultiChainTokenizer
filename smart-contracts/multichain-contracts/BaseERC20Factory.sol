// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./BaseERC20.sol";

contract BaseERC20Factory{
    event NewBaseTokenCreated(string name, string symbol, uint256 amount);

    uint numOfBaseTokens;

    struct baseTokenMeta{
        uint256 id;
        string projectName;
        string symbol;
        uint256 initialSupply;
        address tokenBeneficiary;
        address contractAddress;
    }

    mapping(uint => baseTokenMeta) private deployedBaseTokens;

    function createBaseToken(string memory name, string memory symbol, uint initialSupply, address beneficiary, address lzEndpoint) public {
        uint projectId = numOfBaseTokens++;
        baseTokenMeta storage project = deployedBaseTokens[projectId];
        project.id = projectId;
        project.projectName = name;
        project.symbol = symbol;
        project.initialSupply = initialSupply;
        project.tokenBeneficiary = beneficiary;
        project.contractAddress = address(new BaseERC20(name, symbol, initialSupply,  beneficiary, lzEndpoint));
        emit NewBaseTokenCreated(name, symbol, initialSupply);
    }

    function getAllBaseTokens () public view returns (baseTokenMeta[] memory props){
        // return deployedProjects;
        props = new baseTokenMeta[](numOfBaseTokens);
        
        for (uint256 index =0; index< numOfBaseTokens; index++){
            props[index] = deployedBaseTokens[index];
        }
    }

    function getBaseTokenById(uint256 tokenId) public view returns (baseTokenMeta memory){
        return deployedBaseTokens[tokenId];
    }


}
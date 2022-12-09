// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


import "./OtherERC20.sol";


contract ERC20Factory {
    
    event NewOtherChainTokenCreated(string name, string symbol);

    uint numOfOtherChainTokens;

    
    struct otherTokenMeta{
        uint256 id;
        string projectName;
        string symbol;
        address contractAddress;
    }

    // projectMeta[] public deployedProjects;
    mapping(uint => otherTokenMeta) private deployedOtherChainTokens;
    
    

    function createOtherChainToken(string memory name, string memory symbol, address lzEndpoint) public {
        uint projectId = numOfOtherChainTokens++;
        otherTokenMeta storage project = deployedOtherChainTokens[projectId];
        project.id = projectId;
        project.projectName = name;
        project.symbol = symbol;
        project.contractAddress = address(new OtherERC20(name, symbol, lzEndpoint));
        emit NewOtherChainTokenCreated(name, symbol);
        // deployedProjects.push(newProject);
    }
    
    

    function getAllOtherChainTokens () public view returns (otherTokenMeta[] memory props){
        props = new otherTokenMeta[](numOfOtherChainTokens);
        for (uint256 index = 0; index < numOfOtherChainTokens; index++) {
            props[index] = deployedOtherChainTokens[index];
        }
    }

    function getOtherChainTokenById(uint256 tokenId) public view returns (otherTokenMeta memory){
        return deployedOtherChainTokens[tokenId];
    }
}
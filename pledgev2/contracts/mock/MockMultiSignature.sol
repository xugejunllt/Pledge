// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IMultiSignature{
    function getValidSignature(bytes32 msghash,uint256 lastIndex) external view returns(uint256);
}

contract MockMultiSignature is IMultiSignature {
    mapping(bytes32 => uint256) public approvals;

    function approve(address caller, address target, uint256 index) external {
        bytes32 msgHash = keccak256(abi.encodePacked(caller, target));
        approvals[msgHash] = index + 1;
    }

    function getValidSignature(bytes32 msghash,uint256 lastIndex) external view override returns(uint256) {
        uint256 idx = approvals[msghash];
        return idx;
    }
}

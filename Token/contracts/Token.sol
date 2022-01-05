// SPDX-License-Identifier: GPL-3.
pragma solidity ^0.8.0;

contract Token {
    
    uint256 public totalSupply;
    string public name = "Melly";
    string public symbol= "MEL";
    string public standard = "MEL-v1.0";

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping(address => uint256)) public allowance;

    function token(uint256 _initalSupply) public {
        balanceOf[msg.sender] = _initalSupply; 
        totalSupply = _initalSupply;
    }

    function transfer(address _to , uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value , 'not enough balance');
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender , uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender , _spender , _value);
        
        return true;
    }

    function transferFrom(address _from , address _to  , uint256 _value) public returns(bool success) {
        require(balanceOf[_from] >= _value , 'not enough balance');
        require(allowance[_from][msg.sender] >= _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value; 

        emit Transfer(_from, _to, _value);

        return true;
    }

     
} 
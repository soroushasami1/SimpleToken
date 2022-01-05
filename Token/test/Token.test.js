const Token = artifacts.require('./Token.sol')
const assert = require('assert');

require('chai')
    .use(require('chai-as-promised'))
    .should()



contract('Token', (accounts) => {
    let token

    before(async () => {
        token = await Token.deployed()
    })

    describe('init the token values_State variables', async () => {
        it('initializes the contract with the correct values', async () => {

            const tokenName = await token.name()
            assert.equal(tokenName, 'Melly', 'has the correct name')

            const tokenSymbol = await token.symbol()
            assert.equal(tokenSymbol, 'MEL', 'has the correct symbol')

            const tokenStandard = await token.standard()
            assert.equal(tokenStandard, 'MEL-v1.0', 'has the correct standard')
        })
    })

    describe('token', async () => {
        it('allocates the inital supply upon deployment', async () => {

            await token.token(1000000)

            let totalSupply = await token.totalSupply()
            assert.equal(totalSupply.toNumber(), 1000000, 'compare supply with 1m')

            const balance = await token.balanceOf(accounts[0])
            assert.equal(balance.toNumber(), 1000000, 'compare balance with supply - owner')
        })
    })


    describe('transfer', async () => {
        it('transfer tokens ownership', async () => {
            const balance = await token.balanceOf(accounts[0])
            const amount = 90

            expect(balance.toNumber()).to.be.greaterThan(amount)
            const logs = await token.transfer(accounts[1], amount)

            assert.equal(logs.logs[0].event, 'Transfer', 'should be the transfer event')
            assert.equal(logs.logs[0].args._from, accounts[0], 'the address has sent(transfered)')
            assert.equal(logs.logs[0].args._to, accounts[1], 'the address has received')
            assert.equal(logs.logs[0].args._value, amount, 'the value has sent(transfer amount )')

        })
    })

    describe('approve', async () => {
        it('approves tokens for delegated transfer', async () => {
            const approveCall = await token.approve.call(accounts[1], 100)
            assert.equal(approveCall, true, 'return must be true')
            
            const logs = await token.approve(accounts[1], 100)
            assert.equal(logs.logs[0].event, 'Approval', 'should be the approval event')
            assert.equal(logs.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by')
            assert.equal(logs.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to')
            assert.equal(logs.logs[0].args._value, 100, 'transfer amount')
        })
    })

    
    describe('transferFrom' , async ()=> {
        it ('handles delegated transfer token' , async () => {
            const fromAccount = accounts[2]
            const toAccount = accounts[3]
            const spendingAccount = accounts[4]

            await token.transfer(fromAccount , 100)

            await token.approve(spendingAccount , 10)
        
            const first = await token.allowance(accounts[0] , spendingAccount)
            console.log(first)
            const transferFromReturn = await token.transferFrom.call(accounts[0] , toAccount , 20)
            assert.equal(transferFromReturn , true , 'must be true')
            await token.transferFrom(fromAccount , toAccount , 20)            

        })
    })





})
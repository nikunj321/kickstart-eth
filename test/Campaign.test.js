const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFacotory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign('1000')
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaign', () => {

    it('deployed Campaign and CampaignFactory', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('mark caller as Campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allow people to contribute and mark them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '2000',
            from: accounts[1]
        });

        const isContibuter = await campaign.methods.approvers(accounts[1]).call();
        assert(isContibuter);
    });

    it('require a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[2]
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allow manager to  create request', async () => {
        await campaign.methods
            .createRequest('buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        
        const request = await campaign.methods.requests(0).call();

        assert.equal('buy batteries', request.description);
    });

});























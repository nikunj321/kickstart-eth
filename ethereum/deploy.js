const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFacotory.json');

const provider = new HDWalletProvider(
    'sing observe organ case power brief crash tone tissue winter clog genius',
    'https://rinkeby.infura.io/v3/482ab3d859be441ab018517f2654b346'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('contract deployed to ', result.options.address); // 0x38B36d954d7acd71507cbe2c8931a249c05ff2Eb
};
deploy();
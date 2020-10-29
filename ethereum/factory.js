import web3 from './web3';
import CampaignFactory from './build/CampaignFacotory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x38B36d954d7acd71507cbe2c8931a249c05ff2Eb'
);

export default instance;
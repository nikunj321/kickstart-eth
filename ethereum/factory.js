import web3 from './web3';
import CampaignFactory from './build/CampaignFacotory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x96fd16A7128631faAe069A78652961Bb9BB47622'
);

export default instance;
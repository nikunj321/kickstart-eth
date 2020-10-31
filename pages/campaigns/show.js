import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        // console.log(summary);
        return {
            minimumContribution : summary[0],
            Balance : summary[1],
            requestsCount : summary[2],
            approversCount : summary[3],
            manager : summary[4]

        };
    }
    
    renderCard() {
        const {
            minimumContribution,
            Balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description : 'manager that created this campaign and can create request to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'minimum contribution in Wei',
                description: 'you should this much to become approvers'
            },
            {
                header: requestsCount,
                meta: 'number of request',
                description: 'number of request to withdraw money form campaign.'
            },
            {
                header: approversCount,
                meta: ' number of approvers',
                description: 'number of people donated to this campaign.'
            },
            {
                header: web3.utils.fromWei(Balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'this much money is left to spent.'

            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign show</h3>
                {this.renderCard()}
            </Layout>
        );
    }
}

export default CampaignShow;
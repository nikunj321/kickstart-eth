import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';


class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };

    }

    renderCampaign() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaigns</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return <Layout>
            <div>
                {/* "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css" */}
                
                <h3>Open Campaigns</h3>
                
                <Button
                    floated="right"
                    content=" Create Campaign"
                    icon="add circle"
                    primary
                />
                {this.renderCampaign()}
            </div>;
        </Layout>;
    }
}

export default CampaignIndex;
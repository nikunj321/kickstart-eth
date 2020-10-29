import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

export default (props) => {
    return <Container>
        <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
        />
        <Header />
        {props.children}
    </Container>;
};
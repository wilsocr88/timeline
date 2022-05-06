import React from 'react'
import { Container, Row, Col, Spinner } from 'reactstrap'

function Loader() {
    return(
        <Container>
            <Row>
                <Col>
                    <center>
                        <Spinner color="secondary" />
                    </center>
                </Col>
            </Row>
        </Container>
    )
}

export default Loader

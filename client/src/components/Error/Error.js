import React from 'react'
import { Container, Row, Col } from 'reactstrap'

function Error( props ) {
    return(
        <Container>
            <Row className="pt-3 pb-3">
                <Col>
                    <center className="logo-font">
                        <h3 className="logo-font">ERROR:</h3>
                        { props.message.message === "Failed to fetch" ? 
                            "Can't find the server!"
                        : 
                            props.message.message }
                    </center>
                </Col>
            </Row>
        </Container>
    )
}

export default Error

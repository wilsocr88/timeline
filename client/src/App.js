import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Timeline from './components/Timeline'
import './css/App.css'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            darkMode: localStorage.getItem("dark-mode") || false
        }
    }

    render() {
        return (
            <>
                <Container id="main">
                    <Row className="pt-4 pb-4">
                        <Col>
                            <Timeline />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p id="footer" className="stamp"><small>&copy; 2020. All rights reserved<br/></small></p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}

export default App

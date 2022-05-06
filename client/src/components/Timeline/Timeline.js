import React from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import { MdRefresh } from 'react-icons/md'
import Loader from '../Loader'
import Mark from '../Mark'
import Error from '../Error'
import PostBox from '../PostBox'
import Post from '../Post'
import Lightswitch from '../Lightswitch'
import Menu from '../Menu'
import $ from 'jquery'
import './Timeline.css'

class Timeline extends React.Component {

    constructor( props ) {
        super( props )
        this.props = props
        this.doPost = this.doPost.bind(this)
        this.doFetch = this.doFetch.bind(this)
        this.doIntervalClear = this.doIntervalClear.bind(this)
        this.doIntervalSet = this.doIntervalSet.bind(this)
        this.doIntervalReset = this.doIntervalReset.bind(this)
        this.doTimerInterval = this.doTimerInterval.bind(this)
        this.doRefresh = this.doRefresh.bind(this)
        this.state = {
            isLoaded: false,
            posting: false,
            refreshing: false,
            stopTimer: false,
            updateInterval: 15
        }
        window.onscroll = () => {
            if ( window.pageYOffset > 0 ) {
                this.setState({
                    stopTimer: true
                })
                this.doIntervalClear()
            } else {
                this.setState({
                    stopTimer: false
                })
                this.doIntervalSet()
            }
        }
    }

    doFetch() {
        if ( this.state.stopTimer === "true" && this.state.refreshing === "false" ) return
        this.setState({ isLoaded: false, refreshing: false })
        fetch( window.location.origin + "/posts" )
        .then( res => res.json() )
        .then(
            ( res ) => {
                this.setState({
                    isLoaded: true,
                    posts: res.posts,
                    timer: this.state.updateInterval
                })
            },
            ( err ) => {
                console.error( err )
                this.setState({
                    isLoaded: true,
                    isError: true,
                    error: err
                })
            }
        )
    }

    doPost( text ) {
        this.setState({ posting: true })
        $.post( window.location.origin + "/posts/new",
         { text },
         ( res ) => {
             this.setState({
                 posting: false
             })
            this.doFetch()
        })
    }

    componentDidMount() {
        this.doFetch()
        this.doIntervalSet()
    }

    doIntervalSet() {
        this.setState({
            interval: setInterval( this.doFetch, this.state.updateInterval * 1000 ),
            timerInterval: setInterval( this.doTimerInterval, 1001 ),
            timer: this.state.updateInterval
        })
    }

    doTimerInterval() {
        if ( this.state.stopTimer ) return
        var newTimer = this.state.timer - 1
        if ( newTimer < 0 ) newTimer = 0
        this.setState({
            timer: newTimer
        })
    }

    doIntervalClear() {
        clearInterval( this.state.interval )
        clearInterval( this.state.timerInterval )
        this.setState({
            timer: this.state.updateInterval
        })
    }

    doIntervalReset() {
        this.doIntervalClear()
        this.doIntervalSet()
        this.setState({
            timer: this.state.updateInterval
        })
    }

    doRefresh() {
        console.log( "do refresh" )
        this.setState({ refreshing: true })
        this.doFetch()
        this.doIntervalReset()
        console.log( "done refresh" )
    }

    componentWillUnmount() {
        this.doIntervalClear()
    }

    render() {
        return(
                <Container className>
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <h2 className="logo-font pt-2">[Timeline]</h2>
                                </CardHeader>
                                <CardBody>
                                    <Menu />
                                    <Lightswitch />
                                    <PostBox doPost={ this.doPost } posting={ this.state.posting } intervalResetter={ this.doIntervalReset } />
                                    { !this.state.isLoaded ?
                                        <Loader />
                                    :
                                    this.state.isLoaded && this.state.isError ?
                                        <Error message={ this.state.error } />
                                    :
                                        <>
                                            <a className="logo-font" style={{ cursor:"pointer" }} onClick={ this.doRefresh } ><MdRefresh /><small>{ this.state.timer }</small></a>
                                            {this.state.posts.map( post =>
                                                <Post post={ post } />
                                            )}
                                        </>
                                    }
                                    <Mark />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        )
    }

}

export default Timeline

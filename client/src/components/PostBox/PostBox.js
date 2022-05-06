import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'
import $ from 'jquery'
import './PostBox.css'

class MessageBox extends React.Component {

    constructor( props ) {
        super( props )
        this.props = props
        this.handleChange = this.handleChange.bind(this)
        this.doPost = this.doPost.bind(this)
        this.state = {
            something: "something",
            name: localStorage.getItem("id"),
            text: localStorage.getItem("text"),
            charCount: 0,
            maxChars: 300,
            maxLineBreaks: 8,
            isLoading: false
        }
    }

    handleChange( e ) {
        var value = e.target.value
        if ( value.split(/\r\n|\r|\n/).length > this.state.maxLineBreaks ) {
            var val = value.slice( 0, value.length - 1 )
            value = val
        }

        localStorage.setItem( "text", value )
        this.setState({
            text: value,
            charCount: e.target.value.length
        })
    }

    doPost( e ) {
        e.preventDefault()
        if (
            this.props.posting ||
            typeof this.state.text === "undefined" ||
            this.state.text.trim() === ""
        ) return
        this.props.doPost( this.state.text )
        this.setState({
            text: "",
            charCount: 0
        })
        localStorage.removeItem("text")
    }

    componentDidMount() {
        var len
        if ( typeof $("#text").val() === "undefined" ) {
            len = 0
        }  else {
            len = $("#text").val().length
        }

        fetch( window.location.origin + "/something")
         .then( res => res.json() )
         .then(
            ( res ) => {
                this.setState({
                    something: res.something,
                    charCount: len
                })
            },
            ( err ) => {
                this.setState({
                    something: "something",
                    charCount: $("#text").val().length || 0
                })
            }
        )
    }

    render() {
        return(
            <Form onSubmit={ this.doPost } className="mb-4" >
                <FormGroup>
                    <small>{ this.state.charCount + " / " + this.state.maxChars }</small>
                    <Input
                        autoFocus
                        id="text"
                        name="text"
                        type="textarea"
                        maxLength={ this.state.maxChars }
                        onChange={ this.handleChange }
                        placeholder={ "Post " + this.state.something }
                        value={ this.state.text || "" }
                    />
                    <small className="stamp">Preview:</small>
                    <ReactMarkdown source={this.state.text} />
                </FormGroup>
                { this.props.posting ? <Loader /> : <Button block className="logo-font" size="lg" onClick={ this.doPost }>Post</Button> }
            </Form>
        )
    }

}

export default MessageBox

import React from 'react'
import ReactMarkdown from 'react-markdown'
import './Post.css'

class Post extends React.Component {

    constructor( props ) {
        super( props )
        this.props = props
    }

    render() {
        return(
            <div key={this.props.post._id} className="post">
                <p className="stamp logo-font">
                    <small>{ new Date(this.props.post.date).toLocaleString() } | id: { this.props.post.name }</small></p>
                <p className="logo-font"><ReactMarkdown source={this.props.post.text} /></p>
            </div>
        )
    }

}

export default Post

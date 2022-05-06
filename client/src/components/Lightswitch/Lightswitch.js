import React from 'react'
import { MdWbSunny } from 'react-icons/md'
import './Lightswitch.css'

class Lightswitch extends React.Component {

    constructor() {
        super()
        this.lights = this.lights.bind(this)
        this.addDark = this.addDark.bind(this)
        if (
         localStorage.getItem("lightswitch") === null ||
         localStorage.getItem("lightswitch") === "true" ||
         typeof localStorage.getItem("lightswitch") === "undefined"
        ) {
            localStorage.setItem("lightswitch", "true")
            this.state = {
                switch: "true"
            }
        } else {
            this.state = {
                switch: localStorage.getItem("lightswitch")
            }
        }
    }

    lights() {
        if (
         this.state.switch === "true" ||
         localStorage.getItem("lightswitch") === "true"
        ) {
            this.addDark()
            return
        } else {
            var darkCSS = document.getElementById("dark-css")
            if ( darkCSS !== null ) darkCSS.remove()
            localStorage.removeItem( "lightswitch" )
            localStorage.setItem( "lightswitch", "true" )
            this.setState({
                switch: "true"
            })
        }
    }

    addDark() {
        var link = document.createElement( "link" )
        link.id = "dark-css"
        link.rel = "stylesheet"
        link.href = "/dark.css"
        document.body.append( link )
        localStorage.removeItem( "lightswitch" )
        localStorage.setItem( "lightswitch", "false" )
        this.setState({
            switch: "false"
        })
    }

    componentDidMount() {
        if ( localStorage.getItem("lightswitch") === "false" ) this.addDark()
    }

    render() {
        return(
            <div onClick={this.lights} className="lightswitch"><MdWbSunny /></div>
        )
    }

}

export default Lightswitch

import React from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import Mark from '../Mark'
import './Menu.css'

class Menu extends React.Component {

    constructor() {
        super()
        this.toggle = this.toggle.bind(this)
        this.modal = this.modal.bind(this)
        this.state = {
            dropdownOpen: false,
            modal: false
        }
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    modal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return(
            <>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret/>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.modal}>About</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal isOpen={this.state.modal} toggle={this.modal} backdrop={true}>
                    <ModalHeader toggle={this.modal}>
                        <h2 className="logo-font">[About]</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p className="logo-font">
                            Timeline is a completely anonymous online text feed.
                            It's "social" without the "media."
                        </p>
                        <p className="logo-font">
                            Post something
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Mark />
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

export default Menu

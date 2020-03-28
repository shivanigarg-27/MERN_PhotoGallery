
import React, { Component } from 'react';
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap';

export default class FileUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileImg : ''
        }
    }

    onFileChange = (e) => {
         this.setState({
             profileImg: e.target.files[0]
         })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('userEmail', this.props.useremail)
        formData.append(
            'profileImg', this.state.profileImg)

        axios.post("http://localhost:3010/users", formData, {})
        .then(res => {
            alert('file uploaded successfully...!!!')
            window.location.reload()
        })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>        
                        <form onSubmit={(e) => this.onSubmit(e)}>
                            <div className='form-group'>
                                <input type='file'
                                        onChange = {(e) => this.onFileChange(e)}  />
                            </div>
                            <div className='form-group'>
                                <button type='submit' className='btn btn-primary'>Upload</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
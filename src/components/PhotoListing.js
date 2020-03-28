
import React, {Component} from 'react'
import {useAuth0} from '../contexts/ContextAuth';
import axios from 'axios'
import LazyLoad from 'react-lazyload';
import './commanStyle.scss'

export default class PhotoListing extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            photoGallery : []
        }
    }

    async componentDidMount() {   
        await axios.get(`http://localhost:3010/photoesOfUser?userEmail=${this.props.useremail}`)
        .then((res) => {
            this.setState({
                photoGallery: res.data
            })
          });
    }

    render() {
        const UserPhotoes = this.state.photoGallery.users
        return (
            <div className='row photoList'>
                {
                    UserPhotoes && UserPhotoes.map((photo) => 
                        <div className='col-md-4'>
                            <LazyLoad offset={300} height={300}>
                                <img src={photo.profileImg} />
                            </LazyLoad>
                        </div>
                    ) 
                }{
                    UserPhotoes && UserPhotoes.length <= 0 && <h3>No Photoes for you!!! Upload New First...</h3>
                }
            </div>
        )
    }
}

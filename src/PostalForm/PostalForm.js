import React from 'react'
import { Button, Result, Row, Col } from 'antd';
import MapApiService from '../services/map-api-service';

class PostalForm extends React.Component {
    state = {
        postal: '',
        markers: '',
    }

    handleSubmit = () => {
        MapApiService.getGeocode(this.state.postal)
            .then(res => {
                console.log(res)
                const lat = res.results[0].geometry.location.lat
                const lng = res.results[0].geometry.location.lng
                console.log(lat)
                console.log(lng)

                MapApiService.getMarkers(lat, lng)
                    .then(markers => {
                        this.props.handleMarkers(markers)
                    })
            })
    }

    handleInput = (postal) => {
        this.setState({
            postal: postal
        })
    }
    
    render() {
       

        return(
            <div>
               
                  <div className="content-section low-padding">
                      <div className="content-container">
                  
                      <div className="vet-find-container">



    <div className="container-2">
    <div className="cta-banner-dark">
        <div className="input-container">
        <div className="input-label-box">
        <h4 className="input-title">Optional: Enter your postal code to sort centres by distance</h4>
        </div>
        <div className="centre-finder-input-box">
         
        
                
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12}>
                        <div>
                            <input
                            className="centre-finder-input"
                        type="text"
                        onChange={e => this.handleInput(e.target.value)}
                        />
                        </div>
                        </Col>
                        
                        <Col style={{margin: 0}} xs={24} sm={24} md={12} lg={12}>
                        <div className="input-button-container">
                        <Button
                        className="centre-finder-button"
                        onClick={this.handleSubmit}>
                        Go
                        </Button>
                        </div>
                    
                        </Col>
                    </Row>
                        
               

                   
                        

          
           
         
     
        



</div>
</div>
</div>
</div>
</div>
</div>
                  </div>
             
               
                  




            </div>

        )
    }
}

export default PostalForm;
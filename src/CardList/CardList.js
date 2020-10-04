import React from 'react'
import Cards from '../Cards/Cards'
import PostalForm from '../PostalForm/PostalForm'
import { Layout, Button, Collapse, Badge } from 'antd';
import { PlusCircleOutlined, WarningOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import WaitApiService from '../services/wait-api-service';
import * as dayjs from 'dayjs'
import RegionSelector from '../RegionSelector/RegionSelector'

class CardList extends React.Component {
    
    state = {
        waitTimes: [],
        test: '',
        regions: [1,2,3],
        sortableSites: '',
        regionOpen: false,
        postalOpen: false,
        sorted: false
    }

    componentDidMount = () => {
        this.refreshData()
      }
    
      refreshData = () => {
      
        
        WaitApiService.getLocations()
            .then(res => {
              this.setWaits(res)
            
            })
          }
      
    
      setWaits = (res) => {
        this.setState({
          waitTimes: res
        })
      }

      setRegion = (regions) => {
          this.setState({
              regions: regions
          })
      }

      handleMarkers = (markers) => {
          this.setState({
              waitTimes: markers,
              sorted: true
          })
      }
      
      openPostalFilter = () => {
        this.setState({
            postalOpen: true
        })
      }

      openRegionFilter = () => {
        this.setState({
            regionOpen: true
        })
      }

      closePostalFilter = () => {
          this.setState({
              postalOpen: false
          })
      }

    render() {
        const { Panel } = Collapse;
        const { waitTimes } = this.props;
        const dropdownIcon = <PlusCircleOutlined />

        const zeroCheck = this.state.waitTimes.filter(w => w.avg_wait)
        const filterCheck = this.state.waitTimes.filter(w => this.state.regions.includes(w.region)).map(item => item)
        console.log(this.state)
        console.log(filterCheck)
      
        

    
     
      

       
        
        return (
            <div className="card-list">
             


               

               
                
                <div className="content-section">
                    <div className="content-container">
                        

                    
                    <div className="title-centre">
                            <div className="guide-heading">
                            {this.state.sorted ? "Sorted" : "Unsorted"}
                            </div>
                                
                 
                                <h1 className="display-heading small">
                                    GTA Test Sites
                            </h1>
                       



                            </div>
                            <div className="filter">
                            <div className="filter-title">
                                        Filter list by
                                    </div>
                                <div className="filter-toolbar">
                                    
                                    <div className="filter-toolbar-flex-wrapper">
                                        <Button 
                                            className="filter-button"
                                            onClick={this.openPostalFilter}>
                                            <span className="filter-icon">

                                            </span>
                                            <span className="filter-text">
                                                Distance
                                            </span>
                                        </Button>
                                        <Button 
                                            className="filter-button"
                                            onClick={this.openRegionFilter}>
                                            <span className="filter-icon">

                                            </span>
                                            <span className="filter-text">
                                                Region
                                            </span>
                                        </Button>
                                    </div>

                                </div>
                            </div>


                            {this.state.postalOpen && 

                            <PostalForm 
                                handleMarkers={this.handleMarkers}
                                closeContainer={this.closePostalFilter} />
                            }

                            
                            {this.state.regionOpen &&
                            <div className="region-selector-container">
                                <RegionSelector setRegion={this.setRegion} />
                             </div>
                            }


                    <div className="card-loop">
                 
                    {this.state.waitTimes.filter(w => this.state.regions.includes(w.region)).map(wait => 
                         
                        
                   
                         <div className="shop-product-card" key={wait.id}>
                            
                         <div className="shadow-box">
                         <a target='_blank' rel="noopener noreferrer" href={`${wait.address_link}`}>
            
                         <div className="product-item">
                         {wait.distance && 
                         <div className="submissions-bar">
                             
                             <p className="submission-text">{Math.round(wait.distance)} km from you</p>
                             
                         </div>
                         }
                           
                           <div className="shop-product-clickable-details">
                          
                               <p className="shop-product-title bold-title">{wait.name}</p>
                           
                           </div>
               
                           </div>
                       
                       
                       </a>
                       <div className="price-box">
                         
                       <a target='_blank' rel="noopener noreferrer" href={`${wait.address_link}`}>
                           <p className="shop-product-detail">{wait.address}</p>
                            </a>
                            <a target='_blank' rel="noopener noreferrer" href={`${wait.link}`}>
                            <Button className="appt-button">
                               Appointment link
                           </Button>
                           </a>
                       </div>
                
                   
                       <div className="shop-product-quick-add-box">
               
                                                               
               
               <Collapse 
                   bordered={false}
                   ghost>
                   <Panel header="More Details" key="1">
                       <div className="more-detail-panel">
                        <p className="shop-product-detail">Hours: {wait.hours}</p>
                        <p className="shop-product-detail">Age Restrictions: {wait.age_restrictions}</p>
                        <p className="shop-product-detail">Other details: {wait.other_details}</p>
                        <a target='_blank' rel="noopener noreferrer" href={`${wait.link}`}>
                        <p className="shop-product-detail">Site</p>
                        </a>
                       
                       </div>
                   </Panel>
               </Collapse>
               
               </div>
                       
                       
                      
                     </div>
               
                     </div>
                    
                    )}
                    
                </div>

                

                
                   
           
               
                </div>
            </div>
            </div>
        )
    }
}

export default CardList;
import React from 'react'
import Cards from '../Cards/Cards'
import Form from '../Form/Form'
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
        regions: [1,2,3,4]
    }

    componentDidMount = () => {
        this.refreshData()
      }
    
      refreshData = () => {
        const today = dayjs();
        const date = dayjs(today).format('YYYY-MM-D')
        const hour = dayjs(today).format('HH')
        
        WaitApiService.getAllWaits(date, hour)
           
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
      

    render() {
        const { Panel } = Collapse;
        const { waitTimes } = this.props;
        const dropdownIcon = <PlusCircleOutlined />

        const zeroCheck = this.state.waitTimes.filter(w => w.avg_wait)
        console.log(this.state)
      
        

    
     
      

       
        
        return (
            <div className="card-list">
             


                <Form refreshData={this.refreshData} />

               
                
                <div className="content-section">
                    <div className="content-container">
                        

                    
                    <div className="title-centre">
                            <div className="guide-heading">
                            Live
                            </div>
                                
                 
                                <h1 className="display-heading small">
                                    Updated in past hour
                            </h1>
                       



                            </div>

                            <div className="region-selector-container">
                                <RegionSelector setRegion={this.setRegion} />
                             </div>
                             
                    <div className="card-loop">
                    {zeroCheck.length === 0 && <p>No wait times posted yet</p>}
                    {zeroCheck.length > 0 && this.state.waitTimes.filter(w => w.avg_wait && this.state.regions.includes(w.region)).map(wait => 
                         
                        
                   
                         <div className="shop-product-card" key={wait.id}>
                            
                         <div className="shadow-box">
                         <a target='_blank' rel="noopener noreferrer" href={`${wait.address_link}`}>
            
                         <div className="product-item">
                           <div className="shop-product-image-box">
                               <div className="submissions-bar">
                                    <UserOutlined className="submission-icon" />
                                    {wait.submissions > 1 
                                    ? <p className="submission-text">{wait.submissions} users reporting</p>
                                    : <p className="submission-text">{wait.submissions} user reporting</p>
                                    }
                               </div>
                               <div className={wait.avg_wait >= 90 ? "wait-time-image" : "wait-time-image"}>
                                   {wait.avg_wait ? 
                                    <div>
                                        {wait.avg_wait >= 90 ? <p className="wait-time-time">{Math.round(wait.avg_wait/ 60)} hours</p> : <p className="wait-time-time">{Math.round(wait.avg_wait)} mins</p> }
                                       
                                        
                                    </div>
                                    : <p className="wait-time-heading">No recent data</p>
                                }
                                {wait.avg_wait >= 120 && <div className="long-line">
                                     <WarningOutlined className="long-line-icon" />
                                    <p className="long-line-text">Extremely Busy!</p>

                                </div>}
                                
                               </div>
                            
                              
                               
                           </div>
                           <div className="shop-product-clickable-details">
                          
                               <p className="shop-product-title bold-title">{wait.name}</p>
                           
                           </div>
               
                           </div>
                       
                       
                       </a>
                       <div className="price-box">
                         
                       <a target='_blank' rel="noopener noreferrer" href={`${wait.address_link}`}>
                           <p className="shop-product-detail">{wait.address}</p>
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

                <div className="title-centre">
                            <div className="guide-heading">
                            No data
                            </div>
                                
                 
                                <h1 className="display-heading small">
                                    Waiting for updates
                            </h1>
                       



                            </div>

                <div className="card-loop">
                    {this.state.waitTimes.filter(w => w.avg_wait === null).map(wait => 
                         <div className="shop-product-card" key={wait.id}>
                         <div className="shadow-box">
                         <a target='_blank' rel="noopener noreferrer" href={`${wait.address_link}`}>
            
                         <div className="product-item">
                           <div className="shop-product-image-box">
                               <div className={wait.avg_wait >= 90 ? "wait-time-image red" : "wait-time-image"}>
                                   {wait.avg_wait ? 
                                    <p className="wait-time-heading">{Math.round(wait.avg_wait)} minutes</p>
                                    : <p className="wait-time-heading">No recent data</p>
                                }
                               </div>
                               
                               
                           </div>
                           <div className="shop-product-clickable-details">
                          
                               <p className="shop-product-title bold-title">{wait.name}</p>
                           
                           </div>
               
                           </div>
                       
                       
                       </a>
                       <div className="price-box">
                         
                       <a target='_blank' rel="noopener noreferrer" href={`${wait.address_link}`}>
                           <p className="shop-product-detail">{wait.address}</p>
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
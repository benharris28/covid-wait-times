import React from 'react'
import Cards from '../Cards/Cards'
import WaitForm from '../WaitForm/WaitForm'
import { Layout, Button, Collapse } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import WaitApiService from '../services/wait-api-service';
import * as dayjs from 'dayjs'

class CardList extends React.Component {
    
    state = {
        waitTimes: []

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
      

    render() {
        const { Panel } = Collapse;
        const { waitTimes } = this.props;
        const dropdownIcon = <PlusCircleOutlined />
        
        

    
       console.log(this.state.waitTimes)

      

       
        
        return (
            <div className="card-list">
             


                <WaitForm refreshData={this.refreshData} />

                <div className="content-section">
                    <div className="content-container">
                        

                    

                    <div className="card-loop">
                    {this.state.waitTimes.map(wait => 
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
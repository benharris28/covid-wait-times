import React from 'react'
import Cards from '../Cards/Cards'
import { Layout, Button, Collapse } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

class CardList extends React.Component {
    
    
    render() {
        const { Panel } = Collapse;
        const dropdownIcon = <PlusCircleOutlined />
        
        const sampleData = [
            {
                id: 1,
                name: "Etobicoke General Hospital Drive-Thru – Humber Queen’s Plate Parking",
                address: "2 Janda Ct",
                hours: "7 days/week; 8 a.m. to 6 p.m.",
                age_restrictions: "No children under the age of 2 years",
                link: "http://www.williamoslerhs.ca/patients-and-families/preparing-for-your-visit-or-stay/coronavirus-information-for-patients-families/assessment-centre-for-covid-19",
                current_wait: 70,
                average_wait: 90

            },
            {
                id: 2,
                name: "Humber River Hospital, Reactivation Care Centre – Finch Site",
                address: "2111 Finch Ave. W",
                hours: "Monday to Friday, 10 a.m. to 6 p.m.days/week; 8 a.m. to 6 p.m., Saturday and Sunday, 9 a.m. to 4 p.m.",
                age_restrictions: "None",
                link: "https://www.hrh.ca/covid-19/",
                current_wait: 120,
                average_wait: 150


            },
            {
                id: 3,
                name: "Michael Garron Hospital",
                address: "825 Coxwell Ave",
                hours: "7 days/week, 8 a.m. to 8 p.m.",
                age_restrictions: "None",
                link: "https://www.tehn.ca/programs-services/covid-19-assessment-centre",
                current_wait: 120,
                average_wait: 150,
                other: "Outpatient clinic location in D-wing, 1st floor; accessed from Mortimer Avenue). By appointment only."


            },
            {
                id: 4,
                name: "Mount Sinai Hospital",
                address: "600 University Ave",
                hours: "Monday to Friday, 8 a.m. to 12 p.m.",
                age_restrictions: "None",
                link: "https://www.sinaihealth.ca/coronavirus-covid-19-information/",
                current_wait: 40,
                average_wait: 150,
                other: "None"


            },


        ]

        
        
        return (
            <div className="card-list">
                 <div className="content-section light-grey">
                        <div className="content-container">

                            <div className="title-centre">
                            <div className="guide-heading">
                            Wait Times
                            </div>
                                
                 
                                <h1 className="display-heading">
                                    COVID-19 Assessment Center Wait Times
                            </h1>
                                <div className="hero-details">
                                Live wait times are displayed below. They are updated hourly
                        </div>



                            </div>

                        </div>
                    </div>
                <div className="content-section">
                    <div className="content-container">
                        

                    

                
           
                <div className="card-loop">
                    {sampleData.map(card => 
                         <div className="shop-product-card">
                         <div className="shadow-box">
                         <Link to={`/product/${card.link}`} style={{ textDecoration: 'none' }}>
                         <div className="product-item">
                           <div className="shop-product-image-box">
                               <div className={card.current_wait >= 90 ? "wait-time-image red" : "wait-time-image"}>
                                    <p className="wait-time-heading">{card.current_wait} minutes</p>
                               </div>
                               
                           </div>
                           <div className="shop-product-clickable-details">
                               <p className="shop-product-title bold-title">{card.name}</p>
                           </div>
               
                           </div>
                       
                       
                       </Link>
                       <div className="price-box">
                           <p className="shop-product-detail">{card.address}</p>
                       </div>
                   
                       <div className="shop-product-quick-add-box">
               
                                                               
               
               <Collapse 
                   bordered={false}
                   ghost>
                   <Panel header="More Details" key="1">
                       <div className="more-detail-panel">
                        <p className="shop-product-detail">Hours: {card.hours}</p>
                        <p className="shop-product-detail">Age Restrictions: {card.age_restrictions}</p>
                        <p className="shop-product-detail">Link: {card.link}</p>
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
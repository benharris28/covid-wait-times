import React from 'react';
import './App.css';
import CardList from './CardList/CardList'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import WaitForm from './WaitForm/WaitForm'
import WaitApiService from './services/wait-api-service';
import * as dayjs from 'dayjs'
import ReactGA from 'react-ga';
import line_hero from './Assets/line_hero.jpg'
import { Route, Switch } from 'react-router-dom'
import Loader from './Loader/Loader';
import { Button } from 'antd';


ReactGA.initialize('UA-178937311-1');

class App extends React.Component {
  
  
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
  
  handleExternalButtonClick = (link) => {
    ReactGA.event({
      category: `External Link - ${link}`,
      action: `Clicked ${link}`,
    });
  }

  render() {

    return (
      <div className="app">
         <Route
                      exact
                      path={'/loaderio-dafa03867ad7f94a65d12cf61eaa47c0'}
                      component={Loader}
                  />
        <Route 
          exact
          path={'/'}
        >

        
        <Navbar />
        <div className="homepage-hero">
                    <div className="homepage-hero-image" style={{ backgroundImage: `url(${line_hero})`}}>

                    </div>
                    <div className="homepage-hero-heading">
                        <div className="container">
                      
                     
                             <h1 className="homepage-heading">COVID WAITS</h1>
                             <p className="heading-details">Resources to speed up your Covid Assessment</p>
                        </div>

                        
                    </div>
                </div>
         

                <div className="content-section very-light-grey">
                    <div className="content-container center">
                        

                <div className="redirect-link">
                  <h2 className="section-heading">Assessment Appointments</h2>
                  <p>As of Sunday, October 4th, all assessment centres in Ontario have moved to appointment bookings and will not accept walk-ins</p>
                  <p>For a full list of assessment centres and links to book appointments, please see the Government of Ontario Website below</p>
                  
                  <a target='_blank' rel="noopener noreferrer" href="https://covid-19.ontario.ca/assessment-centre-locations/">
                  <button className="landing-button" onClick={() => this.handleExternalButtonClick("Assessment")}>
                    Go to site
                  </button>
                  </a>
                </div>
                </div>
                </div>
             
                <div className="landing-flex-container">
                <div className="landing-container">
                <img className="peak-logo" src="https://res.cloudinary.com/dhkmle6ei/image/upload/v1611717879/peaklogo_pdrtt3.png" alt="The Peak Logo" />
                <h2 className="section-heading">Track Canada's Vaccination Effort</h2>
                 <p className="section-subheading">Our friends at The Peak have a daily vaccine tracker for Ontario and all provinces in Canada (We love the peak - we don't receive any considerations for highlighting them)</p>
                 <a target='_blank' rel="noopener noreferrer" href="https://vaccine.readthepeak.com/">
                  <button className="landing-button" onClick={() => this.handleExternalButtonClick("Peak")}>
                    Check it out
                  </button>
                  </a>
                </div>
                <div className="landing-container peak-green">
                    <img className="landing-image" src="https://res.cloudinary.com/dhkmle6ei/image/upload/v1611717872/peakiphone_s2j7xh.png" alt="The Peak Screenshot" />
                 
                </div>
                
                </div>
                   
                    <Footer />
                    </Route>
                   
      </div>
    )
  }
}

export default App;

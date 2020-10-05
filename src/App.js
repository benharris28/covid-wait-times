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
                      
                     
                             <h1 className="homepage-heading">GTA Assessment Centre Lines</h1>
                             <p className="heading-details">Live crowd-sourced wait times from fellow Torontonians in line</p>
                        </div>

                        
                    </div>
                </div>
         

                <div className="content-section">
                    <div className="content-container">
                        

                <div className="redirect-link">
                  <p className="heading">Appointments</p>
                  <p>As of Sunday, October 4th, all assessment centres in Ontario have moved to appointment bookings and will not accept walk-ins</p>
                  <p>For a full list of assessment centres and links to book appointments, please see the Government of Ontario Website below</p>
                  
                  <a target='_blank' rel="noopener noreferrer" href="https://covid-19.ontario.ca/assessment-centre-locations/">
                  <Button className="redirect-button">
                    Go to site
                  </Button>
                  </a>
                </div>
                </div>
                </div>
                   
                    <Footer />
                    </Route>
                   
      </div>
    )
  }
}

export default App;

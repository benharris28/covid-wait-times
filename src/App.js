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
         
                
             
                    <CardList waitTimes={this.state.waitTimes}/>
                    <Footer />
      </div>
    )
  }
}

export default App;

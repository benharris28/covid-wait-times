import React from 'react';
import './App.css';
import CardList from './CardList/CardList'
import WaitForm from './WaitForm/WaitForm'
import WaitApiService from './services/wait-api-service';
import * as dayjs from 'dayjs'

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
          <div className="content-section light-grey">
                        <div className="content-container">

                            <div className="title-centre">
                            <div className="guide-heading">
                            Wait Times
                            </div>
                                
                 
                                <h1 className="display-heading">
                                    Toronto COVID-19 Test Center Wait Times
                            </h1>
                                <div className="hero-details">
                                Live crowd-sourced wait times from fellow Torontonians in line
                        </div>



                            </div>

                        </div>
                    </div>
                
             
                    <CardList waitTimes={this.state.waitTimes}/>
      </div>
    )
  }
}

export default App;

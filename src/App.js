import React from 'react';
import './App.css';
import CardList from './CardList/CardList'
import WaitForm from './WaitForm/WaitForm'
import WaitApiService from './services/wait-api-service';

class App extends React.Component {
  state = {
    waits: ''
  }

  componentDidMount = () => {
    WaitApiService.getAllWaits()
       
        .then(waits => {
          this.setWalks(waits)
        
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
                                    COVID-19 Assessment Center Wait Times
                            </h1>
                                <div className="hero-details">
                                Live wait times are displayed below. They are updated hourly
                        </div>



                            </div>

                        </div>
                    </div>
                    <WaitForm />
             
                  <CardList waits={this.state.waits}/>
      </div>
    )
  }
}

export default App;

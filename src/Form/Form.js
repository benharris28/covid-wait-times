import React from 'react'
import Select from 'react-select'
import { Button, Result } from 'antd';
import * as dayjs from 'dayjs'
import WaitApiService from '../services/wait-api-service';

class Form extends React.Component {
    state = {
        formOpen: false,
        selectedOption: '',
        selectedWait: '',
        submitted: false
    }

    handleChange = (selectedOption) => {


        this.setState({
            selectedOption: selectedOption
        })
    }

    handleChangeTime = (selectedWait) => {


        

        this.setState({
            selectedWait: selectedWait
        })
    }

    onChange = (value) => {
        this.setState({
            wait: value
        })
    }

    handleClick = () => {
        this.setState({
            formOpen: true
        })
    }

    handleSubmit = () => {
        const { selectedOption, selectedWait } = this.state;
        

        var wait = Number(selectedWait.value)
        console.log(wait)

        const location_id = selectedOption.value


        if (location_id > 0 && wait > 0) {
            const today = dayjs();
            const date = dayjs(today).format('YYYY-MM-D')
            const hour = dayjs(today).format('HH')
            const prevHour = hour - 1

            WaitApiService.createWait(date, hour, location_id, wait)
                .then(res => {
                    this.props.refreshData()

                    this.setState({
                        submitted: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                submitted: false,

                            }, () => {
                                this.setState({
                                    formOpen: false,
                                    selectedOption: '',
                                    selectedWait: ''
                                })
                            })
                        }, 3500)
                    })
                })
        } else {
            alert("Please select a location and time");
        }

    }

    
    render() {
        const { selectedOption, selectedWait } = this.state;
        console.log(this.state)

        const options = [
            { value: '1', label: 'Etobicoke General Hospital Drive-Thru' },
            { value: '2', label: 'Humber River Hospital, Reactivation Care Centre – Finch Site' },
            { value: '3', label: 'Michael Garron Hospital' },
            { value: '4', label: 'Mount Sinai Hospital' },
            { value: '5', label: 'North York General Hospital' },
            { value: '6', label: 'North York General Hospital – Branson Site' },
            { value: '7', label: 'Scarborough Health Network – Birchmount Hospital' },
            { value: '8', label: 'Scarborough Health Network – Centenary Hospital' },
            { value: '9', label: 'Sunnybrook Health Sciences Centre' },
            { value: '10', label: 'UHN Toronto Western Hospital' },
            { value: '11', label: 'Unity – St. Joseph’s Health Centre' },
            { value: '12', label: 'Unity – St. Michael’s Hospital' },
            { value: '13', label: 'Women’s College Hospital' },
            { value: '14', label: 'Mackenzie Health - Richmond Hill Hospital' },
            { value: '15', label: 'Mackenzie Health - Vaughan' },
            { value: '16', label: 'Markham Stouffville Hospital' },
            { value: '17', label: 'Southlake Regional Health Centre' },
            { value: '18', label: 'South Fletchers Sportsplex - Drive-thru' },
            { value: '19', label: 'Peel Memorial Centre for Integrated Health and Wellness' },


          ]

          const waitOptions = [
            { value: '15', label: 'Less than 15 mins' },
            { value: '30', label: '15 - 30 mins' },
            { value: '45', label: '30 - 45 mins' },
            { value: '60', label: '1 hour' },
            { value: '75', label: '1 hour - 1.5 hours' },
            { value: '105', label: '1.5 hours - 2 hours' },
            { value: '120', label: '2 hours' },
            { value: '180', label: '3 hours' },
            { value: '240', label: '4 hours' },
            { value: '300', label: 'More than 4 hours' },
          ]


        return(
            <div>
                {this.state.formOpen === false &&
                  <div className="content-section low-padding">
                      <div className="content-container">
                  
                  <div className="container-2">
                      <div className="cta-banner-dark">
                          <div className="cta-container">
                              <div className="next-section-content">
                                  <h2 className="font-white">At an assessment center?</h2>
                                  <h5 className="font-white">Please help your fellow Torontonians by submitting your estimated wait time</h5>
                              </div>
                              <div className="cta-button-container">
                              
                                      <Button 
                                        className="button-cta"  
                                        onClick={this.handleClick}>
                                          Report Wait Time
                                      </Button>
                              
                              </div>
                          </div>
                      </div>
                  </div>
                  </div>
                  </div>
                  }

{this.state.formOpen && this.state.submitted === false &&
                <div className="content-container low-padding">
                <div className="location-form">
                <p className="form-label">Which assessment center are you at?</p>
                <Select value={selectedOption}

                        onChange={this.handleChange}
                        options={options} 
                        />

            </div>
            <div className="wait-time-form">
            <p className="form-label">What is the current estimated wait time?</p>
                <Select 
                    value={selectedWait}
                    onChange={this.handleChangeTime}
                    options={waitOptions} 
                    />
            
            </div>

            <div className="button-box">
                                    <Button className="button"
                                        onClick={(e) => this.handleSubmit(e)}>
                                        Submit Wait Time Report
                    </Button>
                                </div>
            </div>
}

<div className="thank-you-message">
                            {this.state.submitted &&
                                <div>
                                    <Result
                                        status="success"
                                        title="Successfully submitted wait-time report"


                                    />
                                </div>

                            }
                        </div>
            </div>

        )
    }
}

export default Form;
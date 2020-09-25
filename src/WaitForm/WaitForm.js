import React from 'react'
import { Select, InputNumber, Button, Alert, Result } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import WaitApiService from '../services/wait-api-service';
import * as dayjs from 'dayjs'

class WaitForm extends React.Component {
    state = {
        formOpen: false,
        location_id: '',
        wait: '',
        submitted: false
    }
    handleChange = (value) => {


        this.setState({
            location_id: value
        })
    }

    handleChangeTime = (value) => {


        var waitValue = Number(value)

        this.setState({
            wait: waitValue
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
        const { location_id, wait } = this.state;


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
                                    formOpen: false
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
        const { Option } = Select;

        const today = dayjs();
        const date = dayjs(today).format('YYYY-MM-D')
        const hour = dayjs(today).format('HH')
        const prevHour = hour - 1


        return (
            <div className="wait-form">

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
              
                <div className="form">

                  
                



                        {this.state.formOpen && this.state.submitted === false &&
                            <div className="content-container low-padding">
                            <div className="select-form">
                                <div className="location-input">
                                    <p className="form-label">Which assessment center are you at?</p>
                                    <Select className="selector" defaultValue="Select a location" style={{ width: "90%" }} onChange={this.handleChange}>
                                        <Option value="1">Etobicoke General Hospital Drive-Thru</Option>
                                        <Option value="2">Humber River Hospital, Reactivation Care Centre – Finch Site</Option>
                                        <Option value="3">Michael Garron Hospital</Option>
                                        <Option value="4">Mount Sinai Hospital</Option>
                                        <Option value="5">North York General Hospital</Option>
                                        <Option value="6">North York General Hospital – Branson Site</Option>
                                        <Option value="7">Scarborough Health Network – Birchmount Hospital</Option>
                                        <Option value="8">Scarborough Health Network – Centenary Hospital</Option>
                                        <Option value="9">Sunnybrook Health Sciences Centre</Option>
                                        <Option value="10">UHN Toronto Western Hospital</Option>
                                        <Option value="11">Unity – St. Joseph’s Health Centre</Option>
                                        <Option value="12">Unity – St. Michael’s Hospital</Option>
                                        <Option value="13">Women’s College Hospital</Option>
                                    </Select>
                                </div>

                                <div className="wait-time-input">
                                    <p className="form-label">What is the current estimated wait time?</p>
                                    <Select className="selector" defaultValue="Select a wait time" style={{ width: "90%" }} onChange={this.handleChangeTime}>
                                        <Option value="15">Less than 15 mins</Option>
                                        <Option value="30">15 - 30 mins</Option>
                                        <Option value="45">30 - 45 mins</Option>
                                        <Option value="60">1 hour</Option>
                                        <Option value="75">1 hour - 1.5 hours</Option>
                                        <Option value="105">1.5 hours - 2 hours</Option>
                                        <Option value="120">2 hours</Option>
                                        <Option value="180">3 hours</Option>
                                        <Option value="240">4 hours</Option>
                                        <Option value="300">More than 4 hours</Option>

                                    </Select>


                                </div>

                                <div className="button-box">
                                    <Button className="button"
                                        onClick={(e) => this.handleSubmit(e)}>
                                        Submit Wait Time Report
                    </Button>
                                </div>
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
              

            </div>
        )
    }
}

export default WaitForm;
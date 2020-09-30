import React from 'react'
import { Select, InputNumber, Button, Alert, Result } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import WaitApiService from '../services/wait-api-service';
import Form from '../Form/Form'
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

    formClose = () => {
        this.setState({
            formOpen: false
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
                           <Form refreshData={this.props.refreshData} />
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
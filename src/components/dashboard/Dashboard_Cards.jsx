import React from 'react'
import dashboard_card from "../../styling/dashboard_card.module.css"
import ScrollAnimation from 'react-animate-on-scroll';

function Dashboard_Cards() {
    return (
        <ScrollAnimation animateIn="animate__fadeInTopLeft"
            animateOut="fadeOut"
            duration={1.5} >
            <div className={dashboard_card.mainflip}>
                <div className={dashboard_card.rackflipcard} id={dashboard_card.sensormargin}>
                    <div className={dashboard_card.rackflipcardinner}>
                        <div className={dashboard_card.rackflipcardfront} id={dashboard_card.sensorfront}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-tachometer-alt" id={dashboard_card.font}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Total Capacity</p>
                                    <h3>40</h3>
                                </div>
                            </div>
                        </div>
                        <div className={dashboard_card.rackflipcardback} id={dashboard_card.sensorfront}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-tachometer-alt" id={dashboard_card.font}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Active - 35</p>
                                    <p>Inactive - 5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* rack */}
                <div className={dashboard_card.rackflipcard}>
                    <div className={dashboard_card.rackflipcardinner}>
                        <div className={dashboard_card.rackflipcardfront} id={dashboard_card.rackfront}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-paste" id={dashboard_card.font}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Server Racks</p>
                                    <h3>42</h3>
                                </div>
                            </div>
                        </div>
                        <div className={dashboard_card.rackflipcardback} id={dashboard_card.rackfront}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-paste" id={dashboard_card.font}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Active - 35</p>
                                    <p>Inactive- 7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* capacity */}
                <div className={dashboard_card.rackflipcard}>
                    <div className={dashboard_card.rackflipcardinner}>
                        <div className={dashboard_card.rackflipcardfront}
                            id={dashboard_card.capacityfront}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-server" id={dashboard_card.font1}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Asset Tags</p>
                                    <h3>100</h3>
                                </div>
                            </div>
                        </div>

                        <div className={dashboard_card.rackflipcardback} id={dashboard_card.capacityfront}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-database" id={dashboard_card.font1}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Active - 50</p>
                                    <p>Inactive- 50</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* assets */}
                <div className={dashboard_card.rackflipcard}>
                    <div className={dashboard_card.rackflipcardinner}>
                        <div className={dashboard_card.rackflipcardfront} id={dashboard_card.front}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    {/* <img src="../images/sensor.png" /> */}
                                    <i className="fal fa-wifi" id={dashboard_card.font}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Total Sensors</p>
                                    <h3>123</h3>
                                </div>
                            </div>
                        </div>
                        <div className={dashboard_card.rackflipcardback} id={dashboard_card.front}>
                            <div className={dashboard_card.rackmain}>
                                <div className={dashboard_card.rack1}>
                                    <i className="fal fa-wifi" id={dashboard_card.font}></i>
                                </div>
                                <div className={dashboard_card.rack2}>
                                    <p>Active - 110</p>
                                    <p>Inactive- 13</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ScrollAnimation>
    )

}
export default Dashboard_Cards;
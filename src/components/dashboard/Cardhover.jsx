import React from 'react'
import hovercard from "../../styling/hovercard.module.css"
import ScrollAnimation from 'react-animate-on-scroll';

function Cardhover() {
    return (
        <ScrollAnimation animateIn="animate__fadeInLeft"
            animateOut="fadeOut"
            duration={1.2}>
            <div className={hovercard.mainhover}>
                <div className={hovercard.card}>
                    <div className={hovercard.headertop}>
                        <div className={hovercard.icons}>
                            <i className="fal fa-compass"></i>
                        </div>
                        <div className={hovercard.titles}>
                            <h5>RealTime Status</h5>
                        </div>
                    </div>
                    <div className={hovercard.spacing}>
                        <p>  The demonstration of accurate data at any given moment simplifies
                             the process of audits and subsequently provides continuous visibility of the potential 
                             and updated network performance.</p>
                    </div>
                </div>
                <div className={hovercard.card}>
                    <div className={hovercard.headertop}>
                        <div className={hovercard.icons}>
                            <i className="fal fa-medkit"></i>
                        </div>
                        <div className={hovercard.titles}>
                            <h5>System Health</h5>
                        </div>
                    </div>
                    <div className={hovercard.spacing}>
                        <p>A monitoring system for better performance
                             that provides actionable insights with the focus to maintain system health
                              and reduce the risks of downtime.</p>
                    </div>
                </div>
                <div className={hovercard.card}>
                    <div className={hovercard.headertop}>
                        <div className={hovercard.icons}>
                            <i className="fal fa-exclamation-triangle"></i>
                        </div>
                        <div className={hovercard.titles}>
                            <h5>Alerts</h5>
                        </div>
                    </div>
                    <div className={hovercard.spacing}>
                        <p>  Alerts are triggered to caution users of possible anomalies
                             (temperature alerts, asset misplacement alerts, asset free-fall alerts, etc.) 
                             and potential threats with an eye toward maintaining effective control of the assets.
                              {/* Notifications are sent in the application, by email, and by SMS. */}

</p>
                    </div>
                </div>
            </div>

            <div className={hovercard.submain}>
                <div className={hovercard.card}>
                    <div className={hovercard.headertop}>
                        <div className={hovercard.icons}>
                            <i className="fal fa-server"></i>
                        </div>
                        <div className={hovercard.titles}>
                            <h5>Asset Tags</h5>
                        </div>
                    </div>
                    <div className={hovercard.spacing}>
                        <p> Asset Tags are cost-effective, without touch labor, 
                            and highly efficient in managing asset inventories to prevent errors in asset management.</p>
                    </div>
                </div>
                <div className={hovercard.card}>
                    <div className={hovercard.headertop}>
                        <div className={hovercard.icons}>
                            <i className="fal fa-tachometer-alt"></i>
                        </div>
                        <div className={hovercard.titles}>
                            <h5>Capacity</h5>
                        </div>
                    </div>
                    <div className={hovercard.spacing}>
                        <p>  Capacity Planning helps in improving efficiency while 
                            making optimum use of physical infrastructure by analyzing non-functional 
                            components for future requirements.</p>
                    </div>
                </div>
                <div className={hovercard.card}>
                    <div className={hovercard.headertop}>
                        <div className={hovercard.icons}>
                            <i className="fal fa-wifi"></i>
                        </div>
                        <div className={hovercard.titles}>
                            <h5>Sensors</h5>
                        </div>
                    </div>
                    <div className={hovercard.spacing}>
                        <p> Sensors are installed to ensure precise 
                            reporting of the key environmental readings (thermal properties) and power monitoring.</p>
                    </div>
                </div>
            </div>
        </ScrollAnimation>
    )
}

export default Cardhover
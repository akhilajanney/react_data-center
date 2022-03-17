import React, { Fragment } from 'react';
import dashboard from '../../styling/dashboard.module.css';
import DashboardCards from './Dashboard_Cards';
import Cardhover from './Cardhover';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css"

export default function Dashboard() {
   return (
      <Fragment>
         <div>
            <div style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'28px',marginTop:'-18px'}}>
            {/* <div style={{ float: "right", width: "91%", marginTop:'52px', marginRight:'28px'}}> */}
               <DashboardCards />
               <ScrollAnimation animateIn="animate__fadeInTopRight"
                  animateOut="fadeOut"
                  duration={1.2}>
                  <div>
                     <img src="../images/overview.png" alt="" style={{ width: "100%", marginTop: '20px' }} />
                     <p className={dashboard.sensors}>
                        <div className={dashboard.overview_circle} /><p>100</p>
                     </p>
                     <p className={dashboard.assets}>
                        <div className={dashboard.overview_circle} /><p>110</p>
                     </p>
                     <p className={dashboard.thsensors}>
                        <div className={dashboard.overview_circle} /><p>50</p>
                     </p>
                     <p className={dashboard.slave}>
                        <div className={dashboard.overview_circle} /><p>70</p>
                     </p>
                     <p className={dashboard.master}>
                        <div className={dashboard.overview_circle} /><p>20</p>
                     </p>
                  </div>
               </ScrollAnimation>
               <Cardhover />
            </div>
         </div>
      </Fragment>
   )
}




{/* <div className={dashboard.parent_slider}>
<div className={dashboard.slides}>
<div className={dashboard.slider}>
<img src="../images/carosul/carosul_01.jpg" alt="" id={dashboard.imageslide}
/>
</div>
<div className={dashboard.slider}>
<img src="../images/carosul/carosul_02.jpg" alt="" id={dashboard.imageslide}
/>
</div>
<div className={dashboard.slider}>
<img src="../images/carosul/carosul_03.jpeg" alt="" id={dashboard.imageslide}
/>
</div>
<div className={dashboard.slider}>
<img src="../images/carosul/carosul_04.jpg" alt="" id={dashboard.imageslide}
/>
</div>
</div>
</div> */}
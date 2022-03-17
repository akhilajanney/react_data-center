
import {React,Component} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/login/Login';
import LeftSidebar from './components/left_sidebar/LeftSidebar.jsx'
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Config_UploadFloorMap from './components/configuration/Config_UploadFloorMap';
import Config_MasterGateway from './components/configuration/Config_MasterGateway';
import Config_SlaveGateway from './components/configuration/Config_SlaveGateway';
import Config_RackMonitor from './components/configuration/Config_RackMonitor';
import Config_AssetTag from './components/configuration/Config_AssetTag';
import Config_SignalRepeater from './components/configuration/Config_SignalRepeater';
import Assetview from './components/realtime/Assetview';
import Thermalview from './components/realtime/Thermalview';
import Energyview from './components/realtime/Energyview';
import RealtimeTracking from './components/realtime/RealtimeTracking';
import Health_Assest from './components/health/Health_Assest';
import Health_MasterGateway from './components/health/Health_MasterGateway';
// import Health_Sensors from './components/health/Health_Sensors';
import Health_SignalRepeater from './components/health/Health_SignalRepeater';
import Health_Sensors from './components/health/Health_Sensors';
import Health_SlaveGateway from './components/health/Health_SlaveGateway';
// import Health_Assest from './components/health/Health_Assest';
import Alerts from './components/alerts/Alerts';
import AssetRackMonitor from './components/assets_tag/AssetRackMonitor';
import AssetsTag from './components/assets_tag/AssetsTag';


class App extends Component {
  constructor(){
    super();
 this.state = {
    isLogged: false,
    message: '',
    status: 'failed',
  }
}

  handleCallback = (childData) => {
    let storing = localStorage.getItem('isLogged');
    // console.log('storing===>', childData);
    this.setState({ status: storing })
  }

  componentDidMount() {
    const storing = localStorage.getItem('isLogged')
    // console.log('======>', storing);
    this.setState({ status: storing });
  }

  render() {
    const { status } = this.state;
    // console.log('===', status);
    if (status === "failed" || status === null) {
      return (
        // <Router >
        //   <Routes>
        //     <Route path="/" element={<Navigate to="/login" />} />
        //     {/* <Route path="/login" element={Login} /> */}
        //     {/* <Redirect from="*" to="/" /> */}
        //     {/* <Route exact path="/login" element={Login} /> */}
        //     <Route exact path="/login" element={<Login parentCallback={this.handleCallback} />} />
           
        //   </Routes>
        // </Router>
        <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login parentCallback = {this.handleCallback} />}  />
        </Routes>
      </Router>
      )
    } else {
      return (
        <Router>
          <Header />
          <LeftSidebar />
          <Routes>
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/floormap" element={<Config_UploadFloorMap />} />
            <Route exact path="/master" element={<Config_MasterGateway />} />
            <Route exact path="/slave" element={<Config_SlaveGateway />} />
            <Route exact path="/monitor" element={<Config_RackMonitor />} />
            <Route exact path="/sensor" element={<Config_SlaveGateway />} />
            <Route exact path="/assetview" element={<Assetview />} />
            <Route exact path="/thermalview" element={<Thermalview />} />
            <Route exact path="/energy" element={<Energyview />} />
            <Route exact path="/signal" element={<Config_SignalRepeater />} />
            <Route exact path="/asset" element={<Config_AssetTag />} />
            <Route exact path="/realtime" element={<RealtimeTracking />} />
            <Route exact path="/assethealth" element={<Health_Assest />} />
            <Route exact path="/mastergate" element={<Health_MasterGateway />} />
            <Route exact path="/signalhealth" element={<Health_SignalRepeater />} />
            <Route exact path="/slavegate" element={<Health_SlaveGateway />} />
            <Route exact path="/sensorhealth" element={<Health_Sensors />} />
            <Route exact path="/alerts" element={<Alerts />} />
            <Route exact path="/assettag" element={<AssetsTag />} />
            <Route exact path="/assetrack" element={<AssetRackMonitor />} />

          </Routes>
        </Router>
      )
    }
  }
}

export default App;



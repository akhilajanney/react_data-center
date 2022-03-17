// Login Api
exports.login_api = "/api/login"

// Alerts 
exports.alerts_det = "/api/alert"

exports.floormap_det = "/api/uploadmap" 
exports.asset_rack_det = "/api/rack?floorid="
exports.assettag_det = "/api/asset?rackno=all"

// configuration
// Asset
exports.asset_register = "/api/asset"
// MasterGate
exports.mastergate_register = "/api/gateway/master"
// RackMonitor
exports.rackmonitor_register = "/api/rack"
// Sensors
exports.sensor_register = "/api/sensor/temphumidity"
exports.iaq_sensor_register = "/api/sensor/iaq"
// Signal Repeater
exports.signal_repeater_register = "/api/signalrepeater"
// Slave Gateway
exports.slavegate_register = "/api/gateway/slave"

// System Health
// Sensor Details
exports.health_sensors_det = "/api/sensor/health" 

// Realtime Status
exports.occupancy_det = "/api/monitor?id="
exports.rack_asset_det = "/api/asset?rackno="
exports.assets_under_rack = "/api/asset/racktracking"
exports.rack_sensor = "/api/sensor/temphumidity?floorid="
exports.rack_sensor_dailydata = "/api/sensor/dailydata?macaddress="

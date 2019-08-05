var async = require('async')
var request = require('request')
var mqtt = require('mqtt')
var fetch = require('node-fetch')
require('dotenv').config()


var refreshToken = async () => {
  console.log("refreshing bearer token")
  var uri = process.env.domain + '/v1/user/activity/login'
  console.log(uri)
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: process.env.usr,
      password: process.env.password
    })
  }).catch(err => console.log(err))
  const data = await response.json()
  bearerToken = data.token;
  return data.token;
}


refreshToken().then( (token) => {
  bearerToken = token
} )

var orgId = '<redacted>'
var deviceId = '<redacted>'
var eventName = '<redacted>'
var authenticationToken = '<redacted>'
var watsonCreds = {
	clientId : 'd:' + orgId + ':MQTTDevice:' + deviceId,
	username : 'use-token-auth',
	password : authenticationToken
}
var watsonEndpoint = 'mqtt://' + orgId + '.messaging.internetofthings.ibmcloud.com'
var watsonClient = mqtt.connect(watsonEndpoint, watsonCreds)
// var watsonTopic = 'iot-2/evt/' + eventName + '/fmt/json'
var watsonTopic = 'iot-2/evt/' + '+' + '/fmt/json'
watsonClient.on('message', function (watsonTopic, message) {
  var instance = message.d.device
  var uri = process.env.kitt_domain + `/v1/graph/${process.env.instance_id}/instance/${instance}/timeseries`
  // var uri = process.env.kitt_domain + `/v1/graph/${process.env.instance_id}/instance/${process.env.instance_id}/timeseries`
  var timestamp = (new Date().toISOString().slice(0, -1))
  var body = {}
  body[timestamp] = message.d.value
  var response = fetch(uri, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body) // {`${timestamp}`: message.d.value} //`{\"${timestamp}\": ${message.d.value}}`
  }).then ((res) => {console.log(res)})
  var result = response.json()
})

var uploadSensorData = function ( ) {
  var timestamp = (new Date().toISOString().slice(0, -1))
  var body = {}
  body[timestamp] = message.d.value
  var response = fetch(uri, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body) // {`${timestamp}`: message.d.value} //`{\"${timestamp}\": ${message.d.value}}`
  }) //.then ((res) => {console.log(res)})
  var result = response.json()
  return result
}

// sample query
/*
var query = async function ( ) {
  var past = Date.now() - 4* (60*60*1000)
  var timestamp = (new Date().toISOString().slice(0, -1))
  var instance = "OCC_EGLCF2CUB1_evt_count"
  var uri = process.env.kitt_domain + `/v1/graph/${process.env.instance_id}/instance/${instance}/timeseries/csv` + '?last=1y' //`?timestamp=${timestamp}`
  var response = fetch(uri, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
    // body: JSON.stringify(body) // {`${timestamp}`: message.d.value} //`{\"${timestamp}\": ${message.d.value}}`
  }).then((res) => result = res ) //.then ((res) => {r = res ; console.log(res.json)})
  // var result = await response.json()
  // return result
  // result.then( (res) => {console.log(res)} )
}
*/

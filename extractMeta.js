var ForgeSDK = require('forge-apis')
var BucketsApi = new ForgeSDK.BucketsApi(); //Buckets Client
var DerivativesApi = new ForgeSDK.DerivativesApi();
var ObjectsApi = new ForgeSDK.ObjectsApi();
var fs = require('fs')
var request = require('request')
var _ = require('underscore')
require('dotenv').config()

var bucketName = process.argv[2]
var files = process.argv.slice(3)
var CLIENT_ID = process.env.CLIENT_ID,
  CLIENT_SECRET = process.env.CLIENT_SECRET;

var auth = function() {
  return new Promise((resolve, reject) => {
    var autoRefresh = true
    oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
      'data:read',
      'data:write',
      'bucket:read',
      'bucket:create',
      'bucket:update',
      'bucket:delete'
    ], autoRefresh);
    oAuth2TwoLegged.authenticate().then(function(res) {
      console.log("credentials generated")
      credentials = res
      resolve(credentials)
      // token = credentials['access_token']
    }, function(err) {
      console.error(err);
    })
  })
}

auth().then(() => {
  var fileContents = fs.readFileSync(bucketName + "_meta.json", 'utf8')
  var metaFile = JSON.parse(fileContents)
  metaFile["bucketName"].map((urn) => {
    console.log(urn)
    var encodedURN = (new Buffer(urn)).toString('base64')
    DerivativesApi.getMetadata(encodedURN, {}, oAuth2TwoLegged, credentials).catch((err) => {
      console.log(err)
    }).then((res) => {
      console.log(res.body.data.metadata)
      var meta = res.body.data.metadata.filter(guid => guid.role == '3d')
      if (meta.length > 0) {
        var guid3d = meta[0].guid
        if (guid3d) {
          console.log(guid3d)
          // var encodedURN = (new Buffer(guid3d)).toString('base64')
          DerivativesApi.getModelviewProperties(encodedURN, guid3d, {}, oAuth2TwoLegged, credentials).catch((err) => {
            console.log(err)
          }).then( (res) => {
            modelProps = res
            var props = modelProps.body.data.collection
            var floors = []
            modelProps.body.data.collection.map ( (row) => {
              if (row.properties && row.properties.Constraints && row.properties.Constraints.Level) {
                floors.push(row.properties.Constraints.Level)
              }
              // console.log(floors)
            })
            var uFloors = _.uniq(floors)
            console.log(uFloors)
            //
            var sensors = modelProps.body.data.collection.filter(row => row.name.includes('Sensor'))
            console.log(sensors)
          })
        }
      }
      // meta = res
      // console.log(res.body.data.metadata)
    })
  })
})

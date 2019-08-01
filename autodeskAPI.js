var ForgeSDK = require('forge-apis');
var CLIENT_ID = 'jsqo7UBSyrkIwAFhnzaYvWQrBSwnb4Xk',
  CLIENT_SECRET = 'RVa8SjLXQOu0K84j';

var HubsApi = new ForgeSDK.HubsApi();
var BucketsApi = new ForgeSDK.BucketsApi();
var ObjectsApi = new ForgeSDK.ObjectsApi();
var DerivativesApi = new ForgeSDK.DerivativesApi();

var fs = require('fs');

var autoRefresh = true; // or false
var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
  'data:read',
  'data:write',
  'bucket:read',
  'bucket:create',
  'bucket:update',
  'bucket:delete'
], autoRefresh);


var credentials
oAuth2TwoLegged.authenticate().then(function(res) {
  credentials = res
  // token = credentials['access_token']
}, function(err) {
  console.error(err);
});
// oAuth2ThreeLegged.getToken(authorizationCode).then(function (credentials) {
//     // The `credentials` object contains an `access_token` and an optional `refresh_token` that you can use to call the endpoints.
//     console.log(credentials)
// }, function(err){
//     console.error(err);
// });

// Init methods, to be run when first starting out
BucketsApi.createBucket({
  bucketKey: "tririgabucket",
  policyKey: "transient"
}, {}, oAuth2TwoLegged, credentials).then(function(res) {
  console.log(res);
}, function(err) {
  console.error(err);
});

BucketsApi.getBuckets({}, oAuth2TwoLegged, credentials).then(function(buckets) {
  console.log(buckets);
}, function(err) {
  console.error(err);
});

const fs = require('fs')
// var filePath = "/Users/kkbankol@us.ibm.com/Downloads/rac_basic_sample_project.rvt"
var filePath = "/Users/kkbankol@us.ibm.com/Downloads/rac_basic_sample_project_sensor.rvt"
// var fileContents
fs.readFile(filePath, function(err, contents) {
  console.log("file loaded")
  fileContents = contents
})

fileSize = fs.statSync(filePath)['size']

// doesn't work, times out with a 17MB file?
/*
ObjectsApi.uploadObject("tririgabucket",
  "rvtFile1.rvt",
  fileSize,
  fileContents, {}, oAuth2TwoLegged, credentials
).catch((err) => {
  console.log(err)
})
*/

// upload object in chunks
chunkSize = 4*1024*1024
ObjectsApi.uploadChunk("tririgabucket",
  "rvtFile1.rvt",
  chunkSize,
  "bytes 0-" + (chunkSize - 1) + "/" + fileSize,
  "uniqueId",
  fileContents, {}, oAuth2TwoLegged, credentials
).catch((err) => {
  console.log(err)
})


ObjectsApi.uploadChunk("tririgabucket",
  "rvtFile1.rvt",
  4*1024*1024,
  "bytes 0-4194303/17375232",
  "uniqueId",
  fileContents.slice(0,4194303), {}, oAuth2TwoLegged, credentials
  // fileContents, {}, oAuth2TwoLegged, credentials
).then ( (res) => {
  console.log(res)
} ).catch((err) => {
  console.log(err)
})


ObjectsApi.deleteObject(
  "tririgabucket",
  // "rac_basic_sample_project.rvt",
  encodedURN,
  oAuth2TwoLegged,
  credentials
).catch( (err) => {
  console.log(err)
})

// urn = "urn:adsk.objects:os.object:tririgabucket/rac_basic_sample_project.rvt"
urn = "urn:adsk.objects:os.object:tririgabucket/rac_basic_sample_project_sensor.rvt"
encodedURN = (new Buffer(urn)).toString('base64')

var jobJSON = {
  "input": {
    "urn": encodedURN
    // "compressedUrn": true,
    // "rootFilename": "A5.iam"
  },
  "output": {
    "formats": [{
      "type": "svf",
      "views": ["2d", "3d"]
    }]
  }
}

DerivativesApi.translate(jobJSON, {}, oAuth2TwoLegged, credentials).catch((err) => {
  console.log("failure");
  console.log(err)
}).then(res => {
  job = res
}) // gives urn in res.body.urn
// end init methods

// job, opts, oauth2client, credentials
// DerivativesApi.getManifest(encodedURN, {}, oAuth2TwoLegged, credentials).catch ( (err) => {console.log(err)} )

var meta
DerivativesApi.getMetadata(encodedURN, {}, oAuth2TwoLegged, credentials).catch((err) => {
  console.log(err)
}).then((res) => {
  meta = res
})
// guids can be found in
// meta.body.data.metadata


DerivativesApi.getManifest(encodedURN, {}, oAuth2TwoLegged, credentials).catch((err) => {
  console.log(err)
}).then((res) => {
  console.log(res)
})

DerivativesApi.deleteManifest(encodedURN, oAuth2TwoLegged, credentials)

var modelMeta
// var guid = "8be5a450-c03d-fcb2-6125-08d5baf4b9d9"
var guid = '6bfb4886-f2ee-9ccb-8db0-c5c170220c40' // apparently we'd want the "3D" role
// var guid = "1fd6b2ec-267d-8ba3-6b00-abe1adf80994"
// [ { name: '{3D}',
//     role: '3d',
//     guid: '6bfb4886-f2ee-9ccb-8db0-c5c170220c40' },
//   { name: 'A102 - Plans',
//     role: '2d',
//     guid: 'abdacd31-f94c-e84f-9a58-4663e281d894' },
//   { name: 'A104 - Elev./Sec./Det.',
//     role: '2d',
//     guid: '8be5a450-c03d-fcb2-6125-08d5baf4b9d9' },
//   { name: 'A103 - Elevations/Sections',
//     role: '2d',
//     guid: '10f26e65-bbca-7a68-125e-749e559c1e3b' },
//   { name: 'A105 - Elev./ Stair Sections',
//     role: '2d',
//     guid: 'db90b95d-0265-5fe4-376a-4dd3386c3d7d' },
//   { name: 'A101 - Site Plan',
//     role: '2d',
//     guid: '1fd6b2ec-267d-8ba3-6b00-abe1adf80994' },
//   { name: 'A001 - Title Sheet',
//     role: '2d',
//     guid: '97e8b569-a295-8750-f788-2d5067608b9c' } ]

guid = "1fd6b2ec-267d-8ba3-6b00-abe1adf80994" // site plan

DerivativesApi.getModelviewMetadata(encodedURN, guid, {}, oAuth2TwoLegged, credentials).catch((err) => {
  console.log(err)
}).then ( res => modelMeta = res)

DerivativesApi.getModelviewProperties(encodedURN, guid, {}, oAuth2TwoLegged, credentials).catch((err) => {
  console.log(err)
}).then ( res => modelProps = res)
// ?

s = modelProps.body.data.collection.filter( row => row.properties )
cons = s.filter ( row => { if (row.properties.Constraints && row.properties.Constraints.Level) {return row.properties.Constraints.Level} })



// get levels in building
floors = []
modelProps.body.data.collection.map ( (row) => {
  if (row.properties && row.properties.Constraints && row.properties.Constraints.Level) {
    floors.push(row.properties.Constraints.Level)
  }
})
floors = _.uniq(floors)


// get sensors in building
KITTvals = {}
// TODO, should be a better way to detect sensors other than title?
sensors = modelProps.body.data.collection.filter(row => row.name.includes('Sensor'))
sch = {
  sensors: []
}
sensors.map (( sensor ) => {
  if (sensor.properties) {
    var floor = sensor.properties.Constraints['Schedule Level']
    var sensorType = sensor.properties['Identity Data']['Description']
    var abbreviation = sensor.properties['Identity Data']['Equipment Abbreviation']
    sch.sensors.push({
      floor: floor,
      sensorType: sensorType,
      abbreviation: abbreviation
    })
  }
})


// User needs to place id/secret from .env file

// User needs to provide path to rvt file(s). Test by using both rvt sample files

// There should be a seperate init scipt

// args: bucketName, file(s)
var init = function() {
  // create bucket

  // upload file(s)
  for file in (process.argv.slice(2) { // slice removes first 2 args
  }
  // translate

  // write guids to config file
}


var onLoad = function () {
  // get metadata

  // transform data into hierarchy (building -> floors -> sensors)

  // place in schema
  // buildings.push()
  }
}
// OR, guid of each file (is that visible in Autedesk?)


// TODOs
// 1. We should be able to load multiple buildings within the same revit file
// 2. User should be able to specify multiple revit files that are within the same estate
//    OR, even if they're in different estates, they should still be able to fit in the same KITT file (Right?)


// So we have sensors defined
// We have a list of floors
// And each sensor specifies which floor they're on
// So in ejs, lets loop through each floor
// Use filter to select sensors on that floor
// ASSUME each building is in a seperate rvt file, appears to be the best practice

// sensors.filter ( sensor => (sensor.properties) && (sensor.properties.Constraints['Schedule Level'] == "Level 2") )

// TODO, how to detect if sensor type isn't labeled?
// for now, let's just get the "type" from the name or description.
var sensorTypes = [
  "light",
  "occupancy",
  "smoke",
  "fire",
  "humidity",
  "temperature",
  "air"
]

// TODO, determine timeoffset based off longitude/latitude

// mock schema

var schema = {
  org: {
    id: "building1"
  },
  estate: {
    longitude: "1234",
    latitude: "4321"
  },
  buildings: [{
    id: "building1",
    longitude: "1234",
    latitude: "4321",
    timeOffset: "+05:00",
    floors: [{
      id: "floor1",
      maxCapacity: 100,
      minIdealCapacity: 50,
      maxIdealCapacity: 80,
      sensors: [{
        id: "sensor1",
        type: "occupancy"
      }]
    }]
  }]
}

const ejs = require('ejs')

var generateKitt = function () {
  var temp = fs.readFileSync('/Users/kkbankol@us.ibm.com/projects/tririga-bim/KiTT_Template.ejs','utf8')
  var kittFile = ej.render(temp, schema)
  fs.writeFileSync("./KITT_Output.txt", kittFile, 'utf8');
}

// floor = sensors[1].properties.Constraints['Schedule Level']
// sensor_name = sensors[1].properties['Identity Data']['Description']

// modelProps.body.data.collection[5].properties.Constraints.Level = 'Level 1 Living Rm.'
ObjectsApi.getObjects("tririgabucket", {}, oAuth2TwoLegged, credentials).then( (res) => {
  console.log(res.body)
})

// ObjectsApi.uploadObject({
//   bucketKey: "tririgabucket",
//   objectName: "rvtFile",
//   body: fileContents
// })

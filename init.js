var ForgeSDK = require('forge-apis')
require('dotenv').config()

var CLIENT_ID = process.env.CLIENT_ID,
  CLIENT_SECRET = process.env.CLIENT_SECRET;
var BucketsApi = new ForgeSDK.BucketsApi(); //Buckets Client
var DerivativesApi = new ForgeSDK.DerivativesApi();
var ObjectsApi = new ForgeSDK.ObjectsApi();


var bucketName = process.argv[2]
var files = process.argv.slice(3)


var auth = function() {
  var autoRefresh = true; // or false
  var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
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
    // token = credentials['access_token']
  }, function(err) {
    console.error(err);
  });
}

// needed since ObjectsApi.uploadObject doesn't work
var uploadFile = (filePath) => {
  var fileName = filePath.split('/').slice(-1)[0]
  var url = `https://developer.api.autodesk.com/oss/v2/buckets/tririgabucket/objects/${fileName}`
  var fileContents = fs.readFileSync(filePath, 'utf8')
  return new Promise ( (resolve, reject) => {
    request({
        url: url,
        method: 'PUT',
        body: fileContents,
        encoding: null,
        headers: {
         'Authorization': `Bearer ${credentials['access_token']}`
        }
      }, (error, response, body) => {
        if (error) {
           console.log('Error uploading file: ', error)
           reject(error)
        } else {
          console.log(response.body.toString() )
          if ( JSON.parse(response.body.toString() ) ) {
            var urn = JSON.parse(response.body.toString())['objectId']
            console.log("urn: " + urn)
            resolve(urn)
          } else {
            reject("Invalid JSON received")
          }
        }
    })
  })
}

var uploadFiles = (files) => { // (files) => {
  //var files = process.argv.slice(2) // slice removes first 2 args, asssuming all following args are file paths
  var promises = []
  urns = []
  files.map((filePath) => {
    console.log("uploading file " + filePath)
    promises.push(
      uploadFile(filePath).then((urn) => {
        console.log("file uploaded")
        urns.push(urn)
      })
    )
  })
  return Promise.all(promises)
}


/*
async function uploadFiles(files) { // (files) => {
// async function uploadFiles () {
  //var files = process.argv.slice(2) // slice removes first 2 args, asssuming all following args are file paths
  // for (filePath in files) {
  await files.map( (filePath) => {
    console.log("uploading file " + filePath)
     // ObjectsApi.uploadObject({
    //   bucketKey: bucketName,
    //   objectName: file,
    //   body: fileContents
    // })
    uploadFile( filePath ).then ( (urn) => {
      console.log("file uploaded")
      urns.push(urn)
    } )
  })
}
*/

// 1. Create bucket if it doesn't exist
var config = {bucketname: []}
var init = function() {
  BucketsApi.getBuckets({}, oAuth2TwoLegged, credentials).then(function(buckets) {
    //if (buckets.body.items.includes(bucketName)) {
    if (buckets.body.items.filter( bucket => bucket.bucketKey == 'estate1' )) {
      console.log("bucket already exists, continuing")
      return
    } else {
      console.log("creating bucket")
      BucketsApi.createBucket({
        bucketKey: bucketName,
        policyKey: "transient"
      }, {}, oAuth2TwoLegged, credentials) // await until this is done
    }
  }, function(err) {
    console.error(err);
  }).then(() => {
    // var files = [
    //   "/Users/kkbankol@us.ibm.com/Downloads/rac_basic_sample_project_sensor.rvt",
    //   "/Users/kkbankol@us.ibm.com/Downloads/rac_advanced_sample_project_sensor.rvt"
    // ]
    uploadFiles(files).then(() => {
      console.log("file upload(s) complete, translating")
      config[bucketName] = urns
      urns.map(() => {
        console.log(urn)

        var encodedURN = (new Buffer(urn)).toString('base64')
        var jobJSON = {
          "input": {
            "urn": encodedURN
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
          console.log("translations complete for:" + urn)
          // save urns in array?
          // and then write to object,  {estate: bucketName, urns: [] }
          job = res
        })
      })
    })
  })
}
init()
/*
var init = function() {
    // create bucket
    BucketsApi.createBucket({ // should only create bucket if it doesn't exist
        bucketKey: bucketName, // "tririgabucket",
        policyKey: "transient"
      }, {}, oAuth2TwoLegged, credentials)
      .then(() => {
          var files = process.argv.slice(2)
          for filePath in (files) { // slice removes first 2 args
            fs.readFile(filePath, function(err, contents) {
              console.log("file loaded")
              var file = contents
            })
            var fileSize = fs.statSync(filePath)['size']
            ObjectsApi.uploadObject("tririgabucket",
                "filePath",
                fileSize,
                fileContents, {}, oAuth2TwoLegged, credentials
              ).catch((err) => {
                console.log(err)
              })
              .then((urn) => {
                var encodedURN = (new Buffer(urn)).toString('base64')
                var jobJSON = {
                  "input": {
                    "urn": encodedURN
                  },
                  "output": {
                    "formats": [{
                      "type": "svf",
                      "views": ["2d", "3d"]
                    }]
                  }
                }
                // translate
                DerivativesApi.translate(jobJSON, {}, oAuth2TwoLegged, credentials).catch((err) => {
                  console.log("failure");
                  console.log(err)
                }).then(res => {
                  // save urns in array?
                  // and then write to object,  {estate: bucketName, urns: [] }
                  job = res
                })
              })
          }
        }
      }



  // upload file(s)
  var files = process.argv.slice(2)
  for filePath in (files) { // slice removes first 2 args
    ObjectsApi.uploadObject({
      bucketKey: "tririgabucket",
      objectName: file,
      body: fileContents
    })
  }
  // translate

  // write guids to config file
}
*/

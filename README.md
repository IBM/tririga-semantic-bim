
# Integrate a 3D BIM building model with TRIRIGA Building Insights

In this code pattern, we'll demonstrate how to import the metadata from a Autodesk BIM (Building Information Modeling) model into a "TRIRIGA Building Insights" instance.

This will allow for planners/developers to be able to monitor their building(s) in a central dashboard via charts, analytics tools, and more.

First, we'll demonstrate how to customize a building model by adding sensors using [Autodesk Revit](https://www.autodesk.com/products/revit/free-trial). Revit is a building information modeling (BIM) service, which will allow us to draw 3d models of our building with plumbing/electrical plans and various sensors (occupancy, temperature, etc). After customizing the model, we'll also show how to upload the model file to the Autodesk Fusion cloud service, which makes it easy to extract metadata.

Finally, we'll show how we can use our automation scripts to register all modeled sensors in Watson IoT Platform and TRIRIGA Building Insights. This can greatly expedite the integration process for potential clients who already have a model set up and want to rapidly register their devices. Once the sensors are registered, the Building Insights service will be able to create dashboard visualizations and predict trends/anomalies in real time.


<!-- TODO, add arch -->
<img src="https://i.imgur.com/vigxqwl.png">

# Flow
1. BIM Model is designed in Revit. Local path to Revit file is provided to Node.js process.
2. Node.js process uploads Model to Autodesk cloud service and converts it a more accessible format (`.svf`).
3. Node.js process extracts metadata from converted Model and generates a KITT Building Insights manifest.
4. Upload KITT manifest to Building Insights via UI or Node.js process
5. Register sensors for each building in Watson IoT Platform via UI or Node.js process
6. Sensors publish data to Watson IoT Platform
7. Sensor data is forwarded from Watson IoT Platform to Building Insights


## Install Prerequisites:

### Node.js + NPM
If expecting to run these scripts locally, please continue by installing [Node.js](https://nodejs.org/en/) runtime and NPM. We'd suggest using [nvm](https://github.com/creationix/nvm) to easily switch between node versions, which can be done with the following commands.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
# Place next three lines in ~/.bash_profile
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install v8.9.0
nvm use 8.9.0
```

### Autodesk Revit
To open and edit a Revit BIM file, we'll need to install Revit beforehand. A free 30 day trial can be found [here](https://www.autodesk.com/products/revit/overview). Note that Revit only runs in Windows. If running in Mac or Linux, a free Windows evaluation image can be found [here](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-10-enterprise), and loaded via a hypervisor such as [Virtualbox](https://www.virtualbox.org/)


### Autodesk Forge
We'll also need to sign up for the Autodesk 360 service. This is a cloud service that offers APIs allowing us to host/visualize Revit files, and also to extract metadata from these BIM models.

https://forge.autodesk.com/

After signing up, we'll need to create a set of app credentials, which will allow our Node.js script to authenticate to the Autodesk APIs.

This can be done by clicking on "Create App"
<img src="https://i.imgur.com/qHmWTQx.png">

Fill out the form with a name, description and a callback url (we'll use a dummy url in this case, pointing to localhost). Then, click the "Create App" button at the lower right.
<img src="https://i.imgur.com/ZOuIbLU.png">

Copy the generated client id and secret into a .env file in the root directory of this project, once it is cloned
<img src="https://i.imgur.com/nxoS0xD.png">

# Steps

1. [Provision Cloud Services](#1-provision-cloud-services)
2. [Clone Git Repository](#2-clone-git-repository)
3. [Add Sensor(s) to BIM model](#3-add-sensors-to-bim-model)
4. [Upload BIM model to Autodesk 360](#4-upload-bim-model-to-autodesk-360)
5. [Extract BIM Metadata via Autodesk APIs](#5-extract-bim-metadata)
6. [Generate Building Insights KITT Model](#6-Generate-Building-Insights-KITT-Model)
7. [Register sensors with Watson IoT Platform](#7-Register-sensors-with-Watson-IoT-Platform)

## 1. Provision Cloud Services
Navigate to the following links to provision each service.
* [**Watson IoT Platform**](https://cloud.ibm.com/catalog/services/internet-of-things-platform)

TRIRIGA and Building Insights will need to be obtained via the IBM Marketplace, not the IBM Cloud Platform. The link to each service on IBM Marketplace can be found below
* [**TRIRIGA**](https://www.ibm.com/us-en/marketplace/ibm-tririga)
* [**TRIRIGA Building Insights**](https://www.ibm.com/us-en/marketplace/iot-building-insights)


## 2. Clone Git Repository
```
git clone https://github.com/IBM/tririga-semantic-bim
```

## 3. Add Sensors to BIM model

Next, we'll find sensors that match those within the building. The model number of the sensor doesn't have to be an exact match, just ensure the sensor type (humidity, light, etc) is the same. Search for an `.rfa` file that corresponds to the sensors within your building. A few sample sensors (daylight, occupancy) can be found at the archived Revit source  [here](http://revit.autodesk.com/library/archive2009/html/Revit%20MEP%202009%20Library/US%20Library/Families/Electrical%20Components/Lighting%20Devices/index.html)

After downloading the sensor `.rfa` file closely corresponding to the sensor(s), we'll need to import them into Revit.

Open your main building model within Revit (assuming here you already have a base to start with). In this example, we'll use the
`rac_advanced_sample_project.rvt` which can be found [here](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2016/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html)

After opening the model, we can see a view like so
<img src="https://i.imgur.com/xafyU0U.png">

To add a sensor to the BIM model, click "Load Family"
<img src="https://i.imgur.com/hktEaci.png">

Navigate to the path where your `.rfa` file is located, and click "Open"
<img src="https://i.imgur.com/HIDVWNx.png">

Now, the newly imported sensor should be visible in the "Project Browser" in the bottom left
<img src="https://i.imgur.com/pgWOsG9.png">

To add a sensor to the building, simply click the sensor, navigate your cursor to the proper location, and then click again to place the sensor.
<img src="https://i.imgur.com/JSW4SXQ.png">

Now, click "Save As" and save the updated model locally as an Revit (`.rvt`) file.

## 4. Upload BIM model to Autodesk 360
Now, we can upload the updated BIM model to the Autodesk cloud service. After uploading, we will also need to "translate" it to a `.svf` format. This will allow us to extract metadata from the model, such as how many floors are in the building, what kind of sensors are mounted in the building, and where they exist.

This can be done by running the `init.js` script like so. The first argument is the name of the "estate", and the following arguments are the paths to all buildings associated with the estate

```
node init.js <estateName> <filePath1> <filePath2> ...
```

Behind the scenes, this will
- Create a "bucket" named after the estate. The bucket will hold all files associated with the estate
- Upload all associated files to the bucket
- Convert each uploaded file to an `.svf` format, which will allow us to easily extract metadata

## 5. Extract BIM Metadata

Now that we have uploaded our BIM models to the cloud and converted them, the next step is to extract metadata that can be used by Building Insights.
<!-- In this case, our script will determine how many floors are in each building as well which sensors are in the buildings and where they are located.  -->
This can be done by running the following command

```
node extractMeta.js <estateName>
```

Behind the scenes, this will
- Leverage the "[Derivatives API](https://forge.autodesk.com/en/docs/model-derivative/v2/developers_guide/overview/)" to get the model properties associated with the building(s)
- Filter through the properties to get a unique list of floors and sensors
- Get location/type of each sensor

After this has been completed, run the following to print the filtered metadata, and confirm that it is consistent with the building plans.

```
cat <estateName>_meta.json
```

## 6. Generate Building Insights KITT Model
Next, we'll use the `ejs` templating engine to generate a "KITT" template. This defines which views will be accessible in the Building Insights dashboard. The template can be generated with the command

```
node generateKITT.js <estateName>
```

The newly generated KITT model will need to be uploaded to the Building Insights service via the Admin UI. The URL for the admin UI can be found in the welcome letter sent when your Building Insights instance is provisioned.

After logging in to the Admin UI, click the "Add Building" button, and then "Upload Text File"

<img src="https://i.imgur.com/xUJw7RL.png">

If the manifest is valid, a message "Creating the building data" should be visible like so

<img src="https://i.imgur.com/pojvphg.png">

Once the manifest upload has completed, we can see a series of "cards" for the registered buildings. Each card is essentially a visualization of one or more sensor values

<img src="https://i.imgur.com/YfWDrAq.png">
<!-- ```
node uploadKITTmodel.js <KITT_Manifest.txt>
``` -->
<!-- curl -X POST  -->

More information can be found about the KITT syntax [here](https://www.ibm.com/support/knowledgecenter/SS4NWY/building-insights/admin/creating-building-semantic-model.html)

## 7. Register sensors with Watson IoT Platform
The final step will be to register a "device" in Watson IoT Platform for each sensor. This provides a secure interface for live sensor data to be streamed into. These sensor values can be uploaded via either HTTP or MQTT payloads.

Once your Watson IoT Platform service is provisioned, we'll need to generate a set of credentials for connecting to the broker. We can do so by entering the IoT Platform dashboard, selecting "Devices" from the left hand menu, and then clicking the "Add Device" button.

![](https://i.imgur.com/fec24FG.png)

Next, provide a device type and ID.

![](https://i.imgur.com/REQfYIK.png)

The next two steps (Device Information, Groups) can be skipped.

In the "Security" tab, an Authentication token can be entered as long as it meets certain criteria (between 8 and 36 characters, contains mix of lowercase/uppercase letters, numbers, and symbols). Leave this field blank if you'd like for one to be generated instead.

![](https://i.imgur.com/rycnjlF.png)

Clicking the "Finish" button will generate a set of credentials that can be used to publish messages to the IoT Platform.

![](https://i.imgur.com/A2A6yXW.png)

Now, MQTT publish commands can be made from a device in the following format:

* Client ID: `d:${organization_id}:${device_type}:${device_id}`
* Username: `use-token-auth`
* Password: `${authentication_token}`
* Endpoint: `${organization_id}.messaging.internetofthings.ibmcloud.com`

To publish messages, a MQTT client will need to be installed on the IoT devices responsible for reading and sending asset updates. These clients are very lightweight, and are able to run on resource constrained devices such as Arduino, Raspberry Pi, CHIP, etc.

Now that we have a valid set of credentials, we can use an MQTT client to send a sample command. There are a few clients available online, but for simplicity we'll use a node cli client. This particular client can be installed by running `npm install -g mqtt`, and is also used by the Monitoring UI backend. After setting the MQTT credentials listed above (organization_id, device_type, device_id,username, password) we can publish a json payload with the following command:

```bash
mqtt_pub -i "d:${organization_id}:${device_type}:${device_id}" -u "${username}" -P "${password}" -h "${organization_id}.messaging.internetofthings.ibmcloud.com" -p 1883 -t 'iot-2/evt/deviceupdate/fmt/json' -m '{
  "d" : {
          "occupancy": "35"
        }
}'
```

And then we can see that message has been received by the IoT Platform dashboard by going back to the `Devices` menu, selecting our corresponding device, and then selecting `Recent Events`.

![](https://i.imgur.com/lNJ668W.png)

Once we're able to feed sensor data into Watson IoT Platform, we'll finally set up business logic to reroute the sensor data from Watson IoT to Building Insights.

This can be done by running the following
```
node iotToBuildingInsights.js
```

This service will subscribe to MQTT service provided by the Watson IoT Platform, and reroute all received messages to Building Insights via the "Time Series" API.

<!-- ![](https://i.imgur.com/KUsoxsY.png) -->

More can be found on the Building Insights KITT api [here](https://www.ibm.com/support/knowledgecenter/SS4NWY/building-insights/admin/apis/bsm-swagger.json)

<!-- Once this service is running,  -->

<!-- To register these devices, we'll use the "bulk" api
https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/org-admin.html#/

```
node registerDevices.js <estateName>
``` -->

<!-- After the devices have been registered, the generated credentials will need to be placed on each sensor. Then, data can be forwarded from the sensor to the

The data streams from the physical

We can simulate sensor data being sent via

```
mqtt_pub -v -i "a:${IOT_ORG_ID}:client_pub1" -u "${IOT_API_KEY}" -P "${IOT_AUTH_TOKEN}" -h 'agf5n9.messaging.internetofthings.ibmcloud.com' -p 1883 -t "iot-2/type/${IOT_DEVICE_TYPE}/id/${IOT_DEVICE_ID}/evt/assetMapper/fmt/json" -m '{
    "d" : {
    "node_id": "node2",
    "lat": "-118.317392",
    "long": "34.100057",
    "timestamp": "2018-06-30T07:10:55.174Z",
    "sensor": {
      "sound": "72"
    }
  }
}'
``` -->


## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

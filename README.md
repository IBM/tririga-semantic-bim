
# Integrate a 3D BIM building model with TRIRIGA Building Insights

In this code pattern, we'll demonstrate how to import the metadata from a Autodesk BIM (Building Information Modeling) model into a "TRIRIGA Building Insights" instance.

This will allow for planners/developers to be able to monitor their building(s) in a central dashboard via charts, analytics tools, and more.

We'll also demonstrate how to customize a building model with additional sensors, and use the Watson IoT Platform as an endpoint to upload live sensor data to Building Insights data.

This can greatly expedite the integration process for potential clients who already have a model set up and want to rapidly register their devices


<!-- TODO, add arch -->
<img src="https://i.imgur.com/FLU3sZ7.png">

# Steps

1. [Provision Cloud Services](#1-provision-cloud-services)
2. [Clone Git Repository](#2-clone-git-repository)
3. [Add Sensor(s) to BIM model](#3-add-sensors-to-bim-models)
4. [Upload BIM model to Autodesk 360](#4-upload-bim-model-to-autodesk-360)
5. [Extract BIM Metadata via Autodesk APIs]
6. [Generate Building Insights KITT Model](#4-upload-bim-model-to-autodesk-360)
7. [Register sensors with Watson IoT Platform]


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

## 1. Provision Cloud Services
Navigate to the following links to provision each service.

* [**Watson IoT Platform**](https://cloud.ibm.com/catalog/services/internet-of-things-platform)
* [**TRIRIGA**](https://www.ibm.com/us-en/marketplace/ibm-tririga)
* [**TRIRIGA Building Insights**](https://www.ibm.com/us-en/marketplace/iot-building-insights)


## 2. Clone Git Repository
```
git clone https://github.ibm.com/ibm-developer-emerging-tech/tririga-semantic-bim
```

## 3. Add Sensor(s) to BIM model

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
node init.js <estate_name> <filePath1> <filePath2> ...
```
## 5. Extract BIM Metadata and Generate Building Insights KITT Model
```
node generateKITT.js <estate_name>
```
## 6. Register sensors with Watson IoT Platform
```

```

https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/org-admin.html#/


## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

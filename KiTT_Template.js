[Init] # uses default KITT model

[Dimensions]
Point			  		# The central data point dimension within KITT related to a observed datapoint
Measurement				# The measurement type dimension, for example a temperature
Location		   			# The Location dimension within KITT related to locations
Asset			  		# The Asset dimension within KITT related to assets
Data_Store		 		# A dimension for the objects on the data store interface

[ReferenceTypes]
hasPoint			   		# Specifies an Point associated to a Location or Asset
hasLocation = in   			# Specifies the Location of an Asset or Point
hasAsset = of	 	 		# Specifies an Asset associated to a Point or Location
hasMeasurement	 			# Specifies the Measurement type of a Point.
hasPart					# Specifies a sub-part relationship within the same dimension, e.g. a Floor hasPart Room
hasAttachement	 			# Specifies that a point has a attachment of type file, json, or timeseries
	hasFile				# Specifies that a point has a file attached
	hasJson				# Specifies that a point has a json attached
	hasTimeSeries  		# Specifies that a point has a specific time series

[Concepts]
Point			  		# The Point Concept within KITT. Common point types are sensor, actuator, control
	Sensor		 		# A value read by a sensor
	Actuator		   		# A value send to an actuator
	Setpoint	   			# A setpoint at a controller
Measurement				# The measurement type, for example a temperature
Location		   			# The top Location concept within KITT related to locations
Asset			  		# The main Asset concept within KITT related to assets
Data_Store
	Time_Series										# A series of observations made by a Point indexed in time order
		Numerical_Time_Series						  	# A series of numerical observations made by a Point indexed in time order
			Double_Timestamp_Numerical_Time_Series		 	# A series of numerical observations made by a Point indexed by two timestamps
		Categorical_Time_Series							# A series of categorical text observations made by a Point indexed in time order
	File											   	# A series of observations made by a Point
		CSV_Time_Series_File						   	# A file with comma separated values of a time series
		JSON_File									  	# A file containing a JSON object
		Image									  	# A file containing a image
			PNG_Image								  	# A image in PNG format
			JPG_Image								  	# A image in JPG format
	Text											   	# A text stored in the JSON store
		JSON_Text									  	# A JSON object stored in the JSON store


# ================================
#			 DIMENSIONS
# ================================
[Dimensions]
Point	  	# The point dimensions defines variables that are measured in the system
Location   	# The location dimension specifies spatial information
Asset	  	# The asset dimension declares information of physical assets and equipment

# ================================
#			 CONCEPTS
# ================================
[Concepts]

# =================
# Asset concepts
# =================
Asset
	Electric_System
	HVAC_System
		Air_Handling_Unit "AHU"
		Fan_Coil_Unit "FCU"
	Lighting_System
	Rack
	Module
	Case
	Fridge_Pack
	Demographic

# =================
# Location concepts
# =================
Location
	Country
	State
	Region
	City
	Building_Campus
	Main_Location
		Building
			Office_Building
		Store
			Supermarket
	Floor
	Room
		Freezer_Room
	Zone
		Aisle

# ============================
# E2D Time_Series Concepts <TBD>
# =============================
Data_Store
	Time_Series								  		# A series of observations made by a Point indexed in time order
		Numerical_Time_Series							# A series of numerical observations made by a Point indexed in time order
			Measured_Time_Series c Numerical_Time_Series 	# A series of numerical observations made by a Point indexed in time order
			Double_Timestamp_Numerical_Time_Series	   		# A series of numerical observations made by a Point indexed by two timestamps
				Predicted_Mean_Time_Series		 		# A series of numerical observations made by a Point indexed in time order
				Predicted_Upper_Bound_Time_Series			# A series of numerical observations representing a predicted upper bound
				Predicted_Lower_Bound_Time_Series			# A series of numerical observations representing a predicted lower bound
				Estimated_Wastage_Time_Series				# A series of numerical observations above the upper bound
				Estimated_Savings_Time_Series				# A series of numerical observations below the lower bound
				Anomaly_Time_Series				  		# A series of numerical observations representing the number of anomalies
		Categorical_Time_Series				  			# A series of categorical text observations made by a Point indexed in time order
				Anomaly_Warnings_Time_Series			 	# A short message for the anomaly
				Diagnosis_Time_Series					# A diagnosis message explaining the cause of the anomaly
				Anomaly_Class_Time_Series				# The anomaly class for the time series
	File											 	# A file associated to a node
		CSV_Time_Series_File						 	# A file with comma separated values of a time series
		JSON_File										# A file with comma separated values of a time series
	Text											 	# A text stored in the JSON store
		JSON_Text										# A JSON object stored in the JSON store
			E2D_Config									 {"KITT_USE_KEY_NAME": "config.json", "KITT_USE_PARENT_CONTAINER": "true"} # A e2d config.json
				E2D_Cfg_Egy_Diagnosis		  {*} # A default e2d config.json for diagnosing Energy Meters
				E2D_Cfg_Egy_Model			  {*} # A default e2d config.json for modeling Energy Meters
				E2D_Cfg_Virtual_Egy_Diagnosis   {*} # A default e2d config.json for diagnosing virtual Energy Meters
				E2D_Cfg_Virtual_Egy_Model	  {*} # A default e2d config.json for modeling virtual Energy Meters
				E2D_Cfg_Occupancy_Sensor 	  {*} # A default e2d config.json for modeling occupancy sensors
				E2D_Cfg_Inc_Presence_Sensor 	  {*} # A default e2d config.json for modeling occupancy sensors
				E2D_Cfg_Measured_Presence_Sensor 	{*} # A default e2d config.json for modeling occupancy sensors
				E2D_Cfg_Measured_Footfall_In_Sensor	{*} # A default e2d config.json for modeling occupancy sensors
				E2D_Cfg_Measured_Footfall_Out_Sensor	{*} # A default e2d config.json for modeling occupancy sensors
				E2D_Cfg_Virtual_Occ_Sensor	{*} # A default e2d config.json for modeling occupancy sensors
				E2D_Cfg_PIR_Occ_Sensor						{*}
				E2D_Cfg_MODCAM_Occ_Sensor				{*}

			DefaultconfigsVault
			Custom_Default_Config	{"KITT_USE_PARENT_CONTAINER": "true"} # A default configs

# =================
# Point concepts
# =================
Point # The Point Concept within KITT. Common point types are sensor, actuator, control
	Sensor # A sensor data point
		Meter # A meter data point
			Energy_Meter # A energy meter
				Electricity_Meter # A electricity meter
					Main_Electricity_Meter
					Measured_Electricity_Meter c Measured_Time_Series {"units": "kWh", "interval": "hour", "KITT_USE_KEY_NAME":"value"} # A electricity meter
						Main_Measured_Electricity_Meter c Main_Electricity_Meter {*} # A electricity meter
						Sub_Measured_Electricity_Meter {*} 	# A electricity meter
			Water_Meter c Measured_Time_Series 				# A water meter
			Gas_Meter c Measured_Time_Series 					# A gas meter
		Temperature_Sensor c Measured_Time_Series 				# A temperature sensor
		Humidity_Sensor c Measured_Time_Series 					# A humidity sensor
		Occupancy_Sensor							# Count of people in a zone
			Measured_ModCam_Occupancy_Sensor c Measured_Time_Series {"units": "count", "interval": "hour", "KITT_USE_KEY_NAME":"value"} # An occupancy sensor 	        # An occupancy sensor from ModCam
			Sub_Measured_Occupancy_Sensor c Measured_Time_Series {"units": "count", "interval": "hour", "KITT_USE_KEY_NAME":"value"} # An occupancy sensor
		Presence_Sensor						# An presence sensor with: 1 - presence of people; 0 - no people
			Measured_Presence_Sensor c Measured_Time_Series {"units": "presence", "interval": "hour", "KITT_USE_KEY_NAME":"value"}					# An presence sensor with: 1 - presence of people; 0 - no people
			Measured_Incremental_Presence_Sensor c Measured_Time_Series {"units": "count", "interval": "hour", "KITT_USE_KEY_NAME":"value"} # An accumulative presence sensor
				Yanzi_Occupancy_Sensor {*} 	        # An incremental presence sensor from Yanzi

		Demographic_Sensor
			Measured_Demographic_Age_Sensor c Measured_Time_Series {"units": "age", "interval": "minute", "KITT_USE_KEY_NAME":"value"} # An occupancy sensor
			Measured_Demographic_Sex_Sensor c Categorical_Time_Series {"units": "sex", "interval": "minute", "KITT_USE_KEY_NAME":"value"} # An occupancy sensor

		Footfall_Sensor								# Traffic of people
			Footfall_In_Sensor						# Count of people entering
				Measured_Footfall_In_Sensor c Measured_Time_Series {"units": "count", "interval": "hour", "KITT_USE_KEY_NAME":"value"}
			Footfall_Out_Sensor						# Count of people leaving
				Measured_Footfall_Out_Sensor c Measured_Time_Series {"units": "count", "interval": "hour", "KITT_USE_KEY_NAME":"value"}

	Actuator # A actuator data point
	Command # A command data point
	Virtual # A computed (not measured) virtual value
		Virtual_Electricity_Meter c Electricity_Meter {"units": "kWh", "interval": "hour"} # A virtual electricity consumption aggregated from submeteres
			Main_Virtual_Electricity_Meter c Main_Electricity_Meter {*} # A electricity meter
			Sub_Virtual_Electricity_Meter {*} # A electricity meter
		Virtual_Data_Quality c Numerical_Time_Series {"units": "%", "interval": "daily", "KITT_USE_PARENT_CONTAINER": "true"} # A data quality measure that summarizes the available data
		Virtual_Model_Quality c Numerical_Time_Series {"units": "%", "interval": "daily", "KITT_USE_PARENT_CONTAINER": "true"} # A model quality measure that summarizes the available model
		Virtual_Anomaly_Count c Anomaly_Time_Series {"units": "", "interval": "daily", "KITT_USE_PARENT_CONTAINER": "true"} # The number of anomalies
		Virtual_Anomaly_Warn c Anomaly_Warnings_Time_Series {"units": "", "interval": "daily", "KITT_USE_PARENT_CONTAINER": "true"} # A data quality measure that summarizes the available data
		Virtual_Estimated_Wastage_Time_Series c Estimated_Wastage_Time_Series {"units": "kWh", "interval": "daily", "KITT_USE_PARENT_CONTAINER": "true"} # Anomaly consumed energy above the upper bound
		Virtual_Estimated_Savings_Time_Series c Estimated_Savings_Time_Series {"units": "kWh", "interval": "daily", "KITT_USE_PARENT_CONTAINER": "true"} # Anomaly consumed energy below the lower bound
		Virtual_Anomaly_Class_Time_Series c Anomaly_Class_Time_Series {"units": "kWh", "interval": "hour", "classes": "Very_Low, Lower, Normal, Higher, Very_High", "KITT_USE_PARENT_CONTAINER": "true"}
		Virtual_Anomaly_Class_Time_Series_Hourly c Anomaly_Class_Time_Series {"units": "kWh", "interval": "hour", "classes": "Very_Low, Lower, Normal, Higher, Very_High", "KITT_USE_PARENT_CONTAINER": "true"}
		Cleaned_Electricity_Meter c Numerical_Time_Series {"units": "kWh", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # A electricity meter

		Cleaned_Occupancy_Sensor c Numerical_Time_Series {"units": "count", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # An occupancy count after data cleaning
		Virtual_Occupancy_Sensor c Occupancy_Sensor {"units": "count", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # A virtual occupancy sensor aggregated from sub-sensors

	Predicted # A predicted time series
		Predicted_Electricity_Meter c Predicted_Mean_Time_Series {"units": "kWh", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # A predicted electricity consumption
		Predicted_Electricity_Meter_Upper_Bound c Predicted_Upper_Bound_Time_Series {"units": "kWh", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # The predicted upper bound electricity consumption
		Predicted_Electricity_Meter_Lower_Bound c Predicted_Lower_Bound_Time_Series {"units": "kWh", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # The predicted lower bound electricity consumption

		Predicted_Occupancy_Sensor c Numerical_Time_Series {"units": "count", "interval": "hour", "KITT_USE_PARENT_CONTAINER": "true"} # A predicted occupancy count

# ================================
#			 REFERENCES
# ================================
[ReferenceTypes]
ofAsset		 	# Defines that a instance is associated to the target asset instance
isPartOf			# Defines that a instance is associated to the target asset instance

# ================================
#			 QUERIES
# ================================

[Reasoner=Countries]
Country(country)

[Reasoner=Sites]
Main_Location(loc)

[Reasoner=Sites4Region]
Region(_region, #regionID) & hasLocation(loc,_region) & Main_Location(loc)

[Reasoner=Regions4Country]
Country(_cnt, #countryID) & hasLocation(region,_cnt) & Region(region)

[Reasoner=Sites4Country]
Country(cnt, #countryID) & hasLocation(region,cnt) & Region(region) & hasLocation(loc,region) & Main_Location(loc)

[Reasoner=MainMeterEM]
Building_Campus(_loc) & Electricity_Meter(_meter) & hasLocation(_meter,_loc) & E2D_Config(config) & hasFile(_meter,config)

[Reasoner=MainMeterOCC]
Building_Campus(_loc) & Occupancy_Sensor(_meter) & hasLocation(_meter,_loc) & E2D_Config(config) & hasFile(_meter,config)

#===================================
# Estate Queries
#===================================
[Reasoner=EstateMeterHealth]
Main_Location(loc) & Electricity_Meter(_meter) & hasLocation(_meter,loc) & Virtual_Anomaly_Class_Time_Series(class) & hasTimeSeries(_meter,class) { "id": "0/*/class/guid", "locid": "0/*/loc/guid", "label": "0/*/loc/display_name", "location": "0/*/loc/coordinatesLatLon", "class": "0/*/class/data", "_tsmode": "MSG", "_last":"1d", "_groupByVar":"true" }
Main_Location(loc) & Electricity_Meter(meter) & hasLocation(meter,loc) & Virtual_Anomaly_Count(acnt) & hasTimeSeries(meter,acnt) { "locid": "0/*/loc/guid", "acnt": "0/*/acnt/data", "_last":"1d" }

[Reasoner=PopUpPriorities]
Main_Location(loc) & Electricity_Meter(_meter) & hasLocation(_meter,loc) & Virtual_Anomaly_Class_Time_Series(class) & hasTimeSeries(_meter,class) { "id": "0/*/class/guid", "locid": "0/*/loc/guid", "label": "0/*/loc/display_name", "class": "0/*/class/data", "_tsmode": "MSG", "_last":"1y", "_groupByVar":"true" }


[Reasoner=EnergyConsumption30Days]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "id":"0/0/clean/guid", "unit":"0/0/meter/p/units", "last30d":"0/0/clean/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }

[Reasoner=EnergyConsumptionNew30days]
Main_Location(loc) & Electricity_Meter(_main) & hasLocation(_main,loc) & Electricity_Meter(sub) & isPartOf(sub,_main) { "SubMeter_id":"0/*/sub/guid", "unit":"0/*/sub/p/units", "last30dSubMeter":"0/*/sub/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }


[Reasoner=EnergyConsumptionLastYear30Days]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "id":"0/0/clean/guid", "unit":"0/0/meter/p/units", "lastYear30d":"0/0/clean/data/0", "_operator":"SUM", "_last":"30d", "_offset":"1y", "_groupByVar":"true" }

[Reasoner=EnergyConsumptionLastYearNew30days]
Main_Location(loc) & Electricity_Meter(_main) & hasLocation(_main,loc) & Electricity_Meter(sub) & isPartOf(sub,_main) {   "SubMeter_id":"0/*/sub/guid", "unit":"0/*/sub/p/units", "last30dSubMeter":"0/*/sub/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true", "_offset":"1y" }



[Reasoner=PopUpEnergyUsagePriorities]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "main_id":"0/0/meter/guid", "unit":"0/0/meter/p/units", "last30d":"0/0/clean/data/0", "_operator":"SUM", "_groupByVar":"true", "_last":"30d" }
Main_Location(loc) & Electricity_Meter(meter) & hasLocation(meter,loc) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "site_id":"0/*/loc/guid", "unit":"0/*/meter/p/units", "last30d":"0/*/clean/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }

[Reasoner=EnergyWastageCard]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) & Virtual_Estimated_Wastage_Time_Series(waste) & hasTimeSeries(meter,waste)	{    "guid":"0/0/meter/guid",    "unit":"0/0/meter/p/units",    "last30dWaste":"0/0/waste/data/0",    "last30dUsage":"0/0/clean/data/0",    "_last":"30d",    "_operator":"SUM",    "_groupByVar":"true"  }

[Reasoner=PopUpEnergyWastagePriorities]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) & Virtual_Estimated_Wastage_Time_Series(waste) & hasTimeSeries(meter,waste) { "main_id":"0/0/meter/guid", "unit":"0/0/meter/p/units", "last30dUsage":"0/0/clean/data/0", "_operator":"SUM", "_groupByVar":"true","_last":"30d" }
Main_Location(loc) & Electricity_Meter(meter) & hasLocation(meter,loc) & Virtual_Estimated_Wastage_Time_Series(waste) & hasTimeSeries(meter,waste) { "site_id":"0/*/loc/guid", "unit":"0/*/meter/p/units", "last30dWastage":"0/*/waste/data/0", "_operator":"SUM", "_groupByVar":"true","_last":"30d" }

[Reasoner=TotalPredictEnergy4Estate]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) {"guid":"0/0/clean/guid","Historical":"0/0/clean/data/0","unit":"0/0/clean/p/units","_operator":"SUM","_last":"2d","_groupByVar":"true"}
Electricity_Meter(meter, #meterID)  & Predicted_Electricity_Meter(pred) & hasTimeSeries(meter,pred) {"guid":"0/0/pred/guid","Predict":"0/0/pred/data/0","_operator":"SUM","_last":"2d","_groupByVar":"true"}

[Reasoner=DataQuality4Estate]
Electricity_Meter(_meter, #meterID) & Virtual_Data_Quality(qual) & hasTimeSeries(_meter,qual) { "data":"0/*/qual/data", "_starttime":"YESTERDAY_START", "_endtime":"YESTERDAY_END" }

[Reasoner=PopUpDataOutagePriorities]
Main_Location(loc) & Electricity_Meter(_meter) & hasLocation(_meter,loc) & Virtual_Data_Quality(qual) & hasTimeSeries(_meter,qual) { "data":"0/0/qual/data", "site_id":"0/*/loc/guid", "_starttime":"YESTERDAY_START", "_endtime":"YESTERDAY_END" }

#===============================
# Building level queries
#==============================

[Reasoner=CardBuildingPriority]
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter2,clean)	{  "SubMeter_id":"0/*/meter2/guid",  "unit":"0/*/clean/p/units",  "last30dSubMeter":"0/*/clean/data/0",  "_operator":"SUM",  "_last":"7d",  "_groupByVar":"true"   }
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc)  & Virtual_Anomaly_Warn(warn) & hasTimeSeries(meter1,warn) & Virtual_Anomaly_Class_Time_Series(class) & hasTimeSeries(meter1,class)	{    "Mainmeter_id": "0/*/meter1/guid",    "label": "0/*/loc/display_name",    "description": "0/*/loc/description",    "priorities": "0/*/warn/data",    "class": "0/*/class/data",    "location": "0/*/loc/coordinatesLatLon",    "_tsmode": "MSG",    "_last":"7d"   }
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Virtual_Anomaly_Warn(warn) & hasTimeSeries(meter2,warn) & Virtual_Anomaly_Class_Time_Series(class) & hasTimeSeries(meter2,class)	{    "SubMeter_id": "0/*/meter2/guid",    "label": "0/*/loc/display_name",    "description": "0/*/loc/description",    "priorities": "0/*/warn/data",    "class": "0/*/class/data",    "location": "0/*/loc/coordinatesLatLon",    "_tsmode": "MSG",    "_last":"7d"  }

[Reasoner=CardBuildingUnusualUsage]
Main_Location(loc,#locID) & Electricity_Meter(_meter1) & hasLocation(_meter1,loc) & Electricity_Meter(_meter2) & isPartOf(_meter2,_meter1) & Virtual_Anomaly_Count(acnt) & hasTimeSeries(_meter1,acnt)	{"id": "0/0/acnt/guid",      "locid": "0/0/loc/guid",       "label": "0/0/loc/display_name",       "class": "0/0/acnt/data",      "_last":"1d",      "_groupByVar":"true"    }

[Reasoner=BuildUnusualUsagePopUpSubmeter]
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Virtual_Anomaly_Class_Time_Series(class) & hasTimeSeries(meter2,class)	{ "SubMeter_id":"0/*/meter2/guid", "last7d":"0/*/class/data", "_last":"7d", "_tsmode": "MSG"}

[Reasoner=EnergyComparsionCard]
Main_Location(loc,#locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Electricity_Meter(meter2) & isPartOf(meter2, meter) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "id":"0/0/meter/guid", "unit":"0/0/meter/p/units", "last30dBuilding":"0/0/clean/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "last30dEnterprise":"0/*/clean/data/0", "id":"0/*/meter/guid", "_operator":"SUM", "_last":"30d", "_groupByVar":"true", "unit":"0/0/meter/p/units" }

[Reasoner=EnergyComparsionCardNew]
Main_Location(loc, #locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Electricity_Meter(sub) & isPartOf(sub,meter) { "buildingName":"0/*/loc/guid", "Meter_id":"0/*/meter/guid", "SubMeter_id":"0/*/sub/guid", "unit":"0/*/sub/p/units", "last30dMeter":"0/*/sub/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }


[Reasoner=PopUpBuildEnergyConsumptionDetails]
Electricity_Meter(meter, #meterID) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) { "main_id":"0/0/meter/guid", "unit":"0/0/meter/p/units", "last1y":"0/0/clean/data", "_last":"1y" }
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter1,clean) { "site_id":"0/*/loc/guid", "unit":"0/*/meter1/p/units", "last1y":"0/0/clean/data", "_last":"1y" }

[Reasoner=BuildingEnergyConsumptionLast30d]
Main_Location(loc,#locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean)	{    "id":"0/0/meter/guid",    "unit":"0/0/meter/p/units",    "last30dBuilding":"0/0/clean/data/0",    "_operator":"SUM",    "_last":"30d",    "_groupByVar":"true"  }

[Reasoner=BuildingEnergyConsumptionLast30dNew]
Main_Location(loc, #locId) & Electricity_Meter(_main) & hasLocation(_main,loc) & Electricity_Meter(sub) & isPartOf(sub,_main) { "SubMeter_id":"0/*/sub/guid", "unit":"0/*/sub/p/units", "last30dSubMeter":"0/*/sub/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }


[Reasoner=BuildingEnergyConsumptionLastYear30d]
Main_Location(loc,#locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean)	{    "id":"0/0/meter/guid",    "unit":"0/0/meter/p/units",    "lastYear30d":"0/0/clean/data/0",    "_operator":"SUM",    "_last":"30d",    "_offset":"1y",    "_groupByVar":"true"  }

[Reasoner=BuildingEnergyConsumptionLastYear30dNew]
Main_Location(loc, #locID) & Electricity_Meter(_main) & hasLocation(_main,loc) & Electricity_Meter(sub) & isPartOf(sub,_main) { "SubMeter_id":"0/*/sub/guid", "unit":"0/*/sub/p/units", "last30dSubMeter":"0/*/sub/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true", "_offset":"1y"}



[Reasoner=BuildingEnergyConsumptionCardSubmeter]
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter1,clean) { "id":"0/0/meter1/guid", "unit":"0/0/clean/p/units", "last30dMainMeter":"0/0/clean/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true" }
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter2,clean) { "id":"0/*/meter2/guid", "unit":"0/*/clean/p/units", "last30dSubMeter":"0/*/clean/data/0", "_operator":"SUM", "_last":"30d", "_groupByVar":"true"}

[Reasoner=BuildingEnergyWastageCard]
Main_Location(loc,#locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean) & Virtual_Estimated_Wastage_Time_Series(waste) & hasTimeSeries(meter,waste)	{    "guid":"0/0/meter/guid",    "unit":"0/0/meter/p/units",    "last30dWaste":"0/0/waste/data/0",    "last30dUsage":"0/0/clean/data/0",    "_last":"30d",    "_operator":"SUM",    "_groupByVar":"true"  }

[Reasoner=BuildEnergyWastageTopWastagePopUp]
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter1,clean)	{    "Mainmeter_id":"0/0/meter1/guid",    "unit":"0/0/clean/p/units",    "last30dMainMeter":"0/0/clean/data/0",    "_operator":"SUM",    "_last":"30d",    "_groupByVar":"true"  }
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1) & Virtual_Estimated_Wastage_Time_Series(waste) & hasTimeSeries(meter2,waste)	{    "SubMeter_id":"0/*/meter2/guid",    "unit":"0/*/waste/p/units",    "last30dSubMeter":"0/*/waste/data/0",    "_operator":"SUM",    "_last":"30d",    "_groupByVar":"true"  }

[Reasoner=BuildingEnergyPredict]
Main_Location(loc,#locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter) & Predicted_Electricity_Meter(pred) & hasTimeSeries(meter,pred)	{    "guid":"0/0/loc/guid",    "Predict":"0/0/pred/data/0",    "_operator":"SUM",    "_last":"2d",    "_groupByVar":"true"  }
Main_Location(loc,#locID) & Electricity_Meter(meter) & hasLocation(meter,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter) & Cleaned_Electricity_Meter(clean) & hasTimeSeries(meter,clean)	{    "guid":"0/0/loc/guid",    "Historical":"0/0/clean/data/0",    "_operator":"SUM",    "_last":"2d",    "_groupByVar":"true"  }

[Reasoner=BuildingDataOutage]
Main_Location(loc,#locID) & Electricity_Meter(_meter) & hasLocation(_meter,loc) & Electricity_Meter(_meter2) & isPartOf(_meter2,_meter) & Virtual_Data_Quality(qual) & hasTimeSeries(_meter,qual)	{    "guid":"0/0/qual/guid",    "data":"0/0/qual/data",  "site_id":"0/0/loc/guid",    "location": "0/0/loc/coordinatesLatLon" , "_starttime":"YESTERDAY_START", "_endtime":"YESTERDAY_END" }


[Reasoner=BuilddataOutagePopUp]
Main_Location(loc,#locID) & Electricity_Meter(meter1) & hasLocation(meter1,loc) & Electricity_Meter(meter2) & isPartOf(meter2,meter1)  & Virtual_Data_Quality(qual) & hasTimeSeries(meter2,qual)	{   "SubMeter_id":"0/*/meter2/guid",   "lastDay":"0/*/qual/data", "_starttime":"YESTERDAY_START", "_endtime":"YESTERDAY_END" }

[AutoReasoner=E2DMeter]
Main_Measured_Electricity_Meter(meter) -> E2D_Cfg_Egy_Diagnosis*(cfg, ^meter)		 & hasFile(meter,cfg) & Virtual_Data_Quality*(vdq, ^meter) & hasTimeSeries(meter, vdq) & Virtual_Model_Quality*(vmq, ^meter) & hasTimeSeries(meter, vmq) & Predicted_Electricity_Meter*(pm, ^meter) & hasTimeSeries(meter, pm) & Predicted_Electricity_Meter_Upper_Bound*(pmu, ^meter) & hasTimeSeries(meter, pmu) & Predicted_Electricity_Meter_Lower_Bound*(pml, ^meter) & hasTimeSeries(meter, pml) & Virtual_Anomaly_Count*(ac, ^meter) & hasTimeSeries(meter, ac) & Virtual_Anomaly_Warn*(aw, ^meter) & hasTimeSeries(meter, aw) & Anomaly_Class_Time_Series*(at, ^meter) & hasTimeSeries(meter,at) & Virtual_Estimated_Wastage_Time_Series*(ew, ^meter) & hasTimeSeries(meter,ew) & Virtual_Estimated_Savings_Time_Series*(es, ^meter) & hasTimeSeries(meter,es) & Cleaned_Electricity_Meter*(clean, ^meter) & hasTimeSeries(meter,clean) & Virtual_Anomaly_Class_Time_Series*(class, ^meter) & hasTimeSeries(meter,class) & Virtual_Anomaly_Class_Time_Series_Hourly*(classh, ^meter) & hasTimeSeries(meter,classh)
Main_Virtual_Electricity_Meter(meter)  -> E2D_Cfg_Virtual_Egy_Diagnosis*(cfg, ^meter) & hasFile(meter,cfg) & Virtual_Data_Quality*(vdq, ^meter) & hasTimeSeries(meter, vdq) & Virtual_Model_Quality*(vmq, ^meter) & hasTimeSeries(meter, vmq) & Predicted_Electricity_Meter*(pm, ^meter) & hasTimeSeries(meter, pm) & Predicted_Electricity_Meter_Upper_Bound*(pmu, ^meter) & hasTimeSeries(meter, pmu) & Predicted_Electricity_Meter_Lower_Bound*(pml, ^meter) & hasTimeSeries(meter, pml) & Virtual_Anomaly_Count*(ac, ^meter) & hasTimeSeries(meter, ac) & Virtual_Anomaly_Warn*(aw, ^meter) & hasTimeSeries(meter, aw) & Anomaly_Class_Time_Series*(at, ^meter) & hasTimeSeries(meter,at) & Virtual_Estimated_Wastage_Time_Series*(ew, ^meter) & hasTimeSeries(meter,ew) & Virtual_Estimated_Savings_Time_Series*(es, ^meter) & hasTimeSeries(meter,es) & Cleaned_Electricity_Meter*(clean, ^meter) & hasTimeSeries(meter,clean) & Virtual_Anomaly_Class_Time_Series*(class, ^meter) & hasTimeSeries(meter,class) & Virtual_Anomaly_Class_Time_Series_Hourly*(classh, ^meter) & hasTimeSeries(meter,classh)
Sub_Measured_Electricity_Meter(meter)  -> E2D_Cfg_Egy_Model*(cfg, ^meter)			 & hasFile(meter,cfg) & Virtual_Data_Quality*(vdq, ^meter) & hasTimeSeries(meter, vdq) & Virtual_Model_Quality*(vmq, ^meter) & hasTimeSeries(meter, vmq) & Predicted_Electricity_Meter*(pm, ^meter) & hasTimeSeries(meter, pm) & Predicted_Electricity_Meter_Upper_Bound*(pmu, ^meter) & hasTimeSeries(meter, pmu) & Predicted_Electricity_Meter_Lower_Bound*(pml, ^meter) & hasTimeSeries(meter, pml) & Virtual_Anomaly_Count*(ac, ^meter) & hasTimeSeries(meter, ac) & Virtual_Anomaly_Warn*(aw, ^meter) & hasTimeSeries(meter, aw) & Anomaly_Class_Time_Series*(at, ^meter) & hasTimeSeries(meter,at) & Virtual_Estimated_Wastage_Time_Series*(ew, ^meter) & hasTimeSeries(meter,ew) & Virtual_Estimated_Savings_Time_Series*(es, ^meter) & hasTimeSeries(meter,es) & Cleaned_Electricity_Meter*(clean, ^meter) & hasTimeSeries(meter,clean) & Virtual_Anomaly_Class_Time_Series*(class, ^meter) & hasTimeSeries(meter,class) & Virtual_Anomaly_Class_Time_Series_Hourly*(classh, ^meter) & hasTimeSeries(meter,classh)
Sub_Virtual_Electricity_Meter(meter)   -> E2D_Cfg_Virtual_Egy_Model*(cfg, ^meter)	 & hasFile(meter,cfg) & Virtual_Data_Quality*(vdq, ^meter) & hasTimeSeries(meter, vdq) & Virtual_Model_Quality*(vmq, ^meter) & hasTimeSeries(meter, vmq) & Predicted_Electricity_Meter*(pm, ^meter) & hasTimeSeries(meter, pm) & Predicted_Electricity_Meter_Upper_Bound*(pmu, ^meter) & hasTimeSeries(meter, pmu) & Predicted_Electricity_Meter_Lower_Bound*(pml, ^meter) & hasTimeSeries(meter, pml) & Virtual_Anomaly_Count*(ac, ^meter) & hasTimeSeries(meter, ac) & Virtual_Anomaly_Warn*(aw, ^meter) & hasTimeSeries(meter, aw) & Anomaly_Class_Time_Series*(at, ^meter) & hasTimeSeries(meter,at) & Virtual_Estimated_Wastage_Time_Series*(ew, ^meter) & hasTimeSeries(meter,ew) & Virtual_Estimated_Savings_Time_Series*(es, ^meter) & hasTimeSeries(meter,es) & Cleaned_Electricity_Meter*(clean, ^meter) & hasTimeSeries(meter,clean) & Virtual_Anomaly_Class_Time_Series*(class, ^meter) & hasTimeSeries(meter,class) & Virtual_Anomaly_Class_Time_Series_Hourly*(classh, ^meter) & hasTimeSeries(meter,classh)


[AutoReasoner=E2DOccSensor]
Virtual_Occupancy_Sensor(occ)  ->  E2D_Cfg_Virtual_Occ_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)
Sub_Measured_Occupancy_Sensor(occ)  ->   E2D_Cfg_Occupancy_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)
Measured_Incremental_Presence_Sensor(occ) -> E2D_Cfg_Inc_Presence_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)
Measured_Presence_Sensor(occ) -> E2D_Cfg_Measured_Presence_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)
Measured_ModCam_Occupancy_Sensor(occ) -> E2D_Cfg_MODCAM_Occ_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)
Measured_Footfall_In_Sensor(occ) -> E2D_Cfg_Measured_Footfall_In_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)
Measured_Footfall_Out_Sensor(occ) -> E2D_Cfg_Measured_Footfall_Out_Sensor*(cfg, ^occ) & hasFile(occ,cfg) & Virtual_Data_Quality*(vdq, ^occ) & hasTimeSeries(occ, vdq) & Virtual_Model_Quality*(vmq, ^occ) & hasTimeSeries(occ, vmq) & Predicted_Occupancy_Sensor*(pm, ^occ) & hasTimeSeries(occ, pm)  & Cleaned_Occupancy_Sensor*(clean, ^occ) & hasTimeSeries(occ, clean)

#===================================
# Estate Occupancy Queries
#===================================
[Reasoner=FootFallByHourEstateRQ]
Building_Campus(_campus) & Virtual_Occupancy_Sensor(_sensor) & hasLocation(_sensor,_campus) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_sensor,clean)	{"next": "0/*/clean/data", "_last": "3599s", "unit":"0/0/clean/p/units"}
Building_Campus(_campus) & Virtual_Occupancy_Sensor(_sensor) & hasLocation(_sensor,_campus) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_sensor,clean)	{"previous": "0/*/clean/data",  "_last": "3599s", "_offset": "7d", "unit":"0/0/clean/p/units" }
Demographic(demo) & Measured_Demographic_Age_Sensor(raw) & isPartOf(raw,demo)	{"guid": "0/*/demo/guid", "age": "0/*/raw/data",  "_last": "2d"}
Demographic(demo) & Measured_Demographic_Sex_Sensor(raw) & isPartOf(raw,demo)	{"guid": "0/*/demo/guid", "sex": "0/*/raw/data",  "_last": "2d", "_tsmode":"MSG"}

[Reasoner=FootFallByHourPopupEstateRQ]
Building_Campus(_campus) & Virtual_Occupancy_Sensor(_sensor) & hasLocation(_sensor,_campus) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_sensor,clean)	{"next":"0/*/clean/data",  "_last":"7d"}
Building_Campus(_campus) & Virtual_Occupancy_Sensor(_sensor) & hasLocation(_sensor,_campus) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_sensor,clean)	{"previous":"0/*/clean/data",  "_last":"9d", "_offset":"6d"}

[Reasoner=FootFallPredictionEstateRQ]
Building_Campus(_campus) & Virtual_Occupancy_Sensor(_sensor) & hasLocation(_sensor,_campus) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_sensor,clean)	{"previous": "0/*/clean/data", "_last": "47h", "unit":"0/0/clean/p/units"}
Building_Campus(_campus) & Virtual_Occupancy_Sensor(_sensor) & hasLocation(_sensor,_campus) & Predicted_Occupancy_Sensor(predict) & hasTimeSeries(_sensor,predict)	{"next": "0/*/predict/data",  "_last": "47h", "unit":"0/0/predict/p/units" }

[Reasoner=FootFallByHourBuildingRQ]
Main_Location(_loc,#locID) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _loc) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"next": "0/*/clean/data", "_last": "3599s", "unit":"0/0/clean/p/units"}
Main_Location(_loc,#locID) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _loc) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"previous": "0/*/clean/data",  "_last": "3599s", "_offset": "7d", "unit":"0/0/clean/p/units" }
Main_Location(_loc,#locID) & Floor(_floor) & hasLocation(_floor, _loc) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _floor) & Demographic(demo) & isPartOf(demo, _meter) & Measured_Demographic_Age_Sensor(raw) & isPartOf(raw,demo)	{"guid": "0/*/demo/guid", "age": "0/*/raw/data",  "_last": "2d"}
Main_Location(_loc,#locID) & Floor(_floor) & hasLocation(_floor, _loc) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _floor) & Demographic(demo) & isPartOf(demo, _meter) & Measured_Demographic_Sex_Sensor(raw) & isPartOf(raw,demo)	{"guid": "0/*/demo/guid", "sex": "0/*/raw/data",  "_last": "2d", "_tsmode":"MSG"}

[Reasoner=FootFallByHourPopupBuildingRQ]
Main_Location(_loc,#locID) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _loc) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"next":"0/*/clean/data",  "_last":"7d"}
Main_Location(_loc,#locID) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _loc) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"previous":"0/*/clean/data",  "_last":"9d", "_offset":"6d"}

[Reasoner=FootFallPredictionBuildingRQ]
Main_Location(_loc,#locID) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _loc) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"previous": "0/*/clean/data", "_last": "47h", "unit":"0/0/clean/p/units"}
Main_Location(_loc,#locID) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, _loc) & Predicted_Occupancy_Sensor(predict) & hasTimeSeries(_meter,predict)	{"next": "0/*/predict/data",  "_last": "47h", "unit":"0/0/predict/p/units" }

[Reasoner=FootFallByFloorRQ]
Main_Location(_loc,#locID) & Floor(floor) & hasLocation(floor, _loc) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, floor) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"maxCapacity":"0/*/floor/p/maxCapacity", "guid": "0/*/clean/guid", "floorName":"0/*/floor/display_name", "data": "0/*/clean/data", "_last": "3599s"}

[Reasoner=FootFallByFloorPopupPerFloorRQ]
Main_Location(_loc,#locID) & Floor(floor,#floorID) & hasLocation(floor, _loc) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, floor) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{"guid":"0/*/clean/guid",  "maxCapacity":"0/*/floor/p/maxCapacity", "maxIdealCapacity":"0/*/floor/p/maxIdealCapacity", "minIdealCapacity":"0/*/floor/p/minIdealCapacity","floorName":"0/*/floor/display_name", "next":"0/*/clean/data",  "_last":"7d"}
Main_Location(_loc,#locID) & Floor(floor,#floorID) & hasLocation(floor, _loc) & Virtual_Occupancy_Sensor(_meter) & hasLocation(_meter, floor) & Cleaned_Occupancy_Sensor(clean) & hasTimeSeries(_meter,clean)	{ "guid":"0/*/clean/guid", "maxCapacity":"0/*/floor/p/maxCapacity", "maxIdealCapacity":"0/*/floor/p/maxIdealCapacity", "minIdealCapacity":"0/*/floor/p/minIdealCapacity", "floorName":"0/*/floor/display_name", "previous":"0/*/clean/data",  "_last":"30d", "_offset":"6d"}

[Reasoner=ListFloorRQ]
Main_Location(_loc,#locID) & Floor(floor) & hasLocation(floor, _loc)

[Concepts]
Visualization
	Occupancy_Default_Card
	ExternalCard
	ExtendedVisualization  # experimentation
		EstateVisualization {"zone":"Estate"}
			Energy_Charts_Estate {"section":"Energy"} {*}
			Occupancy_Charts_Estate {"section":"Occupancy"} {*}
		BuildingVisualization {"zone":"Building"} {*}
			Energy_Charts_Building {"section":"Energy"} {*}
			Occupancy_Charts_Building {"section":"Occupancy"} {*}

[Options]
AUTO_RESTORE_KEYS=false

#------------------------
# Instances
#------------------------
[Instances]
FootFallByHourPopupBuilding a Occupancy_Default_Card {"type":"AREA", "RQ":"FootFallByHourPopupBuildingRQ","variables": "next,previous","base":"next", "groupBy":"DAY", "operator":"MAX", "updatedTime":"next", "numberOfRows":7,"baseDifference":7} {*}
FootFallByHourPopupEstate a Occupancy_Default_Card {"type":"AREA", "RQ": "FootFallByHourPopupEstateRQ","variables": "next,previous","base":"next", "groupBy":"DAY", "operator":"MAX", "updatedTime":"next", "numberOfRows":7,"baseDifference":7} {*}
FootFallPredictionPopupBuilding a Occupancy_Default_Card {"type":"AREA", "RQ": "FootFallPredictionBuildingRQ", "variables": "next,previous","base":"next", "groupBy":"DAY", "operator":"MAX", "updatedTime":"previous", "baseDifference":2} {*}
FootFallPredictionPopupEstate a Occupancy_Default_Card {"type":"AREA", "RQ": "FootFallPredictionEstateRQ", "variables": "next,previous","base":"next", "groupBy":"DAY", "operator":"MAX", "updatedTime":"previous", "baseDifference":2} {*}
FootFallByHourEstate a Occupancy_Default_Card {"type":"CUSTOM", "RQ": "FootFallByHourEstateRQ", "variables": "next,previous", "groupBy":"HOUR", "operator":"SUM", "updatedTime":"next"} {*}
FootFallByHourBuilding a Occupancy_Default_Card {"type":"CUSTOM", "RQ": "FootFallByHourBuildingRQ", "variables": "next,previous", "groupBy":"HOUR", "operator":"SUM", "updatedTime":"next"} {*}
FootFallPredictionEstate a Occupancy_Default_Card {"type":"MULTITEXT", "RQ": "FootFallPredictionEstateRQ", "variables": "next,previous", "groupBy":"ALL", "operator":"MAX", "updatedTime":"previous"} {*}
FootFallPredictionBuilding a Occupancy_Default_Card {"type":"MULTITEXT", "RQ": "FootFallPredictionBuildingRQ", "variables": "next,previous", "groupBy":"ALL", "operator":"MAX", "updatedTime":"previous"} {*}
FootFallByFloor a Occupancy_Default_Card {"type":"CUSTOM", "RQ":"FootFallByFloorRQ", "variables": "data", "groupBy":"HOUR", "updatedTime":"data"} {*}
FootFallByFloorDetail a Occupancy_Default_Card {"type":"CUSTOM", "RQ":"FootFallByFloorPopupRQ", "variables": "next,previous","guidVariables":"next,previous","base":"next", "groupBy":"DAY", "operator":"MAX", "updatedTime":"next", "numberOfRows":7} {*}
FootFallByFloorDetailPerFloor a Occupancy_Default_Card {"type":"CUSTOM", "RQ":"FootFallByFloorPopupPerFloorRQ", "variables": "next,previous","guidVariables":"next,previous","base":"next", "groupBy":"DAY", "operator":"MAX", "updatedTime":"next","numberOfRows":7} {*}
MunichCard a ExternalCard {"name":"Watson IoT Headquarters", "description":"Go to IBM Munich Website", "buttonText":"Go to IBM Munich Website","url":"https://www.ibm.com/internet-of-things/learn/munich-iot-center"}


# Everything above should generally be the same for all buildings
[Instances]
<%= estate_name %> a Building_Campus "<%= estate_name %>" X{"type":"Point","coordinates":[<%= estate_latitude %>,<%= estate_longitude %>]}X {*} # Enterprise level location
	<%= estate_name %>_TOTAL a Main_Virtual_Electricity_Meter hasLocation <%= estate_name %> X{"type":"Point","coordinates":[<%= estate_latitude %>,<%= estate_longitude %>]}X  {*}
	ESTATE_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor hasLocation <%= estate_name %> X{"type":"Point","coordinates":[<%= estate_latitude %>,<%= estate_longitude %>]}X  {*}

	<% for (var i] in buildings) { %>
	<%= buildings[i].name %> a Office_Building "<%= name %>-Block" {"timeOffset":"<%= buildings[i].timeOffset %>","city":"<%= buildings[i].city %>"} X{"type":"Point","coordinates":[<%= buildings[i].latitude %>,<%= buildings[i].longitude %>]}X {*} hasLocation <% estate_name %>
		# estate occupancy
		<%= buildings[i].name %>_BUILDING_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart<  ESTATE_OCCUPANCY_SENSOR isPartOf ESTATE_OCCUPANCY_SENSOR hasLocation <%= buildings[i].name %> {*}

		# floors
		<% for (var j in buildings[i][floors]) { %>
			# EGLC_FLOOR1 a Floor "01" hasLocation EGLC {"maxCapacity":400,"minIdealCapacity":160,"maxIdealCapacity":320} {*}
			<%= buildings[i].name + "_" buildings[i]["floors"][j] %> <%= buildings[i]["floors"][j] %> hasLocation <%= buildings[i].name %> {"maxCapacity":400,"minIdealCapacity":160,"maxIdealCapacity":320} {*}
				# sensors
				<% for (var j in buildings[i]["sensors"]) { %>
				# EGLC_FLOOR1_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart< EGLC_BUILDING_OCCUPANCY_SENSOR isPartOf EGLC_BUILDING_OCCUPANCY_SENSOR hasLocation EGLC_FLOOR1 {*}
				<%= buildings[i].name + "_" buildings[i]["floors"][j] %>
				<% } %>
		<% } %>				
	<% } %>

	EGLC a Office_Building "EGLC-Block" {"timeOffset":"+05:30","city":"Bangalore"} X{"type":"Point","coordinates":[12.952264680119862,77.64390052963871]}X {*} hasLocation <% estate_name %> # EGLC Building
		EGLC_BUILDING_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart<  ESTATE_OCCUPANCY_SENSOR isPartOf ESTATE_OCCUPANCY_SENSOR hasLocation EGLC {*}
			EGLC_FLOOR1 a Floor "01" hasLocation EGLC {"maxCapacity":400,"minIdealCapacity":160,"maxIdealCapacity":320} {*}
				EGLC_FLOOR1_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart< EGLC_BUILDING_OCCUPANCY_SENSOR isPartOf EGLC_BUILDING_OCCUPANCY_SENSOR hasLocation EGLC_FLOOR1 {*}
					OCC_EGLCF1CUB1_Demographic a Demographic isPartOf EGLC_FLOOR1_OCCUPANCY_SENSOR {*}
						OCC_EGLCF1CUB1_evt_count a Sub_Measured_Occupancy_Sensor <hasPart< EGLC_FLOOR1_OCCUPANCY_SENSOR isPartOf EGLC_FLOOR1_OCCUPANCY_SENSOR isPartOf OCC_EGLCF1CUB1_Demographic {*}
						OCC_EGLCF1CUB1_evt_age a Measured_Demographic_Age_Sensor <hasPart< EGLC_FLOOR1_OCCUPANCY_SENSOR isPartOf EGLC_FLOOR1_OCCUPANCY_SENSOR isPartOf OCC_EGLCF1CUB1_Demographic {*}
						OCC_EGLCF1CUB1_evt_sex a Measured_Demographic_Sex_Sensor <hasPart< EGLC_FLOOR1_OCCUPANCY_SENSOR isPartOf EGLC_FLOOR1_OCCUPANCY_SENSOR isPartOf OCC_EGLCF1CUB1_Demographic {*}
			EGLC_FLOOR2 a Floor "02" hasLocation EGLC {"maxCapacity":400,"minIdealCapacity":160,"maxIdealCapacity":320} {*}
				EGLC_FLOOR2_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart< EGLC_BUILDING_OCCUPANCY_SENSOR isPartOf EGLC_BUILDING_OCCUPANCY_SENSOR hasLocation EGLC_FLOOR2 {*}
					OCC_EGLCF2CUB1_evt_count a Sub_Measured_Occupancy_Sensor <hasPart< EGLC_FLOOR2_OCCUPANCY_SENSOR isPartOf EGLC_FLOOR2_OCCUPANCY_SENSOR {*}
		EGLC_MAINMETER a Main_Virtual_Electricity_Meter <hasPart<  <% estate_name %>_TOTAL isPartOf <% estate_name %>_TOTAL hasLocation EGLC {*}
			EM_EGLC2FRawPower_evt_value a Sub_Measured_Electricity_Meter <hasPart< EGLC_MAINMETER isPartOf EGLC_MAINMETER {*}
			EM_EGLC3FRawPower_evt_value a Sub_Measured_Electricity_Meter <hasPart< EGLC_MAINMETER isPartOf EGLC_MAINMETER {*}


  B008 a Office_Building "Poughkeepsie" {"timeOffset":"-04:00","city":"Poughkeepsie"} X{"type":"Point","coordinates":[41.65286165911576,-73.93854819238187]}X {*} hasLocation <% estate_name %> # B008 Building
	B008_BUILDING_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart<  ESTATE_OCCUPANCY_SENSOR isPartOf ESTATE_OCCUPANCY_SENSOR hasLocation B008 {*}
		B008_FLOOR1 a Floor "01" hasLocation B008 {"maxCapacity":250,"minIdealCapacity":100,"maxIdealCapacity":200} {*}
			B008_FLOOR1_OCCUPANCY_SENSOR a Virtual_Occupancy_Sensor <hasPart< B008_BUILDING_OCCUPANCY_SENSOR isPartOf B008_BUILDING_OCCUPANCY_SENSOR hasLocation B008_FLOOR1 {*}
				OCC_POKB008F1CUB1_evt_count a Sub_Measured_Occupancy_Sensor <hasPart< B008_FLOOR1_OCCUPANCY_SENSOR isPartOf B008_FLOOR1_OCCUPANCY_SENSOR {*}
				OCC_POKB008F1CUB2_evt_count a Sub_Measured_Occupancy_Sensor <hasPart< B008_FLOOR1_OCCUPANCY_SENSOR isPartOf B008_FLOOR1_OCCUPANCY_SENSOR {*}
      B008_MAINMETER a Main_Virtual_Electricity_Meter <hasPart<  <% estate_name %>_TOTAL isPartOf <% estate_name %>_TOTAL hasLocation B008 {*}
          EM_POKB008LC88_evt_value a Sub_Measured_Electricity_Meter <hasPart<  B008_MAINMETER isPartOf B008_MAINMETER {*}
          EM_POKB008LC89_evt_value a Sub_Measured_Electricity_Meter <hasPart<  B008_MAINMETER isPartOf B008_MAINMETER {*}

VCS
===

Vehicle Cognition System

Vehicle Cognition System is an intelligent software system that fits into the Pervasive Computing genre. Vehicle Cognition System uses the features available in modern smart-phone to develop a non-tangible vehicle-to-vehicle protocol that acts as a warning system and warns the car about any approaching car by building a virtual map of car trajectories , that the cars in the vicinity is likely to follow based on crucial information obtained through the protocol. The system also proposes a path finding algorithm, executed by the vehicle guidance system activated by the protocol’s collision detection system, by taking our car controls, through cruise control. Once the guidance system guides the car to safety the protocol relinquishes the control of the car to the driver.

# Devices/Other Physical Objects:

1.	Smart-Phone possessing  the features mentioned below
2.	Cars or other Automobiles
3.	Roads to Navigate

# Hardware Technologies Used:
1.	Bluetooth [Real-time Communication through Blue-Jacking simulated using Pub Nub  Communication API].
2.	GPS (used only at the time of car engine ignition, to initialize x,y (i.e. current latitude/longitude)). [Initial Location Information]
3.	Compass [To know the instantaneous  orientation of the  designated Car]

# Libraries/APIs Utilized:
1.	PubNub API  for real-time communication
2.	Google Maps API
3.	Google Directions API
4.	HTML5
5.	AngularJS
6.	FireBase Database
7.	Underscore

# How It Works

# Who Did What :

Harsh Praful Dand:

Worked on the basic framework of the application and have specifically focused on the actual simulation of the car navigation using Google Maps and Direction APIs.

Wajid Baba Mohammad:

Worked on populating the master table of each car , based on the cars in the vicinity that presently intersect the region around the host car , available from the intersection algorithms.

Shiva Shankar Prakash:

Anil Talla:

Munshi Riaz:


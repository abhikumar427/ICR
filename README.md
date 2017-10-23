## VandyHacks

## Inspiration:
Banks have a hard time in determining the credibility of a customer to provide a loan. There are several credit reporting agencies who maintain FICO scores called credit bureaus. The banks have a hard time in getting the updated FICO score from each bureau, thus increasing the response rate. WIth the help of ICR, we predict the decision from the bank depending upon the real-time FICO score from each bureau and use an algorithm to test our hypothesis to generate accurate results.

## Objectives:
* Reduces the response time by helping the bank in making decisions
* Provides virtualization of credit history from each bureau
* ICR prediction

## Technologies used
* Microstrategy API
* Usher Authentication
* CapitalOne API
* Twilio API
* AWS RDS
* NodeJs
* JavaScript
* CSS

We made use of ***CapitalOne API*** to take data from CapitalOne to ***AWS RDS*** with the help of ajax call. Then we connected ***MicroStrategy API*** to the AWS RDS with live connections. Once the connection is done then we ***visualized*** the data with the help of ***dossiers*** and then we generated the iframes to ***embed*** the iframes into the web application. In the web app, we used ***Usher*** to authenticate and then we visualize the data to get ICR predictions. If the loan handler is satisfied with the ICR predictions we send them a message with the help of ***Twilio API*** else we keep the case pending for more information.

## Challenges :
* Real-time visualization with MicroStrategy
* Twilio messaging
* Usher API

## Accomplishments that we're proud of
* MicroStrategy API ***( Connect + Visualize + Embed)***
* Twilio API
* ICR Prediction

## What we learned
* MicroStrategy API
* NodeJs

## What's next for Intellectual Credibility Repository(ICR)
* Machine Learning Algorithms for deciding the credibility in ICR algorithm.



# Simple JavaScript/Node.js Web App Using Usher REST API

To run:  
    - Download files  
    - Open file directory in terminal  
    - npm start  
    - Open http://localhost:3000/ on web browser to see application  

# Weather-App-with-Open-Meteo

## CONTEXT
Jumpseller is an e-commerce platform where people can create their online stores, inside an all-in-one platform with everything people need to build a brand.
On this take home assignment, you will develop a small application in Ruby and React with a server and frontend components.

Provide the code on a private GitHub or GitLab repository with a README file with instructions on how to run the project. We expect to receive this code in 3 days.
Time spent should be less than 5hs. Make your own best decisions for non-specified requirements.

## SERVER SIDE
1. Set up a Ruby project with a server-side framework like Ruby on Rails or Sinatra.
1. Implement an API endpoint that receives parameters for location (example: Lisbon, Berlin) , start date, and end date.
1. Create a weather service class that interacts with the Open-Meteo API. Make an HTTP requests to the API and retrieve historical weather information for the given location and date range.
1. Define a data model for storing the historical weather information. The model should include attributes such as location, date, temperature, humidity, etc.
1. Implement the API endpoint to fetch historical weather data for the specified location and date range. If the data was previously stored, return it directly; otherwise, fetch it from the Open-Meteo API.
## FRONTEND
1. Create a React App.
1. Design a user interface with input fields for location (example: Lisbon), start date, and end date.
1. Implement a client-side function that sends a request to the server API when a button is clicked, passing the entered location, start date, and end date as parameters.
1. Handle the API response and display the historical weather information on the frontend with a chart library and on table format.

## DELIVERABLES
1. Screencast of the Application, demoing the main features. Use voice to better explain yourself.
1. Repository URL or Zip, containing all the code.



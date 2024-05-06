# Meteo Vision 

![Rails](https://img.shields.io/badge/rails-v7.1.3.2-red)
![React](https://img.shields.io/badge/react-v18.2.0-blue)
![npm](https://img.shields.io/badge/node-v10.5.0-blue)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

<p align="center">
  <img height="300" src="https://github.com/FabioMiguel2000/Meteo-Vision/assets/50105554/54f3ca30-7b4f-450f-b059-b7c5d87310c2">


## CONTEXT

Meteo Vision is a full-stack application designed to retrieve and display historical weather data for any specified location and date range. This application utilizes a robust server-side architecture built with Ruby on Rails and a dynamic front-end interface developed using React.

### SERVER SIDE
1. Set up a Ruby project with a server-side framework like Ruby on Rails or Sinatra.
1. Implement an API endpoint that receives parameters for location (example: Lisbon, Berlin) , start date, and end date.
1. Create a weather service class that interacts with the Open-Meteo API. Make an HTTP requests to the API and retrieve historical weather information for the given location and date range.
1. Define a data model for storing the historical weather information. The model should include attributes such as location, date, temperature, humidity, etc.
1. Implement the API endpoint to fetch historical weather data for the specified location and date range. If the data was previously stored, return it directly; otherwise, fetch it from the Open-Meteo API.
### FRONTEND
1. Create a React App.
1. Design a user interface with input fields for location (example: Lisbon), start date, and end date.
1. Implement a client-side function that sends a request to the server API when a button is clicked, passing the entered location, start date, and end date as parameters.
1. Handle the API response and display the historical weather information on the frontend with a chart library and on table format.

## Demonstration Video 

https://github.com/FabioMiguel2000/Meteo-Vision/assets/50105554/25762c05-c368-48f4-af7e-fdd1763cdbc5


## How to run

To prepare your computer for development you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### Local Setup

#### Deploy Local Server 

1. Clone the repository

```bash
git clone https://github.com/FabioMiguel2000/Meteo-Vision.git
```

2. Head inside the project directory `/Meteo-Vision`:
   
```bash
cd /Meteo-Vision

```

4. There is a docker-compose file that builds and runs 2 containers, the Ruby on Rails server, and the React.JS client:

```bash
docker-compose up -d
```

5. Run the Ruby on Rails server's migration:
```bash
docker exec -it server bin/rails db:migrate
```

6. You should be able to run the application on:

```bash

http://localhost:3000/

```

## License

This project is licensed under the Apache License, Version 2.0.

For the complete text of the Apache License, please refer to the ![Apache License](https://github.com/FabioMiguel2000/Acme-Caf-Order-System/blob/FabioMiguel2000-patch-1/LICENSE).

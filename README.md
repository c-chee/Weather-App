# Weather Application

## Overview
This Weather Application is a Node.js project created by following the Udemy **Node.js Weather App** tutorial (Sections 6–9).  
The application allows users to view the current weather for a given location and choose the units used in the weather report.

## Features
- View the current weather for any location
- Set the units of the weather report (metric or imperial)
- Uses real-time weather data
- Location search with geocoding
- Secure storage of API keys using environment variables

## Technologies Used
- Node.js
- Express.js
- Mapbox API (for location geocoding)
- Weatherstack API (for weather data)
- dotenv (for environment variable management)

## How It Works
1. The user enters a location.
2. The app uses the Mapbox API to convert the location into latitude and longitude.
3. The coordinates are sent to the Weatherstack API.
4. The current weather information is returned and displayed using the selected units.

## How To Use
1. Select your unit, fahrenheit or celsius.
2. Input your locaction (City or State).
3. Click 'Search' the generate results.

## Environment Variables
This project uses a `.env` file to store API keys and tokens securely.


# City Explorer (back-end)

**Author**: Miranda

**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

This is the backend code for the City Explorer project. The backend provides an API endpoint to the client which receives request and brokers API's including Weatherbit and MovieDB.

## Getting Started

The backend runs on Node, Dependencies required are dotenv, axios, express, and cors.

## Architecture

The backend runs on Node. Dependencies required are dotenv, axios, express, and cors. Cache wil be first checked when a client requests is made from the backend, if nothing is stored in cache or it's expired, then the API call will be made.

## Change Log

03-06-2023 8:11pm - Application renders a name, latitute and longitude, and a map upon client's request for a city.
03-09-2023 8:30pm - Application fully rendered locally, currengly under testing for remote server. Style added
03-11-2023 10:30pm - Cache added

## Credit and Collaborations

Sheyna, Justin Hammerly. Daniel Yoon, Kirill Lesnykh

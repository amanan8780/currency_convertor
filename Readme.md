# Currency Converter

This application provides a simple interface to convert currencies using the Fixer.io API. It allows users to select a base currency and a currency to convert to. As the user inputs a value, the application fetches the conversion rate and calculates the equivalent value in the selected currency.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API](#api)
- [Error Handling](#error-handling)
- [Test Case Requirements](#test-case-requirements)
- [Contact](#contact)

## Features
1. Currency Conversion
2. Error Handling
3. User-friendly UI

## Getting Started
1. Clone the repository:
    ```
    git clone https://github.com/abubakarmani1/currency_convertor.git
    ```

2. Navigate to the project directory:
    ```
    cd currency_convertor
    ```

3. Use Docker Compose to run the project:
    ```
    docker-compose up
    ```

4. Visit `http://localhost:8080` to access the application.

## Usage
- Choose the base currency and the target currency from the dropdown menus.
- Enter the amount you want to convert.
- The application will automatically fetch the conversion rate and display the equivalent value in the target currency.

## API
This application fetches data from the [Fixer.io](https://fixer.io) API to get the latest conversion rates.

## Error Handling
- If the API is not available or returns an error, the application will display an appropriate error message.
- The application also handles invalid user inputs gracefully by showing an error message.

## Test Case Requirements
- Vanilla JavaScript and Vanilla HTML/CSS/SCSS without any frameworks.
- Retrieve Data from the Fixer.io API.
- Display the conversion rate and calculated conversion value.
- Graceful error handling.
- An intuitive and user-friendly UI.

## Contact
GitHub: [abubakarmani1](https://github.com/abubakarmani1)

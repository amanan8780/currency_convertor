/**
 * * * Global variables to grab the values from HTML elements.
 */

let fromAmount = document.getElementById('from-amount');                    // Represents the 'from-amount' HTML element.
let toAmount = document.getElementById('to-amount');                        // Represents the 'to-amount' HTML element.
let fromCurrency = document.getElementById('from-currency');                // Represents the 'from-currency' HTML element.
let toCurrency = document.getElementById('to-currency');                    // Represents the 'to-currency' HTML element.

let fromCurrencyLabel = document.getElementById('currency-equation-from');  // Represents the 'currency-equation-from' HTML element.
let toCurrencyLabel = document.getElementById('currency-equation-to');      // Represents the 'currency-equation-to' HTML element.

let currencyDate = document.getElementById('currency-date');                // Represents the 'currency-date' HTML element.




let defaultCurrency = {
    date: "",
    fromCurrency: {
        name: "Euro",
        code: "EUR",
        rate: 1
    },
    toCurrency: {
        name: "United States Dollar",
        code: "USD",
        rate: 1.095
    }
}

/**
 * Executes the fetchFixerAPI and propagateInitialDataSet functions when the window loads.
 *
 * @param {type} - No parameters
 * @return {type} - No return value
 */

window.onload = function() {
    fetchFixerAPI();
    propagateInitialDataSet();
};

//  * Attach an event listener to the `fromAmount` element and call `fetchFixerAPI()` when the 'input' event is triggered.

fromAmount.addEventListener('input', async function (event) {
    console.log(event.target.value);
    let eventValue = event.target.value
    await resetCurrencyAPI(eventValue);
});


/**
 * Populates a select dropdown with options.
 *
 * @param {string} selectId - The id of the select element.
 * @param {Array} options - An array of objects representing the options.
 * @param {string} defaultValue - The default value for the select element.
 */
async function populateSelectOptions(selectId, options, defaultValue) {
    const selectElement = document.getElementById(selectId);

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option.name;
        optionElement.value = option.code;
        selectElement.appendChild(optionElement);
    });

    selectElement.value = defaultValue;

    selectElement.onchange = async function() {
        const selectedOption = selectElement.options[selectElement.selectedIndex];

        if (selectId === "from-currency") {
            defaultCurrency.fromCurrency.name = selectedOption.textContent;
            defaultCurrency.fromCurrency.code = selectedOption.value;
        } else {
            defaultCurrency.toCurrency.name = selectedOption.textContent;
            defaultCurrency.toCurrency.code = selectedOption.value;

        }
        console.log(selectId)
        await resetCurrencyAPI();
        await propagateInitialDataSet();
        
        console.log("propagateInitialDataSet = ",defaultCurrency)
    };
}

/**
 * Populates select options with available currencies and default values.
 * Sets default values for input fields.
 * Sets labels for currency conversion.
 * Sets formatted date and time.
 *
 * @param {Object} params - The parameters for the function.
 * @return {undefined} This function does not return a value.
 */

function propagateInitialDataSet() {
    // Populate select options with available currencies and default values
    populateSelectOptions('from-currency', availableCurrencies, defaultCurrency.fromCurrency.code);
    populateSelectOptions('to-currency', availableCurrencies, defaultCurrency.toCurrency.code);

    // Set default values for input fields
    fromAmount.value = defaultCurrency.fromCurrency.rate;
    toAmount.value = defaultCurrency.toCurrency.rate;


    let toAmountRate = 0;
    
    if (defaultCurrency.fromCurrency.code === 'EUR') {
        toAmountRate = defaultCurrency.toCurrency.rate;
        console.log("toAmountRate = ",defaultCurrency.toCurrency)
    } else {
        toAmountRate = (defaultCurrency.fromCurrency.rate / defaultCurrency.toCurrency.rate).toFixed(3);
    }

    // Set labels for currency conversion
    fromCurrencyLabel.innerText = `1 ${defaultCurrency.fromCurrency.name} equals`;
    toCurrencyLabel.innerText = `${toAmountRate} ${defaultCurrency.toCurrency.name}`;

    // Set formatted date and time
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
    }) + ', ' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    }) + ' UTC';
    currencyDate.innerText = formattedDate;
}


/**
 * Fetches data from the Fixer API and updates the default currency values.
 *
 * @param {Object} params - The parameters for the API request.
 * @return {Promise<void>} - A promise that resolves when the API request is complete.
 */
async function fetchFixerAPI(FromInputValue = 1) {
    const apiURL = `http://localhost:8080/data/2023-08-03?access_key=a50ec07dee55da67833df781eb7b740d&symbols=${defaultCurrency.fromCurrency.code},${defaultCurrency.toCurrency.code}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (response.ok) {
            defaultCurrency.date = data.date;
            defaultCurrency.fromCurrency.rate = data.rates[defaultCurrency.fromCurrency.code];
            defaultCurrency.toCurrency.rate = data.rates[defaultCurrency.toCurrency.code];

            fromAmount.value = FromInputValue;
            
            console.log(fromAmount)

            if (defaultCurrency.fromCurrency.code === 'EUR') {
                toAmount.value = await (parseFloat(fromAmount.value) * defaultCurrency.toCurrency.rate).toFixed(3);
            } else {
                toAmount.value = await (parseFloat(fromAmount.value) * (defaultCurrency.toCurrency.rate / defaultCurrency.fromCurrency.rate)).toFixed(3);
            }

            console.log(defaultCurrency);
        } else {
            throw new Error('Fixer API is not successful, Please try again later');
        }
    } catch (error) {
        console.error('Error:', error);
        // Display appropriate error message to the user
    }
}


/**
 * Resets the currency API.
 *
 * @return {undefined} No return value.
 */

async function resetCurrencyAPI(FromInputValue) {
    const fromAmountValue = parseFloat(fromAmount.value);
    if (!isNaN(fromAmountValue) && fromAmountValue !== 0) {
        await fetchFixerAPI(FromInputValue);
    } else {
        console.error('Invalid From amount');
    }
}
# Calculator

This web application is a calculator that provides the ability to complete simple mathematical operations. Specifically: addition, subtraction, multiplication and division.
It also supports the chaining of these operations without the need to use the equals button.

## Running the App

To run this app locally you can clone this repo and run the following command in your terminal. This will download dependency files and start the project.

```
npm install && npm start
```

Alternatively the app is deployed for use at [calc-and-go.surge.sh](https://calc-and-go.surge.sh).

## Limitations and Future Development

As this application runs all calculations using built-in JavaScript arithmetic operators and number type, all calculations are therefore limited by the maximum and minimum values safe values allowed by the language. You can read more about this [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#integer_range_for_number).  
Future development could see the numbers stored "safely", with a library such as [big-number](https://www.npmjs.com/package/big-number) utilised to perform the mathematical operations. Alternatively, a solution could be derived using the relatively new built-in bigint type.

There is also no current support for the input of negative numbers, although negative results will be accurately displayed.

All floating point results are formatted and displayed to two decimal places.

Further development will also be made to improve styling, including the use of iconography for the mathematical operations, and finer tuning to the responsive styling, so that it looks great at all sizes.

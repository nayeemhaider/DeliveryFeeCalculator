// Import necessary dependencies and stylesheets
import React, { useState } from 'react';
import moment from 'moment';
import './App.css'
import './index.css'

// Defining a functional component as "DeliveryFeeCalculator"
const DeliveryFeeCalculator: React.FC = () => {
  // declaring variable cartValue and declaring the function setCartValue to update the value of cartValue
  const [cartValue, setCartValue] = useState(0);  

  // declaring variable deliveryDistance and declaring the function setDeliveryDistance to update the value of deliveryDistance
  const [deliveryDistance, setDeliveryDistance] = useState(0); 

  // declaring variable numItems and declaring the function setNumItems to update the value of numItems
  const [numItems, setNumItems] = useState(0); 

  // declaring variable currentDateTime and declaring the function setCurrentDateTime to update currentDateTime
  const [currentDateTime, setCurrentDateTime] = useState(moment().toISOString()); 
  
  // Function to calculate the delivery fee based on the provided specification of the task
  const calculateDeliveryFee = () => {
    const smallOrderSurcharge = cartValue < 10 ? 10 - cartValue : 0;
    const baseDeliveryFee = 2;
    const additionalDistanceFee = Math.max(((deliveryDistance - 1000) / 500) + 1, 1);
    const totalDeliveryFee = baseDeliveryFee + additionalDistanceFee;

    const itemSurcharge = numItems >= 5 ? 0.5 * (numItems - 4) : 0;
    const bulkFee = numItems > 12 ? 1.20 : 0;
    const totalItemSurcharge = itemSurcharge + bulkFee;

    const freeDeliveryThreshold = 200;
    const isFreeDelivery = cartValue >= freeDeliveryThreshold;

    let totalFee = totalDeliveryFee + smallOrderSurcharge + totalItemSurcharge;

    const isFridayRush = moment(currentDateTime).isoWeekday() === 5
      && moment(currentDateTime).hour() >= 15
      && moment(currentDateTime).hour() < 19;

    if (isFridayRush) {
      totalFee *= 1.2;
    }

    totalFee = Math.min(totalFee, 15);

    return isFreeDelivery ? 0 : totalFee;
  };

  // This is a function which handles the event of "Calculate Delivery Fee" button
  const handleCalculateClick = () => {
    const deliveryFee = calculateDeliveryFee();
    alert(`The delivery fee is: ${deliveryFee.toFixed(2)}€`);
  };

  // Creating the interface of the different components of the Delivery Fee Calculator app
  // Divisions has been created for different components as well as data-test-id attribute for the testing purposes
  return (
    <div className='wrapper' data-test-id='deliveryFeeCalculator'>
      <h1>Delivery Fee Calculator</h1>

      <div className='cartValue' data-test-id='cartValueInput'>
        <label>Cart Value (€): </label>
        <input type="number" value={cartValue} onChange={(e) => setCartValue(parseFloat(e.target.value))} />
      </div>

      <div className='deliveryDistance' data-test-id='deliveryDistanceInput'>
        <label>Delivery Distance (meters): </label>
        <input type="number" value={deliveryDistance} onChange={(e) => setDeliveryDistance(parseInt(e.target.value))} />
      </div>

      <div className='numberItem' data-test-id='numItemsInput'>
        <label>Number of Items: </label>
        <input type="number" value={numItems} onChange={(e) => setNumItems(parseInt(e.target.value))} />
      </div>

      <div className='dateTime' data-test-id='currentDateTimeInput'>
        <label>Current Date and Time: </label>
        <input type="datetime-local" value={currentDateTime} onChange={(e) => setCurrentDateTime(e.target.value)} />
      </div>

      <div className='calcButton' data-test-id='calculateButton'>
        <button onClick={handleCalculateClick}>Calculate Delivery Fee</button>
      </div>
    </div>
  );
};

// Exporting the DeliveryFeeCalculator component as the default export
export default DeliveryFeeCalculator;
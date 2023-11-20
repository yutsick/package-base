"use strict";

const url = 'https://currency-exchange.p.rapidapi.com/listquotes';
const currencyFrom = document.querySelector('#currency_from'),
        currencyTo = document.querySelector('#currency_to'),
        result = document.querySelector('#result');

const options = {
	method: 'GET', 
	headers: {
		'X-RapidAPI-Key': '59f4021072msh04ef6109d615762p1da679jsnc5dbcbb3e73a',
		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
	}
};

async function getListQuates(){

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        result.forEach(el => {
            let optionFrom = document.createElement('option'),
                optionTo = document.createElement('option');

            optionFrom.text = optionFrom.value =el;
            optionTo.text = optionTo.value =el;

            currencyFrom.appendChild(optionFrom);
            currencyTo.appendChild(optionTo);
        });


    } catch (error) {
        console.error(error);  
    }


}
getListQuates(); 


document.addEventListener("DOMContentLoaded", function() {
    // Typing effect for the "Weather Information" header
    const typingText = "Weather Information";
    let index = 0;
    const speed = 250; // Speed of typing
    const delayBetweenCycles = 300; // Delay before restarting typing
    const h1Element = document.getElementById("typing-text");

    function typeEffect() {
        if (index < typingText.length) {
            h1Element.innerHTML += typingText.charAt(index);
            index++;
            setTimeout(typeEffect, speed);
        } else {
            // Reset typing effect after a delay and start again
            setTimeout(() => {
                h1Element.innerHTML = ''; // Clear the text
                index = 0; // Reset the index
                typeEffect(); // Start typing again
            }, delayBetweenCycles);
        }
    }

    // Start typing effect on page load
    typeEffect();

    // Event listener for the search button
    document.getElementById('searchButton').addEventListener('click', async () => {
        const city = document.getElementById('cityInput').value.trim();
        const weatherDisplay = document.getElementById('weatherDisplay');

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        weatherDisplay.innerHTML = '<p>Loading...</p>';

        const apiKey = '08a65d88c492695abb6c714e3c3159e1'; // Your actual API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (error.message === 'City not found') {
                weatherDisplay.innerText = 'Error: City not found';
            } else {
                weatherDisplay.innerText = 'Error fetching weather data';
            }
        }
    });

    // Function to display weather data
    function displayWeather(data) {
        const weatherDisplay = document.getElementById('weatherDisplay');
        weatherDisplay.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Conditions: ${data.weather[0].description}</p>
        `;
    }

    // Focus/blur event listeners only for focusable elements
    const inputs = document.querySelectorAll('button, input');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            input.style.transition = 'transform 0.4s ease';
            input.style.transform = 'scale(1.3)';
            input.style.backgroundColor = '#e0e0e0'; // Valid hex color for focus
        });

        input.addEventListener('blur', function() {
            input.style.transform = 'scale(1)';
            input.style.backgroundColor = ''; // Reset to default color
        });
    });
});

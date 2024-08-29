function updateDateTime() {  
    const now = new Date(); 
    const options = {  
        year: 'numeric',  
        month: 'long',  
        day: 'numeric',  
        hour: '2-digit',  
        minute: '2-digit',  
        second: '2-digit',  
        hour12: true  
    }; 

   
    const formattedDateTime = now.toLocaleString('en-US', options);  

    
    document.getElementById('datetime').innerText = formattedDateTime;  
}  


updateDateTime();  

setInterval(updateDateTime, 1000);  

// weather api

const apiKey = '153db001ec0248ec90500739242208'; 
const defaultCity = 'Iligan City'; 

// const apiKeyNew = '153db001ec0248ec90500739242208'; 
// const defaultcountry = 'ph'; 
 
// const defaultcountry = 'ph'; 
// const response = `https://newsapi.org/v2/top-headlines?country=${}&apiKey=${apiKeyNew}`;

async function fetchWeather(city) {  
    try {  
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);  
        const data = await response.json();  
        if (data.error) {  
            alert(data.error.message);  
            return;  
        }  
        document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;  
        document.getElementById('humidity').textContent = `${data.current.humidity}%`;  
        document.getElementById('wind').textContent = `${data.current.wind_kph} km/h`;  
    } catch (error) {  
        console.error('Error fetching weather data:', error);  
    }  
}  


// news area api

const newsapikey = '3092b90725c344abbf0ca0a11ccf960f';
constcountry = 'ph';
const response = 'https://newsapi.org/v2/top-headlines?country=${defaultcountry}&apiKey=${newsapikey}';

async function news(country) {
    try {
        const response = await('https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsapikey}');
        const data = await response.json();
        console.log(data)
        if (data.console.log) {
            alert(data.error.message);
            return;
        }
        console.log(data.articles); 
        displayNews(data.articles); 
    } catch (error) {
        console.log('Error fetching news:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; 

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}


  
fetchWeather(defaultCity);  
document.getElementById('searchButton').addEventListener('click', () => {  
const cityInput = document.getElementById('cityInput').value;  
document.querySelector('.location-label').innerText = cityInput

var mapurl = `http://maps.google.com/maps?q=${cityInput}&z=10&output=embed`;
document.querySelector('iframe').setAttribute('src',mapurl)
if (cityInput) {  
    fetchWeather(cityInput);  
}  
});

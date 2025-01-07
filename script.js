document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/cities')
    .then(response => response.json())
    .then(cities => {
      const citiesList = document.getElementById('cities-list');
      cities.forEach(city => {
        const cityElement = document.createElement('section');
        cityElement.classList.add('city');
        cityElement.innerHTML = `
          <h2>${city.name}</h2>
          <h3>Restaurants</h3>
          <ul>
            ${city.restaurants.map(restaurant => `<li>${restaurant.name} - Rating: ${restaurant.rating}</li>`).join('')}
          </ul>
          <h3>Hotels</h3>
          <ul>
            ${city.hotels.map(hotel => `<li>${hotel.name} - Rating: ${hotel.rating}</li>`).join('')}
          </ul>
        `;
        citiesList.appendChild(cityElement);
      });
    })
    .catch(error => console.error('Error fetching cities:', error));
});

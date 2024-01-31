import React, { useState, useEffect } from 'react';

function Restaurantpizzas() {
  const [restaurantpizzas, setRestaurantpizzas] = useState([]);

  useEffect(() => {
    fetch('/restaurant_pizzas')
      .then(response => response.json())
      .then(data => setRestaurantpizzas(data));
  }, []);

  return (
    <div>
      <h2>Restaurant Pizzas List</h2>
      <ul>
        {restaurantpizzas.map((pizza) => (
          <li key={pizza.pizza.id}>
            <h3>{pizza.pizza.name}</h3>
            <p>Ingredients: {pizza.pizza.ingredients}</p>
            <p>Price: ${pizza.price}</p>
            <p>
              Restaurant: {pizza.restaurant.name} - {pizza.restaurant.address}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurantpizzas;

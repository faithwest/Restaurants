
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }

  return (
    <div style={{ textAlign: 'center', margin: '50px auto' }}>
      <h1>Restaurants</h1>
      <div>
        <button type="button" style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', textDecoration: 'none', cursor: 'pointer', borderRadius: '5px' }}>
          <Link to="/restaurant_pizzas/new" style={{ color: 'white', textDecoration: 'none' }}>Add Pizza</Link>
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {restaurants.map(restaurant => (
          <li key={restaurant.id} style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <Link to={`/restaurants/${restaurant.id}`} style={{ textDecoration: 'none', color: 'black' }}>{restaurant.name}</Link>
            <p>{restaurant.address}</p>
            <button
              type="button"
              style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
              onClick={() => handleDelete(restaurant.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;

import React, { useState, useEffect } from 'react';


function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data));
  }, []);

  return (
    <div>
      <h3 className="mt-3">Pizzas:</h3>
      <ul className="list-group">
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h2>{pizza.name}</h2>
            <p>{pizza.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;

// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:8000');

function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();

    socket.on('dishUpdated', () => {
      fetchDishes();
    });
  }, []);

  const fetchDishes = async () => {
    const res = await axios.get('http://localhost:8000/api/dishes');
    setDishes(res.data);
  };

  const togglePublish = async (id) => {
    await axios.post(`http://localhost:8000/api/dishes/toggle/${id}`);
    fetchDishes();
  };

  return (
    <div className="App">
      <h1>Dish Dashboard</h1>
      <div className='dish-list'>
        
        {dishes.map((dish) => (
          <div className='dish-card' key={dish.dishId}>
            <h2>{dish.dishName}</h2>
            <img src={dish.imageUrl} alt={dish.dishName} width="100" />
            <p>{dish.isPublished ? 'Published' : 'Unpublished'}</p>
            <button onClick={() => togglePublish(dish.dishId)}>
              {dish.isPublished ? 'Unpublish' : 'Publish'}
            </button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;

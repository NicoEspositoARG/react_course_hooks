import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredients, setUserIngredients ] = useState([]);

  useEffect(() => {
    fetch(
      "https://reacthooks-f960d.firebaseio.com/ingredients.json").then(response =>
        response.json().then(responseData => {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            });
          }
          setUserIngredients(loadedIngredients);
        })
      )
  }, []);

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients] );
      

  const addIngredientHandler = ingredient => {
    fetch("https://reacthooks-f960d.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(dataResponse =>
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: dataResponse.name, ...ingredient }
        ])
      );
  };

  const removeIngredientHandler = ingredient => { 
    }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={ addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;

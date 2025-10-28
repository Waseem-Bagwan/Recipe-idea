import React, { createContext, useContext, useState, useEffect } from "react";

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (meal) =>
    setFavorites((prev) =>
      prev.find((m) => m.idMeal === meal.idMeal) ? prev : [...prev, meal]
    );

  const removeFavorite = (id) =>
    setFavorites((prev) => prev.filter((m) => m.idMeal !== id));

  const isFavorite = (id) => favorites.some((m) => m.idMeal === id);

  return (
    <RecipeContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MealCard from "../components/MealCard";

export default function HomePage() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMeals = async (e) => {
    e.preventDefault();
    if (!ingredient.trim()) return;
    setLoading(true);
    setError(null);
    setMeals([]);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      if (res.data.meals) {
        setMeals(res.data.meals);
      } else {
        setError("No recipes found for that ingredient.");
      }
    } catch (err) {
      setError("Something went wrong fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-rose-100 to-pink-50 text-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-extrabold text-orange-600 mb-2">
          🍳 Recipe Ideas
        </h1>
        <p className="text-gray-600">Search recipes by ingredients you have!</p>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <SearchBar
          placeholder="Enter an ingredient (e.g., chicken, tomato)"
          value={ingredient}
          onChange={setIngredient}
          onSubmit={searchMeals}
        />
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && meals.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

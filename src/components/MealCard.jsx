import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
import { Heart } from "lucide-react";

export default function MealCard({ meal }) {
  const { addFavorite, removeFavorite, isFavorite } = useRecipeContext();
  const fav = isFavorite(meal.idMeal);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1 relative">
      <div className="relative w-full h-48 bg-gray-200">
        {/* Placeholder / shimmer */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        )}

        {/* Lazy loaded image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {meal.strMeal}
        </h2>
        <div className="flex justify-between items-center">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="text-orange-600 hover:underline text-sm font-medium"
          >
            View Recipe →
          </Link>
          <button
            onClick={() =>
              fav ? removeFavorite(meal.idMeal) : addFavorite(meal)
            }
            className="text-orange-500 hover:scale-110 transition"
          >
            <Heart fill={fav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}

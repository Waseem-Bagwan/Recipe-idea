import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setRecipe(res.data.meals[0]);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) ingredients.push(`${measure} ${ing}`);
  }

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <Link
            to="/"
            className="text-orange-600 hover:underline text-sm inline-block mb-4"
          >
            ← Back to search
          </Link>
          <h1 className="text-3xl font-bold text-orange-700 mb-3">
            {recipe.strMeal}
          </h1>
          <p className="text-sm text-gray-500 mb-3">
            Category: {recipe.strCategory} | Area: {recipe.strArea}
          </p>

          <h2 className="font-semibold text-lg mt-4 mb-2">🧂 Ingredients:</h2>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <h2 className="font-semibold text-lg mt-6 mb-2">📖 Instructions:</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {recipe.strInstructions}
          </p>

          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-orange-600 hover:underline font-medium"
            >
              ▶ Watch Video Tutorial
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

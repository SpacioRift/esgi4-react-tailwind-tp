import { Clock, CookingPot, Flame, PersonStanding, Timer } from "lucide-react";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import SearchBar from "../../../Component/Public/SearchBar/SearchBar";

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">({rating.toFixed(2)})</span>
        </div>
    )
}

function InstructionList({ instr, details }){
    return(
        <div className="gap-2">
            <p className="text-bold text-gray-900 text-md">{details}</p>
            <ul className="list-decimal">
                {instr.map((instr) => (
                    <li className="text-gray-700" key={instr}>
                        {instr}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function TagList({ tag }){
    return(
        <div className="flex flex-wrap gap-2">
            {tag.map((tag) => (
                <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                {tag}
            </span>
            ))}
        </div>
    )
}

export default function RecipeDetail(){
    
    const [recipe, setRecipe] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/${id}`)
            .then(result => result.json())
            .then(data => setRecipe(data));
    }, [])
    
    return (
        <>
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img 
                        src={recipe.image}
                        alt={recipe.name}
                        className="max-h-96 object-contain rounded-2xl"
                    />
                </div>

                {/* Infos principales */}
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">{recipe.mealType}</p>
                        <h1 className="text-3xl font-bold text-gray-900 mt-1">{recipe.name}</h1>
                    </div>

                    <div>
                        <p className="text-md text-gray-900 font-semibold">difficulté : {recipe.difficulty}</p>
                    </div>

                    {recipe.rating &&
                        <div className="flex flex-row gap-2">
                            <StarRating rating={recipe.rating} />
                            {recipe.tags &&
                                <TagList tag={recipe.tags} />
                            }
                        </div>
                    }

                    <div className="flex items-baseline gap-3">
                        <span className="text-md text-gray-700 flex flex-row gap-1">
                           <PersonStanding size={20} /> {recipe.servings}
                        </span>
                        <span className="text-md text-gray-700 flex flex-row gap-1">
                            <Timer size={20} /> {recipe.prepTimeMinutes} min
                        </span>
                        <span className="text-md text-gray-700 flex flex-row gap-1">
                           <CookingPot size={20} /> {recipe.cookTimeMinutes} min
                        </span>
                        <span className={` ${recipe.caloriesPerServing <= 350 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"} text-sm font-medium px-2 py-1 rounded flex flex-row gap-1`}>
                            <Flame size={20} /> {recipe.caloriesPerServing}
                        </span>
                    </div>

                    {recipe.instructions &&
                        <InstructionList instr={recipe.instructions} details="Instructions :" />
                    }

                    {recipe.ingredients &&
                        <InstructionList instr={recipe.ingredients} details="Ingrédients :" />
                    }

                </div>
            </div>
        </main>
        </>
    )
}
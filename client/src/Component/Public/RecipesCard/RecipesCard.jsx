import { Timer } from 'lucide-react';
import { Link } from 'react-router';


export default function RecipeCard({ recipe }) {
    return (
        <Link to={`/Recipe/${recipe.id}`} className="recipe w-[calc(20%-0.5rem)] bg-white p-4 rounded-md shadow-md flex flex-col h-90 gap-2">
            <div className="name text-center text-md font-medium">{recipe.name}</div>
            <div className="picture h-60 flex justify-center t-2 mb-2">
                <img src={recipe.image} className='h-full rounded-2xl'/>
            </div>
            <div className="prep-time text-left flex flex-row justify-start text-sm">Préparation : <span className='font-medium flex flex-row gap-1'><Timer/> {recipe.prepTimeMinutes} min</span></div>
            <div className="name text-left text-sm">Difficulté : <span className='font-medium'>{recipe.difficulty}</span></div>
        </Link>
    )
}
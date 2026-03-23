import { useState, useEffect } from "react";
import RecipeCard from "../../../Component/Public/RecipesCard/RecipesCard";
import SearchBar from "../../../Component/Public/SearchBar/SearchBar";

export default function RecipesList() {
  const [recipeList, setRecipeList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState(recipeList);

  const handleFilterData = (term) => {
        let keys = Object.keys(recipeList[0]);
        let result = recipeList.filter(item => keys.some(key => item[key].toString().includes(term)));
        setFilterData(result);
    }

  const onScroll = (e) => {
    if (loading) {
      return;
    }
    console.log("scrollTop :" + e.target.scrollTop);
    console.log("scrollAvailable :" + (e.target.scrollHeight - e.target.clientHeight),);
    if (
      e.target.scrollTop + 1 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      setSkip(skip + 15);   
    }
  };

  useEffect(() => {
    setLoading(true);
        fetch(`https://dummyjson.com/recipes/?limit=15&skip=${skip}`)
        .then((result) => result.json())
        .then(data => {
            setLoading(false);
            setRecipeList([...recipeList, ...data.recipes]);
        });

  }, [skip]);

  return(
    <>
        <div className="m-2">
            <SearchBar handleFilterData={handleFilterData}/>
        </div>
        <div className="product-list flex flex-wrap p-4 bg-neutral-100 gap-2 h-[calc(100vh-40px)] overflow-y-auto" onScroll={onScroll}>
            {recipeList.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
            {loading &&
                <>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                </>
            }
        </div>
    </>
  )
}

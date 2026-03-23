import { Search } from "lucide-react";

export default function SearchBar({handleFilterData}){

    return(
        <>
            <div className="tool-bar flex gap-4 px-4">
                <div className="search-bar flex w-full border-2 border-gray-400 p-2 rounded-md">
                    <input type="text" className="w-full outline-none" onKeyUp={(e) => handleFilterData(e.target.value)} />
                    <Search className="cursor-pointer" />
                </div>
            </div>
        </>
    )
}
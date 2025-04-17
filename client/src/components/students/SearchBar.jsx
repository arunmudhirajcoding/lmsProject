import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SearchBar = ({data}) => {
  const navigate = useNavigate()
  const [input, setinput] = useState(data?data:'')
  const onSearchHandler = (e)=>{
    e.preventDefault()
    navigate('/course-list/'+input)
  }
  return (
    
    <form onSubmit={onSearchHandler} className="
      max-w-xl w-full md:h-14
      border-gray-50/20 rounded
      h-12 flex items-center bg-white
    ">
      <span className="flex items-center border w-[40em] h-full rounded-md gap-2 focus-within:border-blue-500">

      <span className="md:w-auto w-10 px-3">
        <FaSearch />
      </span>
        <input onChange={e=>setinput(e.target.value)} value={`${input}`}
          type="search"
          placeholder="Search for courses"
          className="w-full h-full outline-none text-gray-500/80"
          />
          </span>
        <button
          type="submit"
          className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 ml-4 "
          >
          Search
        </button>
      </form>
  );
};

export default SearchBar;


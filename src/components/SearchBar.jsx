import { useState } from "react"
import { Link , useLocation } from "react-router-dom"
import { Button } from "flowbite-react"
function SearchBar() {

  const [query, setQuery] = useState("")
  const [tech, setTech] = useState("")

  return (
  <>
    <form>
      <input
      type="text"
      placeholder="Search for Friends"
      value={query}
      onChange={() => setQuery(event.target.value)}
      />
      <Link to={`/search`} state={{query:query}} >
      <button>Search</button>
      </Link>
    </form>
    <form>
      <input
      type="text"
      placeholder="Search for Techs"
      value={tech}
      onChange={() => setTech(event.target.value)}
      />
      <Link to={`/tech/${tech}`}>
      <button>Search</button>
      </Link>
    </form>
  </>
  )
}

export default SearchBar
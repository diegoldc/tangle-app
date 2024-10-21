import { useLocation , Link } from 'react-router-dom'
import service from '../services/config'
import { useState , useEffect } from 'react'
import { Card , Avatar } from 'flowbite-react'

function FilterPage() {

  const location = useLocation()
  const { query } = location.state
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const response = await service.get(`/users/find?username=${query}`)
      setUsers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("error al traer el query",error)
    }
  }

  if(users === null){
    return <div>...spinner</div>
  }


  return (
    <Card>
      <h1>Results for: "{query}"</h1>
      <div className='flex wrap gap-5'>
      {users.length===0 ? (
        
        <p>There's no users with that name</p>
        
      ) : users.map((user,index) => {
        return(
          <Link to={`/profile/${user._id}`}>
          <Card key={index}>
            <Avatar rounded img={user.img} />
            <h2>{user.username}</h2>
          </Card>
          </Link>
        )
      })}
      </div>
    </Card>
  )
}

export default FilterPage
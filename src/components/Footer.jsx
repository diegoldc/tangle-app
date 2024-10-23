import {Link} from "react-router-dom";
function Footer() {
  return (
    <footer>        
      <Link to="/about" >About us</Link>
      <Link to="https://github.com/diegoldc/tangle-server" >Server Repo</Link>
      <Link to="https://github.com/diegoldc/tangle-app" >Client Repo</Link>
    </footer>
  )
}

export default Footer
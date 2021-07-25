import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()

  const renderList = ()=>{
    if(state){
      console.log(state)
      return[
        <li className="nav-item">
          <Link key="profile" className="nav-link" to="/profile">Profile</Link>
        </li>,
        <li key="postear" className="nav-item">
          <Link className="nav-link" to="/createpost">postear</Link>
        </li>,
        <li key="exit" className="nav-item">
           <Link className="nav-link" onClick={()=>{
             localStorage.clear();
             dispatch({type:"CLEAR"})
             history.push('/login')
           }}>Logout</Link>
        </li>
        ]
    }else{
      return [
        <li key="login" className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li key="signup" className="nav-item">
          <Link className="nav-link" to="/signup">signup</Link>
        </li>
      ]
    }
  }

	return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  			<Link className="navbar-brand" to={state?"/":"/signin"}>social network</Link>
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
  			</button>
  			<div className="collapse navbar-collapse" id="navbarText">
    			<ul className="navbar-nav mr-auto">
      				<li className="nav-item active">
        				<Link className="nav-link" to={state?"/":"/login"}>Home</Link>
      				</li> 
              {renderList()}     				
    			</ul>
    			<span className="navbar-text">
      				
    			</span>
  			</div>
		</nav>
	)
}

export default NavBar;
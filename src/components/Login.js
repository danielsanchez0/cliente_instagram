import React,{useState,useContext} from 'react'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Loader from "react-loader-spinner"

const Login = ()=>{
	const {state,dispatch} = useContext(UserContext)
	const history = useHistory();
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [loading,setLoading] = useState(true)

	const Toast = Swal.mixin({
  		toast: true,
  		position: 'top-end',
  		showConfirmButton: false,
 		timer: 3000,
  		timerProgressBar: true,
  		didOpen: (toast) => {
    		toast.addEventListener('mouseenter', Swal.stopTimer)
    		toast.addEventListener('mouseleave', Swal.resumeTimer)
  		}
	});

	const signin = ()=>{
		setLoading(false)
		fetch("/auth/signin",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				email,
				password
			})
		}).then(res=>res.json()).then(data=>{
			if(data.error){
				Swal.fire({
  					icon: 'error',
  					title: 'Oops...',
  					text: 'Something went wrong!',
  					footer: '<a href="">Why do I have this issue?</a>'
				})
			} else{

				localStorage.setItem("jwt",data.token)
				localStorage.setItem("user",JSON.stringify(data.user))
				dispatch({type:"USER",payload:data.user})

				Toast.fire({
  					icon: 'success',
  					title: 'Signed in successfully'
				})

				setLoading(true)
				history.push('/')
			}
		})
	}

	return(
		loading?
		<div className="container padding-ventana">
			<div className="row">
				<div className="col-md-6 center-img">
					<img src="http://www.ucaldas.edu.co/docs/Web%20Relaciones%20Internacionales/images/logo.gif" />
				</div>
				<div className="col-md-6 card">
					<div className="card-body">
						<div className="form-group">
							<label>correo electronico: </label>
							<input 
								className="form-control" 
								type="text" 
								placeholder="email"
								value={email}
								onChange={(e)=>setEmail(e.target.value)}
								/>

							<label>contraseña: </label>
							<input 
								className="form-control" 
								type="password" 
								placeholder="password"
								value={password}
								onChange={(e)=>setPassword(e.target.value)}
								/>
							<hr/>
							<button 
								className="btn btn-primary"
								onClick={()=>signin()}
								>Ingresar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		:<Loader
			className="centrar"
       		type="TailSpin"
        	color="#00BFFF"
        	height={100}
        	width={100}
      	/>
	)
}

export default Login;
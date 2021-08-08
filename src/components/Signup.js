import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import Swal from 'sweetalert2' 

const Signup = ()=>{
	const history = useHistory()
	const [name,setName] = useState("")
	const [password,setPassword] = useState("")
	const [email,setEmail] = useState("")
	const [image,setImage] = useState("")
	const [url,setUrl] = useState("")

	useEffect(()=>{
		if(url){
			uploadFields()
		}
	},[url])

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
	})

	const uploadPic = ()=>{
		const data = new FormData()
		data.append("file",image)
		data.append("upload_preset","voo4bmtg")
		data.append("cloud_name","dun3q6j0s")

		fetch("	https://api.cloudinary.com/v1_1/dun3q6j0s/image/upload",{
			method:"post",
			body:data
		}).then(res=>res.json())
		.then(data=>{
			setUrl(data.url)
		})
		.catch(err=>{
			console.log(err)
		})
	}

	const uploadFields = ()=>{
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			Swal.fire({
  				icon: 'error',
  				title: 'Oops...',
  				text: 'formato de correo es invalido',
  				footer: '<a href="">Why do I have this issue?</a>'
			})

			return
		}

		fetch("/auth/signup",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				name,
				email,
				password,
				pic:url
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
				Toast.fire({
  					icon: 'success',
  					title: 'Signed in successfully'
				})

				history.push('/signup')
			}
		})
	}

	const postData = ()=>{
		if(image){
			uploadPic()
		}else{
			uploadFields()
		}
	}

	return(
		<div className="container padding-ventana">
			<div className="row">
				<div className="col-md-6 center-img">
					<img src="http://www.ucaldas.edu.co/docs/Web%20Relaciones%20Internacionales/images/logo.gif" />
				</div>

				<div className="col-md-6 card mx-auto">
					<div className="card-body">
						<div className="form-group">
							<label>nombre completo:</label>
							<input 
								className="form-control" 
								type="text" 
								placeholder="ingresa tu nombre completo"
								value={name}
								onChange={(e)=>setName(e.target.value)}
							/>

							<label>correo electronico</label>
							<input 
								className="form-control"
								type="text" 
								placeholder="ingresa tu email"
								value={email}
								onChange={(e)=>setEmail(e.target.value)}
							/>

							<label>contraseña</label>
							<input 
								className="form-control" 
								type="password" 
								placeholder="ingresa tu contraseña"
								value={password}
								onChange={(e)=>setPassword(e.target.value)}
								/>

							<label>Foto De Perfil</label>
							<input 
								className="form-control" 
								type="file"
								onChange={(e)=>setImage(e.target.files[0])}
							/>
							<hr/>
							<button 
								className="btn btn-primary"
								onClick={()=>postData()}>Login
							</button>
							<h5><Link to="/signin">¿ya tengo cuenta?</Link></h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup;
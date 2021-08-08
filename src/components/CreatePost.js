import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import Loader from "react-loader-spinner"
import {useHistory} from 'react-router-dom'

const CreatePost = ()=>{
	const history = useHistory()
	const [title,setTitle] = useState("")
	const [body,setBody] = useState("")
	const [image,setImage] = useState("")
	const [url,setUrl] = useState("")
	const [loading, setLoading] = useState(true)

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

	useEffect(()=>{
		if(url){
			fetch("/post/createpost",{
				method:"post",
				headers:{
					"Content-Type":"application/json",
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				},
				body:JSON.stringify({
					title,
					body,
					pic:url
				})
			}).then(res=>res.json()).then(data=>{
				if(data.error){
					Toast.fire({
	  					icon: 'error',
	  					title: 'Error'
					})
				} else{
					setLoading(true)
					history.push('/profile')
				}	
			})
		}
	},[url])

	const postDetails = ()=>{
		setLoading(false)
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

	return(
		loading?
		<div className="row padding-ventana">
			<div className="col-md-6 card mx-auto">
				<div className="card-header">
					Publica Tu Problema.
				</div>
				
				<div className="form-group">
				<div className="card-body">
					<label>asunto:</label>
					<input 
						className = "form-control"
						type="text"
						placeholder="escribe el asunto"
						value={title}
						onChange={(e)=>setTitle(e.target.value)}
					/>

					<label>descripción:</label>
					<input
						className = "form-control"
						type="text" 
						placeholder="describe tu problema"
						value={body}
						onChange={(e)=>setBody(e.target.value)}
					/>

					<div>
						<span>Evidencia:</span>
						<p>por favor, sube una fotografia.</p>
						<input 
							type="file"
							onChange={(e)=>setImage(e.target.files[0])}
						/>
					</div>
				</div>

					<div className="card-footer">
						<button 
							className="btn btn-primary"
							onClick={()=>postDetails()}
						>
							submit post
						</button>
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

export default CreatePost;
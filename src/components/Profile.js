import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import Loader from "react-loader-spinner"

const Profile = ()=>{
	const [data,setData] = useState([])
	const {state,dispatch} = useContext(UserContext)
	const [image,setImage] = useState("")
	const [loading,setLoading] = useState(true)
	
	useEffect(()=>{
		fetch("/post/mypost",{
				headers:{
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				setData(result.myposts)
				setLoading(false)
			})
		},[])

	useEffect(()=>{
		if(image){
			const data = new FormData()
			data.append("file",image)
			data.append("upload_preset","voo4bmtg")
			data.append("cloud_name","dun3q6j0s")

			fetch("https://api.cloudinary.com/v1_1/dun3q6j0s/image/upload",{
				method:"post",
				body:data
			}).then(res=>res.json()).then(data=>{
				//localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
				//dispatch({type:"UPDATEPIC",payload:data.url})

				console.log(data.url)
				fetch("/user/updatepic",{
					method:"put",
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer "+localStorage.getItem("jwt")
					},
					body:JSON.stringify({
						pic:data.url
					})
				}).then(res=>res.json())
				.then(result=>{
					console.log(result)
					localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
					dispatch({type:"UPDATEPIC",payload:data.url})
				})

			}).catch(err=>{
				console.log(err)
			})
		}
	},[image])

	const updatePic = (file)=>{
		setImage(file)
	}

	return(
		<div style={{maxWidth:"550px",margin:"0px auto"}}>
			<div>
				<div style={{display:"flex",
					justifyContent: "space-around",
					margin: "18px 0px",
					borderBottom:"1px solid grey"}}>

					<div>
						<img style={{width:"160px",height:"160px",borderRadius:"80px"}}
							src={state?state.pic:"loading"}
						/>
					</div>
						
					<div>
						<h4>{state?state.name:"loading"}</h4>
						<div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
							<h6>{data.length} post</h6>
							<h6>{state?state.followers.length:"0"} followers</h6>
							<h6>{state?state.following.length:"0"} following</h6>
						</div>
					</div>
				</div>

					<input  
						className="btn btn-success"
						type="file"
						onChange={(e)=>updatePic(e.target.files[0])}
					/>

				<br/>
			</div>

			{
				loading?
				<Loader
					className="centrar"
		       		type="TailSpin"
		        	color="#00BFFF"
		        	height={100}
		        	width={100}
		        	timeout={3000}
      			/>
				:
				<div className="gallery">
					{
						data.map(item=>{
							return(
								<img className="item" src={item.photo} key={item._id} alt={item.titulo}/>
							)
						})
					}
				</div>
			}
		</div>
	)
}

export default Profile;
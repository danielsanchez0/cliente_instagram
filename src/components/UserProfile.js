import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'

const UserProfile = ()=>{
	const [userProfile,setProfile] = useState(null)
	const [data,setData] = useState([])
	const {state,dispatch} = useContext(UserContext)
	const {userid} = useParams()
	const [showfollow,setShowfollow] = useState(state?!state.following.includes(userid):true)

	useEffect(()=>{
		fetch('/user/user/'+userid,{
				headers:{
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				setProfile(result)
			})
		},[])


	const followUser = ()=>{
		fetch('/user/follow',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				followId:userid
			})
		}).then(res=>res.json()).then(data=>{
			console.log(data)
			dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
			localStorage.setItem("user",JSON.stringify(data))

			setProfile((prevState)=>{
				return{
					...prevState,
					user:{
						...prevState.user,
						followers: [...prevState.user.followers,data._id]
					}
				}
			})

			setShowfollow(false)

		})
	}

	const unfollowUser = ()=>{
		fetch('/user/unfollow',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				unfollowId:userid
			})
		}).then(res=>res.json()).then(data=>{
			console.log(data)
			dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
			localStorage.setItem("user",JSON.stringify(data))

			setProfile((prevState)=>{
				const newFollower = prevState.user.followers.filter(item=>item != data._id)
				return{
					...prevState,
					user:{
						...prevState.user,
						followers: newFollower
					}
				}
			})

			setShowfollow(true)
		})
	}

	return(
		<>
		{
			userProfile ?

			<div style={{maxWidth:"550px",margin:"0px auto"}}>
			<div style={{display:"flex",
			justifyContent: "space-around",
			margin: "18px 0px",
			borderBottom:"1px solid grey"}}>

				<div>
					<img style={{width:"160px",height:"160px",borderRadius:"80px"}}
					src={userProfile.user.pic}
					/>
				</div>

				<div>
					<h4>{userProfile.user.name}</h4>
					<div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
						<h6>{userProfile.posts.length}</h6>
						<h6>{userProfile.user.followers.length} followers</h6>
						<h6>{userProfile.user.following.length} following</h6>
					</div>

					{

					showfollow?
					<button className="btn btn-primary" onClick={
						()=>{
							followUser()
						}
					}>
					follow</button>
					:
					<button className="btn btn-primary" onClick={
						()=>{
							unfollowUser()
						}
					}>
					unfollow</button>

					}
				</div>
			</div>

				<div className="gallery">
					
					{
						userProfile.posts.map(item=>{
							return(
								<img className="item" src={item.photo} key={item._id} alt={item.titulo}/>
							)
						})
					}
				</div>
		</div>

		 : <span className="spinner"></span>

		}
		
		</>
	)
}

export default UserProfile;
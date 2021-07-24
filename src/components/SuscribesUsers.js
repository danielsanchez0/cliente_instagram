import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'

const SuscribesUsers = ()=>{
	const [data,setData] = useState([])
	const {state,dispatch} = useContext(UserContext)

	useEffect(()=>{
		fetch("/post/getsubpost",{
				headers:{
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				setData(result.posts)
			})
		},[])

	const likePost = (id)=>{
		fetch('/post/like',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId:id
			})

		}).then(res=>res.json())
			.then(result=>{
				console.log(result)

				const newData = data.map(item=>{
					if(item._id==result._id){
						return result
					}else{
						return item
					}
				})

				setData(newData)
			}).catch(err=>{
				console.log(err)
			})
	}

	const unlikePost = (id)=>{
		fetch('/post/unlike',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId:id
			})

		}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				const newData = data.map(item=>{
					if(item._id==result._id){
						return result
					}else{
						return item
					}
				})

				setData(newData)
			}).catch(err=>{
				console.log(err)
			})
	}

	const makeComment = (text,postId)=>{
		fetch('/post/comment',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId,
				text
			})
		}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				const newData = data.map(item=>{
					if(item._id==result._id){
						return result
					}else{
						return item
					}
				})

				setData(newData)
			}).catch(err=>{
				console.log(err)
			})
	}

	const deletePost = (postid)=>{
		console.log(postid)
		fetch('/post/deletepost/'+postid,{
			method:"delete",
			headers:{
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				const newData = data.filter(item=>{
					return item._id != result._id
				})

				setData(newData)
			}).catch(err=>{
				console.log(err)
			})
	}

	return(
		<div className="home">
			{
				data.map(item=>{
					return(
						<div className="card home-card" key={item._id}>
							<h5>
								<Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
								{
									item.postedBy._id == state._id &&
									<i className="bi bi-trash" style={{float:"right"}} onClick={()=>deletePost(item._id)}></i>
								}
							</h5>


							<div className="card-image">
								<img src={item.photo} className="imagen"/>
							</div>

							<div className="card-content">
								<h4>
								{
									
									item.likes.includes(state._id)
									?
									<i 
										className="bi bi-hand-thumbs-down"
										onClick={()=>{unlikePost(item._id)}}>
									</i>
									:
									<i 
										className="bi bi-hand-thumbs-up"
										onClick={()=>{likePost(item._id)}}>
									</i>
								
								}
								</h4>
								<h6>{item.likes.length} likes</h6>
								<h6>{item.title}</h6>
								<p>{item.body}</p>
								{
									item.comments.map(record=>{
										return (
											<h6 key={record._id}>
												<span style={{fontWeight:"500"}}>
													{record.postedBy.name}
												</span> {record.text}
											</h6>
										)
									})
								}
								<form onSubmit={(e)=>{
									e.preventDefault()
									makeComment(e.target[0].value,item._id)
								}}>
									<input className="form-control" type="text" placeholder="add a coment"/>
								</form>
							</div>
						</div>
					)
				})
			}
			
		</div>
	)}

export default SuscribesUsers;
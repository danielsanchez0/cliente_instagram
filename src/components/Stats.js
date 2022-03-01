import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

const Stats = ()=>{
	const [data,setData] = useState([])
	const {state,dispatch} = useContext(UserContext)
	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		fetch("/user/stats",{
				headers:{
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				setData(result.posts)
				setLoading(false)
			})
	},[])

	return(
		<div className="home">
			{
				loading?<Loader
					className="centrar"
       				type="TailSpin"
        			color="#00BFFF"
        			height={100}
        			width={100}
      			/>:
				data.map(item=>{
					return(
						<div style={{display:"flex",
							justifyContent: "space-around",
							margin: "18px 0px",
							borderBottom:"1px solid grey"}}>
							<div>
								<img style={{width:"40px",height:"40px",borderRadius:"20px"}}
								src={item._id.pic}
								/>
							</div>	
							<div>
								<Link to={item._id.id !== state._id?"/profile/"+item._id.id:"/profile"}>{item._id.name}</Link>
								<div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
									{item.count} preguntas
								</div>
							</div>
						</div>	
					)
				})
			}			
		</div>
	)
}

export default Stats;
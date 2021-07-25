import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import Loader from "react-loader-spinner"
import {useHistory,Link} from 'react-router-dom'

const Inicio = ()=>{
	const history = useHistory()
	const [data, setData ] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		fetch("/entry/allentries",{
				headers:{
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				console.log(result.entries)
				setData(result.entries)
				setLoading(false)
			})
	},[]) 

	return(
		loading?
		<Loader
			className="centrar"
       		type="TailSpin"
        	color="#00BFFF"
        	height={100}
        	width={100}
      	/>:
		<div className="row">
			<div className="col-md-6 card mx-auto">
			{
				data.map(item=>{
					return(
						<Link key="{item._id}" to={'/entry/'+item._id}>{item.title}</Link>
					)
				})
			}
			</div>
		</div>
	)
}

export default Inicio;
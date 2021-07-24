import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link,useParams,useHistory} from 'react-router-dom'
import Loader from "react-loader-spinner"

const Entry = ()=>{
	const [entry,setEntry] = useState(null)
	const [data,setData] = useState([])
	const {state,dispatch} = useContext(UserContext)
	const {entryid} = useParams()
	const [loading, setLoading] = useState(true)
	const history = useHistory()

	const [texto,setTexto] = useState("")
	const [image,setImage] = useState("")

	useEffect(()=>{
		fetch('/entry/entry/'+entryid,{
				headers:{
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				setEntry(result)
				setLoading(false)
				
			})
	},[])

	const makeStep = ()=>{
		setLoading(true);
		fetch('/entry/addstep',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				entryId:entryid,
				text:texto,
				img:image
			})
		}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				setEntry(result)
				setLoading(false);
				
			}).catch(err=>{
				console.log(err)
			})
	};

	return(	
		loading?<Loader
					className="centrar"
       				type="TailSpin"
        			color="#00BFFF"
        			height={100}
        			width={100}
      			/>:

		<div style={{maxWidth:"550px",margin:"0px auto"}}>
			<div style={{display:"flex",
			justifyContent: "space-around",
			margin: "18px 0px",
			borderBottom:"1px solid grey"}}>

				<div>
					<h1>{entry.entry.title}</h1>
				</div>
			</div>

			<div className="col-md-12">
				<div className="form-group">
					<input 
						className = "form-control"
						type="text"
						placeholder="descripcion"
						value={texto}
						onChange={(e)=>setTexto(e.target.value)}
					/>

					<input
						className = "form-control"
						type="url" 
						placeholder="direccion de imagen"
						value={image}
						onChange={(e)=>setImage(e.target.value)}
					/>

					<button 
						className="btn btn-primary"
						onClick={()=>makeStep()}>
						submit post
					</button>
				</div>
			</div>

			{
				entry.entry.steps.map(item=>{
					return(
						<div>
							<p>{item.text}</p>
							<img className="item" src={item.photo} key={item._id} alt={item.titulo}/>
						</div>
					)
				})
			}
		</div>
	)}

export default Entry;
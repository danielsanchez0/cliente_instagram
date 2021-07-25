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
	const [label,setLabel] = useState("")

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

	const makeLabel = ()=>{
		fetch('/entry/addlabel',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization": "Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				entryId:entryid,
				label:label,
			})
		}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				setEntry(result)
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

					etiquetas: 
					{
						entry.entry.labels.map(item=>{
							return(
								<span className="etiqueta">{item.text}</span>
							)
						})
					}
					
				</div>

				<br />

				<form onSubmit={(e)=>{
					e.preventDefault()
					makeLabel()}}>
					<input className="form-control" type="text" placeholder="add a label"
					onChange={(e)=>setLabel(e.target.value)}
					/>
				</form>
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

					<br />

					<input
						className = "form-control"
						type="url" 
						placeholder="direccion de imagen"
						value={image}
						onChange={(e)=>setImage(e.target.value)}
					/>

					<br />

					<button 
						className="btn btn-primary"
						onClick={()=>makeStep()}>
						submit post
					</button>
				</div>
			</div>

			<br />
			{
				entry.entry.steps.map(item=>{
					return(
						<div>
							<p>{item.text}</p>
							<img className ="image-entry" src={item.photo} key={item._id} alt={item.titulo}/>
							<br />
						</div>
					)
				})
			}
		</div>
	)}

export default Entry;
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
				<div>
					<section id="home__section">
				        <div class="container-fluid">
				            <div class="row">
				                <div class="col-md-12">
				                    <div class="home__section__content text-center">
				                        <h1 class=" fs-3">
				                            Servicio De Ayuda, Universidad De Caldas.
				                        </h1>
				                        <a href="#section__two"><i class="down__arrow fas fa-angle-down"></i></a>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </section>

				    <section id="section__two">
					    <div class="container-fluid">
					        <div class="row">
					            <div class="col-md-4 offset-md-4 my-5">
					                <div class="manzel__solution text-center">
					                    <h3 class="fw-bold">Servicio De Ayuda.</h3>
					                    <p class="text-muted">Consulta cualquier problemas que tengas con el uso del nuevo SIA.</p>
					                    <button class="footer_button_custom btn btn-warning fw-bold col-8 py-2">LEARN MORE</button>
					                </div>
					            </div>
					        </div>
					    </div>
		    		</section>
	    		</div>

			
        		<div className="container-fluid">
            		<div className="row">
                		<div className="col-md-4 offset-md-4 my-5">
                    		<div className="manzel__solution text-center">
                        		<h3 className="fw-bold">Preguntas Frecuentes.</h3>
                    		</div>
                		</div>
            		</div>
	        		<div className="row">
	            		<div className="col-md-5">
	                		<img src="https://res.cloudinary.com/dun3q6j0s/image/upload/v1627247242/vwxt2ezdnpprmr5yazvi.png" className="img-fluid img-ask" alt=""/>
	            		</div>
	            		<div class="col-md-7">
	                		<div class="form-group div-x">
		                    	<label for="">pregunta:</label>
		                    	<input type="text" name="" className="form-control" placeholder="escribe tu pregunta" />
		                    
		                    	<button className="btn btn-primary btn-large btn-ask">preguntar</button>
	                		
		                    	{
									data.map(item=>{
										return(
											<li>
											<Link key={item._id} to={'/entry/'+item._id}>{item.title}</Link>
											</li>
										)
									})
								}
	                		</div>
	            		</div>
	        		</div>
    			</div>

				<div className="container">
            		<div className="row text-center text-md-start">
                		<div className="col-md-4 offset-md-1">
                    		<div className="manzel__app ">
                        		<div className="mt-5 pt-5">
                            	<h3 className="fw-bold">Servicio De Ayuda.</h3>
                            	<p className="text-muted">Consulta cualquier problemas que tengas con el uso del nuevo SIA.</p>
                            	<button class="footer_button_custom btn btn-warning fw-bold col-8 py-2">LEARN MORE</button>
                            	<div className="d-flex justify-content-center justify-content-md-start my-4">

                                <img src="https://res.cloudinary.com/dun3q6j0s/image/upload/v1627249425/khz8pvzrtpkedwb1nq3i.png" className="img-fluid social__img" alt="" />

                                <img src="https://res.cloudinary.com/dun3q6j0s/image/upload/v1627249423/q8r9hqjqq3nzpcseufvg.png" className="img-fluid social__img" alt="" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 offset-md-2 ">
                    <div className="manzel__app custom__margin">
                        <img src="https://res.cloudinary.com/dun3q6j0s/image/upload/v1627249349/xcyix3cbqtfdqtmfnbml.png" className="img-fluid " alt="" />
                    </div>
                </div>
            </div>
        </div>
				
		</div>
	)
}

export default Inicio;
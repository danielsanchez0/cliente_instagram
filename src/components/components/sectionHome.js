import React from 'react'

const sectionHome = ()=>{
	return(
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
	)
}

export default sectionHome;
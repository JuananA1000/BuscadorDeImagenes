import { Form, Field, Formik } from 'formik';
import { useState } from 'react';

import './header.css';
import './content.css';
import './article.css';

function App() {
    const [imagenes, setImagenes] = useState([]);

    const abrir = (url) => window.open(url);

    console.log({ imagenes });

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Buscador de Imágenes</h1>
            <header>
                <Formik
                    initialValues={{ busqueda: '' }}
                    onSubmit={async (valores) => {
                        /*
                            En esta función haremos una llamada a la API
                            unsplash.com el cual es un proveedor de imágenes
                        */

                        const respuesta = await fetch(
                            `https://api.unsplash.com/search/photos?per_page=20&query=${valores.busqueda}`,
                            {
                                headers: {
                                    Authorization:
                                        'Client-ID zPLRRIb-vyVCQYbW2BC6EJhzmLcQx2xlwX8uq21NMao',
                                },
                            }
                        );
                        const data = await respuesta.json();
                        setImagenes(data.results);
                    }}>
                    <Form>
                        <Field name='busqueda' />
                    </Form>
                </Formik>
            </header>
            <div className='container'>
                <div className='center'>
                    {imagenes.map((imagen) => (
                        <article
                            key={imagen.id}
                            onClick={() => abrir(imagen.links.html)}>
                            {/* 
                                    'urls.regular' se encuentra en las propiedades
                                    de las imagenes al inspeccionar con F12
                                */}
                            <img src={imagen.urls.regular} />
                            <p>
                                {[
                                    imagen.description,
                                    imagen.alt_description,
                                ].join(' - ')}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

// Access Key Unsplash: zPLRRIb-vyVCQYbW2BC6EJhzmLcQx2xlwX8uq21NMao

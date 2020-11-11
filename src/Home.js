import React from 'react'
import './Home.css'
import Product from './Product'
import Cube from './cube.jpg'


function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img className='home__image' src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWphase3/V4/Phase3_Rec_PC_Hero_ENGLISH_2X._CB417897481_.jpg" alt=""/>
                <div className="home__row">
                    <Product id='1' title='The Rubic Cube' price={200} image={Cube} rating={4} />
                    <Product id='2' title='Local Cube' price={199.99} image={Cube} rating={3} />
                </div>
                <div className="home__row">
                    <Product id='3' title='Mele me milne wala Cube' price={30} image={Cube} rating={3} />
                    <Product id='4' title='Local Cube' price={48.00} image={Cube} rating={3} />
                    <Product id='5' title='Local Cube' price={30} image={Cube} rating={3} />
                </div>
                <div className="home__row">
                    <Product id='6' title='Original' price={600} image={Cube} rating={5} />
                </div>
            </div>
        </div>
    )
}

export default Home

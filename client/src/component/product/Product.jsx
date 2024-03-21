import React, { useState } from 'react'
import img from '../../assets/react.svg'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
const Product = () => {
    const [preferenceId,setPreferenceId] = useState(null)
    initMercadoPago('TEST-05c8acc1-bd71-406f-a358-f956727071e5',{
        locale:"es-AR",
    })
    const preferentCena = async () => {
        try{
            const response = await axios.post("http://localhost:3000/create_preference",{
                title:"Entrada Cena",
                quantity: 1,
                price:20000,
            });
            const {id} = response.data;
            return id;
        }catch(error){
            console.log(error)
            console.log("malisimo")
        }
    }
    const buyCena = async () =>{
        const id = await preferentCena();
        if(id){
            setPreferenceId(id);
        }
    }

    return (
        <div>
            <div className='cardProduct'>
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <h2>Entrada Cena</h2>
                    <p>$20000</p>
                </div>
                <button onClick={buyCena}>Comprar</button>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId,redirectMode:"blank" }}/>}
            </div>
        </div>
    )
}

export default Product

import  {MercadoPagoConfig,Preference} from 'mercadopago'
import cors from 'cors';
import express from "express"

const client = new MercadoPagoConfig({
    accessToken:"TEST-8314126376992759-031916-06c9df0b0312f0323802f9209f642e9d-160297955",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.post('/create_preference', async (req,res)=>{
    try{
        const body = {
            items:[
                {
                    title:req.body.title,
                    quantity:Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id:"ARS",
                },
            ],
            back_urls:{
                success:"https://www.google.com.ar/",
                failure:"https://www.google.com.ar/",
                pending:"https://www.google.com.ar/",
            },
            auto_return:"approved",
        }
        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "error al crear la preferencia"
        })
    }
})

app.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})


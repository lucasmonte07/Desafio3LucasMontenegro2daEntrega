import express from 'express';
import ProductManager from './Components/files.js';

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const producto = new ProductManager();
const traeTodos = producto.leeTodos();

app.get('/', (req, res) => {
    res.send("Esta es mi pagina de inicio");        
})

app.get('/productos', async (req, res) => {    
    let limite = parseInt(req.query.limit);    
    if(!limite) return res.send(await traeTodos);
    let todos = await traeTodos;
    let algunos = todos.slice(0, limite);
    res.send(await algunos);
})

app.get('/productos/:id', async (req, res) => {
    let todos = await traeTodos;
    let queProducto = todos.find(prod => prod.id === parseInt(req.params.id));
    res.send(await queProducto)
})

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})


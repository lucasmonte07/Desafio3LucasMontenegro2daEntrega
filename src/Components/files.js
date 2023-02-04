
import {promises as fs} from 'fs';

export default class ProductManager {

    constructor() {
        this.file = "./archivo.txt";
        this.products = [];        
    }

    static id = 1;	
    
    addProduct = async(title, description, price, thumbnail, code, stock) => {                
        
        let duplicado = false;
        let vacio = false;

        for(let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code) {
                console.log(`El código ${code} ingresado ya existe`);
                duplicado = true;
            } 
        } 

        const nuevoIngreso = {title, description, price, thumbnail, code, stock};
        if(Object.values(nuevoIngreso).includes(undefined)) {        
           console.log(`Alguno de los campos enviados esta vacio`);
           vacio = true;
        }     

        if(duplicado == false && vacio == false) {
           this.products.push({...nuevoIngreso, id:ProductManager.id});
           ProductManager.id++;
        
           await fs.writeFile(this.file, JSON.stringify(this.products));        
        }          
    }    

    leeTodos = async () => {
        let leeTodo = await fs.readFile(this.file, "utf-8")
        return JSON.parse(leeTodo);
    }    
    
    getProduct = async () => {    
        let resultado = await this.leeTodos();    
        return console.log(resultado);    
    }     

    getProductById = async(id) => {        
        let resultado = await fs.readFile(this.file, "utf-8");
        let caso = JSON.parse(resultado);
        if(caso.find(products => products.id === id)) {
           console.log(caso.find(products => products.id === id)); 
        } else {
            console.log("El Producto especificado no se encuentra en la base");                
        }        
    }        

    deleteProductById = async (id) => {  
        let resultado8 = await fs.readFile(this.file, "utf-8");
        let caso = JSON.parse(resultado8);
        let quedan = caso.filter(products => products.id != id);
        await fs.writeFile(this.file, JSON.stringify(quedan));
        console.log("El producto, ha sido eliminado");
    }

    updateProductById = async ({ id, ...productox }) => {        
        //CODIGO ACTUAL MODIFICADO
        let todas = await this.leeTodos();    
        if(todas.some(pr => pr.id == id)) {    
            let indice = todas.findIndex(pro => pro.id == id);
            todas[indice].title = productox.title;            
            todas[indice].description = productox.description;
            todas[indice].price = productox.price;
            todas[indice].thumbnail = productox.thumbnail;
            todas[indice].code = productox.code;
            todas[indice].stock = productox.stock;        
            await fs.writeFile(this.file, JSON.stringify(todas));
            return console.log("producto modificado");        
        } else {        
            return console.log("producto no encontrado");      
        }
        
        /* ANTERIOR QUE ELIMINABA EL PRODUCTO
        let idpro = productox.id;
        await this.deleteProductById(idpro);
        let resultados = await fs.readFile(this.file, "utf-8");
        let quedaban = JSON.parse(resultados);        
        let nvoArray = [];
        nvoArray.push(productox, quedaban);
        await fs.writeFile(this.file, JSON.stringify(nvoArray));
        console.log("El producto ha sido modificado");                
        */
    } 
}

//creo producto conforme a ProductManager
//const producto = new(ProductManager);

/*
// cargo tres productos correctos sin falta de datos ni repeticiones
producto.addProduct('Adidas', 'Aero', 24000, 'image', 'ABC122', 25);
producto.addProduct('Adidas', 'Sport', 25250, 'image', 'ABC123', 14);
producto.addProduct('Adidas', 'Cobra', 20700, 'image', 'ABC124', 12);
producto.addProduct('Adidas', 'Paris', 21420, 'image', 'ABC125', 42);

producto.addProduct('DC', 'Blur', 30500, 'image', 'ABC127', 10);
producto.addProduct('DC', 'Italy', 28200, 'image', 'ABC128', 12);
producto.addProduct('DC', 'Luxer', 26130, 'image', 'ABC129', 15);
producto.addProduct('DC', 'Prime', 27546, 'image', 'ABC130', 18);

producto.addProduct('Nike', 'Stylus', 20300, 'image', 'ABC132', 42);
producto.addProduct('Nike', 'Normandie', 21700, 'image', 'ABC133', 25);
producto.addProduct('Nike', 'Bruts', 25490, 'image', 'ABC134', 32);
producto.addProduct('Nike', 'Worm', 22000, 'image', 'ABC135', 25);
*/

//envio uno con code repetido, da mensaje y no entra al array.
//producto.addProduct('Puma', 'Oregon', 22500, 'image', 'ABC123', 32);

//envio uno con un elemento faltante, da mensaje y no entra al array.
//producto.addProduct('Olimpus', 'Extremus', 14000, 'image', 'ABC125');

// muestro los productos cargados 
//producto.getProduct();

//busco uno producto existente por id para que muestre su contenido.
//producto.getProductById(1);

//busco un elemento inexistente para que muestre Not Found
//producto.getProductById(8);


// modifico un producto existente

/*
producto.updateProductById({
    title: 'Adidas',
    description: 'Running',
    price: 10000,
    thumbnail: 'image',
    code: 'ABC122',
    stock: 25,
    id: 1
});
*/

// elimino un producto existente.
//producto.deleteProductById(2);
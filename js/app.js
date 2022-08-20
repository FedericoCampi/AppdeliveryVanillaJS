
const Clickbutton = document.querySelectorAll('.button__compra')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
const button = e.target
const item = button.closest('.card')
const itemTitle = item.querySelector('.card-title').textContent;
const itemPrice = item.querySelector('.precio').textContent;
const itemImg = item.querySelector('.card-img-top').src;

const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
}

addItemCarrito(newItem)
}


function addItemCarrito(newItem){

const alert = document.querySelector('.alert')

setTimeout( function(){
    alert.classList.add('hide')
}, 2000)
    alert.classList.remove('hide')

const InputElemnto = tbody.getElementsByClassName('input__elemento')
for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
    carrito[i].cantidad ++;
    const inputValue = InputElemnto[i]
    inputValue.value++;
    CarritoTotal()
    return null;
    }
}
carrito.push(newItem)
renderCarrito()
} 


function renderCarrito(){
tbody.innerHTML = ''
carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `

        <table class="table table-dark">
            <th>
                <td class="first__th"><img src=${item.img} alt=""></td>
                <td class="food" >
                    <h3 class="title">${item.title}</h3>
                    <div class="tipo">
                        <h4>Comida</h4>
                    </div>
                </td>
                <td class="price">
                    <h4>${item.precio}</h4>
                </td>
                <td >
                    
                </td>
                <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn">x</button></td>
            </th>
        </table>

    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
})
CarritoTotal()
}

function CarritoTotal(){
let Total = 0;
const itemCartTotal = document.querySelector('.itemCartTotal')
carrito.forEach((item) => {
const precio = Number(item.precio.replace("$", ''))
Total = Total + precio*item.cantidad
})

itemCartTotal.innerHTML = `Total $${Total}`
addLocalStorage()
}

function removeItemCarrito(e){
const buttonDelete = e.target
const tr = buttonDelete.closest(".ItemCarrito")
const title = tr.querySelector('.title').textContent;
for(let i=0; i<carrito.length ; i++){

if(carrito[i].title.trim() === title.trim()){
    carrito.splice(i, 1)
}
}

const alert = document.querySelector('.remove')

setTimeout( function(){
alert.classList.add('remove')
}, 2000)
alert.classList.remove('remove')

tr.remove()
CarritoTotal()
}

function sumaCantidad(e){
const sumaInput  = e.target
const tr = sumaInput.closest(".ItemCarrito")
const title = tr.querySelector('.title').textContent;
carrito.forEach(item => {
if(item.title.trim() === title){
    sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
    item.cantidad = sumaInput.value;
    CarritoTotal()
}
})
}

function addLocalStorage(){
localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
const storage = JSON.parse(localStorage.getItem('carrito'));
if(storage){
carrito = storage;
renderCarrito()
}
}

var productosFood = [
    {valor: 'pizzaGrande', nombre: 'Pizza grande', product: 1},
    {valor: 'pizzaChica', nombre: 'Pizza chica', product: "2"},
    {valor: 'tarta', nombre: 'Tarta de JyQ', product: 3},
    {valor: 'empanadas', nombre: 'Empanadas', product: 4},
    {valor: 'sandwich', nombre: 'Sandwich', product: 5},
    {valor: 'milanesa', nombre: 'Milanesa', product: 6},
    {valor: 'papas', nombre: 'Papas', product: 6},
    {valor: 'tacos', nombre: 'Tacos', product: 6},
    {valor: 'cocaCola', nombre: 'Coca cola', product: 6},
    {valor: 'cocagrande', nombre: 'Coca Grande', product: 6}
]

var formulario = document.querySelector('#formulario');
var boton = document.querySelector('#boton');
var resultado = document.querySelector('#resultado');

var filtrar = ()=>{
    // console.log(formulario.value);
    resultado.innerHTML = '';

    const texto = formulario.value.toLowerCase();

    for(let producto of productosFood){
        let valor = producto.valor.toLowerCase();
        if(valor.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div class="img__foods" style="display: flex; flex-direction: column; border: 1px solid black;">
            <a aria-current="page">
            <img src="../resources/foods/${producto.valor}.jpg" alt="" width=100% height=200>
            </a>
            <h4 class="title__foods" style="text-align: center; color: white;font-size: 1.5rem; margin-left: 5px;">
            ${producto.nombre}</h4>
            </div>
            `
        }
    }

    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
        <h3>Producto no encontrado</h3>
        `
    }
}

formulario.addEventListener('keyup', filtrar);

filtrar();
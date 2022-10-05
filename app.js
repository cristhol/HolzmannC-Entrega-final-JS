//Se crea la estructura de datos con todas las peliculas

class Productos {
    constructor(nombre, marca, modelo, descripcion, precio, miniatura, foto) {
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.miniatura = miniatura;
        this.foto = foto;
    }
}

const todosLosProductos = [
    new Productos("Notebook", "Hp", "14-dq2029la plata natural 14", "Intel Core i5 1135G7 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 80EUs 1366x768px Windows 10 Home", "152.000", "miniatura-HP", "HP-foto"),
    new Productos("Notebook", "Lenovo", "IdeaPad 15ITL6 arctic grey táctil 15.6", "Intel Core i5 1135G7 12GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 80EUs 1920x1080px Windows 11 Home", "179.999", "minitura-Lenovo", "Lenovo-foto"),
    new Productos("Notebook", "Asus", "VivoBook X512JA slate gray 15.6", "Intel Core i7 1065G7 8GB de RAM 1TB HDD 256GB SSD, Intel Iris Plus Graphics G7 1920x1080px Windows 10 Home", "199.999", "miniatura-Asus VivoBook", "Asus VivoBook-foto"),
    new Productos("Notebook", "Dell", " Inspiron 5510 blue 15.6", "Intel Core i5 11320H 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 96EUs 60 Hz 1920x1080px Windows 11 Home", "283.999", "miniatura-Dell", "Dell-foto"),
];

// Se guarda el array de objetos en el local storage

const todosLosProductosStr = JSON.stringify(todosLosProductos);
localStorage.setItem("CatalogoCompleto", todosLosProductosStr);


//Se declaran variables

let usuario;
let carrito = JSON.parse (localStorage.getItem('ProductosEnCarrito')) || [];
const body = document.querySelector("body");
const botonCarrito = document.querySelector("#botonCarrito");
botonCarrito.addEventListener("click", () => {
    carrito.length != 0 && abrirCarrito();
})


//Se declaran funciones

function validarUsuario(user) {
    let saludo = document.querySelector("#userName");
    saludo.innerHTML = "";
    usuario = user;
    let frase = document.createElement("h2");
    frase.innerHTML = `Bienvenido, <span>${usuario}</span>`;
    saludo.appendChild(frase);
}

function ingresarUsuario() {
    let nombre;
    let pantallaIngreso = document.querySelector("#bienvenida");
    pantallaIngreso.style.display = "block";
    body.style.overflow = "hidden";
    let campo = document.querySelector("#nombreUsuario");
    campo.addEventListener("input", (e) => {
        nombre = e.target.value;
    });
    let ingreso = document.querySelector("#ingresoUsuario");
    ingreso.addEventListener("click", () => {
        campo.value = ""
        cerrarModal(pantallaIngreso);
        nombre != undefined ? nombre : nombre = "usuario";
        validarUsuario(nombre);
    })
}

function setButton(inBtn, addedClass, newId, container, action, reference) {
    let btn = document.createElement("button");
    btn.classList.add(addedClass);
    btn.id = newId;
    btn.innerHTML += inBtn;
    container.appendChild(btn);
    btn.addEventListener("click", () => {
        btn = "";
        action(reference);
    }) 
}

function cerrarModal(param) {
    param.style.display = "none";
    body.style.overflow = "auto";
}

function mostrarProductos() {
    let catalogo = document.getElementById("todasCards");
    while (catalogo.hasChildNodes()) {
        catalogo.removeChild(catalogo.firstChild);
    }
    todosLosProductos.forEach((producto, indice) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<div>
        <img src="./img/${producto.miniatura}.webp" alt="catalogo de productos">
    </div>
    <div class="cardInfo">
        <div class="cardText">
            <p>Marca: ${producto.marca}</p>
            <p>Modelo: ${producto.modelo}</p>
            <p>Precio: ${producto.precio}</p>   
        </div>
    </div>`
        catalogo.appendChild(card)
        card.addEventListener("click", () => {
            mostrarInfo(todosLosProductos, indice)
        })
    })
}




function mostrarInfo(array, indice) {
    const item = array[indice];
    let {
        nombre,
        marca,
        modelo,
        descripcion,
        precio,
        foto
    } = item;
    let modalInfo = document.querySelector("#modalInfoProductos");
    let itemInfo = document.createElement("div");
    itemInfo.classList.add("modalInfoContent");
    modalInfo.innerHTML = "";
    itemInfo.innerHTML = `<div class="divImagen">
    <img src="./img/${foto}.webp" alt="foto">
    </div>
    <div>
        <div>
            <h3>${nombre}</h3>
            <p>Marca: ${marca}</p>
            <p>Modelo: ${modelo}</p>
            <p>Descripcion: ${descripcion}</p>
            <p>Adquirila por $ ${precio}</p>
        </div>
    </div>`
    modalInfo.appendChild(itemInfo);

        let productoEncontradoCarrito = carrito.findIndex((elemento) => {
        return elemento.nombre === item.nombre
    });

    let btnCartText;
    productoEncontradoCarrito === -1 ? btnCartText = "Agregar al carrito" : btnCartText = "Quitar del carrito";

    
    setButton(btnCartText, "botonModal", "btnCart", itemInfo, agregarCarrito, item);
    setButton("Volver", "botonModal", "btnVolver", itemInfo, cerrarModal, modalInfo);

    modalInfo.style.display = "block";
    body.style.overflow = "hidden";
}




function agregarCarrito(item) {
    let productoEncontrado = carrito.findIndex((elemento) => {
        return elemento.nombre === item.nombre
    });

    productoEncontrado === -1 ? carrito.push(item) : carrito.splice(productoEncontrado, 1);

    const carritoStr = JSON.stringify(carrito);
    localStorage.setItem("ProductosEnCarrito", carritoStr);

    modificarContadorCarrito();

    let textoBoton = document.querySelector("#btnCart");
    let btnCartText;
        if (carrito.includes(item)) {
        btnCartText = "Agregar al carrito"
        textoNotificacion = `${item.nombre} fue agregado al carrito`;
        } else {
        btnCartText = "Quitar del carrito"
        textoNotificacion = `${item.nombre} fue quitado del carrito`;
    }
    
    textoBoton.innerHTML = btnCartText;

    mostrarNotificacion(textoNotificacion);
}


function modificarContadorCarrito () {
    let carritoContainer = document.querySelector("#carrito");
    let contadorCarrito = document.createElement("p");
    carritoContainer.innerHTML = ""
    if (carrito.length > 0) {
        contadorCarrito.innerHTML = `${carrito.length}`;
        carritoContainer.appendChild(contadorCarrito);
    }
}

function abrirCarrito() {
    let total = 0
    let modalCart = document.querySelector("#modalCart")
    let modalCarrito = document.querySelector("#modalCarrito");
    modalCarrito.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach((producto) => {
            total = total + producto.precio;
            let modalContent = document.createElement("div");
            modalContent.classList.add("descripcionProducto");
            modalContent.innerHTML = `<img src="./img/${producto.miniatura}.webp" alt="">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>`
            modalCarrito.appendChild(modalContent);
        })
        let montoTotal = document.createElement("div");
        montoTotal.classList.add("montoTotal");
        montoTotal.innerHTML = "";
        montoTotal.innerHTML = `<h4>Total de la compra: $${total}</h4>`
        modalCarrito.appendChild(montoTotal)

        let acciones = document.createElement("div");
        acciones.classList.add("accionesCarrito");
        acciones.innerHTML = "";
        acciones.innerHTML = `<button onClick="finalizarCompra()">Finalizar compra</button>
            <button onClick="cerrarModal(modalCart)">Volver</button>`
        modalCarrito.appendChild(acciones)
    }
    modalCart.style.display = "block";
    body.style.overflow = "hidden";
}

function mostrarNotificacion(notificacion) {
    Toastify({
        text: notificacion,
        duration: 2000,
        gravity: "bottom",
        className: "toastifyNotification",
        style: {
            background: "linear-gradient(to right, #4741A6, #9bbbfce5)",
        }
    }).showToast();
}

function finalizarCompra() {
    modalCarrito.innerHTML = "";
    cerrarModal(modalCart);

    Swal.fire({
        title: 'Estás a un paso de disfrutar del mejor producto',
        text: "¿Confirmar compra?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Volver',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra realizada con exito!',
                'Que disfrutes de tu producto',
                'success'
            )
            carrito = [];
            modificarContadorCarrito();
            const carritoStr = JSON.stringify(carrito);
            localStorage.setItem("ProductosEnCarrito", carritoStr);
        }
    })
}


// Fin de funciones

ingresarUsuario();
mostrarProductos();
modificarContadorCarrito();

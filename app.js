//Se crea la estructura de datos con todos los productos

function Productos(nombre, marca, modelo, descripcion, precio, miniatura, foto) {
    this.nombre = nombre;
    this.marca = marca;
    this.modelo = modelo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.miniatura = miniatura;
    this.foto = foto;

}

const todosLosProductos = [
    new Productos("Notebook", "Hp", "14-dq2029la plata natural 14", "Intel Core i5 1135G7 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 80EUs 1366x768px Windows 10 Home", "152.000", "miniatura-HP", "HP-foto"),
    new Productos("Notebook", "Lenovo", "IdeaPad 15ITL6 arctic grey táctil 15.6", "Intel Core i5 1135G7 12GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 80EUs 1920x1080px Windows 11 Home", "179.999", "minitura-Lenovo", "Lenovo-foto"),
    new Productos("Notebook", "Asus", "VivoBook X512JA slate gray 15.6", "Intel Core i7 1065G7 8GB de RAM 1TB HDD 256GB SSD, Intel Iris Plus Graphics G7 1920x1080px Windows 10 Home", "199.999","miniatura-Asus VivoBook", "Asus VivoBook-foto"),
    new Productos("Notebook", "Dell", " Inspiron 5510 blue 15.6", "Intel Core i5 11320H 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 96EUs 60 Hz 1920x1080px Windows 11 Home", "283.999", "miniatura-Dell","Dell-foto"),
];

//Se declaran variables

let usuario;


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
    let campo = document.querySelector("#nombreUsuario");
    campo.addEventListener("input", (e) => {
        nombre = e.target.value;
    });
    let ingreso = document.querySelector("#ingresoUsuario");
    ingreso.addEventListener("click", () => {
        campo.value = ""
        pantallaIngreso.style.display = "none";
        if (nombre != undefined) {
            validarUsuario(nombre);
        } else {
            nombre = "usuario";
            validarUsuario(nombre);
        }
    })
}

function mostrarProductos() {
    let catalogo = document.getElementById("todasCards");
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
            mostrarInfo(indice)
        })
    })
}

function mostrarInfo(indice) {
    const item = todosLosProductos[indice];
    let modalInfo = document.querySelector("#modalInfoProductos");
    let itemInfo = document.createElement("div");
    itemInfo.classList.add("modalInfoContent");
    itemInfo.innerHTML = `<div class="divImagen">
    <img src="./img/${item.foto}.webp" alt="foto producto">
    </div>
    <div>
        <div>
            <h3>${item.nombre}</h3>
            <p>Marca: ${item.marca}</p>
            <p>Modelo: ${item.modelo}</p>
            <p>Descripcion: ${item.descripcion}</p>
            <p>Adquirila por $ ${item.precio}</p>
        </div>
    </div>`
    modalInfo.appendChild(itemInfo);
    let inBtn = "Volver";
    let btn = document.createElement("button");
    btn.classList.add("botonCerrar")
    btn.innerHTML += inBtn;
    itemInfo.appendChild(btn);

    btn.addEventListener("click", () => {
        modalInfo.style.display = "none";
        modalInfo.innerHTML = ""
        modalInfo = ""
        itemInfo.innerHTML = ""
        itemInfo = ""
        btn = ""
    })

    modalInfo.style.display = "block";
}

// Fin de funciones

ingresarUsuario();
mostrarProductos();
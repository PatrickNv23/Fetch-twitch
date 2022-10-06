const btn_obtenerUsuarios = document.querySelector(".btn_obtenerUsuarios");
const listaUsuarios = document.getElementById("lista_usuarios");
const fragmentoUsuarios = document.createDocumentFragment();

const obtenerUsuarios = async () => {
    try {
        listaUsuarios.innerHTML = "";
        const usuarios = await fetch("https://jsonplaceholder.typicode.com/users");
        const usuarios_json = await usuarios.json();

        if (!usuarios.ok) {
            throw { status: usuarios.status, statusText: usuarios.statusText }
        }

        renderizarUsuarios(usuarios_json);


    } catch (error) {
        let mensaje = error.statusText || "Ocurrió un error";
        const errorApi = document.createElement("li");
        errorApi.innerHTML = `Error ${error.status}: ${mensaje}`;
        listaUsuarios.appendChild(errorApi);
    } finally {
        console.log("Evento culminado");
    }

}

const renderizarUsuarios = (usuarios) => {
    usuarios.forEach((usuario) => {
        const usuarioHtml = document.createElement("li");
        usuarioHtml.classList.add("usuario_item");
        usuarioHtml.innerHTML =
            `
    <strong class="item" >Id:</strong> ${usuario.id} - <strong class="item">Nombre:</strong> ${usuario.name}
    <br />
    <strong class="item">Email: </strong> ${usuario.email}
    `;

        fragmentoUsuarios.appendChild(usuarioHtml);
    });

    listaUsuarios.appendChild(fragmentoUsuarios);
}

btn_obtenerUsuarios.addEventListener("click", (e) => {
    obtenerUsuarios();
})


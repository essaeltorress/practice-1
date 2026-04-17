let filtroActual = 'Todos';

document.getElementById('Formulario').addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    let id = document.getElementById('id').value;
    let descripcion = document.getElementById('descripcion').value;
    let departamento = document.getElementById('departamento').value;
    
    if (id === '' || descripcion === '' || departamento === '') {
        alert('Por favor completa todos los campos');
        return;
    }
    
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    let nuevoProducto = {
        id: id,
        descripcion: descripcion,
        departamento: departamento
    };
    
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    
    alert('Producto guardado correctamente');
    
    document.getElementById('id').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('departamento').value = '';
    
    mostrarProductos(filtroActual);
});

function mostrarProductos(filtro) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    
    cuerpoTabla.innerHTML = '';
    
    let productosFiltrados = productos;
    if (filtro !== 'Todos') {
        productosFiltrados = productos.filter(p => p.departamento === filtro);
    }
    
    if (productosFiltrados.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="3">No hay productos</td></tr>';
        return;
    }
    
    productosFiltrados.forEach(producto => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.departamento}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

function filtrar(departamento) {
    filtroActual = departamento;
    mostrarProductos(departamento);
}

function toggletable() {
    let tabla = document.getElementById('Tabla');
}

mostrarProductos('Todos');
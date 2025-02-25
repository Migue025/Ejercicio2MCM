package com.cantalejo.Ejercicio1;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Método para listar todos los productos
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Método para obtener un producto por su ID
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id);
    }

    // Método para guardar o actualizar un producto
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Método para eliminar un producto por ID
    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
}

package com.example.gid.GID.service;

import com.example.gid.GID.model.Product;
import com.example.gid.GID.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts(String category) {
        if (StringUtils.hasText(category)) {
            return productRepository.findByCategory(category);
        }
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setImageUrl(productDetails.getImageUrl());
        product.setCategory(productDetails.getCategory());
        return productRepository.save(product);
    }

    public Product partialUpdateProduct(Long id, Map<String, Object> updates) {
        Product product = getProductById(id);
        updates.forEach((key, value) -> {
            switch (key) {
                case "name": product.setName((String) value); break;
                case "description": product.setDescription((String) value); break;
                case "price": product.setPrice((Double) value); break;
                case "stock": product.setStock((Integer) value); break;
            }
        });
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}   
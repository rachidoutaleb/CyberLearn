package com.boostmytool.beststore.services;

import com.boostmytool.beststore.models.Product;
import java.util.List;

public interface ProductsService {
    List<Product> findAll();
    Product findById(int id);
    Product save(Product product);
    void deleteById(int id);
}

package  com.boostmytool.beststore.services.Impl;


import com.boostmytool.beststore.models.Product;
import com.boostmytool.beststore.services.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.boostmytool.beststore.repository.ProductsRepository;

import java.util.List;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Override
    public List<Product> findAll() {
        return productsRepository.findAll();
    }

    @Override
    public Product findById(int id) {
        return productsRepository.findById(id).orElse(null);
    }

    @Override
    public Product save(Product product) {
        Product savedProduct = productsRepository.save(product);
        return savedProduct;
    }

    @Override
    public void deleteById(int id) {
        productsRepository.deleteById(id);
    }
}

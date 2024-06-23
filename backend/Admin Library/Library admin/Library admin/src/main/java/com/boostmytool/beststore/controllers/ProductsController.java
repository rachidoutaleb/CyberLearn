package com.boostmytool.beststore.controllers;

import com.boostmytool.beststore.models.Product;
import com.boostmytool.beststore.models.ProductDto;
import com.boostmytool.beststore.repository.ProductsRepository;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin("http://localhost:3000")
@RequestMapping("/library")
public class ProductsController {

    private final String UPLOAD_DIR = "src/main/resources/static/images/";


    @Autowired
    private ProductsRepository productsRepository;



    @PostMapping("/addBook")
    public ResponseEntity<String> createProduct(@RequestParam("titre") String titre,
                                                @RequestParam("auteur") String auteur,
                                                @RequestParam("edition") String edition,
                                                @RequestParam("description") String description,
                                                @RequestParam("coverFile") MultipartFile file,
                                                @RequestParam("categorie") String categorie) {

        if (file.isEmpty()) {
            return ResponseEntity.ok().body("Please select a file to upload");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Save file to the upload directory
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create a ProductDto and set its properties
        ProductDto productDto = new ProductDto();
        productDto.setTitre(titre);
        productDto.setAuteur(auteur);
        productDto.setEdition(edition);
        productDto.setDescription(description);
        productDto.setCover(fileName);
        productDto.setCategorie(categorie);


        // Map ProductDto to Product entity
        Product product = new Product();
        product.setTitre(productDto.getTitre());
        product.setAuteur(productDto.getAuteur());
        product.setDescription(productDto.getDescription());
        product.setCover(productDto.getCover());
        product.setCategorie(productDto.getCategorie());
        product.setEdition(productDto.getEdition());
        product.setCreatedAt(LocalDate.now());

        // Save product using repository
        productsRepository.save(product);

        return ResponseEntity.ok().body("Book saved successfully");
    }



    @GetMapping("/ShowBooks")
    @ResponseBody
    public List<Product> listUsers() {
        return productsRepository.findAll();
    }



    @GetMapping("/ShowEdit")
    public ResponseEntity<?> showEditPage(@RequestParam Long id) {
        Optional<Product> optionalLibraryItem = productsRepository.findById(Math.toIntExact(id));
        if (optionalLibraryItem.isPresent()) {
            return ResponseEntity.ok(optionalLibraryItem.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Library item not found with ID: " + id);
        }
    }

    @PostMapping("/saveLibraryItem")
    public ResponseEntity<String> saveLibraryItem(@RequestParam(value = "id", required = false) Long id,
                                                  @RequestParam("titre") String titre,
                                                  @RequestParam("auteur") String auteur,
                                                  @RequestParam("edition") String edition,
                                                  @RequestParam("description") String description,
                                                  @RequestParam("categorie") String categorie,
                                                  @RequestParam(value = "coverFile", required = false) MultipartFile coverFile) {

        try {
            Product libraryItem;
            if (id != null) {
                Optional<Product> optionalLibraryItem = productsRepository.findById(Math.toIntExact(id));
                if (optionalLibraryItem.isPresent()) {
                    libraryItem = optionalLibraryItem.get();
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Library item not found with ID: " + id);
                }
            } else {
                libraryItem = new Product();
            }

            libraryItem.setTitre(titre);
            libraryItem.setAuteur(auteur);
            libraryItem.setEdition(edition);
            libraryItem.setDescription(description);
            libraryItem.setCategorie(categorie);

            if (coverFile != null && !coverFile.isEmpty()) {
                // Save cover file logic
                String fileName = coverFile.getOriginalFilename();
                String filePath = UPLOAD_DIR + fileName;

                // Create directories if they don't exist
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Save the file
                byte[] bytes = coverFile.getBytes();
                Path path = Paths.get(filePath);
                Files.write(path, bytes);

                // Set the cover file path or URL in the library item
                libraryItem.setCover("/images/" + fileName); // Assuming your images are served from /images/


            }

            productsRepository.save(libraryItem);
            return ResponseEntity.ok("Library item saved successfully");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload cover file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save library item: " + e.getMessage());
        }
    }






    @GetMapping("/deleteBook")
    public ResponseEntity<String> deleteProduct(@PathParam("id") int id) {
        Product product = productsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product Id:" + id));

        productsRepository.delete(product);

        return ResponseEntity.ok("User deleted successfully");
    }
}

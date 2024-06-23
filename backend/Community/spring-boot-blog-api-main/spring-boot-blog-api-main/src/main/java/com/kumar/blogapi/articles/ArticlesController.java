package com.kumar.blogapi.articles;

import com.kumar.blogapi.articles.dto.ArticleResponseDTO;
import com.kumar.blogapi.articles.dto.CreateArticleDTO;
import com.kumar.blogapi.articles.dto.UpdateArticleDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/articles")
public class ArticlesController {
    private final ArticlesService articlesService;

    public ArticlesController(ArticlesService articlesService) {
        this.articlesService = articlesService;
    }

    @PostMapping
    public ResponseEntity<ArticleResponseDTO> createArticle(@RequestBody CreateArticleDTO articleDto, @RequestParam Integer userId) {
        var articleResponseDto = articlesService.createArticle(articleDto, userId);
        return ResponseEntity.ok(articleResponseDto);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ArticleResponseDTO> getArticleBySlug(@PathVariable String slug) {
        var article = articlesService.getArticleBySlug(slug);
        return ResponseEntity.ok(article);
    }

    @GetMapping("/{slug}/content")
    public ResponseEntity<ArticleResponseDTO> getArticleContent(@PathVariable String slug) {
        var articleContent = articlesService.getArticleContent(slug);
        return ResponseEntity.ok(articleContent);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllArticles(
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String body,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        var response = articlesService.getAllArticles(author, title, body, page, size);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{slug}")
    public ResponseEntity<ArticleResponseDTO> updateArticle(@PathVariable String slug, @RequestBody UpdateArticleDTO updateArticleDTO) {
        var updatedArticle = articlesService.updateArticle(slug, updateArticleDTO);
        return ResponseEntity.ok(updatedArticle);
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Void> deleteArticle(@PathVariable String slug) {
        articlesService.deleteArticle(slug);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{slug}/like")
    public ResponseEntity<Void> likeArticle(@PathVariable String slug) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        articlesService.likeArticle(slug, currentUserName);
        return ResponseEntity.ok().build();
    }
}

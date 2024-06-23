package com.kumar.blogapi.articles;


import com.kumar.blogapi.articles.dto.ArticleResponseDTO;
import com.kumar.blogapi.articles.dto.CreateArticleDTO;
import com.kumar.blogapi.articles.dto.UpdateArticleDTO;
import com.kumar.blogapi.users.UserEntity;
import com.kumar.blogapi.users.UsersService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ArticlesService {
    private final ArticlesRepository articlesRepository;
    private final ModelMapper modelMapper;

    @Autowired
    private UsersService usersService;

    public void likeArticle(String slug, String userName) {
        ArticleEntity article = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        UserEntity user = usersService.findByUserName(userName);

        if (article.getLikedBy().contains(user)) {
            article.getLikedBy().remove(user);
        } else {
            article.getLikedBy().add(user);
        }

        articlesRepository.save(article);
    }

    public ArticlesService(ArticlesRepository articlesRepository, ModelMapper modelMapper) {
        this.articlesRepository = articlesRepository;
        this.modelMapper = modelMapper;
    }

    public ArticleResponseDTO createArticle(CreateArticleDTO articleDto, Integer userId) {
        if (articleDto.getTitle() == null || articleDto.getBody() == null) {
            throw new ArticleDataMissing();
        }

        var articleEntityToCreate = modelMapper.map(articleDto, ArticleEntity.class);
        articleEntityToCreate.setAuthor(usersService.getUserById(userId));

        var savedArticle = articlesRepository.save(articleEntityToCreate);

        var articleResponseDto = modelMapper.map(savedArticle, ArticleResponseDTO.class);
        articleResponseDto.setAuthorId(userId);
        return articleResponseDto;
    }

    public Map<String, Object> getAllArticles(String author, String title, String body, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        // Filter and paginate articles
        Page<ArticleEntity> articlePage = articlesRepository.searchArticles(author, title, body, pageable);

        List<ArticleResponseDTO> articleResponseDTOs = articlePage.stream()
                .map(article -> modelMapper.map(article, ArticleResponseDTO.class))
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("articles", articleResponseDTOs);
        response.put("totalPages", articlePage.getTotalPages());
        response.put("totalArticles", articlePage.getTotalElements());

        return response;
    }


    public ArticleResponseDTO getArticleBySlug(String slug) {
        var article = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        return modelMapper.map(article, ArticleResponseDTO.class);
    }

    public ArticleResponseDTO getArticleContent(String slug) {
        var article = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        return modelMapper.map(article, ArticleResponseDTO.class);
    }

    public ArticleResponseDTO updateArticle(String slug, UpdateArticleDTO updateArticleDTO) {
        var article = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        modelMapper.map(updateArticleDTO, article);
        var updatedArticle = articlesRepository.save(article);
        return modelMapper.map(updatedArticle, ArticleResponseDTO.class);
    }

    public void deleteArticle(String slug) {
        var article = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        articlesRepository.delete(article);
    }

    public static class ArticleDataMissing extends IllegalArgumentException {
        public ArticleDataMissing() {
            super("Unable to create article, data missing in the supplied request");
        }
    }

    public static class ArticleNotFoundException extends IllegalArgumentException {
        public ArticleNotFoundException(String slug) {
            super("Article with slug " + slug + " not found");
        }
    }
}
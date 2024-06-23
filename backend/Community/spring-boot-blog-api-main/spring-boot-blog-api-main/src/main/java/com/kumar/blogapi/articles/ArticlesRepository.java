package com.kumar.blogapi.articles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArticlesRepository extends JpaRepository<ArticleEntity, Integer> {
    Optional<ArticleEntity> findBySlug(String slug);

    @Query("SELECT a FROM ArticleEntity a WHERE " +
            "(:author IS NULL OR a.author.userName = :author) AND " +
            "(:title IS NULL OR a.title LIKE %:title%) AND " +
            "(:body IS NULL OR a.body LIKE %:body%)")
    Page<ArticleEntity> searchArticles(@Param("author") String author, @Param("title") String title, @Param("body") String body, Pageable pageable);
}
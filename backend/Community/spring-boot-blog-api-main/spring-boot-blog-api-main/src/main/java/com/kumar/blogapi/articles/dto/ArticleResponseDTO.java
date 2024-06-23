package com.kumar.blogapi.articles.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleResponseDTO {
    private Long id;
    private String slug;
    private String title;
    private String body;
    private Integer authorId;
}

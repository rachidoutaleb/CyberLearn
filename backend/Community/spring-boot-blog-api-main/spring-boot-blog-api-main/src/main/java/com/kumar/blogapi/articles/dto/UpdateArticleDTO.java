package com.kumar.blogapi.articles.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateArticleDTO {
    String title;
    String body;
}
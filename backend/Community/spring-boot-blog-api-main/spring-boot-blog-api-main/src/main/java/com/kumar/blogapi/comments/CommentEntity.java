package com.kumar.blogapi.comments;

import com.kumar.blogapi.articles.ArticleEntity;
import com.kumar.blogapi.commons.BaseEntity;
import com.kumar.blogapi.users.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class CommentEntity extends BaseEntity {
    @Column(length = 1000, nullable = false)
    String body;
    @ManyToOne
    ArticleEntity article;
    @ManyToOne
    UserEntity author;
}

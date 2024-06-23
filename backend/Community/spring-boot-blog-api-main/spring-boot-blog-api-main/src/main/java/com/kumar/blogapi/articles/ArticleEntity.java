package com.kumar.blogapi.articles;

import com.kumar.blogapi.comments.CommentEntity;
import com.kumar.blogapi.commons.BaseEntity;
import com.kumar.blogapi.users.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "articles")
@Getter
@Setter
public class ArticleEntity extends BaseEntity {
    @Column(unique = true, nullable = false, length = 150)
    String slug;
    @Column(nullable = false, length = 200)
    String title;
    @Column(nullable = false, length = 8000)
    String body;
    @ManyToOne
    UserEntity author;
    @ManyToMany
    @JoinTable(
            name = "article_likes",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    List<UserEntity> likedBy;

    @OneToMany(mappedBy = "article")
    List<CommentEntity> comments;
}
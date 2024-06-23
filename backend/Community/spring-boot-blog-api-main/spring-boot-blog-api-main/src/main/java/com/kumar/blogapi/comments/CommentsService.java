package com.kumar.blogapi.comments;

import com.kumar.blogapi.articles.ArticlesRepository;
import com.kumar.blogapi.articles.ArticleEntity;
import com.kumar.blogapi.comments.dto.CommentResponseDto;
import com.kumar.blogapi.comments.dto.CreateCommentDTO;
import com.kumar.blogapi.users.UsersService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final ModelMapper modelMapper;
    private final ArticlesRepository articlesRepository;
    private final UsersService usersService;

    public CommentsService(CommentsRepository commentsRepository, ModelMapper modelMapper, ArticlesRepository articlesRepository, UsersService usersService) {
        this.commentsRepository = commentsRepository;
        this.modelMapper = modelMapper;
        this.articlesRepository = articlesRepository;
        this.usersService = usersService;
    }

    public CommentResponseDto createComment(String slug, CreateCommentDTO commentDTO, Integer userId) {
        var userEntity = usersService.getUserById(userId);
        var articleEntity = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));

        var commentEntityToSave = modelMapper.map(commentDTO, CommentEntity.class);
        commentEntityToSave.setAuthor(userEntity);
        commentEntityToSave.setArticle(articleEntity);

        var savedCommentEntity = commentsRepository.save(commentEntityToSave);
        return modelMapper.map(savedCommentEntity, CommentResponseDto.class);
    }

    public List<CommentResponseDto> getAllComments(String slug) {
        var articleEntity = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        return articleEntity.getComments().stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .collect(Collectors.toList());
    }

    public void deleteComment(String slug, Integer commentId) {
        var articleEntity = articlesRepository.findBySlug(slug)
                .orElseThrow(() -> new ArticleNotFoundException(slug));
        var commentEntity = commentsRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException(commentId));
        if (!commentEntity.getArticle().equals(articleEntity)) {
            throw new CommentNotBelongToArticleException(commentId, slug);
        }
        commentsRepository.delete(commentEntity);
    }

    public static class ArticleNotFoundException extends IllegalArgumentException {
        public ArticleNotFoundException(String slug) {
            super("Article with slug " + slug + " not found");
        }
    }

    public static class CommentNotFoundException extends IllegalArgumentException {
        public CommentNotFoundException(Integer commentId) {
            super("Comment with id " + commentId + " not found");
        }
    }

    public static class CommentNotBelongToArticleException extends IllegalArgumentException {
        public CommentNotBelongToArticleException(Integer commentId, String slug) {
            super("Comment with id " + commentId + " does not belong to article with slug " + slug);
        }
    }
}

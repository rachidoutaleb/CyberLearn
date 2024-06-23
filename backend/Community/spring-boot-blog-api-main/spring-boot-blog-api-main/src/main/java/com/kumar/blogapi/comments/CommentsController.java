package com.kumar.blogapi.comments;

import com.kumar.blogapi.comments.dto.CommentResponseDto;
import com.kumar.blogapi.comments.dto.CreateCommentDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles/{slug}/comments")
public class CommentsController {
    private final CommentsService commentsService;

    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @PostMapping
    public ResponseEntity<CommentResponseDto> createComment(@PathVariable String slug, @RequestBody CreateCommentDTO commentDTO, @RequestParam Integer userId) {
        var commentResponseDto = commentsService.createComment(slug, commentDTO, userId);
        return ResponseEntity.ok(commentResponseDto);
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getAllComments(@PathVariable String slug) {
        var comments = commentsService.getAllComments(slug);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String slug, @PathVariable Integer commentId) {
        commentsService.deleteComment(slug, commentId);
        return ResponseEntity.noContent().build();
    }
}

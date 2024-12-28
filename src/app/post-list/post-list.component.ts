import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription | any;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    // Wymuszenie wykrycia zmian
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
      this.postSub.unsubscribe();
  }
} 

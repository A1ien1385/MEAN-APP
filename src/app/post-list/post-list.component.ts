import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';



@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor(private cdr: ChangeDetectorRef,public postsService: PostsService) {}

  ngOnInit(): void {
    this.cdr.detectChanges(); // Wymuszenie wykrycia zmian
  }
}

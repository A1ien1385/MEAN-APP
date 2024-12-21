import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges(); // Wymuszenie wykrycia zmian
  }
}

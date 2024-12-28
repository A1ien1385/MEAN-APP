import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { CanvasComponent } from './canvas/canvas.component';
import { Post } from './post.model';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostsComponent, HeaderComponent, PostListComponent, CanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}

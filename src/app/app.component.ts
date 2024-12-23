import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { Post } from './post.model';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostsComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  storedPosts: Post[] = [];

  // Określenie typu dla parametru metody
  onPostAdded(post: Post): void {
    this.storedPosts.push(post);
  }
}

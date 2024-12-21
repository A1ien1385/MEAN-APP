import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mean-project';
}

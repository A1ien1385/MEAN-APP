import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatCard, MatButton],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  enteredValue = '';
  newPost = '';

  onAddPost() {

    this.newPost = this.enteredValue;
  }
}

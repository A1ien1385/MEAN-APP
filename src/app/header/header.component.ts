import { Component } from '@angular/core';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatToolbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

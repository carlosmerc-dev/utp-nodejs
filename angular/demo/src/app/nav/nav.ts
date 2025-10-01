import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

}

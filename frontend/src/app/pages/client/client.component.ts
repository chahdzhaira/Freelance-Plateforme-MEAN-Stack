import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

constructor(private router : Router){}

logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}

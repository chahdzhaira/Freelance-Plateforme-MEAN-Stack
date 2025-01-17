import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  user : any ;

constructor(private router : Router , private _user : UserService){}

ngOnInit(): void {
  this._user.getUserById(this._user.getUserIdFromToken()).subscribe({
    next : (res : any) =>{
      console.log('Réponse API :', res);
      console.log('Réponse :', res.user);

      this.user = res.user ;

    },
    error: (err) => {
      console.error('Erreur API :', err);
    },
  })
}

logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}

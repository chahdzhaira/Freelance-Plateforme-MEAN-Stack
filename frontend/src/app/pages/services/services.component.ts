import { Component } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { UserService } from '../../core/services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  services : any ; 

  constructor(private _service : ServiceService , private _user : UserService){}

  ngOnInit() : void {
    this._service.getServices().subscribe({
      next : (res) =>{
        this.services = res ; 
      }
    })
  }
}

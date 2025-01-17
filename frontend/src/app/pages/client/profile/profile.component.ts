import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  image : any ;

  user: any;
  userId: any;

  profileForm : FormGroup ;

  constructor(private fb : FormBuilder ,private _user : UserService ){
    let controls ={
      firstname : new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email : new FormControl('' , [Validators.required , Validators.email]) ,
      password : new FormControl('',[])
    }; 

    this.profileForm = fb.group(controls) ;


  }

  selectImage(img: any){
    this.image = img.target.files[0]
  }

  ngOnInit(): void {
    this.userId = this._user.getUserIdFromToken();

    this._user.getUserById(this.userId).subscribe({
      next: (res : any)=>{
        this.user = res.user;
        this.profileForm.reset(res.user);
      }
    })
  }

  save(){

    let fd = new FormData() ;
    fd.append ('firstname' , this.profileForm.value.firstname) ; 
    fd.append('lastname' , this.profileForm.value.lastname) ;
    fd.append('email' , this.profileForm.value.email);
    if (this.profileForm.value.password){
      fd.append('password' , this.profileForm.value.password) ;
    }
    if (this.image){
      fd.append('image' , this.image);
    }

    this._user.editUser(this.userId , fd).subscribe({
      next : (res) => {
        window.location.reload() ; 
      }
    })
    
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  image: any;
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _service: ServiceService, private _user: UserService) {

    let controls = {

      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),

    }

    this.postForm = fb.group(controls);
  }

  selectImage(e: any) {
    this.image = e.target.value;
  }

  create() {

    let fd = new FormData();
    fd.append('name', this.postForm.value.name);
    fd.append('category', this.postForm.value.category);
    fd.append('location', this.postForm.value.location);
    fd.append('salary', this.postForm.value.salary);
    fd.append('description', this.postForm.value.description);
    fd.append('image', this.image);
    fd.append('idUser', this._user.getUserIdFromToken())

    this._service.createService(fd).subscribe({
      next: (res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post has been saved !",
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(['/client/my-services']);
      }
    })

  }

}

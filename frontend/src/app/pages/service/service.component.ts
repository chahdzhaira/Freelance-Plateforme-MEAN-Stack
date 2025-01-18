import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ServiceService } from '../../core/services/service.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProposalService } from '../../core/services/proposal.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  id : any ; 
  service : any ;

  proposalForm : FormGroup ;
  proposals : any ; 

  constructor(private _act : ActivatedRoute ,private _service : ServiceService , private fb : FormBuilder ,private _proposal : ProposalService, private _user: UserService){

    let controls = {
      price : new FormControl('', [Validators.required]) ,
      days : new FormControl('',[Validators.required] ) ,
      cover : new FormControl('' , [Validators.required])
    }
    this.proposalForm = fb.group(controls);
  }

  ngOnInit(): void {
    
    this.id = this._act.snapshot.paramMap.get('id');
    this.getServiceProposals();
    this._service.getServiceById(this.id).subscribe({
      next:(res)=>{
        this.service = res;
      }
    })

  }

  scroll(){
    window.scroll(0,1000);
  }

  getServiceProposals(){

    this._proposal.getProposalsByServiceId(this.id).subscribe({
      next: (res)=>{
        this.proposals = res;
        console.log(this.proposals);
        
      }
    })

  }

  sendProposal(){
      let data = {
        ...this.proposalForm.value,
        idUser: this._user.getUserIdFromToken(),
        idService: this.id
      }
  
      this._proposal.createProposal( data ).subscribe({
        next: (res)=>{
          this.getServiceProposals();
          this.proposalForm.reset();
        }
      })
  
    }
}

import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../../../core/services/user.service';
import { ServiceService } from '../../../core/services/service.service';
import { ProposalService } from '../../../core/services/proposal.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  basicData: any;
  userCount: number = 0 ;
  serviceCount : number = 0 ; 
  proposalCount : number = 0 ;
  acceptedProposalCount : number = 0;

  proposals : any ;
  proposalsCount : any ;
  services : any ;

  constructor(private _user: UserService, private _service: ServiceService, private _proposal: ProposalService) { }


  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {

    // Récupérer tous les utilisateurs
    this._user.getUsers().subscribe((users) => {
      this.userCount = users.length;

      // Récupérer tous les services
      this._service.getServices().subscribe((services) => {
        this.serviceCount = services.length;

        // Récupérer toutes les propositions
        this._proposal.getProposals().subscribe((proposals) => {
          this.proposalCount = proposals.length;

          // Filtrer les propositions acceptées
          this.acceptedProposalCount = proposals.filter((p: any) => p.status == true ).length;

          this.basicData = {
            labels: ['users', 'services', 'proposals', 'accepted proposal'],
            datasets: [
              {
                label: 'users',
                data: [this.userCount, this.serviceCount, this.proposalCount, this.acceptedProposalCount],
                backgroundColor: [
                  'rgba(249, 115, 22, 0.2)',
                  'rgba(6, 182, 212, 0.2)',
                  'rgb(107, 114, 128, 0.2)',
                  'rgba(139, 92, 246, 0.2)',
                ],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1,
              },
            ],
          };
        });
      });
    });

    this._proposal.getProposalsByUserId(this._user.getUserIdFromToken()).subscribe({
      next : (res : any) =>{
        this.proposals = res ;
      },
    })

    this._service.getServices().subscribe({
      next : (res:any)=>{
        this.services = res ; 
      }
    })
    
  }
}
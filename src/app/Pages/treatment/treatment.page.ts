import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Treatment } from 'src/app/interfaces/treatment.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {

  treatment!: Treatment;
  suscription!: Subscription;
  aparecer = false;

  constructor(private router: Router, private databaseService: DatabaseService){}

  async ngOnInit(){
    this.suscription = await this.databaseService.getTreatment(this.router.url.split("/")[2])
    .subscribe(treatment => {
      this.treatment = treatment;
      if (this.treatment == null || this.treatment == undefined){
        this.router.navigate(['/treatments']);
      }
      this.aparecer = true;
    });
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe();
  }

}

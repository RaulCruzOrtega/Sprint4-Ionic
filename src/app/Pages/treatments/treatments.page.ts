import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../../interfaces/treatment.interface';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {

  treatments!: Observable<Treatment[]>;
  
  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.treatments = this.database.getTreatments();
  }

}

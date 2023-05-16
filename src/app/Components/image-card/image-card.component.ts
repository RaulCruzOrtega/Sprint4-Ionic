import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class ImageCardComponent  implements OnInit {
  @Input() img!: string;
  @Input() name!: string;
  @Input() linkroute!: any;
  
  constructor() { }

  ngOnInit() {}

}

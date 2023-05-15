import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent  implements OnInit {
  @Input() img!: string;
  @Input() name!: string;
  @Input() linkroute!: any;
  
  constructor() { }

  ngOnInit() {}

}

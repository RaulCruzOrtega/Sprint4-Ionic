import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-image-description-button',
  templateUrl: './image-description-button.component.html',
  styleUrls: ['./image-description-button.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ],
})
export class ImageDescriptionButtonComponent  implements OnInit {
  @Input() image!: string;
  @Input() description!: string;
  @Input() route!: string[];

  constructor() { }

  ngOnInit() {}

}

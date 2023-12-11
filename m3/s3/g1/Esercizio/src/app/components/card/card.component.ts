import { Component, Input } from '@angular/core';
import { IProduct } from '../../iproduct';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() dataFromParent!: IProduct[];
}

import { Component } from '@angular/core';
import { LandingFooterComponent, LandingHeaderComponent } from '../../layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    LandingHeaderComponent,
    LandingFooterComponent,
    FormsModule, 
    RatingModule,
  ],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})

export class PublicProfileComponent {
  value5: number = 5;
  value4: number = 4;
  value3: number = 3;
  value2: number = 2;
  value1: number = 1;
}

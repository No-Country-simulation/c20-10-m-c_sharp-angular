import { Component, DestroyRef, OnInit } from '@angular/core';
import { LandingFooterComponent, LandingHeaderComponent } from '../../layout';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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

export class PublicProfileComponent implements OnInit {
  value5: number = 5;
  value4: number = 4;
  value3: number = 3;
  value2: number = 2;
  value1: number = 1;
  value: any;

  jsonData: any;

  constructor(private router:Router,
              private activatedRoute: ActivatedRoute, 
              private destroyRef: DestroyRef) 
  {
    
  }
  ngOnInit(): void{
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      
      if(res){
        this.jsonData = res["data"];
        console.log("info que tenemos en el public profile",this.jsonData);
      }
    });
  }
}
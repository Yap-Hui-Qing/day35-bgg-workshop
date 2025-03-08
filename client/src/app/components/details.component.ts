import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BggService } from '../bgg.service';
import { SearchGame, SearchResult } from '../models';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute)
  private bggSvc = inject(BggService)
  private router = inject(Router)

  gid: number = 0
  result!: SearchGame
  searchResults : SearchResult[] = []

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      params => {
        this.gid = parseInt(params['gid'])
      }
    )

    this.bggSvc.searchById(this.gid)
      .then(results => {
        this.result = results
        console.info(">>> ", this.result)
      })
    
  }

  goBack(){
    this.router.navigate(['/'])
  }

  showComments(gid: number){
    this.router.navigate(['/comments', gid])
  }

}

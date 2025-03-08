import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchCriteria, SearchGame, SearchResult } from '../models';
import { Router } from '@angular/router';
import { BggService } from '../bgg.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private bggSvc = inject(BggService)

  protected form!: FormGroup
  protected searchResults: SearchResult[] = []
  // protected results$!: Promise<SearchGame[]>
  protected results$!: Observable<SearchResult[]>

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [ Validators.required ])
    })
  }

  search() {
    const q = this.form.value.q
    console.info('>>>> q: ', q)
    // const criteria: SearchCriteria = {
    //   q, count: 10
    // }

    // result is a Promise | Observable
    this.results$ = this.bggSvc.searchAsObservable({q, count: 10} as SearchCriteria)

    this.bggSvc.search({q, count: 10} as SearchCriteria)
      .then(results => {
        console.info('>>> results: ', results)
        this.searchResults = results
        this.bggSvc.setResults(this.searchResults)
      })

  }

}

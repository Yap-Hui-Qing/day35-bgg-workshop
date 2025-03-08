import { Component, inject, OnInit } from '@angular/core';
import { BggService } from '../bgg.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from '../models';

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  private bggSvc = inject(BggService)
  private activatedRoute = inject(ActivatedRoute)

  comments$!: Observable<Comment[]>

  ngOnInit(): void {
    const gid = this.activatedRoute.snapshot.params['gid']
    this.comments$ = this.bggSvc.getCommentsByGameId(gid)
  }

}

import { ServisePostService } from './../../servise-post.service';
import { Component, OnInit } from '@angular/core';
import { IPosts } from '../../Models/i-posts';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrl: './active-post.component.scss'
})
export class ActivePostComponent implements OnInit {
  posts: IPosts[] = [];

  constructor(private postService: ServisePostService) { }

  ngOnInit(): void {
    this.fetchActivePosts();
  }

  fetchActivePosts(): void {
    this.postService.getAll().subscribe({
      next: (data) => {
        this.posts = data.activePosts;
      },
      error: (error) => {
        console.error('Si è verificato un errore nel recupero dei post attivi:', error);
      }
    } as Observer<any>);
  }
}

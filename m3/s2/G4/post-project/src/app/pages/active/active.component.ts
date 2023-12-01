import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';
import { IPosts } from '../../Models/iposts';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss'
})
export class ActiveComponent implements OnInit {
   posts: IPosts[] = [];

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.fetchActivePosts();
  }

  fetchActivePosts(): void {
    this.postService.getAll().subscribe({
      next: (data: { activePosts: IPosts[]; }) => {
        this.posts = data.activePosts;
      },
      error: (error) => {
        console.error('Si è verificato un errore nel recupero dei post attivi:', error);
      }
    } as Observer<any>);
  }

  togglePostStatus(post: IPosts): void {
    this.postService.toggleActive(post).subscribe(updatedPost => {
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        this.posts.splice(index, 1); // Rimuovi localmente il post con il nuovo stato
      }
    });
  }


  getClassObj(post: IPosts){
    return {
      'bg-warning': post.type === 'news',
      'bg-black': post.type === 'politic',
      'text-white': post.type === 'politic',
      'bg-primary': post.type === 'education',
    };
  }
}

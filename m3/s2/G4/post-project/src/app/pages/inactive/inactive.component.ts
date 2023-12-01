import { Component } from '@angular/core';
import { IPosts } from '../../Models/iposts';
import { PostsService } from '../../posts.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrl: './inactive.component.scss'
})
export class InactiveComponent {
  posts: IPosts[] = [];

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.fetchInactivePosts();
  }

  fetchInactivePosts(): void {
    this.postService.getAll().subscribe({
      next: (data: { inactivePosts: IPosts[]; }) => {
        this.posts = data.inactivePosts;
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
        this.posts.splice(index, 1);
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

import { ServisePostService } from './../../servise-post.service';
import { Component, OnInit } from '@angular/core';
import { IPosts } from '../../Models/i-posts';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrls: ['./active-post.component.scss']
})
export class ActivePostComponent implements OnInit {
  posts: IPosts[] = [];

  constructor(private postsSvc: ServisePostService) { }

  ngOnInit(): void {
    this.fetchActivePosts();
  }

  async fetchActivePosts(): Promise<void> {
    try {
      await this.postsSvc.getPosts();
      this.refreshPosts();
    } catch (error) {
      console.error('Si è verificato un errore nel recupero dei dati:', error);
    }
  }

  async togglePostStatus(post: IPosts): Promise<void> {
    const newStatus = !post.active;
    await this.postsSvc.updatePostStatus(post.id, newStatus); // Attendere l'aggiornamento nel servizio
    this.refreshPosts(); // Aggiorna i post nel componente dopo il cambio di stato
  }

  private refreshPosts(): void {
    this.posts = this.postsSvc.getActivePosts();
  }
}

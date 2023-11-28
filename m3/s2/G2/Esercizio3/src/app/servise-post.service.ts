import { Injectable } from '@angular/core';
import { IPosts } from './Models/i-posts';

@Injectable({
  providedIn: 'root'
})
export class ServisePostService {
  private postsUrl = 'assets/db.json';
  private data: IPosts[] = [];
  private activePosts: IPosts[] = [];
  private inactivePosts: IPosts[] = [];

  constructor() {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
    try {
      const response = await fetch(this.postsUrl);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati');
      }
      this.data = await response.json();
      this.refreshPosts();
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  }

  private refreshPosts(): void {
    this.activePosts = this.data.filter(post => post.active === true);
    this.inactivePosts = this.data.filter(post => post.active === false);
  }

  getAllPosts(): IPosts[] {
    return this.data;
  }

  getActivePosts(): IPosts[] {
    return this.activePosts;
  }

  getInactivePosts(): IPosts[] {
    return this.inactivePosts;
  }

  updatePostStatus(postId: number, newStatus: boolean): void {
    const postToUpdate = this.data.find(post => post.id === postId);
    if (postToUpdate) {
      postToUpdate.active = newStatus;
      this.refreshPosts(); // Aggiorna post attivi e inattivi
    }
  }
}

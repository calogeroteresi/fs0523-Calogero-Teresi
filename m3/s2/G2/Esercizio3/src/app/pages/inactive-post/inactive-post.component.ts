import { ServisePostService } from './../../servise-post.service';
import { Component, OnInit } from '@angular/core';
import { IPosts } from '../../Models/i-posts';

@Component({
  selector: 'app-inactive-post',
  templateUrl: './inactive-post.component.html',
  styleUrl: './inactive-post.component.scss'
})
export class InactivePostComponent implements OnInit {
  posts: IPosts[] = [];

  constructor(private postsSvc: ServisePostService) { }

  ngOnInit(): void {
    this.fetchInactivePosts();
  }

  async fetchInactivePosts(): Promise<void> {
    try {
      await this.postsSvc.getPosts();
      this.refreshPosts();
    } catch (error) {
      console.error('Si è verificato un errore nel recupero dei dati:', error);
    }
  }

  async togglePostStatus(post: IPosts): Promise<void> {
    const newStatus = !post.active;
    this.postsSvc.updatePostStatus(post.id, newStatus);
    this.refreshPosts();
  }

  private refreshPosts(): void {
    this.posts = this.postsSvc.getInactivePosts();
  }
}

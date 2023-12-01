import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';
import { ActivatedRoute } from '@angular/router';
import { IPosts } from '../../Models/iposts';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  post: IPosts | undefined; // Definisci il tipo corretto del post o inizializzalo come undefined
  postSubscription: Subscription | undefined; // Subscription per gestire la sottoscrizione all'observable

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['id']; // Ottieni l'ID del post dalla route, assicurati sia di tipo number
      this.fetchPostDetails(postId); // Chiama la funzione per recuperare i dettagli del post
    });
  }

  fetchPostDetails(postId: number): void {
    this.postSubscription = this.postService.getById(postId).subscribe({
      next: (data: IPosts) => {
        this.post = data; // Assegna i dettagli del post alla variabile postDetails
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli del post:', error);
        // Gestisci l'errore, ad esempio visualizzando un messaggio di errore
      }
    });
  }

  ngOnDestroy(): void {
    // Assicurati di disporre la sottoscrizione quando il componente viene distrutto
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}

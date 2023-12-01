import { Component } from '@angular/core';
import { PostsService } from '../../posts.service';
import { IPosts } from '../../Models/iposts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  newPost: Partial<IPosts> = {};

  constructor(private postService: PostsService,
    private router:Router) {}

  oldPost:IPosts|null = null;

  loading:boolean = false;

  onSubmit() {
    this.loading = true;
    this.postService.create(this.newPost)
    .subscribe(createdPost => {

      console.log('Post creato:', createdPost);
      this.oldPost = createdPost;

        this.router.navigate(['/']);
      });
  }
}


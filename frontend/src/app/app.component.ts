import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface BlogPost {
  title: string;
  text: string;
  author: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient);
  readonly apiUrl = 'http://localhost:8000/api/posts';
  posts: BlogPost[] = [];
  post: BlogPost = { title: '', text: '', author: '' };
  result = '';
  isSubmitting = false;

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.http.get<BlogPost[]>(this.apiUrl).subscribe({
      next: (posts) => (this.posts = posts),
      error: () => (this.result = 'Unable to load posts.'),
    });
  }

  publishPost(): void {
    this.isSubmitting = true;
    this.result = 'Sending...';

    this.http.post<BlogPost>(this.apiUrl, this.post).subscribe({
      next: () => {
        this.result = 'Post published.';
        this.post = { title: '', text: '', author: '' };
        this.isSubmitting = false;
        this.loadPosts();
      },
      error: () => {
        this.result = 'The server rejected the submission.';
        this.isSubmitting = false;
      },
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chirrup, Comment } from '../../../../core/models/chirrup';
import { CommentService } from '../../services/comment.service';
import { ChirrupService } from '../../services/chirrup.service';


@Component({
  selector: 'app-chirrup-list',
  templateUrl: './chirrup-list.component.html',
  styleUrls: ['./chirrup-list.component.sass', './chirrup-card.component.sass']
})
export class ChirrupListComponent implements OnInit, OnDestroy {
  news: Chirrup[] = [];
  newCommentText: string = '';
  private refreshSubscription: Subscription;

  constructor(
    private commentService: CommentService,
    private chirrupService: ChirrupService
  ) { this.refreshSubscription = new Subscription(); }

  ngOnInit() {
    this.refreshSubscription = this.chirrupService.news.subscribe(news => {
      this.news = news;
    });

    this.chirrupService.loadChirrups();
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  toggleHeartIcon(chirrup: Chirrup) {
    chirrup.islike = !chirrup.islike;
    // 因为post service更改了model, 导致这里要handle chirrup._id undefined 的情况,实际上不会有不存在_id的post
    if (chirrup._id !== undefined) {
      localStorage.setItem(chirrup._id, chirrup.islike.toString());
    } else {
      console.error('chirrup._id is undefined');
    }
  };

  toggleCommentIcon(chirrup: Chirrup) {
    chirrup.showComments = !chirrup.showComments;
  }

  onSubmit(chirrup: Chirrup) {
    const currName = localStorage.getItem('userName');
    const newComment: Comment = {
      _id: '', // This will be generated by the backend
      publisherName: (currName === null) ? '' : currName, // Assuming default publisherName is 'Anon'
      content: {
        image: '', // Add image if available
        video: '', // Add video if available
        text: this.newCommentText, // Use the input text for the comment content
        _id: ''
      },
      publishedTime: new Date().toISOString() // Use current timestamp
    };

    this.commentService.addComment(chirrup._id || '', newComment).subscribe({
      next: _resp => {
        this.newCommentText = '';
        // After posting the comment, fetch the updated chirrups to display the new comment
        // this.loadChirrups();
        this.chirrupService.news;
        alert("you have successfully added a new comment!");
      },
      error: _err => console.log("Error posing new comment:", _err)
    });
  }
}

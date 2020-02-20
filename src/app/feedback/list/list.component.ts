import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './../../services/utils.service';
import { Feedback } from './../../models/feedback.modal';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  feedbacks: Feedback[] = [];
  getAllFeedbackSubscription: Subscription;
  constructor(private utilsService: UtilsService, private router: Router) { }

  ngOnInit() {
    this.getAllFeedbackSubscription = this.utilsService.getAllFeedback()
      .subscribe(feedbacks => this.feedbacks = feedbacks);
  }

  edit(index) {
    this.router.navigate(['edit', this.feedbacks[index].empId]);
  }

  ngOnDestroy() {
    this.getAllFeedbackSubscription.unsubscribe();
  }
}

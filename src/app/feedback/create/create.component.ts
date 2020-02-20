import { Subscription } from 'rxjs';
import { Feedback } from './../../models/feedback.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  createFeedbackForm: FormGroup;
  star = [{
    selected: true,
  }, {
    selected: false,
  }, {
    selected: false,
  }, {
    selected: false,
  }, {
    selected: false,
  }];
  getFeedbackSubscription: Subscription;
  saveFeedbackSubscription: Subscription;

  constructor(private utilsService: UtilsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const queryParam = this.route.snapshot.paramMap.get('id');
    let feedback: Feedback;

    if (queryParam) {
      this.getFeedbackSubscription = this.utilsService.getFeedback(queryParam)
        .subscribe(response => {
          feedback = response;
          this.initForm(feedback);
        });

    } else {
      this.initForm({});
    }
  }

  updateRating(rating) {
    this.star = this.star.map((val, index) => {
      if (index <= rating) {
        val.selected = true;
      }
      return val;
    });
  }

  initForm(feedback: Feedback) {
    if (feedback.rating) {
      this.updateRating(feedback.rating);
    }
    this.createFeedbackForm = new FormGroup({
      empName: new FormControl(feedback.empName || '', Validators.required),
      empId: new FormControl(feedback.empId || '', Validators.required),
      project: new FormControl(feedback.project || '', Validators.required),
      comment: new FormControl(feedback.comment || ''),
    });
  }

  selectStar(index) {
    this.star = this.star.map((val, keyIndex) => {
      val.selected = keyIndex <= index;
      return val;
    });
  }

  createFeedback() {
    if (this.createFeedbackForm.valid) {
      const { value: feedback } = this.createFeedbackForm;
      feedback.rating = this.countRating();
      this.saveFeedbackSubscription = this.utilsService.saveFeedback(feedback)
        .subscribe((response: boolean) => {
          if (response) {
            this.navigateToList();
          }
        });
    }
  }

  countRating() {
    return this.star.filter(val => val.selected).length - 1;
  }

  navigateToList() {
    this.router.navigate(['list']);
  }

  ngOnDestroy() {
    if (this.saveFeedbackSubscription) {
      this.saveFeedbackSubscription.unsubscribe();
    }
    if (this.getFeedbackSubscription) {
      this.getFeedbackSubscription.unsubscribe();
    }
  }
}

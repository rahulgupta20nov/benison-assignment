import { Router } from '@angular/router';
import { Feedback } from './../models/feedback.modal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }

  authenticate(): Observable<boolean> {
    return new Observable((observer) => {
      localStorage.setItem('login', JSON.stringify(true));
      observer.next(true);
    });
  }

  saveFeedback(feedback: Feedback): Observable<boolean> {
    return new Observable(observer => {
      this.getAllFeedback()
        .subscribe(feedbacks => {
          const findIndex = feedbacks.findIndex(val => val.empId === feedback.empId);
          if (findIndex > -1) {
            feedbacks[findIndex] = feedback;
          } else {
            feedbacks.push(feedback);
          }
          localStorage.setItem('feedback', JSON.stringify(feedbacks));
          observer.next(true);
        });
    });
  }

  getAllFeedback(): Observable<Feedback[]> {
    return new Observable(observer => {
      const feedbacks: Feedback[] = JSON.parse(localStorage.getItem('feedback'));
      observer.next(feedbacks || []);
    });
  }

  getFeedback(id): Observable<Feedback> {
    return new Observable(observer => {
      this.getAllFeedback()
        .subscribe(feedbacks => {
          const findIndex = feedbacks.findIndex(val => val.empId === id);
          if (findIndex === -1) {
            this.router.navigate(['list']);
          }
          observer.next(feedbacks[findIndex]);
        });
    });
  }
}

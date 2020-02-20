import { Subscription } from 'rxjs';
import { UtilsService } from './../../services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  feedbackForm: FormGroup;
  authenticateSubscription: Subscription;
  constructor(
    private utilService: UtilsService,
    private router: Router) { }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  authenticateUser(event) {
    if (this.feedbackForm.valid) {
      this.authenticateSubscription = this.utilService.authenticate()
        .subscribe(response => {
          if (response) {
            this.router.navigate(['/list']);
          }
        });
    }
  }

  ngOnDestroy() {
    this.authenticateSubscription.unsubscribe();
  }

}

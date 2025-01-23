import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HomePage {
  eventForm: FormGroup;
  Event: Event[] = [];
  isEditing = false;
  
  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
}
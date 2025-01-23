import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


interface Event {
  id: string;  
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  confirmed: boolean;
  managerName: string;
  managerPhone: string;
}

@Injectable({
  providedIn: 'root'
})
class EventService {
  private events: Event[] = [];
  private eventsSubject = new BehaviorSubject<Event[]>([]);

  events$ = this.eventsSubject.asObservable();

  addEvent(event: Omit<Event, 'id'>) {
    const newEvent: Event = {
      ...event,
      id: this.generateId()
    };
    this.events.push(newEvent);
    this.eventsSubject.next([...this.events]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  toggleConfirmation(eventId: string) {
    const index = this.events.findIndex(e => e.id === eventId);
    if (index !== -1) {
      this.events[index].confirmed = !this.events[index].confirmed;
      this.eventsSubject.next([...this.events]);
    }
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    ReactiveFormsModule, 
    CommonModule
  ]
})
export class HomePage {
  eventForm: FormGroup;
  events$: Observable<Event[]>;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      location: ['', Validators.required],
      confirmed: [false],
      managerName: ['', Validators.required],
      managerPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.events$ = this.eventService.events$;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const { id, ...eventData } = this.eventForm.value;
      this.eventService.addEvent(eventData);
      this.eventForm.reset();
    }
  }

  toggleConfirmation(eventId: string) {
    this.eventService.toggleConfirmation(eventId);
  }
}
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TodoAlarmService {
  private events = {};

  connectSSE(userId: string): Observable<any> {
    if (!this.events[userId]) {
      this.events[userId] = new Subject();
    }
    return this.events[userId].asObservable();
  }

  sendEvent(userId: string) {
    if (!this.events[userId]) {
      this.events[userId] = new Subject();
    }
    this.events[userId].next('alarmChanged' + new Date().toString());
  }
}

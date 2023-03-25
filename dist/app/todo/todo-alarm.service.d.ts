import { Observable } from 'rxjs';
export declare class TodoAlarmService {
    private events;
    connectSSE(userId: string): Observable<any>;
    sendEvent(userId: string): void;
}

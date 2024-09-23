import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private students: SchoolData[] = [
    { id: '1', name: 'Marcos' },
    { id: '2', name: 'João' },
    { id: '3', name: 'Maria' },
  ];

  private teachers: SchoolData[] = [
    { id: '1', name: 'Pedro' },
    { id: '2', name: 'Paulo' },
    { id: '3', name: 'Ana' },
  ];

  public getStudents(): Observable<SchoolData[]> {
    return of(this.students);
  }

  public getTeachers(): Observable<SchoolData[]> {
    return of(this.teachers);
  }
}

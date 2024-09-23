import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'todo-list';
  public students: SchoolData[] = [];
  public teachers: SchoolData[] = [];
  private zipSchoolResponses$ = zip(
    this.getStudentsData(),
    this.getTeachersData()
  );

  constructor(private schoolService: SchoolService) {}

  public ngOnInit(): void {
    this.getSchoolData();
  }

  public getSchoolData() {
    this.zipSchoolResponses$.subscribe({
      next: ([students, teachers]) => {
        console.log(students, teachers);
        this.students = students;
        this.teachers = teachers;
      },
    });
  }

  private getStudentsData(): Observable<SchoolData[]> {
    return this.schoolService.getStudents();
  }

  private getTeachersData(): Observable<SchoolData[]> {
    return this.schoolService.getTeachers();
  }
}

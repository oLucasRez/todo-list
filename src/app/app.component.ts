import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, Observable, of, zip } from 'rxjs';

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
  private ages = of(20, 30, 40, 50, 60, 70);
  private agesWithFrom = from([20, 30, 40, 50, 60, 70]);

  constructor(private schoolService: SchoolService) {}

  public ngOnInit(): void {
    this.getSchoolData();
    this.getMultipliedAges();
  }

  public getMultipliedAges() {
    this.ages
      .pipe(
        filter((age) => age > 30),
        map((age) => age * age)
      )
      .subscribe({
        next: (age) => {
          console.log(age);
        },
      });
  }

  public getMultipliedAgesWithFrom() {
    this.agesWithFrom.pipe(map((age) => age * age)).subscribe({
      next: (age) => {
        console.log(age);
      },
    });
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

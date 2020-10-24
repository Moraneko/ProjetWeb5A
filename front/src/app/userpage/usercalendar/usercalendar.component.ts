import {
  OnInit,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  IterableDiffers
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { Cours } from '../../model/cours';
import { CoursInfoUserComponent } from './cours-info-user/cours-info-user.component'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-usercalendar',
  templateUrl: './usercalendar.component.html',
  styleUrls: ['./usercalendar.component.css'],
  encapsulation: ViewEncapsulation.None,
    styles: [
      `
        .cal-week-view .cal-time-events .cal-day-column {
          margin-right: 10px;
        }

        .cal-week-view .cal-hour {
          width: calc(100% + 10px);
        }
      `,
    ],
})
export class UsercalendarComponent implements OnInit {
  @Input()  dataSource: Cours[];

  private iterableDiffer;
  private viewFinishedInit = false;

  constructor(private iterableDiffers: IterableDiffers, private dialog: MatDialog) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }
  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];


  ngOnInit(): void {
    this.dataSource.forEach(value => this.updateCalendrierList(value, this.events));
  }

  ngAfterViewInit() {
    this.viewFinishedInit = true;
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.dataSource);
    if (changes && this.viewFinishedInit) {
       this.events = [];
       this.dataSource.forEach(value => this.updateCalendrierList(value, this.events));
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    var modalData = { event, action };
    console.log(modalData);
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  private updateCalendrierList (cours, events){
    var titre = 'Cours';
    if (cours.titre != ''){
      titre = cours.titre;
    }
    var coursToCalendrierEv =
      {
        start: cours.horaire,
        end: addHours(cours.horaire, 2),
        title: titre,
        content: cours,
        color: {
                   primary: '#1e90ff',
                   secondary: '#D1E8FF',
                 },
      };
    events.push(coursToCalendrierEv);
  }

  eventClicked(event): void {
    const dialogRef = this.dialog.open(CoursInfoUserComponent, {
      width: '100em',
      data: {cours: event.event}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

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
import {MatDialog} from '@angular/material/dialog';
import {MoniteurCoursModalComponent} from './../moniteur-cours-modal/moniteur-cours-modal.component';

@Component({
  selector: 'app-moniteurcalendar',
  templateUrl: './moniteurcalendar.component.html',
  styleUrls: ['./moniteurcalendar.component.css'],
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
export class MoniteurcalendarComponent implements OnInit {
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
    const changes = this.iterableDiffer.diff(this.dataSource);
    if (changes && this.viewFinishedInit) {
       this.events = [];
       this.dataSource.forEach(value => this.updateCalendrierList(value, this.events));
    }
  }

  private updateCalendrierList(cours, events){
    let titre = 'Cours';
    if (cours.titre != ''){
      titre = cours.titre;
    }
    let coursToCalendrierEv;
    if (cours.etat == 0 ){
       coursToCalendrierEv =
        {
          start: cours.dateDebut,
          end: cours.dateFin,
          title: titre,
          content: cours,
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
          },
        };
    } else {
      coursToCalendrierEv =
        {
          start: cours.dateDebut,
          end: cours.dateFin,
          title: titre,
          content: cours,
          color: {
            primary: '#F8580D',
            secondary: '#F8580D',
          },
        };
    }

    events.push(coursToCalendrierEv);
  }
  eventClicked(event): void {
    if(event.event.content.etat === 0){
      const dialogRef = this.dialog.open(MoniteurCoursModalComponent, {
        width: '100em',
        data: {cours: event.event}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}

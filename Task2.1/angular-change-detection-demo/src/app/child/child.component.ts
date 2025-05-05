import { Component, Input, OnChanges, SimpleChanges, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Using OnPush change detection strategy
})
export class ChildComponent implements OnChanges, DoCheck {
  @Input() user: User;
  @Input() users: User[] = [];
  
  changeDetectionCount = 0;
  ngOnChangesCount = 0;
  lastChangeLog: string[] = [];
  
  constructor(private cdr: ChangeDetectorRef) {
    console.log('Child component constructor called');
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.ngOnChangesCount++;
    this.lastChangeLog = [];
    
    console.log(`Child ngOnChanges called #${this.ngOnChangesCount}`, changes);
    
    // Log which inputs changed
    if (changes['user']) {
      const userChange = changes['user'];
      this.lastChangeLog.push(`'user' changed: ${JSON.stringify(userChange.previousValue)} → ${JSON.stringify(userChange.currentValue)}`);
      this.lastChangeLog.push(`First change: ${userChange.firstChange}`);
      this.lastChangeLog.push(`Reference changed: ${userChange.previousValue !== userChange.currentValue}`);
    }
    
    if (changes['users']) {
      const usersChange = changes['users'];
      this.lastChangeLog.push(`'users' array changed`);
      this.lastChangeLog.push(`First change: ${usersChange.firstChange}`);
      this.lastChangeLog.push(`Reference changed: ${usersChange.previousValue !== usersChange.currentValue}`);
    }
  }
  
  ngDoCheck() {
    this.changeDetectionCount++;
    console.log(`Child change detection run #${this.changeDetectionCount}`);
  }
  
  // Method to force change detection
  forceChangeDetection() {
    console.log('Manually triggering change detection in child');
    this.cdr.markForCheck();
  }
  
  // Method for trackBy function demo
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
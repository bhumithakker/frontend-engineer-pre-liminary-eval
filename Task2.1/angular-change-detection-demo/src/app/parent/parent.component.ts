import { Component, DoCheck } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements DoCheck {
  title = 'Change Detection Demo';
  changeDetectionCount = 0;
  
  // Properties for demonstrating change detection
  userObject: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
  userArray: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  counter = 0;
  
  constructor() {
    console.log('Parent component constructor called');
  }
  
  ngDoCheck() {
    this.changeDetectionCount++;
    console.log(`Parent change detection run #${this.changeDetectionCount}`);
  }
  
  // Method that mutates the existing object (non-immutable update)
  updateUserObjectMutable() {
    this.userObject.name = `John Doe (updated ${++this.counter})`;
    console.log('User object mutated', this.userObject);
  }
  
  // Method that creates a new object (immutable update)
  updateUserObjectImmutable() {
    this.userObject = { 
      ...this.userObject, 
      name: `John Doe (updated ${++this.counter})` 
    };
    console.log('Created new user object', this.userObject);
  }
  
  // Method that mutates the array (non-immutable update)
  updateArrayMutable() {
    this.userArray[0].name = `John Doe (updated ${++this.counter})`;
    console.log('Array mutated', this.userArray);
  }
  
  // Method that creates a new array (immutable update)
  updateArrayImmutable() {
    this.userArray = [
      { ...this.userArray[0], name: `John Doe (updated ${++this.counter})` },
      ...this.userArray.slice(1)
    ];
    console.log('Created new array', this.userArray);
  }
  
  // Method to add a new item to array
  addUser() {
    const newId = this.userArray.length + 1;
    this.userArray.push({
      id: newId,
      name: `New User ${newId}`,
      email: `user${newId}@example.com`
    });
  }
  
  // Method to add a new item immutably
  addUserImmutable() {
    const newId = this.userArray.length + 1;
    this.userArray = [
      ...this.userArray,
      {
        id: newId,
        name: `New User ${newId}`,
        email: `user${newId}@example.com`
      }
    ];
  }
  
  // Method for trackBy function demo
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
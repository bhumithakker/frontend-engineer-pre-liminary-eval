import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pure pipe that returns the same reference if the input hasn't changed,
 * ensuring OnPush components are only updated when necessary.
 * 
 * This pipe helps demonstrate how pure pipes can optimize change detection
 * by preventing unnecessary renders when object properties are mutated
 * but the object reference hasn't changed.
 */
@Pipe({
  name: 'immutability',
  pure: true
})
export class ImmutabilityPipe implements PipeTransform {
  transform<T>(value: T): T {
    console.log('ImmutabilityPipe transform called with:', value);
    return value;
  }
}
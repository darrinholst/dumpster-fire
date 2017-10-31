import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  info(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

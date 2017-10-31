import {NgModule} from '@angular/core';
import {
  MatSnackBarModule,
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';

const modules = [
  MatSnackBarModule,
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule,
  MatListModule,
  MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}

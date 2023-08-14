import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowDataComponent } from './student-data/show-data/show-data.component';
import {SharedService} from './shared.service'
import{HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import{NgxPaginationModule} from 'ngx-pagination';
import{MatPaginatorModule} from '@angular/material/paginator';
import{MatTableModule} from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import{MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ShowDataComponent
  ],
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    NoopAnimationsModule ,
    BrowserAnimationsModule,
   ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

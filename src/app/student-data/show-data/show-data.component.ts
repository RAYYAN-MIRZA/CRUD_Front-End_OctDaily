// import { EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { student_data } from './Interface';
import { MatSort, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css'],
})
export class ShowDataComponent implements OnInit {
  constructor(private service: SharedService) { }


  variable: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;

  searchQuery!: string;
  StudentsList: any = [];
  ROLL_NO_FILTER: string = "";
  STUDENT_LIST_FOR_FILTER: any = [];
  Activator_add_update_compo: boolean = false;
  title = "demo";

  /******************         THEME SWITCH     ************************************************************* */
  colcolor = 'grey';
  rowcolor = 'rgb(34, 32, 32)';
  slider = 'accent';
  font: any; // class selecter for font color change 
  add_edit_font_col: any;
  paginator_colour = 'black';
  theme(checked: boolean) {
    if (checked) {
      // document.body.style.backgroundColor = 'lightgrey';
      this.rowcolor = 'rgb(220, 227, 244)      ';
      this.font.style.color = 'black';
      this.font.style.fontWeight = "600";
      this.colcolor = "darkgrey";
      this.slider = 'primary';
      this.paginator_colour = 'black';
    }
    else {
      // document.body.style.backgroundColor = ' rgba(211, 211, 211, 0.576)';
      this.font.style.color = 'white';
      this.rowcolor = 'rgb(34, 32, 32)';
      this.slider = 'accent';
      this.paginator_colour = 'black';

    }
  }

  /**********    theme change       * */


  /***************************************     FOR FORM INPUT      *****************************************************/
  input1!: string;
  input2!: string;
  input3!: string;
  input4!: string;
  input5!: string;
  input6!: string;
  regex_alpha = /^[A-Za-z\s]+$/; // regular expression for alphabets
  regex_digit = /^\d+$/; // regular expression for digits
  empty: string = "Input Field cannot be empty!";
  num: string = "Only Digits are allowed!";
  alpha: string = "Only alphabets are allowed!";
  emal: string = "Incorrect Email Format!";

  add_inp: HTMLInputElement[] = []; // 1-D array
  edit_inp: HTMLInputElement[] = []; // 1-D array

  chick: boolean = true;  
  roll_no_for_updation: any;
  whoCalled: boolean = false;
  isPopupOpen: boolean = false;
  isPopupUpdateOpen: boolean = false;
  /*****************************************************************************************/
  displayedColumns: string[] = ['ROLL_NO', 'NAME', 'FIELD', 'NATIONALITY', 'BATCH', 'EMAIL', 'OPTIONS'];
  @ViewChild('paginator')
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<student_data>;

  ngOnInit() {
    this.refreshStudentList();
  }
  MyNgAfterViewInit() {
    setTimeout(() => {
      this.font = document.querySelector(".classTable") as HTMLElement;
      const in1 = document.querySelectorAll(".add_inp") as NodeListOf<HTMLInputElement>;
      this.add_inp = Array.from(in1);
      const in2 = document.querySelectorAll(".editinp") as NodeListOf<HTMLInputElement>;
      this.edit_inp = Array.from(in2);// converting list into array            
      this.dataSource = new MatTableDataSource(this.StudentsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  refreshStudentList() {
    this.service.getStudentList().subscribe(data => {
      this.StudentsList = data;
      this.STUDENT_LIST_FOR_FILTER = data;
      this.MyNgAfterViewInit();
    });
  }
  /*********************        FORM AUTHENTICATION      ***********************************************/
  check_edit() {
    this.chick = true;
    for (let i = 0; i < this.edit_inp.length; i++) {            
      if (this.edit_inp[i].value.length === 0) {
        this.edit_inp[i].setCustomValidity("Input Field cannot be empty!");
        this.edit_inp[i].reportValidity();
        this.chick = false;
        return;
      }
      if (i === 0) {
        if (!this.regex_digit.test(this.edit_inp[i].value)) {
          this.edit_inp[i].setCustomValidity("Only Digits Are Allowed!");
          this.edit_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 1 || i === 2 || i === 3) {
        if (!this.regex_alpha.test(this.edit_inp[i].value)) {
          this.edit_inp[i].setCustomValidity("Only English Alphabets Are Allowed!");
          this.edit_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 4) {
        if (!this.regex_digit.test(this.edit_inp[i].value)) {
          this.edit_inp[i].setCustomValidity("Only Digits Are Allowed!");
          this.edit_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 4) {
        if (this.edit_inp[i].value.length !== 4) {
          this.edit_inp[i].setCustomValidity("Invalid Year!");
          this.edit_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 5) {
        if (this.edit_inp[i].value.indexOf("@") === -1 && this.edit_inp[i].value.indexOf(".") === -1) {
          this.edit_inp[i].setCustomValidity("Invalid Email Format!");
          this.edit_inp[i].reportValidity();
          this.chick = false;
          return;
        }
        else {
          let count = 0;
          for (let j = 0; j < this.edit_inp[i].value.length; j++) {
            if (this.edit_inp[i].value[j] === '@' || this.edit_inp[i].value[j] === '.')
              count++;
          }
          if (count  <= 1 ) {
            this.edit_inp[i].setCustomValidity("Invalid Email Format!");
            this.edit_inp[i].reportValidity();
            this.chick = false;
            return;
          }
        }
      }
    }
  }
  check_add() {
    this.chick = true;
    for (let i = 0; i < this.add_inp.length; i++) {

      if (this.add_inp[i].value.length === 0) {
        this.add_inp[i].setCustomValidity("Input Field cannot be empty!");
        this.add_inp[i].reportValidity();
        this.chick = false;
        return;
      }
      if (i === 0) {
        if (!this.regex_digit.test(this.add_inp[i].value)) {
          this.add_inp[i].setCustomValidity("Only Digits Are Allowed!");
          this.add_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 1 || i === 2 || i === 3) {
        if (!this.regex_alpha.test(this.add_inp[i].value)) {
          this.add_inp[i].setCustomValidity("Only English Alphabets Are Allowed!");
          this.add_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 4) {
        if (!this.regex_digit.test(this.add_inp[i].value)) {
          this.add_inp[i].setCustomValidity("Only Digits Are Allowed!");
          this.add_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 4) {
        if (this.add_inp[i].value.length !== 4) {
          this.add_inp[i].setCustomValidity("Invalid Year!");
          this.add_inp[i].reportValidity();
          this.chick = false;
          return;
        }
      }
      if (i === 5) {
        if (this.add_inp[i].value.indexOf("@") === -1 && this.add_inp[i].value.indexOf(".") === -1) {
          this.add_inp[i].setCustomValidity("Invalid Email Format!");
          this.add_inp[i].reportValidity();
          this.chick = false;
          return;
        }
        else {
          let count = 0;
          for (let j = 0; j < this.add_inp[i].value.length; j++) {
            if (this.add_inp[i].value[j] === '@' || this.add_inp[i].value[j] === '.')
              count++;
          }
          if (count <= 1) {
            this.add_inp[i].setCustomValidity("Invalid Email Format!");
            this.add_inp[i].reportValidity();
            this.chick = false;
            return;
          }
        }
      }
    }
  }

  /******************************************* */

  /*******************   ON DELETE      CLICK                      ********************************************/
  onDelete(id: number) {
    if (confirm("ARE YOU SURE YOU WANT TO DELETE ?")) {
      this.FinalDelete(id);
    }
  }
  FinalDelete(id: number) {
    this.service.DeleteStudentList(id).subscribe(res => {
      alert(res.toString());
      this.refreshStudentList();
    })
  }

  /*                                                                                         */
  modalTitle: any;
  stud: any;
  ID_FOR_UPDATION!: number;
  /***************************      UPDATE STUDENT DATA            **************************************************** */
  onEdit(item?: any) {
    this.OpenPopupUpdate();
    this.input1 = `${item.ROLL_NO}`;
    this.input2 = `${item.NAME}`;
    this.input3 = `${item.FIELD}`;
    this.input4 = `${item.NATIONALITY}`;
    this.input5 = `${item.BATCH}`;
    this.input6 = `${item.EMAIL}`;
    this.ID_FOR_UPDATION = parseInt(`${item.ID}`);
    this.roll_no_for_updation = parseInt(`${item.ROLL_NO}`);         //yes  NEEDED
  }

  UpdateStudentData() {    //  FINAL DATA GOING INTO THE DATA BASE 
    this.check_edit();
    if (!this.chick) {// false tha true karo or bahr niklo
      return;
    }

    var ret = {
      ROLL_NO: this.input1,
      NAME: this.input2.toUpperCase(),
      FIELD: this.input3.toUpperCase(),
      NATIONALITY: this.input4.toUpperCase(),
      BATCH: this.input5,
      EMAIL: this.input6,
      ID: this.ID_FOR_UPDATION
    }
    var roll = parseInt(this.input1);
    var index = this.StudentsList.findIndex(((student: { ROLL_NO: number; }) => student.ROLL_NO === roll));
    if (this.roll_no_for_updation === roll)  // IF THE USER IS NOT CHANGING THE ROLL NUMBER AND CHANGING OTHER INFORMATION
    {
      index = -1;
    }
    if (index !== -1) {                       //   THE ROLL.NO IS taken by some student  
      alert("ROLL NUMBER ALREADY TAKEN!");
      this.onEdit();
    }
    else {
      //       yaha krni hai authentication !
      this.service.UpdateStudentList(ret).subscribe(res => {
        alert(res.toString());
        this.refreshStudentList();
        this.ClosePopupUpdate();
      });
    }
  }

  OpenPopupUpdate() {
    this.isPopupUpdateOpen = true;
  }
  ClosePopupUpdate() {
    this.input1 = '';
    this.input2 = '';
    this.input3 = '';
    this.input4 = '';
    this.input5 = '';
    this.input6 = '';
    this.isPopupUpdateOpen = false;
  }
  getMaxRollNo(): any {
    const maxRollNo = this.StudentsList.reduce((max: number, student: { ROLL_NO: number; }) => {
      return Math.max(max, student.ROLL_NO);
    }, -Infinity);

    return (maxRollNo + 1);
  }
  /******************       ADD STUDENT LOGIC              *********************************************************/
  OnAdd(whocalled?: boolean) {
    if (whocalled === false) {
      this.input1 = (this.getMaxRollNo());
      this.input2 = '';
      this.input3 = '';
      this.input4 = '';
      this.input5 = '';
      this.input6 = '';
      this.openPopup();
    }
    else {
      this.input1 = (this.getMaxRollNo());
      this.openPopup();
      this.whoCalled = false;
    }
  }
  Add_Student() {    // SAVE BUTTON ===>final to the database  
    this.check_add();
    
    if (!this.chick) {
      return;
    }

    var ret = {
      ROLL_NO: this.input1,
      NAME: this.input2.toUpperCase(),
      FIELD: this.input3.toUpperCase(),
      NATIONALITY: this.input4.toUpperCase(),
      BATCH: this.input5,
      EMAIL: this.input6,
    }
    var roll = parseInt(this.input1);
    var index = this.StudentsList.findIndex(((student: { ROLL_NO: number; }) => student.ROLL_NO === roll));
    if (index !== -1)  ///  the roll no is taken by some student
    {
      alert("ROLL NUMBER ALREADY TAKEN !");
      this.whoCalled = true;
      this.OnAdd(this.whoCalled);
    }
    else {
      this.service.addToStudentList(ret).subscribe(res => {
        alert(res.toString());
        this.refreshStudentList();
        this.closePopup();
      });
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.input1 = '';
    this.input2 = '';
    this.input3 = '';
    this.input4 = '';
    this.input5 = '';
    this.input6 = '';
    this.isPopupOpen = false;
  }

  /**************************************************************************************/
  applyFilter() {//
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
  }
};














































import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.scss'
})
export class TodoDialogComponent implements OnInit {
  toDoForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data : any){
    
  }

  ngOnInit(): void {
    
  }

  getNameError(){
    if(this.toDoForm.controls.name.hasError('required')){
      return 'You must enter task name.'
    }
    return ''
  }

}

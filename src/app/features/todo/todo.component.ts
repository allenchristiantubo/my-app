import { Component, ComponentRef, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarService } from '../../core/services/navbar.service';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Portal } from '@angular/cdk/portal';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { TodoConfirmationDialogComponent } from './todo-confirmation-dialog/todo-confirmation-dialog.component';
import { SnackbarService } from '../../core/services/snackbar.service';

// export interface StoryTaskBug{
//   name: string;
//   status: Status;
//   priority: number;
//   dateCreated: Date;
//   dateModified: Date;
// }

// export interface UserStory extends StoryTaskBug{ 
//   description: string;
//   taskBugs: TaskBug[];
// }

// export interface TaskBug extends StoryTaskBug{
//   type: Type;
//   effort: Effort;
//   description?: string;
//   retroSteps?: string;
//   systemInfo?: string;
// }

// export interface Effort{
//   originalEstimate: number;
//   remaining: number;
//   completed: number;
// }

export enum Type{
  UserStory,
  Task,
  Bug
}

export enum Status{
  New,
  InProgress,
  Completed
}

export interface ToDo{
  name: string;
  date: Date;
  status: Status;
}

const TODO_DATA: ToDo[] = [
    {
      name: 'Task 1',
      date: new Date('6/2/24'),
      status: 0
    },
    {
      name: 'Task 2',
      date: new Date('6/2/24'),
      status: 1,
    },
    {
      name: 'Task 3',
      date: new Date('6/2/24'),
      status: 2
    }
]

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit{
  @ViewChild('leftDrawer', {static: true}) leftDrawer!: MatDrawer;
  @ViewChild('rightPanelPortal') rightPanelPortal!: Portal<any>;

  showFiller = false;
  destroyRef = inject(DestroyRef);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  toDoData = TODO_DATA;
  newData: ToDo[] = [];
  onGoingData: ToDo[] =[];
  doneData: ToDo[] = [];
  type = Type;
  showFilter: boolean = false;
  
  constructor(private navbarService: NavbarService,
    private snackBarService: SnackbarService,
    private dialog: MatDialog
  ){
    this.navbarService.isNavbarVisible.next(true);
  }

  getTypes(): Array<string>{
    var types: string[] = [];
   for(var enumMember in this.type){
    if(!(Number(enumMember) >= 0)){
      types.push(enumMember)
    }
   }
   return types;
  }

  ngOnInit(): void {
    this.controlLeftDrawer();
    this.filterTaskData();
  }

  filterTaskData(){
    this.newData = this.toDoData.filter(x => x.status === Status.New);
    this.onGoingData = this.toDoData.filter(x => x.status === Status.InProgress);
    this.doneData = this.toDoData.filter(x => x.status === Status.Completed);
  }

  controlLeftDrawer(){
    this.navbarService.isDrawerOpen
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isDrawerOpen: boolean) => {
        isDrawerOpen ? this.leftDrawer.open() : this.leftDrawer.close();
      })

      this.leftDrawer.openedChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isOpen: boolean) => {
        this.navbarService.isDrawerOpen.next(isOpen);
      })
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    console.log('EVENT', event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addNewTask(){
    // var x = of("hello").pipe(delay(5000), timeout(4000));

    // x.subscribe(r => {
    //   console.log(r);
    // })
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {action: 'Add'}
    });

    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if(data){
          var existing = this.toDoData.find(x => x.name == data.name);
          if(existing){
            this.snackBarService.open(`${data.name} is already existing`,'Ok',50000, 'error-snackbar')
          }else{
            var newTodo : ToDo = {
              name: data.name,
              date: new Date(),
              status: Status.New
            }
            
            this.toDoData.push(newTodo);
            this.filterTaskData();
          }
        }
      }
    })
  }

  deleteTask(taskToDelete: ToDo){
    const dialogRef = this.dialog.open(TodoConfirmationDialogComponent, {
      data: {action: 'Add', taskToDelete: taskToDelete}
    });

    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if(data){
          var index = this.toDoData.findIndex(task => task == taskToDelete);
          if(index >= 0){
            this.toDoData.splice(index, 1);
            this.filterTaskData();
          }
        }
      }
    })
  }
}

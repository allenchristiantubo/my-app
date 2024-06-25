import { Component, ComponentRef, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarService } from '../../core/services/navbar.service';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Portal } from '@angular/cdk/portal';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

export interface StoryTaskBug{
  name: string;
  status: Status;
  priority: number;
  dateCreated: Date;
  dateModified: Date;
}

export interface UserStory extends StoryTaskBug{ 
  description: string;
  taskBugs: TaskBug[];
}

export interface TaskBug extends StoryTaskBug{
  type: Type;
  effort: Effort;
  description?: string;
  retroSteps?: string;
  systemInfo?: string;
}

export interface Effort{
  originalEstimate: number;
  remaining: number;
  completed: number;
}

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

const USER_STORY_DATA: UserStory[] = [
  {
    name: '',
    description: '',
    status: Status.New,
    priority: 0,
    dateCreated: new Date(),
    dateModified: new Date(),
    taskBugs: [
      {
        name: '',
        description: '',
        type: Type.Task,
        status: Status.New,
        priority: 0,
        dateCreated: new Date(),
        dateModified: new Date(),
        effort: {
          originalEstimate : 0,
          remaining: 0,
          completed: 0
        }
      },
      {
        name: '',
        retroSteps: '',
        systemInfo: '',
        type: Type.Bug,
        status: Status.New,
        priority: 0,
        dateCreated: new Date(),
        dateModified: new Date(),
        effort: {
          originalEstimate : 0,
          remaining: 0,
          completed: 0
        }
      }
    ]
  }
]

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
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {action: 'Add'}
    });

    dialogRef.afterClosed().subscribe({
      next: (response: any) => {
        var newTodo : ToDo = {
          name: `Task ${this.toDoData.length + 1}`,
          date: new Date(),
          status: Status.New
        }
        this.toDoData.push(newTodo);
        this.filterTaskData();
      }
    })
  }
}

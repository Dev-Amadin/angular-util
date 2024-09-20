import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TableSearchService, User } from './table-search.service';
import { debounceTime, distinctUntilKeyChanged, map, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './table-search.component.html',
  styleUrl: './table-search.component.scss'
})
export class TableSearchComponent{
  fb = inject(FormBuilder);
  userService = inject(TableSearchService)

  searchConfigForm = this.fb.nonNullable.group({
    userName: [''],
    resultLimit: [3]
  });

  searchConfig$ = this.searchConfigForm.valueChanges.pipe(
    debounceTime(300),
    distinctUntilKeyChanged("userName"),
    map((config)=>{
      const trimmedConfig = {
        ...config,
        userName: config.userName?.trim() || '',
      };
      return trimmedConfig;
    }),
    tap((trimmedConfig)=> localStorage.setItem('searchConfig', JSON.stringify(trimmedConfig)) )
  );

  users$ = this.searchConfig$.pipe(
    switchMap((searchConfig) =>  this.userService.findUsers(searchConfig)),
    shareReplay(1)
  )

}

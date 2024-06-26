import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.sass']
})
export class AdminUserInfoComponent implements OnInit {

  @Input() currUser: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }

  public volver(){
    this.router.navigate(['/logo']);
  }

}

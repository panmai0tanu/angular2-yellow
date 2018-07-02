import { Component } from '@angular/core';
import templateString from './secondId.html';
import { MyDataService } from '../my_data/my_data.service';
import { MyData } from '../my_data/my_data';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  template: templateString,
  providers: [ MyDataService ]
})
export class SecondIdComponent {
  private myDatas: any;
  private attrs: any
  private newMyData: MyData;
  private createLabel;
  private id_route;

  constructor(private myDataService: MyDataService , 
    private activatedRoute: ActivatedRoute) {
  // subscribe to router event
    this.activatedRoute.params.subscribe(params => {
      this.id_route = params['id'];
      console.log(params);
    });

  }

  ngOnInit() {
    this.getAll();
    this.newMyData = new MyData();
    this.texttext = new MyData();
    this.createLabel = "Create";

  }

  getAll() {
    this.myDataService.all().subscribe(resp => {
      console.log(resp[this.id_route-1]);
      this.myDatas = resp[this.id_route-1];
    }, e => {
      console.log(e);
    })
  }

  update(id, string_test, integer_test, boolean_test) {
    this.attrs = {
      string_test: string_test,
      integer_test: integer_test,
      boolean_test: boolean_test
    }
    this.myDataService.update(id, this.attrs).subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
    }, e => {
      console.log(e);
    })
  }

  create(newMyData) {
    console.log(newMyData.getCreateParam())
    this.myDataService.create(newMyData.getCreateParam()).subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
      this.newMyData = new MyData();
    }, e => {
      console.log(e);
    })
  }

}
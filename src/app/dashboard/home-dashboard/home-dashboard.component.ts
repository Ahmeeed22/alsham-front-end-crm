import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  tree :any[]=[{
            name:"first",
            testCases:
                      [
                        {name:"testCase one"},
                        {name:"testCase two"},
                        {name:"testCase three"},
                      ]
        },
        {
          name:"second ",
          testCases:
                    [
                      {name:"testCase one2"},
                      {name:"testCase two2"},
                      {name:"testCase three2"},
                    ]
      },
]
  constructor() { }

  ngOnInit(): void {
  }

  addTestPlane(nameOfTestPlane:any){
    console.log(nameOfTestPlane);
    this.tree.push({name:nameOfTestPlane ,testCases:[]})
    
  }
  addTestCase(){
    
  }

  saveNode(x:any,index:number){
    this.tree[index].testCases.push({name:x})
    console.log(x,index);
    
  }
}

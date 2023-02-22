import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  flage:boolean=true ;
  @ViewChildren('itemValue') itemValue!: QueryList<ElementRef>;
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
    this.tree.push({name:nameOfTestPlane ,testCases:[]})
  }

  addTestCase(index:number){
    let ele=document.getElementById(`${index}test`)
    ele?.classList.toggle('d-none')
  }


  saveNode(x:any,index:number){
    this.tree[index].testCases.push({name:x})
    let ele=document.getElementById(`${index}test`)
    ele?.classList.toggle('d-none')
    this.itemValue.toArray().forEach(val => val.nativeElement.value = null);
    
  }

  expandList(e:any,i:number){
    this.flage =!this.flage;
    if ( this.flage ) {
       document.getElementById(`${i}btn`)!.innerHTML=`<i class="fa-solid fa-arrow-right-long"></i>`
    } else {
       document.getElementById(`${i}btn`)!.innerHTML=`<i class="fa-solid fa-arrow-down"></i>`
      }
      let ele=document.getElementById(`${i}testCases`)
          ele?.classList.toggle('d-none')
          e.stopPropagation()
  }


}

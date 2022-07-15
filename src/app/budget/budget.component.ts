import { Component, OnInit } from '@angular/core';
import { BudgetsDto } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  userBudgets: BudgetsDto[] = [];
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBudgets();
  }

getBudgets(){
  
  this.http.get<BudgetsDto[]>('https://localhost:7023/api/budgets/getbudgetsforuser/1')
  .pipe(map( responseData => {
   // const postArray: BudgetsDto[] = [];
    for (const key in responseData) {
      this.userBudgets.push({ ...responseData[key]});
    }
    return this.userBudgets;
  }))
  .subscribe({
    next: data => {
      
      console.log(data);
    },
    error: error => {
      console.log("error");
    }
  })
}


  //  = [
  //   {
  //     name: "Budget 1 from ts",
  //     defaultAmount: 100.00,
  //     spentAmount: 50.00
  //   },
  //   {
  //     name: "Budget 2 from ts",
  //     defaultAmount: 100.00,
  //     spentAmount: 50.00
  //   }
  // ];


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../models/member';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  members: Member[] = [];
  displayBadge!: boolean;

  //     a(){
  //    return this.members.forEach((f)=>{
  //    return f.members?.find((b)=>{
  //      return b.age>=60;
  //    })
  //   });

  // };

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getMembers().subscribe({
      next: members => {
        this.members = members;
        console.log(members)

      }
    });
    // // console.log(this.a())
    // let a = this.members.every((m) =>
    //   m.members?.every(p => p.age < 60));
    // this.displayBadge = a;
    // console.log(this.displayBadge)


  }
  displayRisk(id: number): boolean {

    let r: boolean = true;

    let house = this.members.find((f) => f.id === id);

    let mem = house?.members?.every((a) => a.age < 60);
    if (!!mem)
      r = false;

    return r;
  }


  onAdd() {
    this.router.navigate(['/add'])
  }
  details(id: number) {
    this.router.navigate(['/house-details', id])
  }

}

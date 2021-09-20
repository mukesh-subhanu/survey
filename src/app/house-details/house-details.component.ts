import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/member';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {
  member!: Member;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const param = (this.route.snapshot.paramMap.get('id'));
    if (param) {
      const id = +param;
      this.getHouseDetails(id);
    }
  }

  getHouseDetails(id: number) {
    this.dataService.getMember(id).subscribe({
      next: member => {
        console.log(member);
        this.member = member;
      }
    });
  }

  deleteMembers() {
    if (confirm(`Deleteing the house details of: ${this.member.houseNo}?`)) {
      this.dataService.deleteMember(this.member.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          // error: err => this.errorMessage = err
        });
    }
  }
  onSaveComplete() {
    this.router.navigate(['/home']);
  }
}

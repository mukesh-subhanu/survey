import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/member';
import { DataService } from '../services/data.service';

export interface Person {
  name: string,
  age: number,
  gender: string
}

@Component({
  selector: 'app-edit-house-details',
  templateUrl: './edit-house-details.component.html',
  styleUrls: ['./edit-house-details.component.css']
})



export class EditHouseDetailsComponent implements OnInit {


  errorMessage: string = ''
  surveyForm!: FormGroup;
  member!: Member[];
  houseData!: Member;

  get members(): FormArray {
    return <FormArray>this.surveyForm.get('members')
  }

  constructor(private _fb: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.surveyForm = this._fb.group({
      houseNo: ['', Validators.required],
      houseAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      members: this._fb.array([]),
    })

    const param = (this.route.snapshot.paramMap.get('id'));
    if (param) {
      const id = +param;
      this.getHouseDetails(id);
    }
  }



  addMember() {
    return this.members.push(this.buildMember());
  }
  deleteMember(i: number, length: number) {
    if (length > 1) {
      this.members.removeAt(i);
    } else {
      alert("Atleast one member is Required")
    }
  }

  getHouseDetails(id: number) {
    this.dataService.getMember(id).subscribe({
      next: member => {
        console.log(member);
        this.populateDetails(member);
      }
    });
  }
  buildMember(m: any = '') {

    return this._fb.group({
      name: [m.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      age: [m.age, Validators.required],
      gender: [m.gender, Validators.required]
    })
  }

  populateDetails(member: Member): void {

    this.houseData = member;
    member.members?.forEach(
      (m) => {
        this.members.push(this.buildMember(m))

      }
    )

    this.surveyForm.patchValue({
      houseNo: member.houseNo,
      houseAddress: member.houseAddress,
      members: this.members

    });
  }



  onSave() {

    {
      const data = { ...this.houseData, ...this.surveyForm.value };

      {
        this.dataService.editMember(data)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }

  }
  onSaveComplete(): void {
    this._snackBar.open('House Details Updated', 'Dismiss', { duration: 3000 });

    this.surveyForm.reset();
    this.router.navigate(['/home']);
  }

}


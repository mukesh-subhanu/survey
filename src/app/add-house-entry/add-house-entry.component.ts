import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Member } from '../models/member';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-house-entry',
  templateUrl: './add-house-entry.component.html',
  styleUrls: ['./add-house-entry.component.css']
})
export class AddHouseEntryComponent implements OnInit {
  deleteIcon = "src/assets/images/delete.png"
  surveyForm!: FormGroup;
  member!: Member[];

  get members(): FormArray {
    return <FormArray>this.surveyForm.get('members')
  }

  constructor(private _snackBar: MatSnackBar, private _fb: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.surveyForm = this._fb.group({
      houseNo: ['', Validators.required],
      houseAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      members: this._fb.array([this.buildMember()]),
    })

  }

  buildMember() {
    return this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  addMember() {
    return this.members.push(this.buildMember());
  }

  onSubmit() {

    let member: Member = {
      id: Math.floor(Math.random() * 100) + 3,
      houseNo: this.surveyForm.get('houseNo')?.value,
      houseAddress: this.surveyForm.get('houseAddress')?.value,
      members: this.surveyForm.get('members')?.value
    }

    this.dataService.createMember(member).subscribe(member => {
      this.member.push(member);
    });
    console.log(member)
    this._snackBar.open(`House no ${member.houseNo}:  Added`, 'Dismiss', { duration: 3000 })
    this.router.navigate(['/home'])
  }
  deleteMember(i: number, length: number) {
    if (length > 1) {
      this.members.removeAt(i);

    } else {
      alert("Atleast one member is Required")
    }

  }
}

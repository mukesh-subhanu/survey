import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './models/member';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {
  constructor() { }
  createDb():{members:Member[]}{
   const  members:Member[]=[{
      id:1,
    houseNo:'12/979',
    houseAddress:'karol bagh, Delhi',
    members:[{
      name:'Mukesh',
      age:25,
      gender:'Male'
    },{
      name:'Rahul',
      age:23,
      gender:'Male'
    }]
    
    },
    {
      id:2,
    houseNo:'12/900',
    houseAddress:'Kanpur ',
    members:[{
      name:'Shubham',
      age:60,
      gender:'Male'
    },{
      name:'josh',
      age:23,
      gender:'Male'
    }]
    
    },
  ]
return {members};
  }
  
}
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, of } from 'rxjs';
import { HumiTemp } from 'src/models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private historyRef: AngularFireList<HumiTemp>
  public history?: HumiTemp[] = [];
  constructor(db: AngularFireDatabase) {
    this.historyRef = db.list<HumiTemp>("/myFile")
  }
  ngOnInit(): void {
    this.historyRef.snapshotChanges().pipe(
      map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        for (let [key, value] of Object.entries(data[0])) {
          this.history?.push(value as HumiTemp)
        }
      })
  }
  clickerman() {
    console.log(this.history)
  }
}
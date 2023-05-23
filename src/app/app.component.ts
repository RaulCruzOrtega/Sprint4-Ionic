import { Component } from '@angular/core';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SqliteService } from './services/sqlite.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public sqlite: SQLite, 
    public sqliteService: SqliteService, 
    private platform: Platform ) {
    this.platform.ready().then(() => {
      this.sqliteService.createSqliteBase();
    })

  }

}

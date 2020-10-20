import { Component } from '@angular/core';

 /** Expansion panel to add admins from admin's panel */

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.css']
})

export class AddAdminComponent {
    allUsers: string[] = ['veneziano_vargas', 'ludwig_beilschmidt', 'kiku_honda', 'romano_vargas', 'gilbert_beilschmidt'] ;
    // some dummy users :)
}

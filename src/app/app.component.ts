import { Component } from '@angular/core';
import { AF } from "./providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  title = 'Cold Calls!';
  private userId: string;
  public isLoggedIn: boolean;
 constructor(public afService: AF, private router: Router) {
   // This asynchronously checks if our user is logged it and will automatically
   // redirect them to the Login page when the status changes.
   // This is just a small thing that Firebase does that makes it easy to use.
   this.afService.af.auth.subscribe(
     (auth) => {
       if(auth == null) {
         console.log("Not Logged in.");
         this.router.navigate(['login']);
         this.isLoggedIn = false;
       }
       else {
         console.log("Successfully Logged in.");
         this.isLoggedIn = true;
         this.userId = auth.uid;
         console.log(auth);
         console.log(this.userId);
         // UPDATE: I forgot this at first. Without it when a user is logged in and goes directly to /login
         // the user did not get redirected to the home page.
         //this.router.navigate(['index/', this.userId]);
       }
     }
   );
 }
 logout() {
   this.afService.logout();
 }

 goToUserIndex(user) {
   this.router.navigate(['index', this.userId])
 }

 goToUser(user) {
   this.router.navigate(['user', this.userId])
 }

}

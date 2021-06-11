import { AngularFirestore } from '@angular/fire/firestore';
import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
  ) {
    this.userTyp()
    this.getPath()
  }

  typesOfShoes: string[] = ['Profile', 'Logout'];
  width: number;
  selectedOptions: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  list: boolean = false;

  showHideList() {
    this.list = !this.list
  }

  onChange(change) {
    console.log(change.option.value, change.option.selected);
    if (change.option.value == 'Logout') {
      this.logout()
    }
  }
  //;legp
  logout() {
    this.auth.auth.signOut().then(() => {
      this.router.navigate(['authentication'])
    }).catch(e => {

    })
  }

  user: string;

  userTyp() {
    const authSub = this.auth.authState.subscribe(user => {
      if (user && user.uid) {
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe((data: any) => {
          if (data != undefined) {
            this.user = data.userTyp
            console.log('user type is', this.user);

          }
          else {
            this.gotopage('authentication')
          }
        })
      }
      else{
        this.gotopage('authentication')
      }
    })
  }

  cuurentPage: string;

  getPath() {
    this.cuurentPage = this.router.url
    console.log(this.cuurentPage);

  }

  gotopage(name: string) {
    this.router.navigate([name])
  }

}

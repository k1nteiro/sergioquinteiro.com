import { Component } from '@angular/core';

@Component({
  selector: 'app-home-presentation',
  templateUrl: './homePresentation.component.html',
  styleUrls: ['./homePresentation.component.scss']
})
export class HomePresentationComponent {

  goToLinkedIn() : void {
    window.open("https://www.linkedin.com/in/squinteiro/", "_blank");
  }

  goToInstagram() : void {
    window.open("https://www.instagram.com/k1nteiro/", "_blank");
  }

  goToFacebook() : void {
    window.open("https://www.facebook.com/k5.k1nteiro", "_blank");
  }

  goToTwitter() : void {
    window.open("https://twitter.com/k1nteiro", "_blank");
  }

}

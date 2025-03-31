import { Component } from '@angular/core';

@Component({
  selector: 'app-home-presentation',
  templateUrl: './homePresentation.component.html',
  styleUrls: ['./homePresentation.component.scss']
})
export class HomePresentationComponent {

  // Si se cambia esta propiedad hay que cambiarla también en el DOM (data-bs-interval)
  private _carrouselInterval: number = 5000;

  constructor() {
    //TODO Quinteiro: Solución temporal hasta ver por qué no arranca el carrousel de forma automática
    setTimeout(() => {
      const button = document.getElementById('nextImageButton');
      button?.click();
    }, this._carrouselInterval);
  }

  goToLinkedIn() : void {
    window.open("https://www.linkedin.com/in/svquinteiro/", "_blank");
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

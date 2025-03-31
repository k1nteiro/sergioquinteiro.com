import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

// Declarar bootstrap como variable global para evitar errores de TypeScript
declare const bootstrap: any;

@Component({
  selector: 'app-home-presentation',
  templateUrl: './homePresentation.component.html',
  styleUrls: ['./homePresentation.component.scss']
})
export class HomePresentationComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region CONSTANTS

  private readonly STARTING_YEAR = 2021;
  private readonly PROJECTS_WORKED : string[] = [
    "SGA",
    "DCP",
    "EANChecker",
    "TDSFramework",
    "Poseidon",
    "Sentinel",
    "Web VI (TDSFramework)",
    "RestfulAPI (TDSFramework)",
    "TDSSol",
    "sergioquinteiro.com",
    "enxebreresidencial.com",
    "leyDHondt"
  ];

  //#endregion

  //#region PUBLIC PROPERTIES

  public ExperienceYears : number = -1;
  public ProjectsNumber : number = -1;

  //#endregion

  //#region PRIVATE PROPERTIES

  // Si se cambia esta propiedad hay que cambiarla también en el DOM (data-bs-interval)
  private _carouselInterval: number = 5000;
  private _typingTexts: string[] = [
    'Técnico Desarrollador de Software',
    'Fullstack Developer',
    '.Net /.NetFramework / C#',
    'Angular / TypeScript'
  ];
  private _scrollListener: any;
  private _mouseListener: any;
  private _typingTimeout: any;

  //#endregion

  constructor() {}
  
  ngOnInit(): void {
    // Inicializar el carrusel
    this.initCarousel();
    
    // Inicializar efectos visuales
    this.initVisualEffects();

    this.initCounters();
  }
  
  ngAfterViewInit(): void {
    // Iniciar la animación de escritura después de que la vista esté lista
    this.initTypingAnimation();
  }
  
  private initCarousel(): void {
    // Solución para el carrusel usando el ciclo de vida de Angular
    setTimeout(() => {
      const button = document.getElementById('nextImageButton');
      if (button) {
        button.click();
      }
      
      // Verificar si bootstrap está disponible en el contexto global
      try {
        const carousel = document.getElementById('carouselMain');
        if (carousel && typeof bootstrap !== 'undefined') {
          new bootstrap.Carousel(carousel, {
            interval: this._carouselInterval,
            ride: 'carousel'
          });
        }
      } catch (error) {
        console.error('Error inicializando el carrusel:', error);
        // Alternativa si bootstrap no está disponible
        this.initCarouselFallback();
      }
    }, 1000);
  }
  
  private initCarouselFallback(): void {
    // Alternativa manual al carrusel de Bootstrap
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    
    // Función para cambiar manualmente las diapositivas
    const advanceSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
      setTimeout(advanceSlide, this._carouselInterval);
    };
    
    // Iniciar la rotación manual
    setTimeout(advanceSlide, this._carouselInterval);
  }
  
  private initVisualEffects(): void {
    // Efecto parallax en scroll
    this._scrollListener = () => {
      const scrollPosition = window.scrollY;
      const mainCard = document.querySelector('.maincard') as HTMLElement;
      
      if (mainCard) {
        mainCard.style.backgroundPosition = `0% ${50 + (scrollPosition * 0.05)}%`;
      }
    };
    window.addEventListener('scroll', this._scrollListener);
    
    // Movimiento de partículas con el ratón
    this._mouseListener = (e: MouseEvent) => {
      const particles = document.querySelectorAll('.digital-particle');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particles.forEach((particle: Element, index) => {
        const offsetX = (mouseX - 0.5) * (index + 1) * 10;
        const offsetY = (mouseY - 0.5) * (index + 1) * 10;
        
        (particle as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    document.addEventListener('mousemove', this._mouseListener);
  }

  private initCounters() : void {
    this.ExperienceYears = new Date().getFullYear() - this.STARTING_YEAR;
    this.ProjectsNumber = this.PROJECTS_WORKED.length;
  }
  
  private initTypingAnimation(): void {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentText = this._typingTexts[textIndex];
      
      if (isDeleting) {
        // Borrar caracteres
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Más rápido al borrar
        
        // Cuando se borra completamente, pasar al siguiente texto
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % this._typingTexts.length;
          typingSpeed = 500; // Pausa antes de escribir el siguiente texto
        }
      } else {
        // Añadir caracteres
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Velocidad normal al escribir
        
        // Cuando se completa, pausa y luego comienza a borrar
        if (charIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = 1500; // Pausa antes de comenzar a borrar
        }
      }
      
      this._typingTimeout = setTimeout(type, typingSpeed);
    };
    
    // Iniciar la animación
    setTimeout(type, 1000);
  }

  goToLinkedIn(): void {
    window.open("https://www.linkedin.com/in/svquinteiro/", "_blank");
  }

  goToInstagram(): void {
    window.open("https://www.instagram.com/k1nteiro/", "_blank");
  }

  goToFacebook(): void {
    window.open("https://www.facebook.com/k5.k1nteiro", "_blank");
  }

  goToTwitter(): void {
    window.open("https://twitter.com/k1nteiro", "_blank");
  }
  
  ngOnDestroy(): void {
    // Limpiar los event listeners y timeouts para evitar memory leaks
    window.removeEventListener('scroll', this._scrollListener);
    document.removeEventListener('mousemove', this._mouseListener);
    
    if (this._typingTimeout) {
      clearTimeout(this._typingTimeout);
    }
  }
}
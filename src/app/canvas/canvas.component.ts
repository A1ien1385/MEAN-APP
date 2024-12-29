import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  private originalImageData: ImageData | null = null; // Oryginalne dane obrazu
  public grayscaleApplied = false; // Flaga skali szarości
  public bwApplied = false; // Flaga czerni i bieli
  public sepiaApplied = false;
  ifIsActive = false;

  ngAfterViewInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.loadImageToCanvas(reader.result.toString());
        }
      };

      reader.readAsDataURL(file);
    }
  }

  private loadImageToCanvas(imageSrc: string): void {
    this.ifIsActive = true;
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
  
    if (!context) {
      console.error('Failed to get canvas context.');
      return;
    }
  
    const img = new Image();
    img.src = imageSrc;
  
    img.onload = () => {
      // Wylicz proporcjonalne wymiary obrazu względem maksymalnej szerokości 50vw
      const maxCanvasWidth = window.innerWidth * 0.5; // 50% szerokości okna
      const scaleFactor = maxCanvasWidth / img.width; // Skala do dopasowania szerokości
      const targetWidth = maxCanvasWidth; // Szerokość canvas
      const targetHeight = img.height * scaleFactor; // Proporcjonalna wysokość
  
      canvas.width = targetWidth;
      canvas.height = targetHeight;
  
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
  
      this.originalImageData = context.getImageData(0, 0, targetWidth, targetHeight);
      this.grayscaleApplied = false;
      this.bwApplied = false;
    };
  }
  

  toggleGrayscale(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context || !this.originalImageData) {
      console.error('No image loaded or context is not available.');
      return;
    }

    if (this.grayscaleApplied) {
      context.putImageData(this.originalImageData, 0, 0);
    } else {
      const imageData = context.createImageData(this.originalImageData);
      imageData.data.set(this.originalImageData.data);

      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      context.putImageData(imageData, 0, 0);
    }

    this.grayscaleApplied = !this.grayscaleApplied;
    this.bwApplied = false; // Reset czerni i bieli
  }

  toggleBW(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context || !this.originalImageData) {
      console.error('No image loaded or context is not available.');
      return;
    }

    if (this.bwApplied) {
      context.putImageData(this.originalImageData, 0, 0);
    } else {
      const imageData = context.createImageData(this.originalImageData);
      imageData.data.set(this.originalImageData.data);

      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        const bw = gray > 128 ? 255 : 0; // Próg binarny
        data[i] = data[i + 1] = data[i + 2] = bw;
      }

      context.putImageData(imageData, 0, 0);
    }

    this.bwApplied = !this.bwApplied;
    this.grayscaleApplied = false; // Reset skali szarości
  }

  applySepia(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
  
    if (!context || !this.originalImageData) {
      console.error('No image loaded or context is not available.');
      return;
    }
  
    if (this.sepiaApplied) {
      // Przywróć oryginalny obraz
      context.putImageData(this.originalImageData, 0, 0);
    } else {
      // Zastosuj efekt sepia
      const imageData = context.createImageData(this.originalImageData);
      imageData.data.set(this.originalImageData.data);
  
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
  
        data[i] = r * 0.393 + g * 0.769 + b * 0.189; // Red
        data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168; // Green
        data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131; // Blue
      }
  
      context.putImageData(imageData, 0, 0);
    }
  
    // Przełącz status sepia
    this.sepiaApplied = !this.sepiaApplied;
    this.bwApplied = false; // Reset czerni i bieli
    this.grayscaleApplied = false; // Reset skali szarości
  }

  downloadImage(): void {
    const canvas = this.canvasRef.nativeElement;
  
    // Sprawdź, czy canvas jest dostępny
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }
  
    // Tworzenie obrazu w formacie PNG (można zmienić na JPEG)
    const dataUrl = canvas.toDataURL('image/png');
  
    // Tworzymy tymczasowy link do pobrania
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'przetworzony-obraz.png'; // Domyślna nazwa pliku
    a.click(); // Symulujemy kliknięcie w link
  }
  
}

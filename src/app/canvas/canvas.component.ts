import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  processedImageSrc: string | null = null;

  ngAfterViewInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.processImage(reader.result.toString());
        }
      };

      reader.readAsDataURL(file);
    }
  }

  private processImage(imageSrc: string): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get canvas context.');
      return;
    }

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      // Dopasuj rozmiar canvas do rozmiaru obrazu
      canvas.width = img.width;
      canvas.height = img.height;

      // Rysowanie obrazu na canvas
      context.drawImage(img, 0, 0);

      // Pobranie danych pikseli
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      // Przetwarzanie na odcienie szarości
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]; // Red
        const g = data[i + 1]; // Green
        const b = data[i + 2]; // Blue
        const gray = 0.3 * r + 0.59 * g + 0.11 * b; // Luminancja
        data[i] = data[i + 1] = data[i + 2] = gray; // Ustawienie wartości RGB na odcienie szarości
      }

      // Aktualizacja obrazu na canvasie
      context.putImageData(imageData, 0, 0);

      // Konwersja canvas na URL obrazu
      this.processedImageSrc = canvas.toDataURL('image/png');
    };
  }
}

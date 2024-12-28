import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', {static: true}) myCanvas! : ElementRef

  ngOnInit(): void {
    const canvas: HTMLCanvasElement =  this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = 'red';
      context.fillStyle = 'rgb(17, 0, 255, 0.5)';
      this.#drawRectangle(context);
      this.#drawTriangle(context);
      this.#drawArc(context);
      this.#drawCurve(context);
      this.#drawUsingPath(context);
      this.#drawLine(context);
      this.#drawText(context);
      this.#useGradients(context);
    }
  }

  #drawRectangle(context: CanvasRenderingContext2D) {
    context.fillRect(50, 20, 150, 100);
    context.clearRect(40, 40, 30, 30);
    context.strokeRect(50, 50, 10, 10);
  }

  #drawTriangle(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(400, 90);
    context.lineTo(350, 50);
    context.lineTo(350, 100);
    // context.fill();
    context.closePath();
    context.stroke();
  }

  #drawArc(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(300, 200, 80, (Math.PI / 180) * 0, (Math.PI / 180) * 90, true);
    context.closePath();
    context.stroke();
  }

  #drawCurve(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(500, 200);
    context.quadraticCurveTo(550, 0, 600, 200);
    context.stroke();

    context.beginPath();
    context.moveTo(700, 200);
    context.bezierCurveTo(750, 0, 750, 100, 800, 200);
    context.stroke();
  }

  #drawUsingPath(context: CanvasRenderingContext2D) {
    context.lineWidth = 20;
    context.lineJoin = 'bevel';
    const rectangle = new Path2D();
    rectangle.rect(20, 150, 100, 100);
    context.stroke(rectangle);
    const circle = new Path2D();
    circle.arc(300, 300, 80, (Math.PI / 180) * 0, (Math.PI / 180) * 360);
    context.fill(circle);
  }

  #drawLine(context: CanvasRenderingContext2D) {
    context.lineWidth = 10;
    // context.lineCap = 'round';
    context.setLineDash([14, 4]);
    context.lineDashOffset = 10;
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(900, 100);
    context.stroke();  
  }

  #drawText(context: CanvasRenderingContext2D) {
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 14;
    context.shadowBlur = 3;
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.fillStyle =  'black';
    context.font = '48px Arial';
    context.fillText('Hello', 100, 100);
  }

  #useGradients(context: CanvasRenderingContext2D) {
    const lineadGradient = context.createLinearGradient(20, 20, 120, 120);
    lineadGradient.addColorStop(0, 'red');
    lineadGradient.addColorStop(1, 'green');
    context.fillStyle = lineadGradient;
  }
}

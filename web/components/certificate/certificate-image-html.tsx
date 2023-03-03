import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata'
import { useEffect } from 'react'
import * as React from 'react'

import Konva from 'konva'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


export default function CertificateImageHtml({ projectMetadata }: { projectMetadata: ProjectMetadata }) {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);

  useEffect(() => {
    const canvas = document.getElementById("hypercert-canvas");
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var background = new Image();
      background.src = "/ethdenverstage.png";
      
      //Make sure the image is loaded first otherwise nothing will draw.
      background.onload = function(){
          // draw a rounded rectangle
          let radius = 27;
          let width = 362;
          let height = 482;
          let x = 0;
          let y = 0;
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(background,0,0);  

          // Horizontal Line
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.moveTo(20, 325);
          ctx.lineTo(80, 325);
          ctx.stroke();

          // Title
          ctx.font = "bold 30px Inter";
          ctx.fillStyle = "#FFFFFF"; 
          ctx.fillText(projectMetadata.name, 30, 370);

          // Dates
          ctx.font = "20px Inter";
          ctx.fillStyle = "#FFFFFF"; 
          ctx.fillText("2023-02-25 ---> 2023-03-04", 30, 400);
      }
    }
  });

  return (
    <>
      <canvas id='hypercert-canvas' width="362px" height="482px"></canvas>
    </>
  )
}

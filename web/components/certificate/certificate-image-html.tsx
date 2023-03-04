import { useEffect } from 'react'
import * as React from 'react'

import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata'

export default function CertificateImageHtml({ projectMetadata }: { projectMetadata: ProjectMetadata }) {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const canvas = document.getElementById('hypercert-canvas')
  //   if (canvas && canvas.getContext) {
  //     const ctx = canvas.getContext('2d')
  //     ctx.clearRect(0, 0, canvas.width, canvas.height)

  //     var background = new Image()
  //     background.src = '/ethdenverstage.png'

  //     //Make sure the image is loaded first otherwise nothing will draw.
  //     background.onload = function () {
  //       // draw a rounded rectangle
  //       let radius = 27
  //       let width = 362
  //       let height = 482
  //       let x = 0
  //       let y = 0
  //       ctx.beginPath()
  //       ctx.moveTo(x + radius, y)
  //       ctx.lineTo(x + width - radius, y)
  //       ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  //       ctx.lineTo(x + width, y + height - radius)
  //       ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  //       ctx.lineTo(x + radius, y + height)
  //       ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  //       ctx.lineTo(x, y + radius)
  //       ctx.quadraticCurveTo(x, y, x + radius, y)
  //       ctx.closePath()
  //       ctx.clip()

  //       ctx.drawImage(background, 0, 0)

  //       // Horizontal Line
  //       ctx.strokeStyle = 'white'
  //       ctx.lineWidth = 2
  //       ctx.moveTo(20, 325)
  //       ctx.lineTo(80, 325)
  //       ctx.stroke()

  //       // Title
  //       ctx.font = 'bold 30px Inter'
  //       ctx.fillStyle = '#FFFFFF'
  //       ctx.fillText(projectMetadata.name, 30, 370)

  //       // Dates
  //       ctx.font = '20px Inter'
  //       ctx.fillStyle = '#FFFFFF'
  //       ctx.fillText('2023-02-25 ---> 2023-03-04', 30, 400)
  //     }
  //   }
  // })

  // return (
  //   <>
  //     <canvas id="hypercert-canvas" width="362px" height="482px"></canvas>
  //   </>
  // )

  return <>
    <div className="overflow-hidden relative bg-base-200 h-[525px] w-[375px] rounded-3xl bg-[url('/ethdenverstage.png')]">
      <div className="my-4 mx-8">
          <div className="my-4 bg-cover bg-center h-12 w-12 rounded-full bg-[url('/bountyx-default.png')]"></div>
          <div className="my-4 bg-cover bg-center h-12 w-12 rounded-full bg-[url('/metamask-icon.png')]"></div>
      </div>
  
      <div className=" absolute left-0 top-[300px] h-[225px] bg-gradient-to-t from-slate-600 via-slate-400  to-transparent">
        <div className="mx-10">
          <div className="divider decoration-white outline-white stroke-white divide-white"></div> 
          <div className="my-2">
            <span className="text-3xl font-bold antialiased font-sans decoration-white">{projectMetadata.name}</span>
          </div>
          <div className="my-2">
            <span className="text-small antialiased font-sans decoration-white">2023-02-25 ⟶ 2023-03-04</span>
          </div>
        </div>
      </div>
    </div>
  </>
}

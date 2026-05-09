import { useState} from "react"
import { useMessage } from "./hooks/message"
import Loading from "./Loading"
import Results, { AuditResult } from "./Results"
import Home from "./Home"
import {postResults } from "./client"


export interface subFigma{
  width: number
  height: number
  desc: string
}
export interface Figma{
  description: subFigma[]
  image?: string
}

const App = () => {
  
  const collectInformation = () => {
    stageChange('loading')
    parent.postMessage({ pluginMessage: {type: 'collect'}}, '*')
  }
  
  const [stage, stageChange] = useState<'home' | 'loading' | 'done'>('home')
  const [results, resultsChange] = useState<AuditResult>()
  //const [rawData, data] = useState<subFigma[]>([])

  useMessage((msg) => {
    if (msg.type === 'descriptions'){
      const bytes: Uint8Array = msg.payload.image
      const binary = Array.from(bytes).map((b: number) => String.fromCharCode(b)).join('')
      const base64 = btoa(binary)
      console.log('data:image/png;base64,' + base64)
      postResults({ description: msg.payload.nodes, image: base64 }).then(r => {
        resultsChange(r)
        stageChange('done')
      })
      
    }
  })

  // function convertData(stuff : string[]){
  //   for (const subFig of stuff){
  //     const msg = JSON.parse(subFig)
  //     const newSpot: subFigma = {
  //       width: msg.width,
  //       height: msg.height,
  //       desc: msg.desc
  //     }
  //     data([...rawData, newSpot])
  //   }
  // }

  if (stage == 'loading'){
    return <Loading />
  }
  if (results && stage == 'done' ){
    return <Results result = {results} nodeCount={0} onBack={() => {}}/>
  }
  return <Home onAudit={collectInformation} onCancel={() => {}}/>

  
}
export default App

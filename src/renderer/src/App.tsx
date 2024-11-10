import './index.css'
import { useState, useEffect } from 'react'
import VideoSource from './components/VideoSource/video-source.component'
import type { VideoSourcesType } from './constants/Types/types'



function App(): JSX.Element {

  const [VideoSources, setVideoSources] = useState<VideoSourcesType[] | null>(null)
  const [screenSource, setScreenSource] = useState<VideoSourcesType | null>(null)
  const [constraints, setConstraints] = useState<any>({
    audio: true,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: screenSource?.id
      }
    }
  })

  const getVideoSourcesFromMain = async () => {
    const VideoSources: VideoSourcesType[] = await window.electronAPI.getVideoSources()
    setVideoSources(VideoSources)
  }

  useEffect(() => {
    VideoSources === null && getVideoSourcesFromMain()
    console.log(screenSource)
  }, [screenSource])

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-dvh text-center">
      <VideoSource VideoSources={VideoSources} updateScreenId={setScreenSource} selectedScreenSource={screenSource} />
    </div>
  )
}

export default App

import './index.css'
import { useState, useEffect } from 'react'
import VideoSource from './components/VideoSource/video-source.component'
import type { VideoSourcesType } from './constants/Types/types'



function App(): JSX.Element {
  const [VideoSources, setVideoSources] = useState<VideoSourcesType[] | null>(null)
  const getVideoSourcesFromMain = async () => {
    const VideoSources: VideoSourcesType[] = await window.electronAPI.getVideoSources()
    setVideoSources(VideoSources)
  }

  useEffect(() => {
    getVideoSourcesFromMain()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-black h-dvh text-center">
      <VideoSource VideoSources={VideoSources} />
    </div>
  )
}

export default App

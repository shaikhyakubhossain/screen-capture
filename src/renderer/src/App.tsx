import './index.css'
import { useState, useEffect, useRef } from 'react'
import VideoSource from './components/VideoSource/video-source.component'
import type { VideoSourcesType } from './constants/Types/types'
import { electronAPI } from '@electron-toolkit/preload'



function App(): JSX.Element {

  const videoRef = useRef<HTMLVideoElement>(null)

  const [VideoSources, setVideoSources] = useState<VideoSourcesType[] | null>(null)
  const [screenSource, setScreenSource] = useState<VideoSourcesType | null>(null)
  const [constraints, setConstraints] = useState<any>(null);

  const getVideoSourcesFromMain = async () => {
    const VideoSources: VideoSourcesType[] = await window.electronAPI.getVideoSources()
    setVideoSources(VideoSources)
  }

  const startRecording = async () => {
    const vidElement = videoRef.current
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (vidElement) {
      vidElement.srcObject = stream
      await vidElement.play()
    }
    // const mediaRecorder = new MediaRecorder(stream)
    // mediaRecorder.start()
  }

  useEffect(() => {
    VideoSources === null && getVideoSourcesFromMain()
    setConstraints({
      audio: {
        mandatory: {
          chromeMediaSource: 'desktop',
        }
      },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: screenSource?.id,
        }
      }})
    console.log(screenSource)
  }, [screenSource])

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-dvh text-center">
      <video ref={videoRef}></video>
      <VideoSource VideoSources={VideoSources} updateScreenId={setScreenSource} selectedScreenSource={screenSource} />
      <button disabled={screenSource === null? true : false} onClick={startRecording}>Start</button>
    </div>
  )
}

export default App

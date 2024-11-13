import './index.css'
import { useState, useEffect, useRef } from 'react'
import VideoSource from './components/VideoSource/video-source.component'
import type { VideoSourcesType } from './constants/Types/types'
import { electronAPI } from '@electron-toolkit/preload'
import { constants } from 'node:http2'

function App(): JSX.Element {

  const videoRef = useRef<HTMLVideoElement>(null)

  const recordedChunks: any[] = []

  const [VideoSources, setVideoSources] = useState<VideoSourcesType[] | null>(null)
  const [screenSource, setScreenSource] = useState<VideoSourcesType | null>(null)
  const [constraints, setConstraints] = useState<any>({
    audio: {
      mandatory: {
        chromeMediaSource: 'desktop'
      }
    },
    video: {
      mandatory: {
        chromeMediaSource: 'desktop'
      }
    }
  })

  let mediaRecorder: any

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
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' })
    mediaRecorder.ondataavailable = onDataAvailable
    mediaRecorder.onstop = onRecordingStop
    mediaRecorder.start()
  }

  const stopRecording = () => {
    mediaRecorder.stop()
  }

  const onDataAvailable = (event: any) => {
    recordedChunks.push(event.data)
  }

  const onRecordingStop = async () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    // window.electronAPI.saveRecording(recordedChunks)
    // const buffer = Buffer.from(await blob.arrayBuffer())
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = 'screencast.webm'
    a.click()
  }

  useEffect(() => {
    VideoSources === null && getVideoSourcesFromMain()
    setConstraints({
      ...constraints,
      video: {
        ...constraints.video,
        mandatory: {
          ...constraints.video.mandatory,
          chromeMediaSourceId: screenSource?.id
        }
      }})
    console.log(screenSource)
  }, [screenSource])

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-dvh text-center">
      <video ref={videoRef}></video>
      <VideoSource VideoSources={VideoSources} updateScreenId={setScreenSource} selectedScreenSource={screenSource} />
      <button disabled={screenSource === null ? true : false} onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>stop</button>
    </div>
  )
}

export default App
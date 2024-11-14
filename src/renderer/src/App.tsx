import './index.css'
import { useState, useEffect, useRef } from 'react'
import VideoSource from './components/VideoSource/video-source.component'
import Btn from './components/Btn/btn.component'
import type { VideoSourcesType } from './constants/Types/types'

function App(): JSX.Element {

  const videoRef = useRef<HTMLVideoElement>(null)

  const recordedChunks: any[] = []
  let mediaRecorder: MediaRecorder | null = null

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
  const [stream, setStream] = useState<MediaStream | null>(null)

  const getVideoSourcesFromMain = async (): Promise<void> => {
    const VideoSources: VideoSourcesType[] = await window.electronAPI.getVideoSources()
    setVideoSources(VideoSources)
  }

  const assignStream = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    setStream(stream)
  }

  const startVideoPreview = async (): Promise<void> => {
    const vidElement = videoRef.current
    if (vidElement) {
      vidElement.srcObject = stream
      await vidElement.play()
    }      
  }

  const startRecording =(): void => {
    if(stream){
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' })
      mediaRecorder.ondataavailable = onDataAvailable
      mediaRecorder.onstop = onRecordingStop
      mediaRecorder.start()
    }
    else{
      console.log('No stream available')
    }
  }

  const stopRecording = (): void => {
    mediaRecorder && mediaRecorder.stop()
  }

  const onDataAvailable = (event: any): void => {
    recordedChunks.push(event.data)
  }

  const onRecordingStop = async (): Promise<void> => {
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
    // console.log(screenSource)
  }, [screenSource])

  useEffect(() => {
    assignStream()
  }, [constraints])
  
  useEffect(() => {
    console.log(screenSource);
    screenSource && startVideoPreview()
  }, [stream])


  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-dvh text-center">
      <video className="w-1/2 m-4" ref={videoRef}></video>
      <VideoSource VideoSources={VideoSources} updateScreenId={setScreenSource} selectedScreenSource={screenSource} />
      <div className='flex my-2'>
      <Btn disabled={screenSource === null ? true : false} onClick={startRecording}>Start</Btn>
      <Btn onClick={stopRecording}>stop</Btn>
      </div>
    </div>
  )
}

export default App
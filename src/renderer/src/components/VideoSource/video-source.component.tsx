import { useState } from "react"
import Btn from "../Btn/btn.component"
import type { VideoSourcesType } from "../../constants/Types/types"

type propsType = {
    VideoSources: VideoSourcesType[] | null;
    selectedScreenSource: VideoSourcesType | null;
    updateScreenId: (screenSource: VideoSourcesType) => void
}

export default function VideoSource(props: propsType): JSX.Element {
  const [showVideoSourceMenu, setShowVideoSourceMenu] = useState<boolean>(false)
    return (
        <div className="relative">
          <div className="flex flex-row-reverse justify-center items-center">
            <div className="flex items-center bg-yellow-800 p-2 rounded text-center">video source:&nbsp;<div className="">{props.selectedScreenSource === null ? 'None' : props.selectedScreenSource.name}</div></div>
            <Btn onClick={() => setShowVideoSourceMenu(!showVideoSourceMenu)}>Select Video Source</Btn>
          </div>
      <div className="absolute top-12 left-0 w-60 h-20 p-2 text-black bg-black overflow-y-scroll" style={{display: showVideoSourceMenu ? 'block' : 'none', scrollbarWidth: 'none'}}>
        {props.VideoSources &&
          props.VideoSources.map((item) => {
            return <div key={item.id} onClick={() => {props.updateScreenId(item); setShowVideoSourceMenu(false)}} className='my-2 rounded cursor-pointer bg-green-400 hover:bg-green-500 hover:text-white'>{item.name}</div>
          })}
      </div>
        </div>
    )
}
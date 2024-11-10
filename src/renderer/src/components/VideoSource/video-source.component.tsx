import { useState } from "react"
import Btn from "../Btn/btn.component"
import type { VideoSourcesType } from "../../constants/Types/types"

type propsType = {
    VideoSources: VideoSourcesType[] | null
}

export default function VideoSource(props: propsType): JSX.Element {
  const [showVideoSourceMenu, setShowVideoSourceMenu] = useState<boolean>(false)
    return (
        <div className="relative">
            <Btn onClick={() => setShowVideoSourceMenu(!showVideoSourceMenu)}>Select Video Source</Btn>
      <div className="absolute top-12 left-0 w-60 h-20 text-black bg-slate-700 overflow-y-scroll" style={{display: showVideoSourceMenu ? 'block' : 'none', scrollbarWidth: 'none'}}>
        {props.VideoSources &&
          props.VideoSources.map((item) => {
            return <div key={item.id} className='my-2 rounded cursor-pointer bg-green-400 hover:bg-green-500 hover:text-white'>{item.name}</div>
          })}
      </div>
        </div>
    )
}
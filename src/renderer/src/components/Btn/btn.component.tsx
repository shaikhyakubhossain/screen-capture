type propsType = {
  children: string
  onClick?: () => void
  disabled?: boolean
}

export default function Btn(props: propsType): JSX.Element {
  return (
    <div className="flex justify-center items-center">
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
      className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-700 hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-1 dark:focus:ring-yellow-900"
    >
      {props.children}
    </button>
    </div>
  )
}

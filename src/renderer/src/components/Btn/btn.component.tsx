type propsType = {
  children: string
  onClick?: () => void
}

export default function Btn(props: propsType): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-700 hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
    >
      {props.children}
    </button>
  )
}

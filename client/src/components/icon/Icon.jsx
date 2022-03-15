import "./icon.css"

function Icon() {
  const PF = process.env.REACT_APP_PF;
  
  return (
    <div className="icon">
        <img className="iconBook" src={PF + "book.png"} alt="" />
        <img className="iconPadlock" src={PF + "padlock.png"} alt="" />
    </div>
  )
}

export default Icon

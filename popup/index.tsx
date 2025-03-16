import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
import "./styles.css"  // Import the separate CSS file

function IndexPopup() {
  const storage = new Storage({ area: "local" })
  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    const fetchScrollerState = async () => {
      const savedValue: boolean = await storage.get("scroller")

      if (savedValue !== undefined) {
        setIsChecked(savedValue)
      }
    }

    fetchScrollerState()
  }, [storage])

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked

    setIsChecked(checked)
    storage.set("scroller", checked)
  }

  return (
    <div className="container">
      <div className="header">
      <h2>Youtube Enhancer</h2>
      <div className="beta">*beta</div>
      </div>
      <div className="config-item">
        <label>Enable Section Scroller</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="contact">
        Tired of some other annoying feature on YouTube? <br />
        Reach out to me and I'll be happy to listen! <br />
        <a href="mailto:sanketmunot95@gmail.com">Gmail</a> &nbsp;|&nbsp;
        <a href="https://www.linkedin.com/in/sanket-munot/">LinkedIn</a>
      </div>
    </div>
  )
}

export default IndexPopup

import { useEffect, useState } from "react"
import { getTechLogos, cn } from "../utils/utils"

const DisplayTechIcons = ({ techStack }) => {

  const [techIcons, setTechIcons] = useState([])

  useEffect(() => {

    const loadIcons = async () => {
      const icons = await getTechLogos(techStack)
      setTechIcons(icons)
    }

    loadIcons()

  }, [techStack])

  return (
    <div className="flex">

      {techIcons.slice(0,3).map(({tech,url},index)=>(
        <div key={tech} className={cn("tech-icon", index>=1 && "-ml-3")}>
          <img src={url} className="size-5"/>
        </div>
      ))}

    </div>
  )
}

export default DisplayTechIcons
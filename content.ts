import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"

// Function to apply styles to primary and secondary elements
const applyStyles = () => {
  const primary = document.getElementById("primary")
  const secondary = document.getElementById("secondary")

  if (primary && secondary) {
    primary.style.maxHeight = "100vh"
    primary.style.overflow = "scroll"
    secondary.style.maxHeight = "100vh"
    secondary.style.overflow = "scroll"
  }
}

// Function to reset styles on primary and secondary elements
const resetStyles = () => {
  const primary = document.getElementById("primary")
  const secondary = document.getElementById("secondary")

  if (primary && secondary) {
    primary.style.maxHeight = ""
    primary.style.overflow = ""
    secondary.style.maxHeight = ""
    secondary.style.overflow = ""
  }
}

// MutationObserver callback
const observerCallback = () => {
  applyStyles()
}

// Create the MutationObserver instance
const createMutationObserver = (callback: MutationCallback) => {
  return new MutationObserver(callback)
}

// Function to observe or disconnect the MutationObserver based on scroller value
const handleObserver = (value: boolean, observer: MutationObserver) => {
  if (value) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  } else {
    observer.disconnect()
    resetStyles()
  }
}

// Initialize the Storage and handle the scroller state
const initializeStorage = async (observer: MutationObserver) => {
  const storage = new Storage({ area: "local" })

  try {
    const scrollerValue = await storage.get("scroller")
    handleObserver(scrollerValue, observer)
  } catch (error) {
    console.error("Error retrieving scroller value from storage:", error)
  }

  storage.watch({
    scroller: ({ newValue }: { newValue: boolean }) => {
      handleObserver(newValue, observer)
    },
  })
}

const bodyObserver = createMutationObserver(observerCallback)

initializeStorage(bodyObserver)

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/watch*"],
  all_frames: true,
}

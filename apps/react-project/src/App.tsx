import { useEffect, useState } from "react"

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const socketConn = new WebSocket("ws://localhost:8080")

    socketConn.onopen = () => {
      console.log("connected")
      setSocket(socketConn)
    }

    socketConn.onmessage = (message) => {
      setMessage(message.data)
    }

    return () => {
      socketConn.close()
    }

  }, [])

  if (!socket) {
    return (
      <div>
        Connecting to server...
      </div>
    )
  }
  return (
    <div>
      {message}
    </div>
  )
}

export default App

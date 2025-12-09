import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/hello').then(res => res.json()),
      fetch('/api/items').then(res => res.json())
    ])
      .then(([helloData, itemsData]) => {
        setMessage(helloData.message)
        setItems(itemsData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>AEC Tools</h1>
        <p>React + Vite + Express + MongoDB</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="message-box">
              <h2>Backend Status:</h2>
              <p>{message}</p>
            </div>
            <div className="items-box">
              <h2>Items from MongoDB:</h2>
              {items.length > 0 ? (
                <ul>
                  {items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No items found</p>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  )
}

export default App

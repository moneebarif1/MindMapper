import { useState, useEffect } from 'react'
import './TopicManager.css'

interface TopicManagerProps {
  onStatusChange?: (message: string) => void
}

export const TopicManager: React.FC<TopicManagerProps> = ({ onStatusChange }) => {
  const [topic, setTopic] = useState('')
  const [savedTopics, setSavedTopics] = useState<string[]>([])

  // Load saved topics when component mounts
  useEffect(() => {
    loadTopics()
  }, [])

  const loadTopics = async () => {
    try {
      const result = await chrome.storage.sync.get(['topics'])
      if (result.topics) {
        setSavedTopics(result.topics)
      }
    } catch (error) {
      onStatusChange?.('Error loading topics')
    }
  }

  // Save topics to Chrome storage
  const saveToStorage = async (updatedTopics: string[]) => {
    try {
      await chrome.storage.sync.set({ topics: updatedTopics })
      onStatusChange?.('Topics saved successfully')
    } catch (error) {
      onStatusChange?.('Error saving topics')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      const updatedTopics = [...savedTopics, topic.trim()]
      setSavedTopics(updatedTopics)
      await saveToStorage(updatedTopics)
      setTopic('')
    }
  }

  const handleDelete = async (index: number) => {
    const updatedTopics = savedTopics.filter((_, i) => i !== index)
    setSavedTopics(updatedTopics)
    await saveToStorage(updatedTopics)
  }

  return (
    <div className="topic-manager">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="topic-input"
        />
        <button type="submit" className="submit-button">
          Add Topic
        </button>
      </form>

      <div className="topics-list">
        {savedTopics.map((savedTopic, index) => (
          <div key={index} className="topic-item">
            <span>{savedTopic}</span>
            <button
              onClick={() => handleDelete(index)}
              className="delete-button"
              aria-label="Delete topic"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {savedTopics.length === 0 && (
        <p className="empty-state">No topics added yet. Start by adding one above!</p>
      )}
    </div>
  )
}

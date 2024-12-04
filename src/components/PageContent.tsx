import {useState } from 'react'
import { AiBuilder } from './AiBuilder'
import './PageContent.css'

export const PageContent = () => {
  const [pageData, setPageData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')

  const options = {
    sharedContext: 'if keyword is not available in context just write no data available against keyword',
    type: 'key-points' as const,
    format: 'markdown',
    length: 'medium' as const,
  }

  const getSelectedText = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword first')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      
      if (!tab.id) return

      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
          const selection = window.getSelection()
          const selectedText = selection?.toString()

          if (!selectedText) {
            return null
          }

          return {
            title: document.title,
            url: window.location.href,
            text: selectedText,
            metadata: {
              description: '',
              keywords: [],
            },
            isAISupported: true,
            summary: ''
          }
        }
      })

      if (result && result[0]?.result) {
        setPageData({
          ...result[0].result,
          keywords:keyword // Add keyword to pageData
        })
      }
    } catch (error) {
      console.error('Error getting page content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-content">
      <div className="keyword-input">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword for summary context comma separated..."
          className="keyword-field"
        />
      </div>
      
      <button 
        onClick={getSelectedText}
        disabled={isLoading}
        className="select-text-button"
      >
        {isLoading ? 'Summarizing...' : 'Summarize selected text'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      {pageData && <AiBuilder options={options} pageData={pageData} setLoading={setIsLoading}/>}
    </div>
  )
}

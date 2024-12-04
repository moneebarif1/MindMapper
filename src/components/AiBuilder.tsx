import { useState, useEffect } from 'react'

interface AiBuilderProps {
  options: any;
  pageData: any;
  setLoading: any;
}

export const AiBuilder: React.FC<AiBuilderProps> = ({options, pageData, setLoading}) => {
//   const [capabilities, setCapabilities] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('initializing')
  const [summary, setSummary] = useState<string>('updating')


  const initializeAI = async () => {
    try {
      setLoading(true)
      const { ai } = self;
      if (!ai?.summarizer) {
        setStatus('not available')
        throw new Error('AI summarizer not available window'+ window.ai)
      }

      const _capabilities = await ai.summarizer.capabilities();
    //   setCapabilities(_capabilities)
      const available = _capabilities.available

      if (available === 'no') {
        setStatus('not supported')
        return;
      }

      setStatus('available'+ available)

      let summarizer; 
      if (available === 'readily') {
        setStatus('ready')
        summarizer = await ai.summarizer.create(options);
      } else {

        try{
        setStatus('ready')
        summarizer = await ai.summarizer.create(options);
        (summarizer as any)?.addEventListener('downloadprogress', (e:any) => {
          console.log(e.loaded, e.total);
        });
        await (summarizer as any)?.ready;
        } catch (err) {
          setStatus('error')
          throw err;
        }
        setStatus('downloading')
      }

      console.log('summarizer', pageData.keywords)
      const summary = await summarizer.summarize(pageData.text, {
        context: `create summary against the keywords = ${pageData.keywords} as someone studying this topic`,
      });

      setStatus('done')
      setSummary(summary)
      setLoading(false)


      return summarizer;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    }
  }

  useEffect(() => {
    initializeAI();
  }, []);

  return (
    <div className="ai-builder">
      <div className="ai-status">
        {status !== 'done' && (
          <>
            Status: {status}
            {error && <div className="ai-error">Error: {error}</div>}
          </>
        )}
      </div>
      {status === 'done' && (
        <div className="summary-points">
          <h3>Points</h3>
          <ul>
            {summary.split('*')
              .map((point, index) => (
                <li key={index}>{point.replace('-', '').trim()}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
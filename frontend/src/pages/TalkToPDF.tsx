import { useState, useRef, useEffect } from 'react'
import { Upload, Send, Trash2, FileText, Bot, User, Loader2, X } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'
import { useLanguage } from '../context/LanguageContext'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const TalkToPDF = () => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const [pdfText, setPdfText] = useState<string | null>(null)
  const [pdfName, setPdfName] = useState<string | null>(null)
  const [pdfPages, setPdfPages] = useState<number>(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const extractTextFromPDF = async (file: File) => {
    setExtracting(true)
    setError(null)
    try {
      // Import PDF.js and its worker correctly for Vite
      const pdfjsLib = await import('pdfjs-dist')
      const pdfWorker = await import('pdfjs-dist/build/pdf.worker.min.mjs?worker')
      
      pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker.default()

      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str).join(' ')
        fullText += `\n--- Page ${i} ---\n${pageText}`
      }
      setPdfText(fullText.trim())
      setPdfName(file.name)
      setPdfPages(pdf.numPages)
      setMessages([{
        role: 'assistant',
        content: t('pdf.ready').replace('{name}', file.name).replace('{pages}', String(pdf.numPages))
      }])
    } catch (err) {
      console.error('PDF extraction error:', err)
      setError(t('pdf.extractError'))
    } finally {
      setExtracting(false)
    }
  }

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      setError(t('pdf.onlyPdf'))
      return
    }
    extractTextFromPDF(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleSend = async () => {
    if (!input.trim() || !pdfText || loading) return
    const userMessage = input.trim()
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) throw new Error('Gemini API key not configured')

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

      // Build conversation context
      const history = newMessages.slice(1, -1).map(m =>
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).join('\n')

      const prompt = `You are a helpful assistant that answers questions strictly based on the following PDF document content. If the question cannot be answered from the document, say so politely.

PDF DOCUMENT CONTENT:
${pdfText.slice(0, 20000)}

${history ? `CONVERSATION HISTORY:\n${history}\n` : ''}
User question: ${userMessage}

Provide a clear, helpful answer based on the document content.`

      const result = await model.generateContent(prompt)
      const reply = result.response.text()
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err: any) {
      setError(err.message || t('pdf.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setPdfText(null)
    setPdfName(null)
    setPdfPages(0)
    setMessages([])
    setInput('')
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
          {t('pdf.title')}
        </h1>
        <p className={themeClasses.text.secondary}>{t('pdf.subtitle')}</p>
      </div>

      {!pdfText ? (
        /* Upload Zone */
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 min-h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-green-500 bg-green-500/10 scale-[1.01]'
              : `${themeClasses.border} ${themeClasses.card} hover:border-green-500/60`
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
          />
          {extracting ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="text-green-500 animate-spin" size={48} />
              <p className={`text-lg font-medium ${themeClasses.text.secondary}`}>{t('pdf.extracting')}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="text-white" size={36} />
              </div>
              <div>
                <p className={`text-xl font-semibold ${themeClasses.text.primary} mb-1`}>{t('pdf.uploadPrompt')}</p>
                <p className={`text-sm ${themeClasses.text.muted}`}>{t('pdf.uploadHint')}</p>
              </div>
              <div className="mt-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                <Upload size={18} />
                {t('pdf.chooseFile')}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Chat Interface */
        <div className="flex flex-col flex-1 gap-4">
          {/* PDF Info Bar */}
          <div className={`flex items-center justify-between px-4 py-3 ${themeClasses.card} ${themeClasses.border} border rounded-xl`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={18} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${themeClasses.text.primary}`}>{pdfName}</p>
                <p className={`text-xs ${themeClasses.text.muted}`}>{pdfPages} {t('pdf.pages')}</p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <X size={16} />
              {t('pdf.changePdf')}
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto rounded-2xl ${themeClasses.card} ${themeClasses.border} border p-4 space-y-4 min-h-80 max-h-[50vh]`}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-green-600'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                }`}>
                  {msg.role === 'user'
                    ? <User size={16} className="text-white" />
                    : <Bot size={16} className="text-white" />
                  }
                </div>
                {/* Bubble */}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-green-600 text-white rounded-tr-sm'
                    : `${themeClasses.border} border ${themeClasses.text.primary} rounded-tl-sm bg-white/5`
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className={`px-4 py-3 rounded-2xl rounded-tl-sm ${themeClasses.border} border`}>
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm px-1">{error}</p>
          )}

          {/* Input Row */}
          <div className={`flex gap-3 items-end p-3 ${themeClasses.card} ${themeClasses.border} border rounded-2xl`}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={t('pdf.inputPlaceholder')}
              rows={1}
              className={`flex-1 resize-none bg-transparent outline-none text-sm ${themeClasses.text.primary} placeholder:${themeClasses.text.muted}`}
              style={{ maxHeight: '120px' }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setMessages([]); setInput('') }}
                title={t('pdf.clearChat')}
                className={`p-2 rounded-lg ${themeClasses.hover.bg} text-red-400 transition-colors`}
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="p-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TalkToPDF

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId)
  }

  const currentMessages = chats[currentChatId]?.messages || []

  return (
    <main className='flex h-screen w-full bg-[#070707] text-[#e3e3e3] overflow-hidden font-sans'>
      
      {/* --- Sidebar --- */}
      <aside className='hidden md:flex flex-col w-64 h-full bg-[#070707] border-r border-white/5 p-4 justify-between'>
        <div>
          <div className="flex items-center gap-2 px-2 py-4 mb-4">
             <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                <span className="text-xs">✳</span>
             </div>
             <span className="font-semibold text-lg tracking-tight text-white">Perplexity</span>
          </div>

          <nav className='space-y-1'>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-white/5 text-sm font-medium flex items-center gap-3">
              <span className="opacity-60 text-xs">🔍</span> Search
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium text-white/60 transition flex items-center gap-3">
              <span className="opacity-60 text-xs">🌐</span> Discover
            </button>
          </nav>

          <div className='mt-8'>
            <p className='px-3 text-[11px] font-bold text-white/30 uppercase tracking-widest mb-3'>Recent</p>
            <div className="space-y-1 max-h-[50vh] overflow-y-auto custom-scrollbar">
              {Object.values(chats).map((c, index) => (
                <button
                  onClick={() => openChat(c.id)}
                  key={index}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition truncate ${
                    currentChatId === c.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {c.title || "New Thread"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <section className='flex-1 flex flex-col relative overflow-hidden h-full'>
        
        <div className='flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pt-12 pb-48 px-4'>
          <div className='max-w-3xl mx-auto'>
            
            {currentMessages.length === 0 ? (
              /* Landing State */
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h2 className="text-4xl font-medium tracking-tight mb-8 text-white">
                    Where knowledge begins
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                   {['Trending Tech', 'Startups', 'AI Tools', 'Gadgets'].map((tag) => (
                     <button key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium hover:bg-white/10 transition">
                       {tag}
                     </button>
                   ))}
                </div>
              </div>
            ) : (
              /* --- Redesigned Minimal Message Thread --- */
              <div className="space-y-12">
                {currentMessages.map((message) => (
                  <div key={message.id} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                      
                      {message.role === 'user' ? (
                        /* User: Compact Dark Pill (Image 6 Style) */
                        <div className="bg-[#1a1a1a] text-white px-5 py-2 rounded-full text-[17px] font-medium max-w-[85%] border border-white/5 shadow-sm">
                          {message.content}
                        </div>
                      ) : (
                        /* AI: Minimal Text Flow */
                        <div className="w-full">
                           <div className="text-[18px] leading-[1.6] text-white/95">
                            <ReactMarkdown 
                              components={{
                                p: ({children}) => <p className="mb-5 last:mb-0">{children}</p>,
                                code: ({children}) => (
                                  <code className="bg-white/10 text-emerald-400 rounded px-1.5 py-0.5 text-[15px] font-mono">
                                    {children}
                                  </code>
                                ),
                                pre: ({children}) => (
                                  <pre className="my-6 overflow-x-auto rounded-xl bg-white/[0.03] p-5 border border-white/5 text-[15px]">
                                    {children}
                                  </pre>
                                ),
                                ul: ({children}) => <ul className="mb-5 list-disc pl-6 space-y-3">{children}</ul>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                          
                          {/* Aesthetic Feedback Icons */}
                          <div className="flex items-center gap-4 mt-4 opacity-0 hover:opacity-40 transition-opacity">
                             <button className="text-xs">📋</button>
                             <button className="text-xs">🔄</button>
                             <button className="text-xs ml-auto">👍</button>
                             <button className="text-xs">👎</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Floating Centered Input Bar --- */}
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#070707] via-[#070707]/90 to-transparent pb-10 pt-20 px-4'>
          <div className='max-w-2xl mx-auto'>
            <form 
              onSubmit={handleSubmitMessage} 
              className='relative bg-[#191919] rounded-2xl border border-white/10 p-1.5 focus-within:border-white/20 transition-all shadow-2xl'
            >
              <textarea
                rows="1"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={currentMessages.length > 0 ? 'Ask a follow-up...' : 'Ask anything...'}
                className='w-full bg-transparent px-4 py-3 text-lg text-white outline-none resize-none placeholder:text-white/20'
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        handleSubmitMessage(e);
                    }
                }}
              />
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2">
                    <button type="button" className="p-2 hover:bg-white/5 rounded-lg text-white/30 transition text-sm">➕ Attach</button>
                </div>
                <button
                  type='submit'
                  disabled={!chatInput.trim()}
                  className='p-2 px-3 rounded-full bg-white/5 text-white/30 transition hover:bg-white hover:text-black disabled:opacity-10'
                >
                  <span className="text-lg">↑</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </main>
  )
}

export default Dashboard
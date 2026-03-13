import { Plus, Calendar, Globe, MessageSquare, Rss, MoreHorizontal, Send, Loader } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import CreatePostModal from '../components/CreatePostModal'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

interface CommunityData {
  id: string
  name: string
  description: string
  image: string
  created_at: string
  slug: string
}

interface Post {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
  likes: number
  comments_count: number
  profiles: {
    name: string
    avatar_url: string
  }
}



const CommunityDetail = () => {
  const { communityId } = useParams()
  const { user } = useAuth()
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const { t } = useLanguage()
  
  const [community, setCommunity] = useState<CommunityData | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  // Chat/Quick Post specific states
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  
  const postsEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    postsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true)
      try {
        // Fetch community details
        const { data: commData, error: commError } = await supabase
          .from('communities')
          .select('*')
          .eq('slug', communityId)
          .single()

        if (commError) throw commError
        setCommunity(commData)

        // Fetch posts for this community
        if (commData) {
          const { data: postsData, error: postsError } = await supabase
            .from('posts')
            .select(`
              *,
              profiles:user_id (name, avatar_url)
            `)
            .eq('community_id', commData.id)
            .order('created_at', { ascending: true }) // Ascending makes it look more like chat thread

          if (postsError) throw postsError
          setPosts(postsData || [])
          setTimeout(scrollToBottom, 500) // scroll to bottom on initial load
        }
      } catch (error) {
        console.error('Error fetching community data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (communityId) {
      fetchCommunityData()
    }
  }, [communityId])

  // Realtime Subscription
  useEffect(() => {
    if (!community) return

    const channel = supabase
      .channel(`public:posts:community_id=eq.${community.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
          filter: `community_id=eq.${community.id}`
        },
        async (payload) => {
          // Fetch the profile for the new post
          const { data: profileData } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', payload.new.user_id)
            .single()

          const newPost = {
            ...payload.new,
            profiles: profileData || { name: t('community.anonymous'), avatar_url: '' }
          } as Post

          setPosts(currentData => [...currentData, newPost])
          setTimeout(scrollToBottom, 100)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [community])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user || !community) return

    setIsSending(true)
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          community_id: community.id,
          user_id: user.id,
          title: `Message from ${user.email?.split('@')[0] || 'User'}`,
          content: message,
          likes: 0,
          comments_count: 0
        })

      if (error) throw error
      setMessage('')
    } catch (err) {
      console.error('Failed to send message:', err)
      alert(t('community.sendFailed'))
    } finally {
      setIsSending(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">{t('community.loadingDetail')}</div>
  }

  if (!community) {
    return <div className="text-center py-20 text-gray-400">{t('community.notFoundDetail')}</div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-6">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent"></div>
        
        {/* Community Avatar and Name */}
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-dark-bg">
            {community.name.charAt(2)}
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold">{community.name}</h1>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => setIsCreatePostOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {t('community.createPost')}
        </button>
        <button className="bg-dark-card hover:bg-dark-hover text-white font-semibold px-6 py-2.5 rounded-full transition-colors border border-dark-border flex items-center gap-2">
          <Rss size={20} />
          {t('community.subscribe')}
        </button>
        <button className="bg-dark-card hover:bg-dark-hover text-white font-semibold px-6 py-2.5 rounded-full transition-colors border border-dark-border">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area / Chat Thread */}
        <div className="lg:col-span-2 flex flex-col h-[500px] bg-dark-bg rounded-xl border border-dark-border overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-dark-bg custom-scrollbar">
            {posts.length === 0 ? (
              <div className="bg-dark-card border border-dark-border rounded-xl p-12 text-center my-auto">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-gray-500">
                  {t('community.beFirst').replace('{name}', community.name)}
                </p>
              </div>
            ) : (
              posts.map(post => {
                const isMine = user?.id === post.user_id;
                
                return (
                  <div key={post.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    {!isMine && (
                      <div className="w-8 h-8 rounded-full bg-dark-card border border-dark-border overflow-hidden flex-shrink-0 mr-3 mt-1">
                        {post.profiles?.avatar_url ? (
                          <img src={post.profiles.avatar_url} alt={post.profiles.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                            {post.profiles?.name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className={`max-w-[75%] p-4 ${isMine ? 'bg-dark-card/60 border border-green-500/30 rounded-2xl rounded-tr-sm' : 'bg-dark-card border border-dark-border rounded-2xl rounded-tl-sm'}`}>
                      {!isMine && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-green-400">{post.profiles?.name || t('community.anonymous')}</span>
                          <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      )}
                      
                      {/* Only show title if it doesn't look like an auto-generated chat message title */}
                      {!post.title.startsWith('Message from') && (
                         <h3 className="font-bold mb-1 text-sm text-white">{post.title}</h3>
                      )}
                      <p className={`text-sm ${isMine ? 'text-gray-200' : 'text-gray-300'}`}>{post.content}</p>
                      
                      {isMine && (
                         <div className="text-right mt-1">
                           <span className="text-[10px] text-gray-500">{new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                         </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
            <div ref={postsEndRef} />
          </div>

          {/* Quick Chat Input box */}
          <div className="mt-4 bg-dark-bg rounded-xl border border-dark-border p-3">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={user ? t('community.messagePlaceholder') : t('community.loginToJoin')}
                className="flex-1 bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                disabled={!user || isSending}
              />
              <button 
                type="submit" 
                disabled={!user || !message.trim() || isSending}
                className="bg-green-600/90 hover:bg-green-500 disabled:bg-dark-card disabled:text-gray-600 disabled:border disabled:border-dark-border text-white p-3 rounded-lg transition-all flex items-center justify-center min-w-[52px]"
              >
                {isSending ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h2 className="text-xl font-bold mb-4">{t('community.about').replace('{name}', community.name)}</h2>
            <p className="text-gray-400 mb-6">{community.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Calendar size={18} />
                <span className="text-sm">{t('community.created').replace('{date}', new Date(community.created_at).toLocaleDateString())}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Globe size={18} />
                <span className="text-sm">{t('community.public')}</span>
              </div>
            </div>

            <button className="w-full bg-dark-hover hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors border border-dark-border">
              {t('community.addGuide')}
            </button>
          </div>

          {/* Moderators Section */}
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h2 className="text-xl font-bold mb-4">{t('community.moderators')}</h2>
            <button className="w-full bg-dark-hover hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors border border-dark-border flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              {t('community.messageMods')}
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)}
        communityName={community.id} // use internal community ID instead of name for creating logic
      />

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default CommunityDetail

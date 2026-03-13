import { User, MapPin, Calendar, Package, MessageSquare, Edit2, Save, X, Loader, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

interface UserProfile {
  id: string
  name?: string
  email?: string
  location?: string
  bio?: string
  avatar_url?: string
  created_at: string
}

interface ActivityItem {
  id: string
  type: 'order' | 'post' | 'listing'
  title: string
  description: string
  date: string
}

const Profile = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState({ orders: 0, listings: 0, communities: 0, posts: 0 })
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  // Edit mode states
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', location: '', bio: '', avatar_url: '' })
  const [editError, setEditError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchProfileData = async () => {
      try {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') throw profileError
        if (profile) setUserProfile(profile)

        // Fetch stats
        const [ordersRes, listingsRes, communitiesRes, postsRes] = await Promise.all([
          supabase.from('orders').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('produce_listings').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('community_members').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('posts').select('id', { count: 'exact' }).eq('user_id', user.id),
        ])

        setStats({
          orders: ordersRes.count || 0,
          listings: listingsRes.count || 0,
          communities: communitiesRes.count || 0,
          posts: postsRes.count || 0,
        })

        // Fetch recent activity
        const { data: orders } = await supabase
          .from('orders')
          .select('id, product, quantity, status, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3)

        const { data: posts } = await supabase
          .from('posts')
          .select('id, title, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3)

        const { data: listings } = await supabase
          .from('produce_listings')
          .select('id, crop_name, quantity, price_per_unit, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3)

        const activity: ActivityItem[] = []

        orders?.forEach((order) => {
          activity.push({
            id: order.id,
            type: 'order',
            title: order.status === 'delivered' 
              ? t('profile.activityDelivered').replace('{product}', order.product)
              : t('profile.activityOrdered').replace('{product}', order.product),
            description: t('profile.activityUnits').replace('{quantity}', order.quantity.toString()),
            date: new Date(order.created_at).toLocaleDateString(),
          })
        })

        posts?.forEach((post) => {
          activity.push({
            id: post.id,
            type: 'post',
            title: t('profile.activityPosted').replace('{title}', post.title),
            description: t('profile.activityCommPost'),
            date: new Date(post.created_at).toLocaleDateString(),
          })
        })

        listings?.forEach((listing) => {
          activity.push({
            id: listing.id,
            type: 'listing',
            title: t('profile.activityListed').replace('{crop}', listing.crop_name),
            description: t('profile.activityListedDesc')
              .replace('{quantity}', listing.quantity.toString())
              .replace('{price}', listing.price_per_unit.toString()),
            date: new Date(listing.created_at).toLocaleDateString(),
          })
        })

        setRecentActivity(activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5))
      } catch (error) {
        console.error('Error fetching profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user])

  const handleEdit = () => {
    setEditForm({
      name: userProfile?.name || '',
      location: userProfile?.location || '',
      bio: (userProfile as any)?.bio || '',
      avatar_url: userProfile?.avatar_url || ''
    })
    setEditError(null)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditError(null)
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setSaving(true)
    setEditError(null)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: editForm.name,
          location: editForm.location,
          bio: editForm.bio,
          avatar_url: editForm.avatar_url,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setUserProfile(prev => prev ? { ...prev, ...editForm } : null)
      setIsEditing(false)
    } catch (err: any) {
      setEditError(err.message || t('profile.saveFailed'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">{t('profile.loading')}</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">{t('profile.pleaseLogin')}</div>
      </div>
    )
  }

  const displayName = userProfile?.name || user.email?.split('@')[0] || 'User'
  const joinedDate = userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : t('profile.recently')

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('profile.title')}</h1>
        <p className="text-gray-400">
          {t('profile.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt={displayName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User size={60} className="text-gray-500" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">{displayName}</h2>
              <p className="text-gray-400 mb-3">{user.email}</p>
              
              {userProfile?.location && (
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
                  <MapPin size={16} />
                  <span>{userProfile.location}</span>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <span>{t('profile.joined').replace('{date}', joinedDate)}</span>
              </div>
            </div>

            {/* Bio */}
            {userProfile?.bio && !isEditing && (
              <div className="mb-6">
                <p className="text-gray-300 text-sm text-center">{(userProfile as any).bio}</p>
              </div>
            )}

            {/* Edit Form */}
            {isEditing ? (
              <div className="mb-6 space-y-3">
                {editError && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-2">{editError}</p>
                )}
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t('profile.fullName')}</label>
                  <input
                    value={editForm.name}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={t('profile.fullNamePlaceholder')}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t('profile.locationLabel')}</label>
                  <input
                    value={editForm.location}
                    onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                    placeholder={t('profile.locationPlaceholder')}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t('profile.bioLabel')}</label>
                  <textarea
                    value={editForm.bio}
                    onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                    placeholder={t('profile.bioPlaceholder')}
                    rows={3}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t('profile.avatarLabel')}</label>
                  <input
                    value={editForm.avatar_url}
                    onChange={e => setEditForm(f => ({ ...f, avatar_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? t('profile.saving') : t('profile.saveChanges')}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2.5 bg-dark-hover border border-dark-border hover:border-gray-500 text-gray-300 rounded-lg transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
                {t('profile.editProfile')}
              </button>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-400">{stats.orders}</p>
                <p className="text-gray-400 text-xs">{t('profile.statsOrders')}</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-400">{stats.listings}</p>
                <p className="text-gray-400 text-xs">{t('profile.statsListings')}</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-400">{stats.communities}</p>
                <p className="text-gray-400 text-xs">{t('profile.statsCommunities')}</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-orange-400">{stats.posts}</p>
                <p className="text-gray-400 text-xs">{t('profile.statsPosts')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h3 className="text-2xl font-bold mb-6">{t('profile.recentActivity')}</h3>

            {recentActivity.length === 0 ? (
              <p className="text-gray-400">{t('profile.noActivity')}</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-green-500/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'order' && <Package size={20} className="text-green-400" />}
                        {activity.type === 'post' && <MessageSquare size={20} className="text-blue-400" />}
                        {activity.type === 'listing' && <ShoppingBag size={20} className="text-purple-400" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{activity.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{activity.description}</p>
                        <p className="text-gray-500 text-xs">{activity.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile

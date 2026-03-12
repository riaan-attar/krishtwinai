import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CommunityCard {
  id: string
  slug: string
  name: string
  description: string
  image: string
  posts: number
  lastActive: string
}

const Community = () => {
  const communities: CommunityCard[] = [
    {
      id: '1',
      slug: 'jalgaon-farmers',
      name: 'c/Jalgaon Farmers',
      description: 'A community for farmers in Jalgaon to discuss Banana, Cotton, and local farming practices.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop',
      posts: 142,
      lastActive: 'just now'
    },
    {
      id: '2',
      slug: 'nashik-grape-growers',
      name: 'c/Nashik Grape Growers',
      description: 'Connect with vineyards, export specialists, and vegetable growers in Nashik region.',
      image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&h=400&fit=crop',
      posts: 89,
      lastActive: 'just now'
    },
    {
      id: '3',
      slug: 'pune-agri-hub',
      name: 'c/Pune Agri-Hub',
      description: 'Discuss modern farming techniques, greenhouse setups, and direct-to-consumer sales.',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop',
      posts: 256,
      lastActive: 'just now'
    },
    {
      id: '4',
      slug: 'nagpur-orange-city',
      name: 'c/Nagpur Orange City',
      description: 'Dedicated to citrus farmers, cotton growers, and central Maharashtra agriculture.',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=400&fit=crop',
      posts: 115,
      lastActive: 'just now'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Community Hub</h1>
        <p className="text-gray-400">
          Connect with fellow farmers, share knowledge, and grow together. Explore a community or search for content below.
        </p>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <Link
            key={community.id}
            to={`/community/${community.slug}`}
            className="bg-dark-card rounded-xl overflow-hidden border border-dark-border hover:border-green-500 transition-all cursor-pointer group"
          >
            {/* Community Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Community Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">
                {community.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {community.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Official Hub • {community.posts} Posts</span>
                <span>{community.lastActive}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default Community

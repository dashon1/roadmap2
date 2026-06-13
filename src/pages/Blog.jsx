import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Blog() {
  const [filter, setFilter] = useState('all');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts', filter],
    queryFn: async () => {
      if (filter === 'all') {
        return await base44.entities.BlogPost.filter({ published: true }, '-created_date');
      }
      return await base44.entities.BlogPost.filter({ published: true, category: filter }, '-created_date');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">AI Insights & Resources</h1>
          <p className="text-xl text-slate-400">
            Stay updated with the latest in AI technology and implementation
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {['all', 'ai-trends', 'case-studies', 'guides', 'news'].map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? 'default' : 'outline'}
              className={filter === cat ? 'bg-sky-500' : 'border-slate-700 text-slate-300'}
            >
              {cat === 'all' ? 'All Posts' : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="text-center text-slate-400 py-20">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-slate-400 py-20">
            <p className="text-xl mb-4">No posts yet</p>
            <p>Check back soon for AI insights and resources!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-500/50 transition-colors group"
              >
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      5 min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-sky-400 hover:text-sky-300 p-0"
                  >
                    <Link to={createPageUrl(`BlogPost?slug=${post.slug}`)}>
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
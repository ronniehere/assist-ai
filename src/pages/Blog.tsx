
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchPosts();
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-foreground">
              assistAI Blog
            </h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/')} variant="outline">
                Home
              </Button>
              {user && (
                <Button onClick={() => navigate('/admin')} variant="outline">
                  Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Insights & Updates
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest news, tips, and insights from the assistAI team
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16">
            <div className="text-foreground">Loading posts...</div>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-card rounded-sm border border-border p-8 hover:border-muted transition-colors">
                <div className="mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">Published on {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for the latest updates and insights from assistAI.
              </p>
              <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

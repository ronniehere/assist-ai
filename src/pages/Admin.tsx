import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth state
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/auth');
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "Successfully signed out",
      });
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/blog')} variant="outline">
                View Blog
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({ id: '', title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: currentPost.title,
            content: currentPost.content,
          })
          .eq('id', currentPost.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: currentPost.title,
            content: currentPost.content,
            user_id: user.id,
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Post created successfully",
        });
      }

      setCurrentPost({ id: '', title: '', content: '' });
      setIsEditing(false);
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost({
      id: post.id,
      title: post.title,
      content: post.content,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
        fetchPosts();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-foreground">Title</Label>
            <Input
              id="title"
              value={currentPost.title}
              onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
              required
              className="bg-background border-border text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="content" className="text-foreground">Content</Label>
            <textarea
              id="content"
              className="w-full h-64 px-3 py-2 bg-background border border-border rounded-sm resize-none text-foreground"
              value={currentPost.content}
              onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {isEditing ? 'Update Post' : 'Create Post'}
            </Button>
            {isEditing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPost({ id: '', title: '', content: '' });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">Manage Posts ({posts.length})</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-card p-4 rounded-sm border border-border">
              <h3 className="font-semibold text-lg text-foreground">{post.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{new Date(post.created_at).toLocaleDateString()}</p>
              <p className="text-muted-foreground line-clamp-2">{post.content.substring(0, 100)}...</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => handleEdit(post)} variant="outline">
                  Edit
                </Button>
                <Button size="sm" onClick={() => handleDelete(post.id)} variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground text-center py-8">No posts yet. Create your first post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

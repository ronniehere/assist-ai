import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      setIsLoggedIn(true);
    } else {
      // Redirect to home if not logged in
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  if (!isLoggedIn) {
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
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({ id: '', title: '', content: '', date: '' });

  const savePosts = (newPosts: any[]) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const updatedPosts = posts.map((post: any) => 
        post.id === currentPost.id ? currentPost : post
      );
      savePosts(updatedPosts);
    } else {
      const newPost = {
        ...currentPost,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString()
      };
      savePosts([newPost, ...posts]);
    }
    setCurrentPost({ id: '', title: '', content: '', date: '' });
    setIsEditing(false);
  };

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter((post: any) => post.id !== id);
      savePosts(updatedPosts);
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
                  setCurrentPost({ id: '', title: '', content: '', date: '' });
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
              <p className="text-muted-foreground text-sm mb-2">{post.date}</p>
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

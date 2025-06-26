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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={currentPost.title}
              onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md resize-none"
              value={currentPost.content}
              onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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
        <h2 className="text-2xl font-bold mb-6">Manage Posts ({posts.length})</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700 line-clamp-2">{post.content.substring(0, 100)}...</p>
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
            <p className="text-gray-500 text-center py-8">No posts yet. Create your first post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

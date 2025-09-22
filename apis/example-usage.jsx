import React, { useState, useEffect } from 'react';
import { 
  fetchData, 
  fetchDataWithAuth, 
  postData, 
  putData, 
  deleteData 
} from './index.js';

// Example component showing how to use the centralized API functions
const ExampleComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example 1: Fetch data without authentication
  const fetchPublicBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchData('blogs/public');
      if (data) {
        setBlogs(data);
      }
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Fetch data with authentication
  const fetchAdminBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const data = await fetchDataWithAuth('blogs/admin', token);
      if (data && data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      setError('Failed to fetch admin blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 3: Create new blog
  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const customHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await postData('blogs', blogData, customHeaders);
      if (response && response.success) {
        // Refresh the blogs list
        await fetchAdminBlogs();
        return response;
      }
    } catch (error) {
      setError('Failed to create blog');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 4: Update existing blog
  const updateBlog = async (blogId, updatedData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const customHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await putData(`blogs/${blogId}`, updatedData);
      if (response && response.success) {
        // Refresh the blogs list
        await fetchAdminBlogs();
        return response;
      }
    } catch (error) {
      setError('Failed to update blog');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 5: Delete blog
  const removeBlog = async (blogId) => {
    try {
      setLoading(true);
      const response = await deleteData('blogs', blogId);
      if (response && response.success) {
        // Refresh the blogs list
        await fetchAdminBlogs();
        return response;
      }
    } catch (error) {
      setError('Failed to delete blog');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 6: Handle form submission
  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        // Update existing blog
        await updateBlog(formData.id, formData);
      } else {
        // Create new blog
        await createBlog(formData);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  // Example 7: Error handling with user feedback
  const handleApiCall = async (apiFunction, ...args) => {
    try {
      setError(null);
      const result = await apiFunction(...args);
      return result;
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      setError(errorMessage);
      throw error;
    }
  };

  // Example 8: Batch operations
  const batchDeleteBlogs = async (blogIds) => {
    try {
      setLoading(true);
      const deletePromises = blogIds.map(id => deleteData('blogs', id));
      const results = await Promise.allSettled(deletePromises);
      
      // Check which operations succeeded/failed
      const successful = results.filter(result => result.status === 'fulfilled');
      const failed = results.filter(result => result.status === 'rejected');
      
      if (failed.length > 0) {
        setError(`${failed.length} blogs failed to delete`);
      }
      
      // Refresh the list
      await fetchAdminBlogs();
      
      return { successful: successful.length, failed: failed.length };
    } catch (error) {
      setError('Batch operation failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load blogs on component mount
    fetchPublicBlogs();
  }, []);

  return (
    <div>
      <h2>API Usage Examples</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div>
        <button onClick={fetchPublicBlogs}>Load Public Blogs</button>
        <button onClick={fetchAdminBlogs}>Load Admin Blogs</button>
      </div>
      
      <div>
        <h3>Blogs ({blogs.length})</h3>
        {blogs.map(blog => (
          <div key={blog.id}>
            <h4>{blog.title}</h4>
            <p>Author: {blog.author}</p>
            <button onClick={() => updateBlog(blog.id, { ...blog, status: 'Published' })}>
              Publish
            </button>
            <button onClick={() => removeBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleComponent;



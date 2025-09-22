# API Functions Documentation

This folder contains centralized API functions for making HTTP requests to the backend. All functions use the `VITE_HOST_API` environment variable for the base URL.

## Environment Setup

Create a `.env` file in the frontend root directory with:

```env
VITE_HOST_API=http://localhost:8000/api/admin
```

## Available Functions

### `fetchData(extra)`
- **Purpose**: GET request without authentication
- **Parameters**: 
  - `extra` (string): Additional path after base URL
- **Returns**: Response data
- **Example**: `fetchData('blogs')`

### `fetchDataWithAuth(extra, token)`
- **Purpose**: GET request with authentication
- **Parameters**: 
  - `extra` (string): Additional path after base URL
  - `token` (string): JWT authentication token
- **Returns**: Response data
- **Example**: `fetchDataWithAuth('dashboard/stats', token)`

### `postData(extra, data, customHeaders)`
- **Purpose**: POST request
- **Parameters**: 
  - `extra` (string): Additional path after base URL
  - `data` (object): Data to send in request body
  - `customHeaders` (object, optional): Additional headers (e.g., Authorization)
- **Returns**: Response data
- **Example**: `postData('auth/login', { email, password })`

### `putData(extra, data)`
- **Purpose**: PUT request for updates
- **Parameters**: 
  - `extra` (string): Additional path after base URL
  - `data` (object): Data to send in request body
- **Returns**: Response data
- **Example**: `putData('blogs/123', { title, content })`

### `deleteData(extra, id)`
- **Purpose**: DELETE request
- **Parameters**: 
  - `extra` (string): Additional path after base URL
  - `id` (string/number): ID of item to delete
- **Returns**: Response data
- **Example**: `deleteData('blogs', '123')`

## Usage Examples

### In Components

```jsx
import { fetchData, postData, putData, deleteData } from '../../apis/index.js';

// GET request
const blogs = await fetchData('blogs');

// POST request
const newBlog = await postData('blogs', { title: 'New Blog', content: 'Content' });

// PUT request
const updatedBlog = await putData('blogs/123', { title: 'Updated Title' });

// DELETE request
const deleted = await deleteData('blogs', '123');

// Authenticated request
const token = localStorage.getItem('token');
const userData = await fetchDataWithAuth('user/profile', token);
```

## Benefits

1. **Centralized Configuration**: All API calls use the same base URL
2. **Consistent Error Handling**: Standardized error handling across all requests
3. **Easy Maintenance**: Update API logic in one place
4. **Environment Flexibility**: Easy to switch between development and production URLs
5. **Authentication Support**: Built-in support for authenticated requests



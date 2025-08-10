import { Route, Routes, Link } from 'react-router-dom';
import { Button, Card } from '@learning-nx/ui-components';
import { formatDate, generateId, capitalize } from '@learning-nx/shared-utils';
import { useState, useEffect } from 'react';
import { API_URL } from '../config';

interface ApiResponse {
  message: string;
  id: string;
  date: string;
  greeting: string;
}

export function App() {
  const currentDate = formatDate(new Date());
  const userId = generateId();
  
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 Welcome to My Website!</h1>
      
      <Card title="User Info">
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Current Date:</strong> {currentDate}</p>
        <p><strong>Status:</strong> {capitalize('active user')}</p>
      </Card>

      <div style={{ margin: '20px 0' }}>
        <h2>UI Components Demo</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Button variant="primary" size="small" onClick={() => alert('Small Primary!')}>
            Small Primary
          </Button>
          <Button variant="primary" size="medium" onClick={() => alert('Medium Primary!')}>
            Medium Primary  
          </Button>
          <Button variant="secondary" size="large" onClick={() => alert('Large Secondary!')}>
            Large Secondary
          </Button>
        </div>
      </div>

      <Card title="Navigation">
        <nav style={{ marginBottom: '20px' }}>
          <Button variant="secondary" style={{ marginRight: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          </Button>
          <Button variant="secondary">
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
          </Button>
        </nav>
      </Card>

      <Card title="API Data">
        {loading && <p>Loading API data...</p>}
        {error && (
          <div style={{ color: 'red' }}>
            <p>Error: {error}</p>
            <p>Make sure the API is running (pnpm run start:api)</p>
          </div>
        )}
        {apiData && (
          <div>
            <p><strong>Message:</strong> {apiData.message}</p>
            <p><strong>Server ID:</strong> {apiData.id}</p>
            <p><strong>Server Date:</strong> {apiData.date}</p>
            <p><strong>Greeting:</strong> {apiData.greeting}</p>
          </div>
        )}
      </Card>

      <Routes>
        <Route
          path="/"
          element={
            <Card title="Home Page">
              <p>This is the home page using our shared UI components!</p>
              <p>✅ Using Button and Card from @learning-nx/ui-components</p>
              <p>✅ Using utility functions from @learning-nx/shared-utils</p>
            </Card>
          }
        />
        <Route
          path="/about"
          element={
            <Card title="About Page">
              <p>This demonstrates how multiple apps can share the same UI components.</p>
              <Button variant="primary" onClick={() => alert('Shared component working!')}>
                Test Shared Component
              </Button>
            </Card>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

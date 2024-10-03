
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports'); // Adjust the URL based on your API
        setReports(response.data.reports); // Adjust based on your API response structure
      } catch (err) {
        setError('Error fetching reports');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">My Reports</h1>
      {reports.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{report.id}</td>
                <td className="py-2 px-4 border-b">{report.title}</td>
                <td className="py-2 px-4 border-b">{new Date(report.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No reports found.</p>
      )}
    </div>
  );
};

export default ReportPage;

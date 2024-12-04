import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@nextui-org/react"
import { Button, Pagination } from "@nextui-org/react"; // Removed Modal import
import { useNavigate } from "react-router-dom";
import { getReports } from "../../api/post";
import { table } from "console";

// Updated interfaces to match API response
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
}

interface Report {
  _id: string;
  userId: User;
  postId: Post;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

interface APIResponse {
  data: {
    status: string;
    reports: Report[];
  };
  status: number;
  statusText: string;
}

const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    try {
      const response: APIResponse = await getReports();
      if (response?.data?.reports) {
        setReports(response.data.reports);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReports([]);
    }
  };

  const handleViewDetails = (postId: string) => {
    // Navigate to the post management page with the reported post ID
    navigate(`/admin/posts/${postId}`);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage - 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col p-8 bg-zinc-900 rounded-[60px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-3xl font-bold">Report Management</h2>
      </div>

      <div className="bg-zinc-800/50 rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-700">
              <TableCell className="text-zinc-400 font-medium">Index</TableCell>
              <TableCell className="text-zinc-400 font-medium text-center">Reported By</TableCell>
              <TableCell className="text-zinc-400 font-medium text-center">Post Title</TableCell>
              <TableCell className="text-zinc-400 font-medium text-center">Reason</TableCell>
              <TableCell className="text-zinc-400 font-medium text-center">Date</TableCell>
              <TableCell className="text-zinc-400 font-medium text-right">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports.length > 0 ? (
              reports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report, index) => (
                  <TableRow key={report._id} className="border-b border-zinc-700">
                    <TableCell className="text-white">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {report.userId.name}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {report.postId.title}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {report.reason}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {formatDate(report.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        style={{ color: 'white' }}
                        onClick={() => handleViewDetails(report.postId._id)} // Navigate using postId
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-white text-center py-8"
                >
                  No reports available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {reports.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              total={Math.ceil(reports.length / rowsPerPage)}
              initialPage={page + 1}
              onChange={handleChangePage}
              color="primary"
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportManagement;

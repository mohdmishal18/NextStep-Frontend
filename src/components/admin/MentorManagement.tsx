import React, { useState, useEffect } from "react";
import { MentorData } from "../../Types/mentorTypes";
import { blockMentor, getApprovedMentors } from "../../api/admin";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TablePagination,
  Avatar,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

const MentorManagement: React.FC = () => {
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [currentMentor, setCurrentMentor] = useState<MentorData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchApprovedMentors();
  }, []);

  const fetchApprovedMentors = async () => {
    try {
      const response = await getApprovedMentors();
      setMentors(response.data.approvedMentors);
      console.log(response.data.approvedMentors);
    } catch (err) {
      console.error("Error fetching approved mentors:", err);
    }
  };

  const handleOpenModal = (mentor: MentorData) => {
    setCurrentMentor(mentor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentMentor(null);
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBlockUnblock = async (mentor: MentorData) => {
    try {
      // Call the API to block/unblock the mentee
      const response = await blockMentor(mentor._id, !mentor.isBlocked);
      console.log(response, "block");
      
      if (response.status === 200) {
        // If the API call is successful, update the mentees state
        // const updatedMentees = mentees.map((m) =>
        //   m._id === mentee._id ? { ...m, isBlocked: !m.isBlocked } : m
        // );
        fetchApprovedMentors()
        handleCloseModal();
      } else {
        console.error("Failed to update mentee status:", response.data.message);
      }
    } catch (err) {
      console.error("Error blocking/unblocking mentee:", err);
    }
  };

  return (
    <div className="flex flex-col p-8 bg-zinc-900 rounded-[60px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-3xl">Mentor Management</h2>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-neutral-600">
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">Profile Picture</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-secondary">
            {mentors.length > 0 ? (
              mentors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mentor, index) => (
                  <TableRow key={mentor._id}>
                    <TableCell style={{ color: "#ffffff" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <Avatar
                        alt={mentor.firstName}
                        src={mentor.profilePicture}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {mentor.firstName} {mentor.lastName}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {mentor.email}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {mentor.location}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="inherit"
                        onClick={() => handleOpenModal(mentor)}
                      >
                        <Visibility style={{ color: "#6b7280" }} />
                      </IconButton>
                      <Button
                        variant="contained"
                        color={mentor.isBlocked ? "success" : "error"}
                        onClick={() => handleBlockUnblock(mentor)}
                        className="ml-2"
                      >
                        {mentor.isBlocked ? "Unblock" : "Block"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ color: "#ffffff" }}
                >
                  No mentors available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          className="bg-neutral-600"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mentors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Mentor Details</h2>
          {currentMentor && (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    alt={currentMentor.firstName}
                    src={currentMentor.profilePicture}
                    sx={{ width: 80, height: 80 }}
                  />
                  <div>
                    <h3>
                      {currentMentor.firstName} {currentMentor.lastName}
                    </h3>
                    <p>{currentMentor.jobTitle} at {currentMentor.company}</p>
                  </div>
                </div>
                <div>
                  <p><strong>Email:</strong> {currentMentor.email}</p>
                  <p><strong>Location:</strong> {currentMentor.location}</p>
                  <p><strong>Skills:</strong> {currentMentor.skills.map(skill => skill.name).join(', ')}</p>
                  <p><strong>Bio:</strong> {currentMentor.bio}</p>
                  <p><strong>LinkedIn:</strong> <a href={currentMentor.linkedInUrl} target="_blank" rel="noopener noreferrer">{currentMentor.linkedInUrl}</a></p>
                  {currentMentor.personalWebsiteUrl && (
                    <p><strong>Website:</strong> <a href={currentMentor.personalWebsiteUrl} target="_blank" rel="noopener noreferrer">{currentMentor.personalWebsiteUrl}</a></p>
                  )}
                  <p><strong>Why Become a Mentor:</strong> {currentMentor.whyBecomeMentor}</p>
                  <p><strong>Greatest Achievement:</strong> {currentMentor.greatestAchievement}</p>
                  <p><strong>Status:</strong> {currentMentor.status}</p>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MentorManagement;

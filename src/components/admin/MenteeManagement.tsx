import React, { useState, useEffect } from "react";
import { MenteeProfile } from "../../Types/menteeTypes";
import { blockMentee } from "../../api/admin";
import { getAllMentees } from "../../api/admin";
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

const MenteeManagement: React.FC = () => {
  const [mentees, setMentees] = useState<MenteeProfile[]>([]);
  const [currentMentee, setCurrentMentee] = useState<MenteeProfile | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchMentees();
  }, []);

  const fetchMentees = async () => {
    try {
      const response = await getAllMentees();
      setMentees(response.data.mentees);
      console.log(response.data.mentees);
    } catch (err) {
      console.error("Error fetching mentees:", err);
    }
  };

  const handleOpenModal = (mentee: MenteeProfile) => {
    setCurrentMentee(mentee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentMentee(null);
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

  const handleBlockUnblock = async (mentee: MenteeProfile) => {
    // Implement block/unblock logic here
    const updatedMentees = mentees.map((m) =>
      m._id === mentee._id ? { ...m, isBlocked: !m.isBlocked } : m
    );
    setMentees(updatedMentees);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col p-8 bg-zinc-900 rounded-[60px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-3xl">Mentee Management</h2>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-neutral-600">
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">Profile Picture</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Is Verified</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-secondary">
            {mentees.length > 0 ? (
              mentees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mentee, index) => (
                  <TableRow key={mentee._id}>
                    <TableCell style={{ color: "#ffffff" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <Avatar
                        alt={mentee.name}
                        src={mentee.profilePicture}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {mentee.name}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {mentee.email}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {mentee.otpVerified ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="inherit"
                        onClick={() => handleOpenModal(mentee)}
                      >
                        <Visibility style={{ color: "#6b7280" }} />
                      </IconButton>
                      <Button
                        variant="contained"
                        color={mentee.isBlocked ? "error" : "success"}
                        onClick={() => handleBlockUnblock(mentee)}
                      >
                        {mentee.isBlocked ? "Unblock" : "Block"}
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
                  No mentees available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          className="bg-neutral-600"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mentees.length}
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
          <h2>Mentee Details</h2>
          {currentMentee && (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    alt={currentMentee.name}
                    src={currentMentee.profilePicture}
                    sx={{ width: 80, height: 80 }}
                  />
                  <div>
                    <h3>{currentMentee.name}</h3>
                    <p>{currentMentee.education}</p>
                  </div>
                </div>
                <div>
                  <p><strong>Email:</strong> {currentMentee.email}</p>
                  <p><strong>Phone:</strong> {currentMentee.phone}</p>
                  <p><strong>Bio:</strong> {currentMentee.bio}</p>
                  <p><strong>Is Verified:</strong> {currentMentee.otpVerified ? "Yes" : "No"}</p>
                  <p><strong>Status:</strong> {currentMentee.isBlocked ? "Blocked" : "Active"}</p>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MenteeManagement;

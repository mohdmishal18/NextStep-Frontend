import React, { useState, useEffect } from "react";
import { getAllSkills } from "../../api/admin";
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
  TextField,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Skill {
  id: number;
  name: string;
}

const SkillManagement: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await getAllSkills();
      console.log(response.data.skill, "this is the response");
      setSkills(response.data.skill);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setCurrentSkill(skill);
    } else {
      setCurrentSkill({ id: skills.length + 1, name: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSkill(null);
  };

  const handleAddEditSkill = () => {
    if (currentSkill) {
      setSkills((prevSkills) => {
        const skillExists = prevSkills.some(
          (skill) => skill.id === currentSkill.id
        );
        if (skillExists) {
          return prevSkills.map((skill) =>
            skill.id === currentSkill.id ? currentSkill : skill
          );
        } else {
          return [...prevSkills, currentSkill];
        }
      });
    }
    handleCloseModal();
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
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

  return (
    <div className="flex flex-col p-8 bg-zinc-900 rounded-[60px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-3xl">Skills</h2>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => handleOpenModal()}
        >
          Add Skill
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-neutral-600">
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">Skill Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-secondary">
            {skills.length > 0 ? (
              skills
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((skill, index) => (
                  <TableRow key={skill.id}>
                    <TableCell style={{ color: "#ffffff" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {skill.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="inherit"
                        onClick={() => handleOpenModal(skill)}
                      >
                        <Edit style={{ color: "#6b7280" }} />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        <Delete style={{ color: "#6b7280" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  style={{ color: "#ffffff" }}
                >
                  No skills available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          className="bg-neutral-600"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={skills.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEditSkill();
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>{currentSkill?.id ? "Edit Skill" : "Add Skill"}</h2>
          <TextField
            label="Skill Name"
            value={currentSkill?.name || ""}
            onChange={(e) =>
              setCurrentSkill((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ backgroundColor: "#6b7280", marginTop: "16px" }} // Tailwind color equivalent
            fullWidth
          >
            {currentSkill?.id ? "Update Skill" : "Add Skill"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SkillManagement;

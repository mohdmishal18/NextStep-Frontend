import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllSkills, addSkill, editSkill, listSkill } from "../../api/admin";
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
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";

interface Skill {
  _id?: string; // Make id optional since it won't exist for new skills
  name: string;
  isListed: boolean; // New property for listing status
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
      console.log("skills frm back", response.data.skills);
      
      setSkills(response.data.skills);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleOpenModal = (skill?: Skill) => {
    // Initialize currentSkill as an empty object if adding a new skill
    setCurrentSkill(skill || { name: "", isListed: true });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSkill(null);
  };

  const handleAddEditSkill = async () => {
    if (currentSkill) {
      try {
        if (!currentSkill?._id) {
          const res = await addSkill(currentSkill.name);
          console.log(res.data);
          
          if (res.status) {
            toast.success("Skill added successfully");
          }
        } else {
          // Update existing skill
          const res = await editSkill(currentSkill._id, currentSkill.name);

          console.log(res)
          console.log("edited name", currentSkill.name)
          
          if(res.data.status && res.data.editedSkill)toast.success("Skill updated successfully");
          else {
            toast.error("duplicate skill")
          }
        }
        fetchSkills(); // Refresh the skill list after add/edit
      } catch (err) {
        
        if(err instanceof Error){
          toast.error(err.message || "An error occurred while adding the skill.");
        }

        console.error("Error adding/updating skill:", err);
      }
    }
    handleCloseModal();
  };

  const handleListSkill = async (skillId: string, skillStatus: boolean) => {
    try {
      console.log("skillId:", skillId , "skillSTatus: ", skillStatus);
      
      const res = await listSkill(skillId, !skillStatus);
      console.log(res, "res from list")
      
      if(res?.data.status)toast.success(
        `Skill ${res?.data.skill.isListed ? "unlisted" : "listed"} successfully`
      );
      fetchSkills(); // Refresh the skill list after delete
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
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
              <TableCell align="right">Listed</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-secondary">
            {skills.length > 0 ? (
              skills
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((skill, index) => (
                  <TableRow key={skill._id}>
                    <TableCell style={{ color: "#ffffff" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {skill.name}
                    </TableCell>
                    <TableCell align="right" style={{ color: "#ffffff" }}>
                      {skill.isListed ? "True" : "False"}
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
                        onClick={() =>
                          handleListSkill(skill._id!, skill.isListed)
                        }
                      >
                        {skill.isListed ? (
                          <VisibilityOff style={{ color: "#6b7280" }} />
                        ) : (
                          <Visibility style={{ color: "#6b7280" }} />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
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
          <h2>{currentSkill?._id ? "Edit Skill" : "Add Skill"}</h2>
          <TextField
            label="Skill Name"
            value={currentSkill?.name || ""}
            onChange={(e) =>
              setCurrentSkill((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : { name: e.target.value, isListed: true }
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
            {currentSkill?._id ? "Update Skill" : "Add Skill"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SkillManagement;

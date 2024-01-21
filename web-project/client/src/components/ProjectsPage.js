import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';
import '../assets/css/ProjectsPage.css';

const ProjectsPage = () => {
  const { authenticated, uid, projectId, role } = useAuth();
  const navigate = useNavigate();
  const [myProjects, setMyProjects] = useState([]);
  const [projectsForGrading, setProjectsForGrading] = useState([]);
  const [students, setStudents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!authenticated || role !== 'student') {
        navigate('/');
      } else {
        try {
          const projectResponse = await fetch(`http://localhost:4000/projects/${projectId}`);
          if (!projectResponse.ok) {
            throw new Error('Error fetching project data');
          }
          const myProjectResponse = await projectResponse.json();
          const myProjectData = myProjectResponse ? [myProjectResponse] : [];
          setMyProjects(myProjectData);

          const fetchAllStudents = async () => {
            for (const project of myProjectData) {
              const projectStudents = await fetchStudents(project.id);
              setStudents((prevState) => ({
                ...prevState,
                [project.id]: projectStudents,
              }));
            }
          };

          if (myProjectData.length > 0) {
            fetchAllStudents();
          }

          const gradingResponse = await fetch(`http://localhost:4000/juries?studentId=${uid}`);
          if (!gradingResponse.ok) {
            throw new Error('Error fetching grading data');
          }
          const gradingData = await gradingResponse.json();

          const fetchGradingStudents = async () => {
            for (const project of gradingData) {
              const projectStudents = await fetchStudents(project.projectId);
              setStudents((prevState) => ({
                ...prevState,
                [project.projectId]: projectStudents,
              }));
            }
          };

          if (gradingData.length > 0) {
            fetchGradingStudents();
          }

          const projectsForGradingData = await Promise.all(
            gradingData.map(async (element) => {
              const projectDetailsResponse = await fetch(`http://localhost:4000/projects/${element.projectId}`);
              if (!projectDetailsResponse.ok) {
                throw new Error(`Error fetching project details for projectId: ${element.projectId}`);
              }
              const projectDetailsData = await projectDetailsResponse.json();
              return {
                ...projectDetailsData,
                grade: element.grade,
              };
            })
          );

          setProjectsForGrading(projectsForGradingData);
        } catch (error) {
          //console.error('Error fetching data:', error);
        }
      }
    };

    const fetchStudents = async (projectId) => {
      try {
        const response = await fetch(`http://localhost:4000/students?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        //console.error('Error fetching students:', error);
        return [];
      }
    };

    fetchData();
  }, [authenticated, uid, projectId, navigate]);

  return (
    <div className="page-container">
      <h2 className="heading">Projects Page</h2>
      <div className="project-list-container">
        <div className="my-projects-container">
          <h3 className="project-heading">My Projects</h3>
          <ProjectList projects={myProjects} students={students} isMyProject={true} />
        </div>

        <div className="projects-for-grading-container">
          <h3 className="project-heading">Projects for Grading</h3>
          <ProjectList projects={projectsForGrading} students={students} setProjects={setProjectsForGrading} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

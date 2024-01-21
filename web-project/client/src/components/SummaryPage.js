import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Deliverables from './Deliverables';
import '../assets/css/SummaryPage.css';

const SummaryPage = () => {
  const { authenticated, uid, role } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState({});
  const [averageGrades, setAverageGrades] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (authenticated && role === 'professor') {
        try {
          const projectsResponse = await fetch('http://localhost:4000/projects');
          if (!projectsResponse.ok) {
            throw new Error('Error fetching project data');
          }
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);

          const fetchAllStudents = async () => {
            for (const project of projectsData) {
              const projectStudents = await fetchStudents(project.id);
              setStudents((prevState) => ({
                ...prevState,
                [project.id]: projectStudents,
              }));
            }
          };

          if (projectsData.length > 0) {
            fetchAllStudents();
          }

          const fetchGrades = async () => {
            const averageGradesData = {};
            for (const project of projectsData) {
              const gradesResponse = await fetch(`http://localhost:4000/juries?projectId=${project.id}`);
              if (!gradesResponse.ok) {
                throw new Error(`Error fetching grades for projectId: ${project.id}`);
              }
              const gradesData = await gradesResponse.json();


              let averageGrade = 0;
              gradesData.forEach(element => {
                averageGrade = averageGrade + parseInt(element.grade);
              });
          
              averageGrade = averageGrade ? averageGrade / gradesData.length : 0

              averageGradesData[project.id] = averageGrade;
            }

            setAverageGrades(averageGradesData);
          };

          fetchGrades();
        } catch (error) {
          //console.error('Error fetching data:', error);
        }
      } else {
        navigate('/');
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
  }, [authenticated, uid, role, navigate]);

  return (
    <div className="page-container">
      <h2 className="heading">Projects Page</h2>
      <div className="project-list-container">
        <ul className="project-list">
          {projects.map((project) => (
            <li className="project-item" key={project.id}>
              <strong>{project.name}</strong>
              <Deliverables projectId={project.id} />
              {students[project.id] && students[project.id].length > 0 && (
                <div className="students-list">
                  Students: {students[project.id].map((student, index) => (
                    <span key={student.id} className={student.isTeamLead ? 'team-lead' : ''}>
                      {student.name}
                      {index !== students[project.id].length - 1 && ', '}
                    </span>
                  ))}
                </div>
              )}
              {averageGrades[project.id] !== null && (
                <div className="average-grade">Average Grade: {averageGrades[project.id]}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryPage;

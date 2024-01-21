import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import Deliverables from './Deliverables';

const ProjectList = ({ projects, students, setProjects, isMyProject , averageGrades}) => {
  const [gradeInput, setGradeInput] = useState('');
  const { uid } = useAuth(); 

  const handleGradeInput = (event) => {
    setGradeInput(event.target.value);
  };

  const handleGiveGrade = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:4000/juries/grade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: projectId, studentId: uid, grade: gradeInput }),
      });

      if (!response.ok) {
        throw new Error('Error updating grade');
      }

      setGradeInput('');

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, grade: gradeInput } : project
        )
      );
    } catch (error) {
      //console.error('Error giving grade:', error);
    }
  };

  return (
    <ul className="project-list">
      {projects?.map((project) => (
        <li className="project-item" key={project.id}>
          <strong>{project.name}</strong>
          <Deliverables projectId={project.id} />
          {students && students[project.id] && students[project.id].length > 0 && (
            <div className="students-list">
              Students: {students[project.id].map((student, index) => (
                <span key={student.id} className={student.isTeamLead ? 'team-lead' : ''}>
                  {student.name}
                  {index !== students[project.id].length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
          {isMyProject ? null : project.grade ? (
            <div className="grade">Grade: {project.grade}</div>
          ) : (
            <div className="give-grade">
              <input
                type="text"
                placeholder="Enter grade"
                value={gradeInput}
                onChange={handleGradeInput}
              />
              <button onClick={() => handleGiveGrade(project.id)}>Give Grade</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;

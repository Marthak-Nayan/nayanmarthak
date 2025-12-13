import { useState } from 'react';
import { X, Edit2, Pin } from 'lucide-react';
import { FaGithub } from "react-icons/fa";


export default function ProjectStickyNotes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "MediQueue",
      definition: "MediQueue is a healthcare management system that efficiently streamlines appointment scheduling, patient flow, and overall administrative operations for better service delivery.",
      technologies: ["Java", "Spring Boot", "Hibernate ORM", "Spring Security", "JWT", "PostgreSQL", "React.js"],
      color: "#ffffff",
      rotation: -2,
      pinned: true,
      projectType: "Web",
      link:"https://github.com/Marthak-Nayan/MediQueue-Backend"
    },
    {
      id: 2,
      title: "Weatherly",
      definition: "A weather forecasting application that provides users with real-time weather updates, forecasts, and alerts.",
      technologies: ["Java", "JSP", "Servlet", "MySQL", "Eclipse"],
      color: "#ffffff",
      rotation: -2,
      pinned: true,
      projectType: "Web",
      link:"https://github.com/Marthak-Nayan/Weatherly"
    },
    {
      id: 3,
      title: "University Management System",
      definition: "Build a comprehensive platform for managing university operations, including student enrollment, course management, and faculty collaboration.",
      technologies: ["Java", "Swing", "MySQL", "Netbeans"],
      color: "#ffffff",
      rotation: -2,
      pinned: true,
      projectType: "Desktop",
      link:"https://github.com/Marthak-Nayan/University-Management-System" 
    },
    {
      id: 4,
      title: "TeamSpace",
      definition: "A collaborative platform for teams to connect, communicate and conduct meetings in real-time or personally. Facilitates seamless project management and team collaboration.",
      technologies: ["Next.js", "React", "MongoDB", "Node.js", "Socket.io", "Tailwind CSS", "GetStream.io"],
      color: "#ffffff",
      rotation: 1,
      pinned: false,
      projectType: "Web",
      link:"https://github.com/Marthak-Nayan/TeamSpace"
    }
  ]);

  const [hoveredNote, setHoveredNote] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    definition: '',
    technologies: '',
    projectType: 'Web',
    color: '#ffffff'
  });

  const togglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

  /*const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };*/

  const addNewProject = () => {
    if (newProject.title && newProject.definition && newProject.technologies) {
      const techArray = newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
      const newNote = {
        id: Date.now(),
        title: newProject.title,
        definition: newProject.definition,
        technologies: techArray,
        color: newProject.color,
        rotation: Math.random() * 4 - 2,
        pinned: false,
        projectType: newProject.projectType
      };
      setNotes([...notes, newNote]);
      setNewProject({ title: '', definition: '', technologies: '', projectType: 'Web', color: '#ffffff' });
      setShowAddForm(false);
    }
  };

  const handleViewDetails = (note) => {
    window.open(note.link, '_blank');
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>

        <div style={styles.grid} className="sticky-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              style={styles.noteWrapper}
              className="sticky-note-wrapper"
              onMouseEnter={() => setHoveredNote(note.id)}
              onMouseLeave={() => setHoveredNote(null)}
            >
              <div
                style={{
                  ...styles.note,
                  backgroundColor: note.color,
                  transform: hoveredNote === note.id
                    ? 'rotate(0deg) scale(1.05)'
                    : `rotate(${note.rotation}deg)`,
                  boxShadow: hoveredNote === note.id
                    ? '8px 8px 16px rgba(0,0,0,0.15)'
                    : '4px 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                {/* Paper texture overlay */}
                <div style={styles.paperTexture}></div>

                {/* Pin */}
                <div style={styles.pinWrapper}>
                  <button
                    onClick={() => togglePin(note.id)}
                    style={{
                      ...styles.pinButton,
                      backgroundColor: note.pinned ? '#000000' : '#9ca3af'
                    }}
                  >
                    <Pin
                      style={{
                        width: '14px',
                        height: '14px',
                        color: 'white',
                        transform: note.pinned ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}
                    />
                  </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                  <div style={styles.titleSection}>
                    <h3 style={styles.noteTitle}>{note.title}</h3>
                    <div style={styles.underline}></div>
                  </div>

                  <p style={styles.noteContent}>{note.definition}</p>

                  {/* Technologies */}
                  <div style={styles.techSection}>
                    <span style={styles.techLabel}>Tech Stack:</span>
                    <div style={styles.techTags}>
                      {note.technologies.map((tech, index) => (
                        <span key={index} style={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.footer}>
                    <span style={{
                      ...styles.projectTypeLabel,
                      backgroundColor: note.projectType === 'Web' ? '#2c2c2c' :
                        note.projectType === 'Desktop' ? '#2c2c2c' :
                          '#2c2c2c',
                      color: 'white'
                    }}>
                      {note.projectType}
                    </span>
                    <button
                      style={styles.viewButton}
                      onClick={() => handleViewDetails(note)}
                    >
                      <FaGithub style={{ marginRight: "5px" }} /> Source
                    </button>
                  </div>

                  {hoveredNote === note.id && (
                    <div style={styles.editIcon}>
                      <Edit2 style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                    </div>
                  )}

                  {!note.pinned && (
                    <div style={styles.tapeEffect}></div>
                  )}
                </div>

                {/* Corner fold */}
                <div style={styles.cornerFold}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddForm && (
        <div style={styles.modalOverlay} onClick={() => setShowAddForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Project</h2>
              <button
                onClick={() => setShowAddForm(false)}
                style={styles.modalClose}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Project Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                style={styles.input}
                placeholder="Enter project title"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Definition</label>
              <textarea
                value={newProject.definition}
                onChange={(e) => setNewProject({ ...newProject, definition: e.target.value })}
                style={styles.textarea}
                placeholder="Enter project definition"
                rows="4"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Technologies (comma-separated)</label>
              <input
                type="text"
                value={newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                style={styles.input}
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Project Type</label>
              <select
                value={newProject.projectType}
                onChange={(e) => setNewProject({ ...newProject, projectType: e.target.value })}
                style={styles.select}
              >
                <option value="Web">Web</option>
                <option value="Desktop">Desktop</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Note Color</label>
              <div style={styles.colorOptions}>
                {['#fef3c7', '#dbeafe', '#dcfce7', '#fce7f3', '#f3e8ff', '#fed7aa'].map(color => (
                  <button
                    key={color}
                    onClick={() => setNewProject({ ...newProject, color })}
                    style={{
                      ...styles.colorButton,
                      backgroundColor: color,
                      border: newProject.color === color ? '3px solid #1f2937' : '2px solid #d1d5db'
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={addNewProject}
              style={styles.submitButton}
            >
              Add Project
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Patrick+Hand&display=swap');
        
        @media (max-width: 1024px) {
          .sticky-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        
        @media (max-width: 640px) {
          .sticky-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            justify-items: center;
          }
          .sticky-note-wrapper {
            min-height: 390px !important;
            width: 90%;
            max-width: 500px;
          }
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'auto',
    background: 'black',
    padding: '40px 0px'
  },
  innerContainer: {
    maxWidth: '1280px',
    margin: '0 auto'
  },
  mainTitle: {
    fontSize: '56px',
    fontWeight: 'bold',
    color: '#484848ff',
    textAlign: 'center',
    marginBottom: '48px',
    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
    fontFamily: "'Permanent Marker', cursive"
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '36px'
  },
  noteWrapper: {
    aspectRatio: '1',
    position: 'relative',
    minHeight: '360px'
  },
  note: {
    position: 'relative',
    height: '100%',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  paperTexture: {
    position: 'absolute',
    inset: '0',
    opacity: '0.1',
    background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)'
  },
  pinWrapper: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10
  },
  pinButton: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '28px',
    height: '28px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    zIndex: 10
  },
  content: {
    position: 'relative',
    height: '100%',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  titleSection: {
    marginBottom: '14px'
  },
  noteTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '6px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    lineHeight: '1.2'
  },
  underline: {
    width: '100%',
    height: '3px',
    backgroundColor: 'rgba(107, 114, 128, 0.4)'
  },
  noteContent: {
    fontSize: '18px',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '14px',
    fontFamily: "'Patrick Hand', cursive"
  },
  techSection: {
    marginBottom: '14px',
    flexGrow: 1
  },
  techLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'block',
    marginBottom: '8px',
    fontFamily: "'Patrick Hand', cursive"
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  techTag: {
    padding: '4px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#374151',
    fontWeight: '600',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: 'auto'
  },
  projectTypeLabel: {
    padding: '5px 10px',
    borderRadius: '18px',
    fontSize: '15px',
    fontWeight: '700',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  viewButton: {
    padding: '5px 10px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  editIcon: {
    position: 'absolute',
    bottom: '14px',
    right: '14px'
  },
  tapeEffect: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '68px',
    height: '26px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  cornerFold: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '0',
    height: '0',
    borderLeft: '24px solid transparent',
    borderBottom: '24px solid rgba(107, 114, 128, 0.2)'
  },
  addButton: {
    width: '100%',
    height: '100%',
    border: '4px dashed #6b7280',
    borderRadius: '8px',
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  addIconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s'
  },
  addButtonText: {
    color: '#6b7280',
    fontWeight: '700',
    margin: '0',
    fontSize: '18px',
    fontFamily: "'Patrick Hand', cursive"
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '36px',
    maxWidth: '550px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px'
  },
  modalTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
    fontFamily: "'Permanent Marker', cursive"
  },
  modalClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#6b7280'
  },
  formGroup: {
    marginBottom: '22px'
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '10px'
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 14px',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  colorOptions: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap'
  },
  colorButton: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
};
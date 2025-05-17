'use client';

import { useEffect, useState } from "react";
import AddProjectForm from "./AddProjectForm";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Project = {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: any[];
  images: string[];
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      if (res.ok) {
        router.push('/admin/login');
      } else {
        toast.error("Logout Failed", { toastId: "logout-fail" });
      }
    } catch {
      toast.error("Logout Failed", { toastId: "logout-fail" });
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data);
    } catch {
      toast.error("Failed to load projects", { toastId: "fetch-fail" });
    }
  };

  const handleDelete = (id: number) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this project?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
              if (res.ok) {
                toast.success("Project deleted!", { toastId: `delete-success-${id}` });
                if (editingProject?.id === id) setEditingProject(null);
                await fetchProjects();
              } else {
                toast.error("Failed to delete project", { toastId: `delete-fail-${id}` });
              }
            } catch {
              toast.error("Delete error", { toastId: `delete-error-${id}` });
            }
          }
        },
        {
          label: 'No',
          onClick: () => {} // do nothing
        }
      ]
    });
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white flex flex-col">
      {/* Toast container cuma 1 kali, di root component */}
      <ToastContainer position="top-right" autoClose={3000} />

      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard - Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition rounded px-5 py-2 font-semibold shadow"
        >
          Logout
        </button>
      </header>

      <section className="mb-10">
        <AddProjectForm
          onProjectAdded={() => {
            setEditingProject(null);
            fetchProjects();
          }}
          existing={editingProject}
        />
      </section>

      <hr className="border-gray-700 mb-6" />

      <section className="overflow-x-auto rounded-lg bg-gray-800 shadow">
        <table className="w-full table-auto min-w-[600px]">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left uppercase tracking-wide">Title</th>
              <th className="p-4 text-left uppercase tracking-wide">Description</th>
              <th className="p-4 text-left uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-400 italic">
                  No projects found.
                </td>
              </tr>
            )}
            {projects.map(project => (
              <tr
                key={project.id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-4 align-top">{project.title}</td>
                <td className="p-4 align-top">{project.description}</td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

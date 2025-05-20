'use client'

import React, { useEffect, useState } from "react";
import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Technology = { name: string; icon: string };
type Project = {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  technologies: Technology[];
};

export default function AddProjectForm({
  onProjectAdded,
  existing,
}: {
  onProjectAdded: () => void;
  existing?: Project | null;
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
  });

  const [technologiesInput, setTechnologiesInput] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title,
        description: existing.description,
        githubUrl: existing.githubUrl || '',
        liveUrl: existing.liveUrl || '',
      });
      setImageUrls(existing.images || []);
      setTechnologiesInput(
        existing.technologies
          .map((tech) => `${tech.name}:${tech.icon}`)
          .join(', ')
      );
    }
  }, [existing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        setImageUrls(data.urls);
        toast.success(`${data.urls.length} image(s) uploaded successfully!`);
      } else {
        toast.error("Failed to upload images");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const technologies = technologiesInput.split(',').map(t => {
      const [name, icon] = t.split(':').map(s => s.trim());
      return { name, icon };
    });

    const payload = {
      ...form,
      technologies,
      images: imageUrls,
    };

    const url = existing ? `/api/admin/projects/${existing.id}` : '/api/admin/projects';
    const method = existing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(existing ? "Project updated!" : "Project added!");
        if (!existing) {
          setForm({ title: '', description: '', githubUrl: '', liveUrl: '' });
          setTechnologiesInput('');
          setImageUrls([]);
        }
        onProjectAdded();
      } else {
        toast.error("Failed to save project");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const parsedTechnologies = technologiesInput.split(',').map(t => {
    const [name, iconName] = t.split(':').map(s => s.trim());
    const IconComponent = (FaIcons as any)[iconName];
    return { name, iconName, IconComponent };
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-700 p-4 rounded-md text-white">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded bg-slate-600" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded bg-slate-600" />
        <input name="technologies" value={technologiesInput} onChange={(e) => setTechnologiesInput(e.target.value)} placeholder="Tech (e.g. Laravel:FaLaravel)" className="w-full p-2 rounded bg-slate-600" />

        {parsedTechnologies.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-2">
            {parsedTechnologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-600 px-3 py-1 rounded text-sm">
                {tech.IconComponent ? <tech.IconComponent /> : <span>❓</span>}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="block mb-1">Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full p-2 rounded bg-slate-600" />
          {uploading && <p className="text-yellow-400 text-sm mt-2">Uploading...</p>}
          {imageUrls.length > 0 && <p className="text-green-400 text-sm mt-2">{imageUrls.length} image(s) uploaded</p>}
        </div>

        <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="w-full p-2 rounded bg-slate-600" />
        <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL" className="w-full p-2 rounded bg-slate-600" />

        <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">
          {existing ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </>
  );
}

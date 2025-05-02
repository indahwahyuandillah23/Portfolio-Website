'use client';

import { useState } from 'react';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { name, email, message };

    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus('Message sent successfully!');
    } else {
      setStatus('Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 drop-shadow">
          Contact <span className="text-yellow-400">Me</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-xl shadow-xl">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-6 text-center text-sm italic text-yellow-400">
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default ContactSection;

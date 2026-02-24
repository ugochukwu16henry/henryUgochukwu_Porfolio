'use client';

import { useEffect, useRef, useState } from 'react';
import { api, uploadFile } from '@/lib/api';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const [projectPayload, setProjectPayload] = useState({
    id: '',
    title: '',
    summary: '',
    problem: '',
    actionTaken: '',
    result: '',
    imageUrl: '',
    liveUrl: '',
    repoUrl: '',
    techStack: '',
    hostingFrontend: 'Vercel',
    hostingBackend: 'Railway',
    databaseStorage: 'PostgreSQL'
  });

  const [certificatePayload, setCertificatePayload] = useState({
    id: '',
    title: '',
    issuer: '',
    issuedDate: '',
    credentialUrl: '',
    imageUrl: ''
  });

  const [mediaPayload, setMediaPayload] = useState({
    id: '',
    title: '',
    imageUrl: '',
    category: 'personal',
    description: ''
  });

  const [resumePayload, setResumePayload] = useState({
    id: '',
    title: '',
    type: 'resume',
    linkUrl: '',
    fileUrl: '',
    isPrimary: true
  });

  const [profilePayload, setProfilePayload] = useState({
    fullName: 'Henry M. Ugochukwu',
    title: 'Full Stack Developer',
    headline: '',
    bio: '',
    email: '',
    linkedInUrl: '',
    githubUrl: '',
    heroImageUrl: '',
    firstDegree: 'B.Sc. Marriage and Family Studies (BYU-Idaho)',
    firstDegreeDate: 'August 2025',
    secondDegree: 'Software Development Engineering',
    secondDegreeEta: 'April 2026'
  });

  const requireToken = () => {
    if (!token || !isAuthenticated) {
      setMessage('Your admin session is not active. Please sign in again.');
      return false;
    }
    return true;
  };

  const resetSession = (notice?: string) => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsAuthenticated(false);
    if (notice) {
      setMessage(notice);
    }
  };

  const handleRequestError = (error: unknown) => {
    const text = (error as Error).message || 'Request failed';
    const isAuthError = /unauthorized|invalid or expired token|invalid credentials/i.test(text);

    if (isAuthError) {
      resetSession('Session expired or invalid. Please sign in again.');
      return;
    }

    setMessage(text);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem('admin_token');

      if (!savedToken) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        await api.verifyToken(savedToken);
        setToken(savedToken);
        setIsAuthenticated(true);
      } catch {
        resetSession('Session expired or invalid. Please sign in again.');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      emailInputRef.current?.focus();
    }
  }, [isAuthenticated, isCheckingAuth]);

  const login = async () => {
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      setIsAuthenticated(true);
      setMessage('Admin login successful.');
    } catch (error) {
      setIsAuthenticated(false);
      handleRequestError(error);
    }
  };

  const logout = () => {
    resetSession('You have been logged out.');
  };

  const saveProject = async () => {
    if (!requireToken()) return;
    try {
      const payload = {
        ...projectPayload,
        techStack: projectPayload.techStack.split(',').map((item) => item.trim())
      };

      if (projectPayload.id) {
        await api.updateProject(projectPayload.id, payload, token);
        setMessage('Project updated successfully.');
      } else {
        await api.createProject(payload, token);
        setMessage('Project added successfully.');
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const saveCertificate = async () => {
    if (!requireToken()) return;
    try {
      if (certificatePayload.id) {
        await api.updateCertificate(certificatePayload.id, certificatePayload, token);
        setMessage('Certificate updated successfully.');
      } else {
        await api.createCertificate(certificatePayload, token);
        setMessage('Certificate added successfully.');
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const saveMedia = async () => {
    if (!requireToken()) return;
    try {
      if (mediaPayload.id) {
        await api.updateMedia(mediaPayload.id, mediaPayload, token);
        setMessage('Photo updated successfully.');
      } else {
        await api.createMedia(mediaPayload, token);
        setMessage('Photo added successfully.');
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const saveResume = async () => {
    if (!requireToken()) return;
    try {
      if (resumePayload.id) {
        await api.updateResume(resumePayload.id, resumePayload, token);
        setMessage('Resume/CV updated successfully.');
      } else {
        await api.createResume(resumePayload, token);
        setMessage('Resume/CV added successfully.');
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const saveProfile = async () => {
    if (!requireToken()) return;
    try {
      await api.updateProfile(profilePayload, token);
      setMessage('Profile updated successfully.');
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (value: string) => void
  ) => {
    if (!event.target.files?.[0]) return;
    if (!requireToken()) return;

    setUploading(true);
    try {
      const data = await uploadFile(event.target.files[0], token);
      onUploaded(data.fileUrl);
      setMessage('File uploaded successfully.');
    } catch (error) {
      handleRequestError(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="section-container space-y-8 py-10">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <p className="text-subtle">Manage projects, certificates, profile photos, and resume/CV links or uploads.</p>
      {message ? <p className="rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm text-accent">{message}</p> : null}

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Admin Login</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input ref={emailInputRef} className="rounded-lg bg-muted p-3" placeholder="Admin email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className="rounded-lg bg-muted p-3" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="primary-btn" onClick={login}>Sign In</button>
        </div>
        {isAuthenticated ? (
          <button className="ghost-btn" onClick={logout}>Logout</button>
        ) : null}
      </section>

      {isCheckingAuth ? <p className="text-subtle">Checking admin session...</p> : null}

      {!isCheckingAuth && !isAuthenticated ? (
        <section className="glass-card p-6">
          <p className="text-subtle">Sign in to access admin controls.</p>
        </section>
      ) : null}

      {!isAuthenticated ? null : (
        <>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Update Profile</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Headline" value={profilePayload.headline} onChange={(event) => setProfilePayload({ ...profilePayload, headline: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Email" value={profilePayload.email} onChange={(event) => setProfilePayload({ ...profilePayload, email: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="LinkedIn URL" value={profilePayload.linkedInUrl} onChange={(event) => setProfilePayload({ ...profilePayload, linkedInUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="GitHub URL" value={profilePayload.githubUrl} onChange={(event) => setProfilePayload({ ...profilePayload, githubUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Hero Image URL" value={profilePayload.heroImageUrl} onChange={(event) => setProfilePayload({ ...profilePayload, heroImageUrl: event.target.value })} />
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload Hero Image
            <input type="file" className="mt-2 block" disabled={uploading} onChange={(event) => handleUpload(event, (url) => setProfilePayload({ ...profilePayload, heroImageUrl: url }))} />
          </label>
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" placeholder="Bio" rows={4} value={profilePayload.bio} onChange={(event) => setProfilePayload({ ...profilePayload, bio: event.target.value })} />
        </div>
        <button className="primary-btn" onClick={saveProfile}>Save Profile</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Project</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Project ID (for update only)" value={projectPayload.id} onChange={(event) => setProjectPayload({ ...projectPayload, id: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Project title" value={projectPayload.title} onChange={(event) => setProjectPayload({ ...projectPayload, title: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Project image URL" value={projectPayload.imageUrl} onChange={(event) => setProjectPayload({ ...projectPayload, imageUrl: event.target.value })} />
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload project image
            <input type="file" className="mt-2 block" disabled={uploading} onChange={(event) => handleUpload(event, (url) => setProjectPayload({ ...projectPayload, imageUrl: url }))} />
          </label>
          <input className="rounded-lg bg-muted p-3" placeholder="Live URL" value={projectPayload.liveUrl} onChange={(event) => setProjectPayload({ ...projectPayload, liveUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Repo URL" value={projectPayload.repoUrl} onChange={(event) => setProjectPayload({ ...projectPayload, repoUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Tech stack (comma separated)" value={projectPayload.techStack} onChange={(event) => setProjectPayload({ ...projectPayload, techStack: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Frontend hosting" value={projectPayload.hostingFrontend} onChange={(event) => setProjectPayload({ ...projectPayload, hostingFrontend: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Backend hosting" value={projectPayload.hostingBackend} onChange={(event) => setProjectPayload({ ...projectPayload, hostingBackend: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Database" value={projectPayload.databaseStorage} onChange={(event) => setProjectPayload({ ...projectPayload, databaseStorage: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Summary" value={projectPayload.summary} onChange={(event) => setProjectPayload({ ...projectPayload, summary: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Problem" value={projectPayload.problem} onChange={(event) => setProjectPayload({ ...projectPayload, problem: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Action Taken" value={projectPayload.actionTaken} onChange={(event) => setProjectPayload({ ...projectPayload, actionTaken: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Result" value={projectPayload.result} onChange={(event) => setProjectPayload({ ...projectPayload, result: event.target.value })} />
        </div>
        <button className="primary-btn" onClick={saveProject}>{projectPayload.id ? 'Update Project' : 'Add Project'}</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Certificate</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Certificate ID (for update only)" value={certificatePayload.id} onChange={(event) => setCertificatePayload({ ...certificatePayload, id: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Certificate title" value={certificatePayload.title} onChange={(event) => setCertificatePayload({ ...certificatePayload, title: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Issuer" value={certificatePayload.issuer} onChange={(event) => setCertificatePayload({ ...certificatePayload, issuer: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Issued date" value={certificatePayload.issuedDate} onChange={(event) => setCertificatePayload({ ...certificatePayload, issuedDate: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Credential URL" value={certificatePayload.credentialUrl} onChange={(event) => setCertificatePayload({ ...certificatePayload, credentialUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Image URL" value={certificatePayload.imageUrl} onChange={(event) => setCertificatePayload({ ...certificatePayload, imageUrl: event.target.value })} />
        </div>
        <button className="primary-btn" onClick={saveCertificate}>{certificatePayload.id ? 'Update Certificate' : 'Add Certificate'}</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Personal/Graduation Photo</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Photo ID (for update only)" value={mediaPayload.id} onChange={(event) => setMediaPayload({ ...mediaPayload, id: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Title" value={mediaPayload.title} onChange={(event) => setMediaPayload({ ...mediaPayload, title: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Category (profile/graduation/personal)" value={mediaPayload.category} onChange={(event) => setMediaPayload({ ...mediaPayload, category: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Image URL" value={mediaPayload.imageUrl} onChange={(event) => setMediaPayload({ ...mediaPayload, imageUrl: event.target.value })} />
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload photo
            <input type="file" className="mt-2 block" disabled={uploading} onChange={(event) => handleUpload(event, (url) => setMediaPayload({ ...mediaPayload, imageUrl: url }))} />
          </label>
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Description" value={mediaPayload.description} onChange={(event) => setMediaPayload({ ...mediaPayload, description: event.target.value })} />
        </div>
        <button className="primary-btn" onClick={saveMedia}>{mediaPayload.id ? 'Update Photo' : 'Add Photo'}</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Resume / CV</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Resume/CV ID (for update only)" value={resumePayload.id} onChange={(event) => setResumePayload({ ...resumePayload, id: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Title" value={resumePayload.title} onChange={(event) => setResumePayload({ ...resumePayload, title: event.target.value })} />
          <select className="rounded-lg bg-muted p-3" value={resumePayload.type} onChange={(event) => setResumePayload({ ...resumePayload, type: event.target.value })}>
            <option value="resume">Resume</option>
            <option value="cv">CV</option>
          </select>
          <input className="rounded-lg bg-muted p-3" placeholder="Link URL" value={resumePayload.linkUrl} onChange={(event) => setResumePayload({ ...resumePayload, linkUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Uploaded file URL" value={resumePayload.fileUrl} onChange={(event) => setResumePayload({ ...resumePayload, fileUrl: event.target.value })} />
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload resume/cv file
            <input type="file" className="mt-2 block" disabled={uploading} onChange={(event) => handleUpload(event, (url) => setResumePayload({ ...resumePayload, fileUrl: url }))} />
          </label>
          <label className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-subtle">
            <input
              type="checkbox"
              checked={resumePayload.isPrimary}
              onChange={(event) => setResumePayload({ ...resumePayload, isPrimary: event.target.checked })}
            />
            Set as primary
          </label>
        </div>
        <button className="primary-btn" onClick={saveResume}>{resumePayload.id ? 'Update Resume/CV' : 'Add Resume/CV'}</button>
      </section>
      </>
      )}
    </main>
  );
}

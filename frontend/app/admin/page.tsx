'use client';

import { useEffect, useRef, useState } from 'react';
import { api, uploadFile } from '@/lib/api';
import { Certificate, MediaAsset, Project, ResumeAsset } from '@/lib/types';

const emptyProjectPayload = {
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
  databaseStorage: 'PostgreSQL',
  featured: false,
  displayOrder: 0
};

const emptyCertificatePayload = {
  id: '',
  title: '',
  issuer: '',
  issuedDate: '',
  credentialUrl: '',
  imageUrl: ''
};

const emptyMediaPayload = {
  id: '',
  title: '',
  imageUrl: '',
  category: 'personal',
  description: ''
};

const emptyResumePayload = {
  id: '',
  title: '',
  type: 'resume',
  linkUrl: '',
  fileUrl: '',
  isPrimary: true
};

const defaultProfilePayload = {
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
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  // Pagination and search state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsTotal, setProjectsTotal] = useState(0);
  const [projectsPage, setProjectsPage] = useState(1);
  const [projectsPageSize, setProjectsPageSize] = useState(10);
  const [projectsSearch, setProjectsSearch] = useState('');

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certificatesTotal, setCertificatesTotal] = useState(0);
  const [certificatesPage, setCertificatesPage] = useState(1);
  const [certificatesPageSize, setCertificatesPageSize] = useState(10);
  const [certificatesSearch, setCertificatesSearch] = useState('');

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaTotal, setMediaTotal] = useState(0);
  const [mediaPage, setMediaPage] = useState(1);
  const [mediaPageSize, setMediaPageSize] = useState(10);
  const [mediaSearch, setMediaSearch] = useState('');

  const [resumes, setResumes] = useState<ResumeAsset[]>([]);
  const [resumesTotal, setResumesTotal] = useState(0);
  const [resumesPage, setResumesPage] = useState(1);
  const [resumesPageSize, setResumesPageSize] = useState(10);
  const [resumesSearch, setResumesSearch] = useState('');

  const [projectPayload, setProjectPayload] = useState(emptyProjectPayload);
  const [projectGalleryImages, setProjectGalleryImages] = useState<string[]>([]);
  const [certificatePayload, setCertificatePayload] = useState(emptyCertificatePayload);
  const [mediaPayload, setMediaPayload] = useState(emptyMediaPayload);
  const [resumePayload, setResumePayload] = useState(emptyResumePayload);
  const [profilePayload, setProfilePayload] = useState(defaultProfilePayload);

  const refreshDashboardData = async (activeToken: string) => {
    setIsLoadingDashboard(true);
    try {
      const [profile, projectsResp, certificatesResp, mediaResp, resumesResp] = await Promise.all([
        api.getProfile(),
        api.getProjects({ page: projectsPage, pageSize: projectsPageSize, search: projectsSearch }),
        api.getCertificates({ page: certificatesPage, pageSize: certificatesPageSize, search: certificatesSearch }),
        api.getMedia({ page: mediaPage, pageSize: mediaPageSize, search: mediaSearch }),
        api.getResumes({ page: resumesPage, pageSize: resumesPageSize, search: resumesSearch })
      ]);

      if (profile) {
        setProfilePayload({
          ...defaultProfilePayload,
          ...profile
        });
      }

      setProjects(projectsResp.items);
      setProjectsTotal(projectsResp.total);
      setCertificates(certificatesResp.items);
      setCertificatesTotal(certificatesResp.total);
      setMediaAssets(mediaResp.items);
      setMediaTotal(mediaResp.total);
      setResumes(resumesResp.items);
      setResumesTotal(resumesResp.total);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setIsLoadingDashboard(false);
    }
  };

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

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const withRetryOnTransientFailure = async (action: () => Promise<void>) => {
    try {
      await action();
      return;
    } catch (error) {
      const text = (error as Error).message || 'Request failed';
      const shouldRetry = /network error|failed to fetch|bad gateway|\(502\)/i.test(text);

      if (!shouldRetry) {
        throw error;
      }

      setMessage('Temporary server/network issue detected. Retrying...');
      await wait(800);
      await action();
    }
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
        await refreshDashboardData(savedToken);
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
    setLoadingAction('login');
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      setIsAuthenticated(true);
      await refreshDashboardData(data.token);
      setMessage('Admin login successful.');
    } catch (error) {
      setIsAuthenticated(false);
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const logout = () => {
    resetSession('You have been logged out.');
  };

  const saveProject = async () => {
    if (!requireToken()) return;
    setLoadingAction('project');
    try {
      const payload = {
        ...projectPayload,
        techStack: projectPayload.techStack
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        galleryImages: projectGalleryImages
      };

      if (projectPayload.id) {
        await api.updateProject(projectPayload.id, payload, token);
        setMessage('Project updated successfully.');
      } else {
        await api.createProject(payload, token);
        setMessage('Project added successfully.');
      }
      setProjectPayload(emptyProjectPayload);
      setProjectGalleryImages([]);
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const saveCertificate = async () => {
    if (!requireToken()) return;
    setLoadingAction('certificate');
    try {
      if (certificatePayload.id) {
        await api.updateCertificate(certificatePayload.id, certificatePayload, token);
        setMessage('Certificate updated successfully.');
      } else {
        await api.createCertificate(certificatePayload, token);
        setMessage('Certificate added successfully.');
      }
      setCertificatePayload(emptyCertificatePayload);
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const saveMedia = async () => {
    if (!requireToken()) return;
    setLoadingAction('media');
    try {
      if (mediaPayload.id) {
        await api.updateMedia(mediaPayload.id, mediaPayload, token);
        setMessage('Photo updated successfully.');
      } else {
        await api.createMedia(mediaPayload, token);
        setMessage('Photo added successfully.');
      }
      setMediaPayload(emptyMediaPayload);
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const saveResume = async () => {
    if (!requireToken()) return;
    setLoadingAction('resume');
    try {
      await withRetryOnTransientFailure(async () => {
        if (resumePayload.id) {
          await api.updateResume(resumePayload.id, resumePayload, token);
          setMessage('Resume/CV updated successfully.');
        } else {
          await api.createResume(resumePayload, token);
          setMessage('Resume/CV added successfully.');
        }
      });
      setResumePayload(emptyResumePayload);
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const saveProfile = async () => {
    if (!requireToken()) return;
    setLoadingAction('profile');
    try {
      await api.updateProfile(profilePayload, token);
      setMessage('Profile updated successfully.');
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const editProject = (item: Project) => {
    setProjectPayload({
      id: item.id,
      title: item.title,
      summary: item.summary,
      problem: item.problem,
      actionTaken: item.actionTaken,
      result: item.result,
      imageUrl: item.imageUrl,
      liveUrl: item.liveUrl,
      repoUrl: item.repoUrl || '',
      techStack: item.techStack.join(', '),
      hostingFrontend: item.hostingFrontend || 'Vercel',
      hostingBackend: item.hostingBackend || 'Railway',
      databaseStorage: item.databaseStorage || 'PostgreSQL',
      featured: item.featured,
      displayOrder: 0
    });
    setProjectGalleryImages(item.galleryImages || []);
    setMessage(`Editing project: ${item.title}`);
  };

  const deleteProject = async (id: string) => {
    if (!requireToken()) return;
    if (!window.confirm('Delete this project?')) return;

    setLoadingAction(`project-delete-${id}`);
    try {
      await api.deleteProject(id, token);
      setMessage('Project deleted successfully.');
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const editMedia = (item: MediaAsset) => {
    setMediaPayload({
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      category: item.category,
      description: item.description || ''
    });
    setMessage(`Editing photo: ${item.title}`);
  };

  const deleteMedia = async (id: string) => {
    if (!requireToken()) return;
    if (!window.confirm('Delete this photo?')) return;

    setLoadingAction(`media-delete-${id}`);
    try {
      await api.deleteMedia(id, token);
      setMessage('Photo deleted successfully.');
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const editResume = (item: ResumeAsset) => {
    setResumePayload({
      id: item.id,
      title: item.title,
      type: item.type,
      linkUrl: item.linkUrl || '',
      fileUrl: item.fileUrl || '',
      isPrimary: item.isPrimary
    });
    setMessage(`Editing resume/CV: ${item.title}`);
  };

  const deleteResume = async (id: string) => {
    if (!requireToken()) return;
    if (!window.confirm('Delete this resume/CV?')) return;

    setLoadingAction(`resume-delete-${id}`);
    try {
      await api.deleteResume(id, token);
      setMessage('Resume/CV deleted successfully.');
      await refreshDashboardData(token);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoadingAction(null);
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
          <button className="primary-btn disabled:cursor-not-allowed disabled:opacity-70" onClick={login} disabled={loadingAction === 'login'}>
            {loadingAction === 'login' ? 'Signing In...' : 'Sign In'}
          </button>
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

      {isLoadingDashboard ? (
        <section className="glass-card p-6">
          <p className="text-subtle">Loading your dashboard data...</p>
        </section>
      ) : null}

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
        <button className="primary-btn disabled:cursor-not-allowed disabled:opacity-70" onClick={saveProfile} disabled={loadingAction === 'profile'}>
          {loadingAction === 'profile' ? 'Saving...' : 'Save Profile'}
        </button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Project</h2>
        <div className="grid gap-3 md:grid-cols-2">
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
          <label className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-subtle">
            <input
              type="checkbox"
              checked={projectPayload.featured}
              onChange={(event) => setProjectPayload({ ...projectPayload, featured: event.target.checked })}
            />
            Featured project
          </label>
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Summary" value={projectPayload.summary} onChange={(event) => setProjectPayload({ ...projectPayload, summary: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Problem" value={projectPayload.problem} onChange={(event) => setProjectPayload({ ...projectPayload, problem: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Action Taken" value={projectPayload.actionTaken} onChange={(event) => setProjectPayload({ ...projectPayload, actionTaken: event.target.value })} />
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Result" value={projectPayload.result} onChange={(event) => setProjectPayload({ ...projectPayload, result: event.target.value })} />
        </div>
        <div className="space-y-2 mt-2">
          <p className="text-sm text-subtle">Additional project screenshots (shown only on View Details)</p>
          {projectGalleryImages.length ? (
            <div className="space-y-1 text-xs text-subtle">
              {projectGalleryImages.map((url, index) => (
                <div key={`${url}-${index}`} className="flex items-center gap-2">
                  <span className="truncate max-w-[260px]">{url}</span>
                  <button
                    type="button"
                    className="ghost-btn px-2 py-1 text-[11px]"
                    onClick={() =>
                      setProjectGalleryImages((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload additional screenshot
            <input
              type="file"
              className="mt-2 block"
              disabled={uploading}
              onChange={(event) =>
                handleUpload(event, (url) =>
                  setProjectGalleryImages((prev) => [...prev, url])
                )
              }
            />
          </label>
        </div>
        <button className="primary-btn disabled:cursor-not-allowed disabled:opacity-70" onClick={saveProject} disabled={loadingAction === 'project'}>
          {loadingAction === 'project'
            ? projectPayload.id
              ? 'Updating Project...'
              : 'Adding Project...'
            : projectPayload.id
              ? 'Update Project'
              : 'Add Project'}
        </button>
        <button
          className="ghost-btn"
          onClick={() => {
            setProjectPayload(emptyProjectPayload);
            setProjectGalleryImages([]);
          }}
        >
          Clear Project Form
        </button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Your Projects ({projectsTotal})</h2>
        <div className="flex items-center gap-2 mb-2">
          <input className="rounded-lg bg-muted p-2 text-sm" placeholder="Search projects" value={projectsSearch} onChange={e => { setProjectsSearch(e.target.value); setProjectsPage(1); }} />
          <select className="rounded-lg bg-muted p-2 text-sm" value={projectsPageSize} onChange={e => { setProjectsPageSize(Number(e.target.value)); setProjectsPage(1); }}>
            {[5,10,20,50].map(size => <option key={size} value={size}>{size} per page</option>)}
          </select>
        </div>
        {!projects.length ? <p className="text-subtle">No projects yet.</p> : null}
        <div className="space-y-3">
          {projects.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 bg-muted/30 p-4">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-subtle">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="ghost-btn" onClick={() => editProject(item)}>Edit</button>
                <button
                  className="ghost-btn border-red-400/40 text-red-300 hover:bg-red-500/10"
                  onClick={() => deleteProject(item.id)}
                  disabled={loadingAction === `project-delete-${item.id}`}
                >
                  {loadingAction === `project-delete-${item.id}` ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button className="ghost-btn" disabled={projectsPage === 1} onClick={() => setProjectsPage(projectsPage - 1)}>Prev</button>
          <span className="text-sm">Page {projectsPage} of {Math.ceil(projectsTotal / projectsPageSize) || 1}</span>
          <button className="ghost-btn" disabled={projectsPage * projectsPageSize >= projectsTotal} onClick={() => setProjectsPage(projectsPage + 1)}>Next</button>
        </div>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Certificate</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Certificate title" value={certificatePayload.title} onChange={(event) => setCertificatePayload({ ...certificatePayload, title: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Issuer" value={certificatePayload.issuer} onChange={(event) => setCertificatePayload({ ...certificatePayload, issuer: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Issued date" value={certificatePayload.issuedDate} onChange={(event) => setCertificatePayload({ ...certificatePayload, issuedDate: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Credential URL" value={certificatePayload.credentialUrl} onChange={(event) => setCertificatePayload({ ...certificatePayload, credentialUrl: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Image URL" value={certificatePayload.imageUrl} onChange={(event) => setCertificatePayload({ ...certificatePayload, imageUrl: event.target.value })} />
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload certificate image
            <input
              type="file"
              className="mt-2 block"
              disabled={uploading}
              onChange={(event) =>
                handleUpload(event, (url) =>
                  setCertificatePayload({ ...certificatePayload, imageUrl: url })
                )
              }
            />
          </label>
        </div>
        <button className="primary-btn disabled:cursor-not-allowed disabled:opacity-70" onClick={saveCertificate} disabled={loadingAction === 'certificate'}>
          {loadingAction === 'certificate'
            ? certificatePayload.id
              ? 'Updating Certificate...'
              : 'Adding Certificate...'
            : certificatePayload.id
              ? 'Update Certificate'
              : 'Add Certificate'}
        </button>
        <button className="ghost-btn" onClick={() => setCertificatePayload(emptyCertificatePayload)}>Clear Certificate Form</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Your Certificates ({certificatesTotal})</h2>
        <div className="flex items-center gap-2 mb-2">
          <input className="rounded-lg bg-muted p-2 text-sm" placeholder="Search certificates" value={certificatesSearch} onChange={e => { setCertificatesSearch(e.target.value); setCertificatesPage(1); }} />
          <select className="rounded-lg bg-muted p-2 text-sm" value={certificatesPageSize} onChange={e => { setCertificatesPageSize(Number(e.target.value)); setCertificatesPage(1); }}>
            {[5,10,20,50].map(size => <option key={size} value={size}>{size} per page</option>)}
          </select>
        </div>
        {!certificates.length ? <p className="text-subtle">No certificates yet.</p> : null}
        <div className="space-y-3">
          {certificates.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 bg-muted/30 p-4">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-subtle">{item.issuer}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="ghost-btn"
                  onClick={() =>
                    setCertificatePayload({
                      id: item.id,
                      title: item.title,
                      issuer: item.issuer,
                      issuedDate: item.issuedDate || '',
                      credentialUrl: item.credentialUrl || '',
                      imageUrl: item.imageUrl || ''
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="ghost-btn border-red-400/40 text-red-300 hover:bg-red-500/10"
                  onClick={async () => {
                    if (!requireToken()) return;
                    if (!window.confirm('Delete this certificate?')) return;
                    setLoadingAction(`certificate-delete-${item.id}`);
                    try {
                      await api.deleteCertificate(item.id, token);
                      setMessage('Certificate deleted successfully.');
                      await refreshDashboardData(token);
                    } catch (error) {
                      handleRequestError(error);
                    } finally {
                      setLoadingAction(null);
                    }
                  }}
                  disabled={loadingAction === `certificate-delete-${item.id}`}
                >
                  {loadingAction === `certificate-delete-${item.id}` ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button className="ghost-btn" disabled={certificatesPage === 1} onClick={() => setCertificatesPage(certificatesPage - 1)}>Prev</button>
          <span className="text-sm">Page {certificatesPage} of {Math.ceil(certificatesTotal / certificatesPageSize) || 1}</span>
          <button className="ghost-btn" disabled={certificatesPage * certificatesPageSize >= certificatesTotal} onClick={() => setCertificatesPage(certificatesPage + 1)}>Next</button>
        </div>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Personal/Graduation Photo</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg bg-muted p-3" placeholder="Title" value={mediaPayload.title} onChange={(event) => setMediaPayload({ ...mediaPayload, title: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Category (profile/graduation/personal)" value={mediaPayload.category} onChange={(event) => setMediaPayload({ ...mediaPayload, category: event.target.value })} />
          <input className="rounded-lg bg-muted p-3" placeholder="Image URL" value={mediaPayload.imageUrl} onChange={(event) => setMediaPayload({ ...mediaPayload, imageUrl: event.target.value })} />
          <label className="rounded-lg bg-muted p-3 text-sm text-subtle">
            Upload photo
            <input type="file" className="mt-2 block" disabled={uploading} onChange={(event) => handleUpload(event, (url) => setMediaPayload({ ...mediaPayload, imageUrl: url }))} />
          </label>
          <textarea className="rounded-lg bg-muted p-3 md:col-span-2" rows={2} placeholder="Description" value={mediaPayload.description} onChange={(event) => setMediaPayload({ ...mediaPayload, description: event.target.value })} />
        </div>
        <button className="primary-btn disabled:cursor-not-allowed disabled:opacity-70" onClick={saveMedia} disabled={loadingAction === 'media'}>
          {loadingAction === 'media'
            ? mediaPayload.id
              ? 'Updating Photo...'
              : 'Adding Photo...'
            : mediaPayload.id
              ? 'Update Photo'
              : 'Add Photo'}
        </button>
        <button className="ghost-btn" onClick={() => setMediaPayload(emptyMediaPayload)}>Clear Photo Form</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Your Photos ({mediaTotal})</h2>
        <div className="flex items-center gap-2 mb-2">
          <input className="rounded-lg bg-muted p-2 text-sm" placeholder="Search photos" value={mediaSearch} onChange={e => { setMediaSearch(e.target.value); setMediaPage(1); }} />
          <select className="rounded-lg bg-muted p-2 text-sm" value={mediaPageSize} onChange={e => { setMediaPageSize(Number(e.target.value)); setMediaPage(1); }}>
            {[5,10,20,50].map(size => <option key={size} value={size}>{size} per page</option>)}
          </select>
        </div>
        {!mediaAssets.length ? <p className="text-subtle">No photos yet.</p> : null}
        <div className="space-y-3">
          {mediaAssets.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 bg-muted/30 p-4">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-subtle">{item.category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="ghost-btn" onClick={() => editMedia(item)}>Edit</button>
                <button
                  className="ghost-btn border-red-400/40 text-red-300 hover:bg-red-500/10"
                  onClick={() => deleteMedia(item.id)}
                  disabled={loadingAction === `media-delete-${item.id}`}
                >
                  {loadingAction === `media-delete-${item.id}` ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button className="ghost-btn" disabled={mediaPage === 1} onClick={() => setMediaPage(mediaPage - 1)}>Prev</button>
          <span className="text-sm">Page {mediaPage} of {Math.ceil(mediaTotal / mediaPageSize) || 1}</span>
          <button className="ghost-btn" disabled={mediaPage * mediaPageSize >= mediaTotal} onClick={() => setMediaPage(mediaPage + 1)}>Next</button>
        </div>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Add Resume / CV</h2>
        <div className="grid gap-3 md:grid-cols-2">
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
        <button className="primary-btn disabled:cursor-not-allowed disabled:opacity-70" onClick={saveResume} disabled={loadingAction === 'resume'}>
          {loadingAction === 'resume'
            ? resumePayload.id
              ? 'Updating Resume/CV...'
              : 'Adding Resume/CV...'
            : resumePayload.id
              ? 'Update Resume/CV'
              : 'Add Resume/CV'}
        </button>
        <button className="ghost-btn" onClick={() => setResumePayload(emptyResumePayload)}>Clear Resume/CV Form</button>
      </section>

      <section className="glass-card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-white">Your Resume/CV Files ({resumesTotal})</h2>
        <div className="flex items-center gap-2 mb-2">
          <input className="rounded-lg bg-muted p-2 text-sm" placeholder="Search resumes" value={resumesSearch} onChange={e => { setResumesSearch(e.target.value); setResumesPage(1); }} />
          <select className="rounded-lg bg-muted p-2 text-sm" value={resumesPageSize} onChange={e => { setResumesPageSize(Number(e.target.value)); setResumesPage(1); }}>
            {[5,10,20,50].map(size => <option key={size} value={size}>{size} per page</option>)}
          </select>
        </div>
        {!resumes.length ? <p className="text-subtle">No resume/CV records yet.</p> : null}
        <div className="space-y-3">
          {resumes.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 bg-muted/30 p-4">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-subtle">Type: {item.type} {item.isPrimary ? '• Primary' : ''}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="ghost-btn" onClick={() => editResume(item)}>Edit</button>
                <button
                  className="ghost-btn border-red-400/40 text-red-300 hover:bg-red-500/10"
                  onClick={() => deleteResume(item.id)}
                  disabled={loadingAction === `resume-delete-${item.id}`}
                >
                  {loadingAction === `resume-delete-${item.id}` ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button className="ghost-btn" disabled={resumesPage === 1} onClick={() => setResumesPage(resumesPage - 1)}>Prev</button>
          <span className="text-sm">Page {resumesPage} of {Math.ceil(resumesTotal / resumesPageSize) || 1}</span>
          <button className="ghost-btn" disabled={resumesPage * resumesPageSize >= resumesTotal} onClick={() => setResumesPage(resumesPage + 1)}>Next</button>
        </div>
      </section>
      </>
      )}
    </main>
  );
}

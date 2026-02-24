const base = process.env.SMOKE_API_BASE || 'https://henryugochukwuporfolio-production.up.railway.app/api';
const email = process.env.SMOKE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
const password = process.env.SMOKE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

const results = [];

const request = async (name, path, options = {}) => {
  try {
    const response = await fetch(`${base}${path}`, options);
    const text = await response.text();

    if (!response.ok) {
      results.push({ name, ok: false, status: response.status, body: text.slice(0, 200) });
      return null;
    }

    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    results.push({ name, ok: true, status: response.status });
    return data;
  } catch (error) {
    results.push({ name, ok: false, status: 'NETWORK', body: error.message });
    return null;
  }
};

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});

const run = async () => {
  await request('health', '/health');

  const login = await request('auth.login', '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const token = login?.token;
  if (!token) {
    printResults();
    process.exit(1);
  }

  await request('auth.verify', '/auth/verify', {
    headers: { Authorization: `Bearer ${token}` }
  });

  await request('profile.get', '/profile');
  await request('profile.put', '/profile', {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({
      headline: 'Smoke check headline',
      bio: 'Smoke check bio',
      email
    })
  });

  await request('projects.list', '/projects');
  await request('projects.getBySlug', '/projects/charity-operations-dashboard');

  const createdProject = await request('projects.create', '/projects', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      title: `Smoke Project ${Date.now()}`,
      summary: 'temp',
      problem: 'temp',
      actionTaken: 'temp',
      result: 'temp',
      imageUrl: 'https://example.com/p.jpg',
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com',
      techStack: ['Next.js'],
      hostingFrontend: 'Vercel',
      hostingBackend: 'Railway',
      databaseStorage: 'PostgreSQL'
    })
  });

  if (createdProject?.id) {
    await request('projects.update', `/projects/${createdProject.id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify({ summary: 'updated', techStack: ['Next.js', 'Node.js'] })
    });

    await request('projects.delete', `/projects/${createdProject.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  await request('certificates.list', '/certificates');
  const createdCertificate = await request('certificates.create', '/certificates', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      title: `Smoke Cert ${Date.now()}`,
      issuer: 'Smoke',
      issuedDate: '2026',
      credentialUrl: 'https://example.com/c',
      imageUrl: 'https://example.com/c.jpg'
    })
  });

  if (createdCertificate?.id) {
    await request('certificates.update', `/certificates/${createdCertificate.id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify({ issuer: 'Smoke Updated' })
    });

    await request('certificates.delete', `/certificates/${createdCertificate.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  await request('media.list', '/media');
  const createdMedia = await request('media.create', '/media', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      title: `Smoke Media ${Date.now()}`,
      imageUrl: 'https://example.com/m.jpg',
      category: 'personal',
      description: 'temp'
    })
  });

  if (createdMedia?.id) {
    await request('media.update', `/media/${createdMedia.id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify({ description: 'updated' })
    });

    await request('media.delete', `/media/${createdMedia.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  await request('resumes.list', '/resumes');
  const createdResume = await request('resumes.create', '/resumes', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      title: `Smoke Resume ${Date.now()}`,
      type: 'resume',
      linkUrl: 'https://example.com/r.pdf',
      isPrimary: false
    })
  });

  if (createdResume?.id) {
    await request('resumes.update', `/resumes/${createdResume.id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify({ title: 'Smoke Resume Updated' })
    });

    await request('resumes.delete', `/resumes/${createdResume.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  printResults();
  const failed = results.filter((result) => !result.ok);
  process.exit(failed.length ? 1 : 0);
};

const printResults = () => {
  for (const result of results) {
    if (result.ok) {
      console.log(`PASS [${result.name}] ${result.status}`);
    } else {
      console.log(`FAIL [${result.name}] ${result.status} ${result.body || ''}`);
    }
  }
};

run();

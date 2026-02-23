import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.deleteMany();
  await prisma.project.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.resumeAsset.deleteMany();

  await prisma.profile.create({
    data: {
      fullName: 'Henry M. Ugochukwu',
      title: 'Full Stack Developer',
      headline: 'Building production-ready web products with clean UX and scalable architecture.',
      bio: 'I am a full stack developer focused on product engineering, clean architecture, and modern user experiences. I build complete solutions from frontend interfaces to backend APIs, databases, and cloud deployment.',
      email: 'henry@example.com',
      linkedInUrl: 'https://linkedin.com',
      githubUrl: 'https://github.com',
      location: 'Nigeria',
      heroImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      currentRole: 'Full Stack Developer',
      firstDegree: 'B.Sc. Marriage and Family Studies (BYU-Idaho)',
      firstDegreeDate: 'August 2025',
      secondDegree: 'Software Development Engineering',
      secondDegreeEta: 'April 2026'
    }
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'Charity Operations Dashboard',
        slug: 'charity-operations-dashboard',
        summary: 'A full-stack dashboard for managing donations, beneficiaries, and impact reporting.',
        problem: 'Small charities needed a central dashboard to track donations and beneficiary records.',
        actionTaken: 'Built a React + Node.js platform with role-based access, secure APIs, and PostgreSQL reporting.',
        result: 'Reduced manual reporting effort by over 60% and improved visibility for stakeholders.',
        techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Railway', 'Vercel'],
        hostingFrontend: 'Vercel',
        hostingBackend: 'Railway',
        databaseStorage: 'PostgreSQL',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        featured: true,
        displayOrder: 1
      },
      {
        title: 'Appointment Booking System',
        slug: 'appointment-booking-system',
        summary: 'A responsive booking platform with reminders and analytics.',
        problem: 'Service businesses struggled with no-shows and fragmented scheduling tools.',
        actionTaken: 'Implemented end-to-end booking flow, async notifications, and admin analytics.',
        result: 'Improved booking completion and reduced no-show rates with automated reminders.',
        techStack: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'JWT', 'Railway'],
        hostingFrontend: 'Vercel',
        hostingBackend: 'Railway',
        databaseStorage: 'PostgreSQL',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        featured: true,
        displayOrder: 2
      }
    ]
  });

  await prisma.certificate.createMany({
    data: [
      {
        title: 'Full Stack Web Development',
        issuer: 'BYU-Idaho',
        issuedDate: '2025',
        credentialUrl: 'https://example.com/certificate',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200'
      }
    ]
  });

  await prisma.mediaAsset.createMany({
    data: [
      {
        title: 'Professional Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200',
        category: 'profile',
        description: 'Main profile photo'
      },
      {
        title: 'Graduation Photo',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
        category: 'graduation',
        description: 'Graduation memory'
      }
    ]
  });

  await prisma.resumeAsset.createMany({
    data: [
      {
        title: 'Resume',
        type: 'resume',
        linkUrl: 'https://example.com/resume.pdf',
        isPrimary: true
      },
      {
        title: 'Curriculum Vitae',
        type: 'cv',
        linkUrl: 'https://example.com/cv.pdf',
        isPrimary: false
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

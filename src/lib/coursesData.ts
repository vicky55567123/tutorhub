/**
 * Single source of truth for course catalogue data, used by both the course
 * listing page (/courses) and the course detail page (/courses/[id]).
 *
 * Previously these two pages each had their own hard-coded copy of this data,
 * which had drifted out of sync - most notably the `image` field pointed to
 * completely different photos for several courses depending on whether you
 * were on the listing "preview" card or the detail page, and a couple of
 * instructor names differed too. Consolidating into one array/object here
 * makes that class of bug impossible going forward - both pages import the
 * same `courses` array.
 *
 * Images: we store just the Unsplash photo id and build the URL with
 * `courseImageUrl()`, so every page can request whatever size it needs while
 * always referencing the exact same underlying photo.
 */

export interface Course {
  id: number
  title: string
  /** Short blurb shown on course cards / list view. */
  description: string
  /** Longer description shown on the course detail page. */
  fullDescription: string
  price: string
  rating: number
  students: number
  /** Unsplash photo id, e.g. '1635070041078-e363dbe005cb' (no query string). */
  imageId: string
  category: string
  subject?: string
  duration: string
  level: string
  instructor?: string
  instructorBio?: string
  examBoard?: string
  modules?: string[]
  skills?: string[]
  requirements?: string[]
  outcomes?: string[]
}

/** Builds an Unsplash image URL for a given photo id at the requested render size. */
export function courseImageUrl(imageId: string, opts: { w: number; h: number } = { w: 600, h: 450 }) {
  return `https://images.unsplash.com/photo-${imageId}?w=${opts.w}&h=${opts.h}&fit=crop&q=80`
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'GCSE Mathematics (Grades 4-9)',
    description: 'Complete GCSE Maths preparation covering Number, Algebra, Geometry, Statistics and Probability.',
    fullDescription:
      'Our comprehensive GCSE Mathematics course is designed to help students achieve grades 4-9 across all major exam boards. We cover all essential topics including Number theory, Algebraic manipulation, Geometric principles, Statistical analysis, and Probability calculations. Our expert tutors use proven teaching methods and past paper practice to ensure exam success.',
    price: '£35/hour',
    rating: 4.9,
    students: 250,
    imageId: '1635070041078-e363dbe005cb',
    category: 'GCSE',
    subject: 'Mathematics',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Sarah Johnson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Number and Basic Algebra',
      'Advanced Algebra and Functions',
      'Geometry and Measures',
      'Statistics and Data Analysis',
      'Probability and Combined Events',
      'Problem Solving and Exam Techniques',
    ],
    skills: [
      'Algebraic manipulation and equation solving',
      'Geometric calculations and proofs',
      'Statistical analysis and interpretation',
      'Probability calculations',
      'Problem-solving strategies',
      'Exam technique and time management',
    ],
    requirements: [
      'Basic arithmetic skills',
      'Calculator (scientific recommended)',
      'Notebook and writing materials',
      'Access to past papers (provided)',
    ],
    outcomes: [
      'Achieve GCSE grade 4-9 in Mathematics',
      'Master all key mathematical concepts',
      'Develop problem-solving confidence',
      'Excel in exam conditions',
    ],
  },
  {
    id: 2,
    title: 'GCSE Physics (Grades 4-9)',
    description: 'Master GCSE Physics topics including Forces, Energy, Waves, Electricity and Particle Physics.',
    fullDescription:
      'Dive deep into the fascinating world of physics with our comprehensive GCSE course. From understanding fundamental forces and energy transformations to exploring wave properties and electrical circuits, this course covers all exam board requirements. Our practical approach includes virtual experiments and real-world applications to make physics engaging and memorable.',
    price: '£40/hour',
    rating: 4.8,
    students: 180,
    imageId: '1636466497217-26a8cbeaf0aa',
    category: 'GCSE',
    subject: 'Physics',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Prof. David Wilson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Forces and Motion',
      'Energy and Power',
      'Waves and Electromagnetic Spectrum',
      'Electricity and Magnetism',
      'Particle Physics and Atomic Structure',
      'Space Physics and Earth Science',
    ],
    skills: [
      'Physics calculations and formulas',
      'Experimental design and analysis',
      'Graph interpretation',
      'Scientific reasoning',
      'Practical investigation skills',
      'Physics in everyday contexts',
    ],
    requirements: [
      'GCSE Mathematics (Grade 4 or above recommended)',
      'Scientific calculator',
      'Lab notebook',
      'Interest in how things work',
    ],
    outcomes: [
      'Achieve GCSE grade 4-9 in Physics',
      'Understand fundamental physics principles',
      'Apply physics to real-world situations',
      'Develop scientific thinking skills',
    ],
  },
  {
    id: 3,
    title: 'GCSE Chemistry (Grades 4-9)',
    description: 'Comprehensive GCSE Chemistry covering Atomic Structure, Bonding, Chemical Reactions and Analysis.',
    fullDescription:
      'Discover the fascinating molecular world with our comprehensive GCSE Chemistry course, expertly designed to help students achieve grades 4-9 across AQA, Edexcel, and OCR exam boards. From fundamental atomic theory and chemical bonding to complex organic reactions and quantitative analysis, our structured approach combines theoretical understanding with practical application. Students master essential chemical calculations, equation balancing, and laboratory techniques through engaging virtual experiments, real-world examples, and targeted exam practice.',
    price: '£38/hour',
    rating: 4.9,
    students: 160,
    imageId: '1554475901-4538ddfbccc2',
    category: 'GCSE',
    subject: 'Chemistry',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Emma Thompson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Atomic Structure and Periodic Table',
      'Chemical Bonding and Structure',
      'Chemical Reactions and Equations',
      'Quantitative Chemistry',
      'Organic Chemistry Basics',
      'Chemical Analysis and Testing',
    ],
    skills: [
      'Chemical equation balancing',
      'Mole calculations',
      'Understanding reaction mechanisms',
      'Laboratory safety and techniques',
      'Data analysis and interpretation',
      'Chemical formula writing',
    ],
    requirements: [
      'GCSE Mathematics (Grade 4 recommended)',
      'Scientific calculator',
      'Periodic table (provided)',
      'Lab safety awareness',
    ],
    outcomes: [
      'Achieve GCSE Chemistry grade 4-9 with comprehensive exam preparation',
      'Master chemical concepts, calculations, and practical laboratory techniques',
      'Develop strong analytical skills for complex chemical problems and reactions',
      'Understand real-world chemistry applications in industry, medicine, and environment',
      'Build confidence in laboratory work, safety procedures, and scientific investigation',
      'Prepare effectively for A-Level Chemistry or science-related university courses',
    ],
  },
  {
    id: 4,
    title: 'GCSE Biology (Grades 4-9)',
    description: 'GCSE Biology essentials: Cell Biology, Human Biology, Genetics, Evolution and Ecology.',
    fullDescription:
      'Explore the fascinating world of living organisms with our comprehensive GCSE Biology course, specially designed to help students achieve grades 4-9 across AQA, Edexcel, and OCR exam boards. From microscopic cellular processes and DNA structure to complex ecological relationships and human physiology, our expert-led program combines cutting-edge visual learning tools, interactive diagrams, virtual laboratory experiences, and real-world case studies to make biology both understandable and memorable.',
    price: '£36/hour',
    rating: 4.7,
    students: 200,
    imageId: '1530026405186-ed1f139313f8',
    category: 'GCSE',
    subject: 'Biology',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Michael Roberts',
    instructorBio:
      'Dr. Michael Roberts combines 18 years of biology teaching excellence with active field research experience in marine biology and genetics. He brings cutting-edge biological discoveries into the classroom through virtual lab experiences and real-world case studies. His students consistently achieve top grades, with 92% reaching grades 7-9 in recent years.',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Cell Biology and Microscopy',
      'Human Body Systems',
      'Plant Biology and Photosynthesis',
      'Genetics and Inheritance',
      'Evolution and Natural Selection',
      'Ecology and Environmental Science',
    ],
    skills: [
      'Microscopy and cell observation',
      'Genetic cross analysis',
      'Experimental design in biology',
      'Data interpretation from biological studies',
      'Understanding biological processes',
      'Environmental impact assessment',
    ],
    requirements: [
      'Basic understanding of scientific method',
      'Notebook for diagrams and notes',
      'Interest in living organisms',
      'GCSE Mathematics helpful but not essential',
    ],
    outcomes: [
      'Achieve GCSE Biology grade 4-9 with comprehensive understanding of life processes',
      'Master complex biological concepts through visual learning and practical applications',
      'Develop advanced scientific investigation and experimental design skills',
      'Apply biological knowledge to analyze current environmental and medical issues',
      'Build strong foundation for A-Level Biology or biomedical science careers',
      'Understand human impact on ecosystems and sustainable development principles',
    ],
  },
  {
    id: 5,
    title: 'GCSE Computer Science (Grades 4-9)',
    description: 'GCSE Computer Science: Programming, Algorithms, Data Structures and Computer Systems.',
    fullDescription:
      'Step into the digital future with our comprehensive GCSE Computer Science course, expertly designed to help students achieve grades 4-9 across AQA, Edexcel, and OCR exam boards. Master programming fundamentals through Python, explore computer systems architecture, develop algorithmic thinking, and understand how technology shapes our world. Our hands-on approach combines practical coding projects, theoretical understanding, and real-world problem-solving to prepare students for the digital economy and potential computer science careers.',
    price: '£42/hour',
    rating: 4.8,
    students: 140,
    imageId: '1550751827-4bd374c3f58b',
    category: 'GCSE',
    subject: 'Computer Science',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Mr. James Chen',
    instructorBio:
      'Mr. James Chen is a software engineer turned educator with 10 years of industry experience at leading tech companies and 8 years teaching GCSE Computer Science. He specializes in making programming concepts accessible and engaging, with 89% of his students achieving grades 7-9. His real-world industry knowledge brings practical relevance to every lesson.',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Programming Fundamentals Python',
      'Computer Systems and Architecture',
      'Algorithms and Data Structures',
      'Networks and Internet Technologies',
      'Data Representation and Storage',
      'Computational Thinking and Problem Solving',
    ],
    skills: [
      'Python programming',
      'Algorithm design and analysis',
      'Problem decomposition',
      'Data structure implementation',
      'System analysis and design',
      'Digital literacy and cyber security',
    ],
    requirements: [
      'Computer with internet access',
      'No prior programming experience needed',
      'Logical thinking ability',
      'GCSE Mathematics recommended',
    ],
    outcomes: [
      'Achieve GCSE Computer Science grade 4-9 with confidence in both theory and practical programming',
      'Master Python programming with ability to create complex, well-structured programs',
      'Understand computer systems architecture and how hardware and software interact',
      'Develop advanced computational thinking and problem-solving methodologies',
      'Build portfolio of programming projects demonstrating technical skills',
      'Prepare for A-Level Computer Science or technology-related career pathways',
    ],
  },
  {
    id: 6,
    title: 'Advanced Mathematics (A-Level Preparation)',
    description: 'Master calculus, algebra, and advanced mathematical concepts with expert guidance.',
    fullDescription:
      'Excel in your transition from GCSE to A-Level Mathematics with our comprehensive advanced preparation course, designed for high-achieving students aiming for top grades. Master differential and integral calculus fundamentals, explore complex algebraic functions, delve into advanced statistical concepts, and understand mechanical principles. Our expert-led program builds the sophisticated mathematical thinking and problem-solving skills essential for A-Level success and university-level mathematics.',
    price: '$50/hour',
    rating: 4.9,
    students: 150,
    imageId: '1518133910546-b6c2fb7d79e3',
    category: 'Mathematics',
    subject: 'Mathematics',
    duration: '12 weeks',
    level: 'Advanced',
    instructor: 'Prof. Lisa Anderson',
    instructorBio:
      'Prof. Lisa Anderson has taught A-Level Mathematics for 22 years and has helped hundreds of students transition successfully from GCSE to university-level mathematics.',
    examBoard: 'AQA, Edexcel, OCR, MEI',
    modules: [
      'Introduction to Calculus',
      'Advanced Algebra and Functions',
      'Coordinate Geometry and Curves',
      'Statistics and Hypothesis Testing',
      'Mechanics and Mathematical Physics',
      'Further Mathematical Techniques',
    ],
    skills: [
      'Differential and integral calculus',
      'Advanced algebraic manipulation',
      'Statistical analysis and testing',
      'Mathematical modeling',
      'Problem-solving with complex functions',
      'Mathematical proof techniques',
    ],
    requirements: [
      'GCSE Mathematics Grade 7 or above',
      'Graphing calculator recommended',
      'Strong algebraic foundation',
      'Commitment to regular practice',
    ],
    outcomes: [
      'Achieve seamless transition to A-Level Mathematics with advanced preparation',
      'Master calculus fundamentals including differentiation and integration techniques',
      'Develop sophisticated mathematical reasoning and advanced problem-solving skills',
      'Build exceptional confidence for higher mathematics and university-level study',
      'Excel in complex algebraic manipulation and advanced function analysis',
      'Prepare for competitive mathematics examinations and STEM career pathways',
    ],
  },
  {
    id: 7,
    title: 'Computer Science Fundamentals',
    description: 'Learn programming, algorithms, and computer science principles from industry experts.',
    fullDescription:
      'Build an exceptional foundation in computer science with our comprehensive fundamentals course, designed for students seeking careers in technology or advanced computer science study. Master programming concepts through Python, explore sophisticated algorithms and data structures, understand object-oriented design principles, and gain practical experience with databases and web development. Our industry-expert instructors combine theoretical knowledge with hands-on projects and real-world applications to ensure graduates are well-prepared for the modern tech landscape.',
    price: '$60/hour',
    rating: 4.8,
    students: 200,
    imageId: '1516321318423-f06f85e504b3',
    category: 'Programming',
    subject: 'Computer Science',
    duration: '16 weeks',
    level: 'Beginner',
    instructor: 'Prof. Michael Chen',
    instructorBio:
      'Prof. Michael Chen brings exceptional credentials with 15 years of industry experience at major tech companies including Google and Microsoft, plus 8 years teaching computer science at university level. He specializes in making complex programming concepts accessible through practical, project-based learning. His students consistently achieve excellent outcomes, with many securing positions at top tech companies.',
    examBoard: 'N/A',
    modules: [
      'Programming Basics (Python)',
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Database Fundamentals',
      'Web Development Basics',
      'Software Engineering Principles',
    ],
    skills: [
      'Python programming proficiency',
      'Algorithm design and analysis',
      'Database design and querying',
      'Web development basics',
      'Software project management',
      'Problem-solving and debugging',
    ],
    requirements: [
      'Computer with reliable internet',
      'No prior programming experience needed',
      'Logical thinking ability',
      'Time commitment for practice',
    ],
    outcomes: [
      'Master comprehensive programming fundamentals with industry-standard practices',
      'Understand core computer science principles and algorithmic thinking',
      'Build impressive portfolio of real-world projects demonstrating technical skills',
      'Prepare thoroughly for advanced computer science courses or tech career entry',
      'Develop professional software development and project management abilities',
      'Gain confidence in modern programming languages and development environments',
    ],
  },
  {
    id: 8,
    title: 'English Literature & Writing',
    description: 'Improve your writing skills and explore classic and modern literature.',
    fullDescription:
      'Transform your English language abilities through our comprehensive Literature and Writing course, expertly designed for students preparing for GCSE/A-Level English Literature or those seeking to enhance their analytical and creative writing skills. Explore classic and contemporary literature through guided analysis, develop sophisticated essay-writing techniques, and unleash your creative potential through structured writing exercises. Our experienced instructors combine deep literary knowledge with practical writing strategies to build confidence in both critical analysis and creative expression.',
    price: '$45/hour',
    rating: 4.7,
    students: 120,
    imageId: '1456513080510-7bf3a84b82f8',
    category: 'English',
    subject: 'Literature',
    duration: '10 weeks',
    level: 'Intermediate',
    instructor: 'Lisa Thompson',
    instructorBio:
      'Lisa Thompson is a published author and accomplished literature educator with 14 years of teaching experience across GCSE and A-Level English Literature. Her novel "Whispers in the Wind" won the 2019 Literary Excellence Award. She combines deep literary scholarship with practical writing expertise, helping students achieve outstanding results with 94% reaching their target grades.',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Poetry Analysis and Interpretation',
      'Novel Study and Character Development',
      'Drama and Theatrical Techniques',
      'Creative Writing and Style',
      'Essay Writing and Critical Analysis',
      'Contemporary Literature and Themes',
    ],
    skills: [
      'Literary analysis and interpretation',
      'Creative writing techniques',
      'Critical essay writing',
      'Character and theme analysis',
      'Poetry appreciation',
      'Comparative literature study',
    ],
    requirements: [
      'Strong reading comprehension',
      'Basic writing skills',
      'Interest in literature',
      'Regular reading commitment',
    ],
    outcomes: [
      'Develop sophisticated literary analysis skills with confidence in textual interpretation',
      'Master advanced creative writing techniques across multiple genres and styles',
      'Excel in essay writing with clear structure, compelling arguments, and elegant expression',
      'Gain deep appreciation for literature spanning classic and contemporary works',
      'Build strong foundation for A-Level English Literature or university English studies',
      'Develop critical thinking skills applicable across academic disciplines and professional contexts',
    ],
  },
  {
    id: 9,
    title: 'Physics & Chemistry',
    description: 'Understand the fundamental principles of physics and chemistry with hands-on examples.',
    fullDescription:
      'Discover the interconnected world of physical sciences with our unique integrated Physics and Chemistry course, designed to show how these fundamental subjects complement and enhance each other in understanding the natural world. From atomic structure and chemical bonding to thermodynamics and electromagnetic phenomena, students develop a comprehensive understanding of scientific principles. Our expert-led approach combines theoretical knowledge with practical applications, laboratory techniques, and real-world problem-solving to prepare students for advanced scientific study or STEM careers.',
    price: '$55/hour',
    rating: 4.8,
    students: 90,
    imageId: '1628595351029-c2bf17511435',
    category: 'Science',
    subject: 'Physics & Chemistry',
    duration: '14 weeks',
    level: 'Intermediate',
    instructor: 'Dr. James Wilson',
    instructorBio:
      'Dr. James Wilson has 16 years of experience teaching both physics and chemistry at university and secondary levels, with a PhD in Physical Chemistry from Cambridge University. He specializes in demonstrating the fascinating connections between these fundamental sciences through innovative teaching methods and hands-on experiments. His interdisciplinary approach helps students achieve exceptional understanding of scientific principles.',
    examBoard: 'Multiple',
    modules: [
      'Atomic Structure and Bonding',
      'Energy and Chemical Reactions',
      'States of Matter and Phase Changes',
      'Electricity and Electrochemistry',
      'Waves, Light and Spectroscopy',
      'Nuclear Physics and Radioactivity',
    ],
    skills: [
      'Scientific calculation and analysis',
      'Laboratory techniques and safety',
      'Data interpretation and graphing',
      'Understanding molecular behavior',
      'Chemical equation balancing',
      'Physics problem-solving',
    ],
    requirements: [
      'Strong mathematics skills',
      'Scientific calculator',
      'Interest in how things work',
      'Safety consciousness',
    ],
    outcomes: [
      'Master fundamental scientific principles across physics and chemistry with deep understanding',
      'Recognize and apply the powerful connections between physical and chemical phenomena',
      'Develop advanced laboratory skills, safety awareness, and analytical techniques',
      'Build strong foundation for A-Level Sciences or specialized STEM career pathways',
      'Excel in scientific problem-solving with mathematical modeling and data analysis',
      'Understand real-world applications of science in technology, medicine, and industry',
    ],
  },
]

export function getCourseById(id: number): Course | undefined {
  return courses.find((c) => c.id === id)
}

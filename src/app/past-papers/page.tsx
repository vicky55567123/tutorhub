'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface PastPaper {
  id: string
  title: string
  subject: string
  level: string
  examBoard: string
  year: number
  session: string
  paperNumber: string
  type: 'Question Paper' | 'Mark Scheme' | 'Insert'
  downloadUrl: string
  fileSize: string
  description?: string
}

const pastPapers: PastPaper[] = [
  // =============================================
  // GCSE MATHEMATICS - EDEXCEL (2020-2024)
  // =============================================
  
  // 2024 Papers
  {
    id: 'edexcel-gcse-math-2024-1h',
    title: 'Edexcel GCSE Mathematics Paper 1 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/bd60c628aa17a534bae2727489938280a6c31b5b.pdf',
    fileSize: '2.1 MB',
    description: 'Non-calculator paper covering algebra, geometry, and number topics'
  },
  {
    id: 'edexcel-gcse-math-2024-1h-ms',
    title: 'Edexcel GCSE Mathematics Paper 1 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a8b7c9d2ff18e645cdf3938591047392b7e42c8d.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'edexcel-gcse-math-2024-2h',
    title: 'Edexcel GCSE Mathematics Paper 2 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c4d8e6f1aa29b756def4849602158403c8f53d9e.pdf',
    fileSize: '2.3 MB',
    description: 'Calculator paper with statistics, probability, and advanced topics'
  },
  {
    id: 'edexcel-gcse-math-2024-2h-ms',
    title: 'Edexcel GCSE Mathematics Paper 2 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e9f2a5b3cc41d867eaf5950713269514d9a64eaf.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'edexcel-gcse-math-2024-3h',
    title: 'Edexcel GCSE Mathematics Paper 3 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 3H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f1a6b9c4dd52e978fba6061824380625eab75fbf.pdf',
    fileSize: '2.4 MB',
    description: 'Calculator paper with mixed topics and problem solving'
  },
  {
    id: 'edexcel-gcse-math-2024-3h-ms',
    title: 'Edexcel GCSE Mathematics Paper 3 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 3H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/521d6af53968d8e3ddb1ce1440448f1493e8823c.pdf',
    fileSize: '2.1 MB'
  },
  
  // 2023 Papers
  {
    id: 'edexcel-gcse-math-2023-1h',
    title: 'Edexcel GCSE Mathematics Paper 1 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a3c7d8e5ff63f089abc7172935491736fcb86dcf.pdf',
    fileSize: '2.0 MB',
    description: 'Non-calculator paper covering algebra, geometry, and number topics'
  },
  {
    id: 'edexcel-gcse-math-2023-1h-ms',
    title: 'Edexcel GCSE Mathematics Paper 1 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b5d9f1a6aa74a19abcd8283046502847adc97edf.pdf',
    fileSize: '1.7 MB'
  },
  {
    id: 'edexcel-gcse-math-2023-2h',
    title: 'Edexcel GCSE Mathematics Paper 2 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c8e2a4b7bb85b2abcde9394157613958bee98fef.pdf',
    fileSize: '2.2 MB',
    description: 'Calculator paper with statistics, probability, and advanced topics'
  },
  {
    id: 'edexcel-gcse-math-2023-2h-ms',
    title: 'Edexcel GCSE Mathematics Paper 2 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d3f8c1a8cc96c3def0405268724069cef09fff8.pdf',
    fileSize: '1.9 MB'
  },

  // =============================================
  // GCSE MATHEMATICS - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-gcse-math-2024-1h',
    title: 'AQA GCSE Mathematics Paper 1 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d1f5b8c9cc96c3bcdef0405268724069cef09fff.pdf',
    fileSize: '2.2 MB',
    description: 'Non-calculator paper covering algebra, geometry, and number topics'
  },
  {
    id: 'aqa-gcse-math-2024-1h-ms',
    title: 'AQA GCSE Mathematics Paper 1 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e4a8c2d0dd07d4cdef1516379835180adf10af0f.pdf',
    fileSize: '1.9 MB'
  },
  {
    id: 'aqa-gcse-math-2024-2h',
    title: 'AQA GCSE Mathematics Paper 2 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f7b1d5e2ee18e5def2627490946291bef21bf1f.pdf',
    fileSize: '2.1 MB',
    description: 'Calculator paper with statistics, probability, and advanced topics'
  },
  {
    id: 'aqa-gcse-math-2024-2h-ms',
    title: 'AQA GCSE Mathematics Paper 2 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a9e3f7c0dd29d6def3738501057402cfa32cf3f.pdf',
    fileSize: '1.8 MB'
  },

  // =============================================
  // GCSE PHYSICS - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-gcse-physics-2024-1h',
    title: 'AQA GCSE Physics Paper 1 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a1b2c3d4e5f6789012345678901234567890abcd.pdf',
    fileSize: '2.8 MB',
    description: 'Energy, electricity, particle model of matter, atomic structure'
  },
  {
    id: 'aqa-gcse-physics-2024-1h-ms',
    title: 'AQA GCSE Physics Paper 1 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b2c3d4e5f6a789123456789012345678901bcdef.pdf',
    fileSize: '2.1 MB'
  },
  {
    id: 'aqa-gcse-physics-2024-2h',
    title: 'AQA GCSE Physics Paper 2 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c3d4e5f6a7b890234567890123456789012cdef0.pdf',
    fileSize: '2.9 MB',
    description: 'Forces, waves, magnetism and electromagnetism'
  },
  {
    id: 'aqa-gcse-physics-2024-2h-ms',
    title: 'AQA GCSE Physics Paper 2 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d4e5f6a7b8c901345678901234567890123def01.pdf',
    fileSize: '2.2 MB'
  },

  // =============================================
  // GCSE CHEMISTRY - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-gcse-chemistry-2024-1h',
    title: 'AQA GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d5f1c8a6cc5cc9def6061834390735fcc65fc5f.pdf',
    fileSize: '2.6 MB',
    description: 'Atomic structure, bonding, quantitative chemistry, chemical changes'
  },
  {
    id: 'aqa-gcse-chemistry-2024-1h-ms',
    title: 'AQA GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e8a4d9b7dd6ddasef7172945501846add76ed6f.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'aqa-gcse-chemistry-2024-2h',
    title: 'AQA GCSE Chemistry Paper 2 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f1b7e2c8ee7eebdef8284056612957bee87fe7f.pdf',
    fileSize: '2.7 MB',
    description: 'Energy changes, rates and equilibrium, organic chemistry, analysis'
  },
  {
    id: 'aqa-gcse-chemistry-2024-2h-ms',
    title: 'AQA GCSE Chemistry Paper 2 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a5c1f6d9cc95c9def9395167723068cff98ff9f.pdf',
    fileSize: '2.0 MB'
  },

  // =============================================
  // GCSE BIOLOGY - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-gcse-biology-2024-1h',
    title: 'AQA GCSE Biology Paper 1 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a4c8f5d2ff3ffcdef9395167723068cff98ff8f.pdf',
    fileSize: '2.4 MB',
    description: 'Cell biology, organisation, infection and response, bioenergetics'
  },
  {
    id: 'aqa-gcse-biology-2024-1h-ms',
    title: 'AQA GCSE Biology Paper 1 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b7d1a6e3aa40adefa506278834179daaa09aa9f.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'aqa-gcse-biology-2024-2h',
    title: 'AQA GCSE Biology Paper 2 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c8e4b9f4bb51beefb617389945290ebbb1abaf.pdf',
    fileSize: '2.5 MB',
    description: 'Homeostasis, inheritance, variation, evolution, ecology'
  },
  {
    id: 'aqa-gcse-biology-2024-2h-ms',
    title: 'AQA GCSE Biology Paper 2 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d2f5c0a7cc38c4def0506278834179daaa09ab0.pdf',
    fileSize: '1.9 MB'
  },

  // =============================================
  // GCSE ENGLISH LITERATURE - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-gcse-english-2024-1',
    title: 'AQA GCSE English Literature Paper 1',
    subject: 'English Literature',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d1f7c2a5cc62cfgfbc28450056401fccc2bcc2f.pdf',
    fileSize: '1.4 MB',
    description: 'Shakespeare and 19th-century novel'
  },
  {
    id: 'aqa-gcse-english-2024-1-ms',
    title: 'AQA GCSE English Literature Paper 1 Mark Scheme',
    subject: 'English Literature',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e5a8d6b3dd73daghcd39561167512adddd3bdd3.pdf',
    fileSize: '1.1 MB'
  },
  {
    id: 'aqa-gcse-english-2024-2',
    title: 'AQA GCSE English Literature Paper 2',
    subject: 'English Literature',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f9c3e8b6ee84ehijk61672223734beee4beee4.pdf',
    fileSize: '1.3 MB',
    description: 'Modern texts and poetry'
  },
  {
    id: 'aqa-gcse-english-2024-2-ms',
    title: 'AQA GCSE English Literature Paper 2 Mark Scheme',
    subject: 'English Literature',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a6d2f9c7dd95dlmno72783334845addee5adde.pdf',
    fileSize: '1.0 MB'
  },

  // =============================================
  // A-LEVEL MATHEMATICS - EDEXCEL (2020-2024)
  // =============================================
  
  {
    id: 'edexcel-alevel-math-2024-1',
    title: 'Edexcel A-Level Mathematics Paper 1 (Core Pure)',
    subject: 'Mathematics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f8b1e4c9ee84ehief450672278623beee4beef.pdf',
    fileSize: '2.7 MB',
    description: 'Core pure mathematics including algebra, functions, coordinate geometry'
  },
  {
    id: 'edexcel-alevel-math-2024-1-ms',
    title: 'Edexcel A-Level Mathematics Paper 1 Mark Scheme',
    subject: 'Mathematics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a2c5f8d0ff95fjkef561783389734cff55cfff.pdf',
    fileSize: '2.1 MB'
  },
  {
    id: 'edexcel-alevel-math-2024-2',
    title: 'Edexcel A-Level Mathematics Paper 2 (Core Pure)',
    subject: 'Mathematics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b5d8a1e3aa06aklef672894490845daaa6daaa.pdf',
    fileSize: '2.8 MB',
    description: 'Further core pure mathematics including calculus and series'
  },
  {
    id: 'edexcel-alevel-math-2024-2-ms',
    title: 'Edexcel A-Level Mathematics Paper 2 Mark Scheme',
    subject: 'Mathematics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c9f4b2a8bb17bpqrs783905501956ebb7bebb8.pdf',
    fileSize: '2.3 MB'
  },

  // =============================================
  // A-LEVEL PHYSICS - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-alevel-physics-2024-1',
    title: 'AQA A-Level Physics Paper 1',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e5f6a7b8c9d012456789012345678901234ef012.pdf',
    fileSize: '3.1 MB',
    description: 'Particles, quantum phenomena, electricity, further mechanics'
  },
  {
    id: 'aqa-alevel-physics-2024-1-ms',
    title: 'AQA A-Level Physics Paper 1 Mark Scheme',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f6a7b8c9d0e123567890123456789012345f0123.pdf',
    fileSize: '2.4 MB'
  },
  {
    id: 'aqa-alevel-physics-2024-2',
    title: 'AQA A-Level Physics Paper 2',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a7b8c9d0e1f234678901234567890123456a0234.pdf',
    fileSize: '3.2 MB',
    description: 'Thermal physics, fields, nuclear physics, astronomy'
  },
  {
    id: 'aqa-alevel-physics-2024-2-ms',
    title: 'AQA A-Level Physics Paper 2 Mark Scheme',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b8c9d0e1f2a345789012345678901234567b1345.pdf',
    fileSize: '2.5 MB'
  },

  // =============================================
  // A-LEVEL CHEMISTRY - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-alevel-chemistry-2024-1',
    title: 'AQA A-Level Chemistry Paper 1',
    subject: 'Chemistry',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f7b1e5c5ee4eestufa16238834289beee5beee.pdf',
    fileSize: '2.9 MB',
    description: 'Inorganic chemistry and relevant physical chemistry topics'
  },
  {
    id: 'aqa-alevel-chemistry-2024-1-ms',
    title: 'AQA A-Level Chemistry Paper 1 Mark Scheme',
    subject: 'Chemistry',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a0c3f8d8ff5ffvwxfa27349945390cff6cfff6.pdf',
    fileSize: '2.2 MB'
  },
  {
    id: 'aqa-alevel-chemistry-2024-2',
    title: 'AQA A-Level Chemistry Paper 2',
    subject: 'Chemistry',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b9d5a2f1aa17ayzcd38461056501daaa7daab7.pdf',
    fileSize: '3.0 MB',
    description: 'Organic chemistry and relevant physical chemistry topics'
  },
  {
    id: 'aqa-alevel-chemistry-2024-2-ms',
    title: 'AQA A-Level Chemistry Paper 2 Mark Scheme',
    subject: 'Chemistry',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c2e6b4f4bb27b123cb49572167623bbb8bbbc8.pdf',
    fileSize: '2.4 MB'
  },

  // =============================================
  // A-LEVEL BIOLOGY - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-alevel-biology-2024-1',
    title: 'AQA A-Level Biology Paper 1',
    subject: 'Biology',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b3d6a1f1aa16ayzba38461056501daaa7daaa7.pdf',
    fileSize: '2.8 MB',
    description: 'Cell structure, biological molecules, enzymes, cell membranes'
  },
  {
    id: 'aqa-alevel-biology-2024-1-ms',
    title: 'AQA A-Level Biology Paper 1 Mark Scheme',
    subject: 'Biology',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c6e9b4f4bb27b123cb49572167623bbb8bbbb8.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'aqa-alevel-biology-2024-2',
    title: 'AQA A-Level Biology Paper 2',
    subject: 'Biology',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d0f2c7a8cc38c456cd50683278734fcc9cfdd0.pdf',
    fileSize: '2.9 MB',
    description: 'Genetics, ecosystems, evolution, and control systems'
  },
  {
    id: 'aqa-alevel-biology-2024-2-ms',
    title: 'AQA A-Level Biology Paper 2 Mark Scheme',
    subject: 'Biology',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e3a5d8b0dd49d789de61794389845add0add1e.pdf',
    fileSize: '2.1 MB'
  },

  // =============================================
  // GCSE PHYSICS - EDEXCEL (2020-2024)
  // =============================================
  
  {
    id: 'edexcel-gcse-physics-2024-1h',
    title: 'Edexcel GCSE Physics Paper 1 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c9d0e1f2a3b456890123456789012345678c2456.pdf',
    fileSize: '2.9 MB',
    description: 'Forces and motion, energy, waves, light and electromagnetic spectrum'
  },
  {
    id: 'edexcel-gcse-physics-2024-1h-ms',
    title: 'Edexcel GCSE Physics Paper 1 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d0e1f2a3b4c567901234567890123456789d3567.pdf',
    fileSize: '2.2 MB'
  },
  {
    id: 'edexcel-gcse-physics-2024-2h',
    title: 'Edexcel GCSE Physics Paper 2 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e1f2a3b4c5d678012345678901234567890e4678.pdf',
    fileSize: '3.0 MB',
    description: 'Electricity, radioactivity, astrophysics, particle model'
  },
  {
    id: 'edexcel-gcse-physics-2024-2h-ms',
    title: 'Edexcel GCSE Physics Paper 2 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f2a3b4c5d6e789123456789012345678901f5789.pdf',
    fileSize: '2.3 MB'
  },
  {
    id: 'edexcel-gcse-physics-2023-1h',
    title: 'Edexcel GCSE Physics Paper 1 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a3b4c5d6e7f890234567890123456789012a6890.pdf',
    fileSize: '2.8 MB',
    description: 'Forces and motion, energy, waves, light and electromagnetic spectrum'
  },
  {
    id: 'edexcel-gcse-physics-2023-1h-ms',
    title: 'Edexcel GCSE Physics Paper 1 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b4c5d6e7f8a901345678901234567890123b7901.pdf',
    fileSize: '2.1 MB'
  },

  // =============================================
  // GCSE CHEMISTRY - EDEXCEL (2020-2024)
  // =============================================
  
  {
    id: 'edexcel-gcse-chemistry-2024-1h',
    title: 'Edexcel GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a7b8c9d0ff1ff2yza127349945390cff6cfff6.pdf',
    fileSize: '2.7 MB',
    description: 'Atomic structure, chemical bonds, chemical reactions, acids and salts'
  },
  {
    id: 'edexcel-gcse-chemistry-2024-1h-ms',
    title: 'Edexcel GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b8c9d0e1aa2aa3bcd238461056501daaa7daaa7.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'edexcel-gcse-chemistry-2024-2h',
    title: 'Edexcel GCSE Chemistry Paper 2 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c9d0e1f2bb3bb4efg349572167623bbb8bbbb8.pdf',
    fileSize: '2.8 MB',
    description: 'Groups in the periodic table, rates of reaction, organic chemistry, analysis'
  },
  {
    id: 'edexcel-gcse-chemistry-2024-2h-ms',
    title: 'Edexcel GCSE Chemistry Paper 2 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d0e1f2a3cc4cc5hij450683278734fcc9cfcc9.pdf',
    fileSize: '2.1 MB'
  },
  {
    id: 'edexcel-gcse-chemistry-2023-1h',
    title: 'Edexcel GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e1f2a3b4dd5dd6klm561794389845add0add0a.pdf',
    fileSize: '2.6 MB',
    description: 'Atomic structure, chemical bonds, chemical reactions, acids and salts'
  },
  {
    id: 'edexcel-gcse-chemistry-2023-1h-ms',
    title: 'Edexcel GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f2a3b4c5ee6ee7nop672905490956bee1bee1b.pdf',
    fileSize: '1.9 MB'
  },

  // =============================================
  // GCSE BIOLOGY - EDEXCEL (2020-2024)
  // =============================================
  
  {
    id: 'edexcel-gcse-biology-2024-1h',
    title: 'Edexcel GCSE Biology Paper 1 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a3b4c5d6ff7ff8qrs783016601068fcc2cfcc2.pdf',
    fileSize: '2.5 MB',
    description: 'Key concepts in biology, cells and control, genetics, natural selection'
  },
  {
    id: 'edexcel-gcse-biology-2024-1h-ms',
    title: 'Edexcel GCSE Biology Paper 1 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b4c5d6e7aa8aa9tuv894127712179daaa3daaa3.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'edexcel-gcse-biology-2024-2h',
    title: 'Edexcel GCSE Biology Paper 2 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c5d6e7f8bb9bb0wxy905238823290bbb4bbbb4.pdf',
    fileSize: '2.6 MB',
    description: 'Health and disease, plant structures, animal coordination, ecosystems'
  },
  {
    id: 'edexcel-gcse-biology-2024-2h-ms',
    title: 'Edexcel GCSE Biology Paper 2 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d6e7f8a9cc0cc1zab016349934401ccc5cccc5.pdf',
    fileSize: '1.9 MB'
  },
  {
    id: 'edexcel-gcse-biology-2023-1h',
    title: 'Edexcel GCSE Biology Paper 1 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e7f8a9b0dd1dd2cde127450056401fccc2bcc2f.pdf',
    fileSize: '2.4 MB',
    description: 'Key concepts in biology, cells and control, genetics, natural selection'
  },
  {
    id: 'edexcel-gcse-biology-2023-1h-ms',
    title: 'Edexcel GCSE Biology Paper 1 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f8a9b0c1ee2ee3efg238561167512adddd3bdd3.pdf',
    fileSize: '1.7 MB'
  },

  // =============================================
  // GCSE COMPUTER SCIENCE - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-gcse-cs-2024-1',
    title: 'AQA GCSE Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a9b0c1d2ff3ff4hij349672278623beee4beef.pdf',
    fileSize: '1.8 MB',
    description: 'Computational thinking, algorithms, programming techniques, data types'
  },
  {
    id: 'aqa-gcse-cs-2024-1-ms',
    title: 'AQA GCSE Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b0c1d2e3aa4aa5klm460783389734cff55cfff.pdf',
    fileSize: '1.5 MB'
  },
  {
    id: 'aqa-gcse-cs-2024-2',
    title: 'AQA GCSE Computer Science Paper 2',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c1d2e3f4bb5bb6nop571894490845daaa6daaa.pdf',
    fileSize: '1.9 MB',
    description: 'Computational thinking, problem solving, programming concepts, testing'
  },
  {
    id: 'aqa-gcse-cs-2024-2-ms',
    title: 'AQA GCSE Computer Science Paper 2 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d2e3f4a5cc6cc7qrs682905501956ebb7bebb7.pdf',
    fileSize: '1.6 MB'
  },
  {
    id: 'aqa-gcse-cs-2023-1',
    title: 'AQA GCSE Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e3f4a5b6dd7dd8tuv793016612067fcc8cfcc8.pdf',
    fileSize: '1.7 MB',
    description: 'Computational thinking, algorithms, programming techniques, data types'
  },
  {
    id: 'aqa-gcse-cs-2023-1-ms',
    title: 'AQA GCSE Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f4a5b6c7ee8ee9wxy804127723178add9add9a.pdf',
    fileSize: '1.4 MB'
  },

  // =============================================
  // GCSE COMPUTER SCIENCE - EDEXCEL (2020-2024)
  // =============================================
  
  {
    id: 'edexcel-gcse-cs-2024-1',
    title: 'Edexcel GCSE Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a5b6c7d8ff9ff0zab915238834289beee5beee.pdf',
    fileSize: '1.6 MB',
    description: 'Problem solving, programming, data representation, systems architecture'
  },
  {
    id: 'edexcel-gcse-cs-2024-1-ms',
    title: 'Edexcel GCSE Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b6c7d8e9aa0aa1cde026349945390cff6cfff6.pdf',
    fileSize: '1.3 MB'
  },
  {
    id: 'edexcel-gcse-cs-2024-2',
    title: 'Edexcel GCSE Computer Science Paper 2',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c7d8e9f0bb1bb2efg137461056501daaa7daaa7.pdf',
    fileSize: '1.7 MB',
    description: 'Computational thinking, algorithms, programming, data and databases'
  },
  {
    id: 'edexcel-gcse-cs-2024-2-ms',
    title: 'Edexcel GCSE Computer Science Paper 2 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d8e9f0a1cc2cc3hij248572167623bbb8bbbb8.pdf',
    fileSize: '1.4 MB'
  },

  // =============================================
  // A-LEVEL COMPUTER SCIENCE - AQA (2020-2024)
  // =============================================
  
  {
    id: 'aqa-alevel-cs-2024-1',
    title: 'AQA A-Level Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e9f0a1b2dd3dd4klm359683278734fcc9cfcc9.pdf',
    fileSize: '2.1 MB',
    description: 'Data structures, algorithms, programming, computational thinking'
  },
  {
    id: 'aqa-alevel-cs-2024-1-ms',
    title: 'AQA A-Level Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f0a1b2c3ee4ee5nop470794389845add0add0a.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'aqa-alevel-cs-2024-2',
    title: 'AQA A-Level Computer Science Paper 2',
    subject: 'Computer Science',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a1b2c3d4ff5ff6qrs581905490956bee1bee1b.pdf',
    fileSize: '2.2 MB',
    description: 'Algorithms, programming techniques, software development, databases'
  },
  {
    id: 'aqa-alevel-cs-2024-2-ms',
    title: 'AQA A-Level Computer Science Paper 2 Mark Scheme',
    subject: 'Computer Science',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 2',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b2c3d4e5aa6aa7tuv692016601068fcc2cfcc2.pdf',
    fileSize: '1.9 MB'
  },
  {
    id: 'aqa-alevel-cs-2023-1',
    title: 'AQA A-Level Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c3d4e5f6bb7bb8wxy703127712179daaa3daaa3.pdf',
    fileSize: '2.0 MB',
    description: 'Data structures, algorithms, programming, computational thinking'
  },
  {
    id: 'aqa-alevel-cs-2023-1-ms',
    title: 'AQA A-Level Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d4e5f6a7cc8cc9zab814238823290bbb4bbbb4.pdf',
    fileSize: '1.7 MB'
  },

  // =============================================
  // MORE A-LEVEL SCIENCES - EDEXCEL (2020-2024)
  // =============================================
  
  {
    id: 'edexcel-alevel-physics-2024-1',
    title: 'Edexcel A-Level Physics Paper 1',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c5d6e7f8a9b012456789012345678901234c8012.pdf',
    fileSize: '3.3 MB',
    description: 'Working as a physicist, mechanics, electric circuits, further mechanics'
  },
  {
    id: 'edexcel-alevel-physics-2024-1-ms',
    title: 'Edexcel A-Level Physics Paper 1 Mark Scheme',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d6e7f8a9b0c123567890123456789012345d9123.pdf',
    fileSize: '2.6 MB'
  },
  {
    id: 'edexcel-alevel-chemistry-2024-1',
    title: 'Edexcel A-Level Chemistry Paper 1',
    subject: 'Chemistry',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a7b8c9d0ff1ff2hij147561167512adddd3bdd3.pdf',
    fileSize: '3.1 MB',
    description: 'Atomic structure, bonding, energetics, kinetics, equilibrium'
  },
  {
    id: 'edexcel-alevel-chemistry-2024-1-ms',
    title: 'Edexcel A-Level Chemistry Paper 1 Mark Scheme',
    subject: 'Chemistry',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b8c9d0e1aa2aa3klm258672278623beee4beef.pdf',
    fileSize: '2.4 MB'
  },
  {
    id: 'edexcel-alevel-biology-2024-1',
    title: 'Edexcel A-Level Biology Paper 1',
    subject: 'Biology',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c9d0e1f2bb3bb4nop369783389734cff55cfff.pdf',
    fileSize: '2.9 MB',
    description: 'Molecules and cells, biochemical processes, genetics and evolution'
  },
  {
    id: 'edexcel-alevel-biology-2024-1-ms',
    title: 'Edexcel A-Level Biology Paper 1 Mark Scheme',
    subject: 'Biology',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d0e1f2a3cc4cc5qrs470894490845daaa6daaa.pdf',
    fileSize: '2.2 MB'
  },

  // =============================================
  // OCR EXAM BOARD PAPERS (2020-2024)
  // =============================================
  
  {
    id: 'ocr-gcse-physics-2024-1h',
    title: 'OCR GCSE Physics Paper 1 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e7f8a9b0c1d234678901234567890123456ea234.pdf',
    fileSize: '2.7 MB',
    description: 'Matter, forces, energy, waves, light, electromagnetic radiation'
  },
  {
    id: 'ocr-gcse-physics-2024-1h-ms',
    title: 'OCR GCSE Physics Paper 1 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f8a9b0c1d2e345789012345678901234567fb345.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'ocr-gcse-chemistry-2024-1h',
    title: 'OCR GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a3b4c5d6ff7ff8zab703127723178add9add9a.pdf',
    fileSize: '2.6 MB',
    description: 'Chemical patterns, chemicals from the Earth, chemicals in action'
  },
  {
    id: 'ocr-gcse-chemistry-2024-1h-ms',
    title: 'OCR GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b4c5d6e7aa8aa9cde814238834289beee5beee.pdf',
    fileSize: '1.9 MB'
  },
  {
    id: 'ocr-gcse-biology-2024-1h',
    title: 'OCR GCSE Biology Paper 1 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c5d6e7f8bb9bb0efg925349945390cff6cfff6.pdf',
    fileSize: '2.4 MB',
    description: 'Cell level systems, scaling up, organism level systems'
  },
  {
    id: 'ocr-gcse-biology-2024-1h-ms',
    title: 'OCR GCSE Biology Paper 1 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d6e7f8a9cc0cc1hij036461056501daaa7daaa7.pdf',
    fileSize: '1.7 MB'
  },
  {
    id: 'ocr-gcse-cs-2024-1',
    title: 'OCR GCSE Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e7f8a9b0dd1dd2klm147572167623bbb8bbbb8.pdf',
    fileSize: '1.5 MB',
    description: 'Computer systems, computational thinking, algorithms, programming'
  },
  {
    id: 'ocr-gcse-cs-2024-1-ms',
    title: 'OCR GCSE Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2024,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f8a9b0c1ee2ee3nop258683278734fcc9cfcc9.pdf',
    fileSize: '1.2 MB'
  },

  // =============================================
  // 2023 PAPERS - MULTIPLE SUBJECTS
  // =============================================
  
  {
    id: 'aqa-gcse-math-2023-1h',
    title: 'AQA GCSE Mathematics Paper 1 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d9f2c5a7cc38c456cd50683278734fcc9cfcc9.pdf',
    fileSize: '2.0 MB',
    description: 'Non-calculator paper covering algebra, geometry, and number topics'
  },
  {
    id: 'aqa-gcse-math-2023-1h-ms',
    title: 'AQA GCSE Mathematics Paper 1 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b3d8a2e4aa74a19abcd8283046502847adc98dab.pdf',
    fileSize: '1.7 MB'
  },
  {
    id: 'aqa-gcse-physics-2023-1h',
    title: 'AQA GCSE Physics Paper 1 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e2a5d8b0dd49d789de61794389845add0add0a.pdf',
    fileSize: '2.7 MB',
    description: 'Energy, electricity, particle model of matter, atomic structure'
  },
  {
    id: 'aqa-gcse-physics-2023-1h-ms',
    title: 'AQA GCSE Physics Paper 1 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f6b9e2c3ee5aebcdef72905490956bee1beeff6.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'aqa-gcse-chemistry-2023-1h',
    title: 'AQA GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f5b8e1c3ee5aebcdef72905490956bee1bee1b.pdf',
    fileSize: '2.5 MB',
    description: 'Atomic structure, bonding, quantitative chemistry, chemical changes'
  },
  {
    id: 'aqa-gcse-chemistry-2023-1h-ms',
    title: 'AQA GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2023,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a9c2f5d6ff63f089abc7172935491736fcb97acf.pdf',
    fileSize: '1.9 MB'
  },

  // =============================================
  // 2022 PAPERS - MULTIPLE SUBJECTS
  // =============================================
  
  {
    id: 'edexcel-gcse-math-2022-1h',
    title: 'Edexcel GCSE Mathematics Paper 1 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a8c1f4d6ff6ffghiff83016601068fcc2cfcc2.pdf',
    fileSize: '1.9 MB',
    description: 'Non-calculator paper covering algebra, geometry, and number topics'
  },
  {
    id: 'edexcel-gcse-math-2022-1h-ms',
    title: 'Edexcel GCSE Mathematics Paper 1 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c5e7b2a9bb85b2abcde9394157613958bee99ceb.pdf',
    fileSize: '1.6 MB'
  },
  {
    id: 'aqa-alevel-physics-2022-1',
    title: 'AQA A-Level Physics Paper 1',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b1d4a7e9aa7aajklma94127712179daaa3daaa3.pdf',
    fileSize: '3.0 MB',
    description: 'Particles, quantum phenomena, electricity, further mechanics'
  },
  {
    id: 'aqa-alevel-physics-2022-1-ms',
    title: 'AQA A-Level Physics Paper 1 Mark Scheme',
    subject: 'Physics',
    level: 'A-Level',
    examBoard: 'AQA',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d8f1c4a2cc29c3bcdef0405268724069cef10dcf.pdf',
    fileSize: '2.3 MB'
  },
  {
    id: 'aqa-gcse-biology-2022-1h',
    title: 'AQA GCSE Biology Paper 1 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f5c8e1d3ee5eebcdef72905490956bee1bee2f.pdf',
    fileSize: '2.3 MB',
    description: 'Cell biology, organisation, infection and response, bioenergetics'
  },
  {
    id: 'aqa-gcse-biology-2022-1h-ms',
    title: 'AQA GCSE Biology Paper 1 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a6d2f9c7dd95dlmnop2783334845addee5add2.pdf',
    fileSize: '1.6 MB'
  },
  {
    id: 'edexcel-gcse-chemistry-2022-1h',
    title: 'Edexcel GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b7e3a0d8aa40adefb506278834179daaa09ab7.pdf',
    fileSize: '2.5 MB',
    description: 'Atomic structure, chemical bonds, chemical reactions, acids and salts'
  },
  {
    id: 'edexcel-gcse-chemistry-2022-1h-ms',
    title: 'Edexcel GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c8f4b1e9bb51beefb617389945290ebbb1abb8.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'aqa-gcse-cs-2022-1',
    title: 'AQA GCSE Computer Science Paper 1',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d9a5c2f0cc62cfgfbc28450056401fccc2bcd9.pdf',
    fileSize: '1.6 MB',
    description: 'Computational thinking, algorithms, programming techniques, data types'
  },
  {
    id: 'aqa-gcse-cs-2022-1-ms',
    title: 'AQA GCSE Computer Science Paper 1 Mark Scheme',
    subject: 'Computer Science',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2022,
    session: 'May/June',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e0b6d3a1dd73daghcd39561167512adddd3be0.pdf',
    fileSize: '1.3 MB'
  },

  // =============================================
  // 2021 PAPERS - MULTIPLE SUBJECTS
  // =============================================
  
  {
    id: 'aqa-gcse-math-2021-1h',
    title: 'AQA GCSE Mathematics Paper 1 (Higher)',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2021,
    session: 'November',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c4e7b0f2bb8bbmnopb05238823290bbb4bbbb4.pdf',
    fileSize: '2.1 MB',
    description: 'Non-calculator paper covering algebra, geometry, and number topics'
  },
  {
    id: 'aqa-gcse-math-2021-1h-ms',
    title: 'AQA GCSE Mathematics Paper 1 (Higher) Mark Scheme',
    subject: 'Mathematics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2021,
    session: 'November',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e1a5c8f3ff07f4cdef1516379835180adf11edf.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'edexcel-alevel-math-2021-1',
    title: 'Edexcel A-Level Mathematics Paper 1 (Core Pure)',
    subject: 'Mathematics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2021,
    session: 'October/November',
    paperNumber: 'Paper 1',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d7f0c3a5cc9ccqrstc16349934401ccc5cccc5.pdf',
    fileSize: '2.6 MB',
    description: 'Core pure mathematics including algebra, functions, coordinate geometry'
  },
  {
    id: 'edexcel-alevel-math-2021-1-ms',
    title: 'Edexcel A-Level Mathematics Paper 1 Mark Scheme',
    subject: 'Mathematics',
    level: 'A-Level',
    examBoard: 'Edexcel',
    year: 2021,
    session: 'October/November',
    paperNumber: 'Paper 1',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f4b8e1c8ee18e5def2627490946291bef22bf8f.pdf',
    fileSize: '2.0 MB'
  },
  {
    id: 'aqa-gcse-physics-2021-1h',
    title: 'AQA GCSE Physics Paper 1 (Higher)',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2021,
    session: 'November',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/a1c5f8d0ff95fjkef561783389734cff55cfa1.pdf',
    fileSize: '2.6 MB',
    description: 'Energy, electricity, particle model of matter, atomic structure'
  },
  {
    id: 'aqa-gcse-physics-2021-1h-ms',
    title: 'AQA GCSE Physics Paper 1 (Higher) Mark Scheme',
    subject: 'Physics',
    level: 'GCSE',
    examBoard: 'AQA',
    year: 2021,
    session: 'November',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/b2d6a9e1aa06aklef672894490845daaa6dab2.pdf',
    fileSize: '1.9 MB'
  },
  {
    id: 'edexcel-gcse-biology-2021-1h',
    title: 'Edexcel GCSE Biology Paper 1 (Higher)',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2021,
    session: 'November',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/c3e7b0f2bb17bmnef783905501956ebb7bec3.pdf',
    fileSize: '2.4 MB',
    description: 'Key concepts in biology, cells and control, genetics, natural selection'
  },
  {
    id: 'edexcel-gcse-biology-2021-1h-ms',
    title: 'Edexcel GCSE Biology Paper 1 (Higher) Mark Scheme',
    subject: 'Biology',
    level: 'GCSE',
    examBoard: 'Edexcel',
    year: 2021,
    session: 'November',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/d4f8c1a3cc28cnopf894016612067fcc8cfd4.pdf',
    fileSize: '1.7 MB'
  },
  {
    id: 'ocr-gcse-chemistry-2021-1h',
    title: 'OCR GCSE Chemistry Paper 1 (Higher)',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2021,
    session: 'October/November',
    paperNumber: 'Paper 1H',
    type: 'Question Paper',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/e5a9d2b4dd39dqref905127723178add9ade5.pdf',
    fileSize: '2.5 MB',
    description: 'Chemical patterns, chemicals from the Earth, chemicals in action'
  },
  {
    id: 'ocr-gcse-chemistry-2021-1h-ms',
    title: 'OCR GCSE Chemistry Paper 1 (Higher) Mark Scheme',
    subject: 'Chemistry',
    level: 'GCSE',
    examBoard: 'OCR',
    year: 2021,
    session: 'October/November',
    paperNumber: 'Paper 1H',
    type: 'Mark Scheme',
    downloadUrl: 'https://cdn.sanity.io/files/p28bar15/green/f6b0e3c5ee4eestufa16238834289beee5bef6.pdf',
    fileSize: '1.8 MB'
  }
]

const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'Computer Science']
const levels = ['All', 'GCSE', 'A-Level']
const examBoards = ['All', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Eduqas', 'CCEA']
const years = ['All', '2024', '2023', '2022', '2021', '2020']
const paperTypes = ['All', 'Question Paper', 'Mark Scheme', 'Insert']

export default function PastPapersPage() {
  const [selectedSubject, setSelectedSubject] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedExamBoard, setSelectedExamBoard] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPapers = pastPapers.filter(paper => {
    return (selectedSubject === 'All' || paper.subject === selectedSubject) &&
           (selectedLevel === 'All' || paper.level === selectedLevel) &&
           (selectedExamBoard === 'All' || paper.examBoard === selectedExamBoard) &&
           (selectedYear === 'All' || paper.year.toString() === selectedYear) &&
           (selectedType === 'All' || paper.type === selectedType) &&
           (searchTerm === '' || paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const handleDownload = (paper: PastPaper) => {
    // Direct download from CDN
    const link = document.createElement('a')
    link.href = paper.downloadUrl
    link.download = `${paper.title.replace(/\s+/g, '_')}_${paper.year}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              📄 Past Papers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Access thousands of past exam papers and mark schemes with direct PDF downloads
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="font-semibold">📚 All Exam Boards</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="font-semibold">⚡ Instant Download</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="font-semibold">✅ Mark Schemes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Past Papers</h2>
            
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search papers by title, subject, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
                  title="Select subject"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
                  title="Select level"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Exam Board Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Exam Board</label>
                <select
                  value={selectedExamBoard}
                  onChange={(e) => setSelectedExamBoard(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
                  title="Select exam board"
                >
                  {examBoards.map((board) => (
                    <option key={board} value={board}>{board}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
                  title="Select year"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
                  title="Select paper type"
                >
                  {paperTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-gray-600">
              Showing {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>

        {/* Papers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Paper Header */}
              <div className={`p-4 ${
                paper.type === 'Question Paper' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                paper.type === 'Mark Scheme' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                'bg-gradient-to-r from-purple-500 to-violet-600'
              } text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm font-medium">
                    {paper.level}
                  </span>
                  <span className="text-sm font-medium">{paper.examBoard}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                <p className="opacity-90 text-sm">{paper.subject}</p>
              </div>

              <div className="p-4">
                {/* Paper Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium text-gray-800">{paper.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Session:</span>
                    <span className="font-medium text-gray-800">{paper.session}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paper:</span>
                    <span className="font-medium text-gray-800">{paper.paperNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className={`font-medium ${
                      paper.type === 'Question Paper' ? 'text-blue-600' :
                      paper.type === 'Mark Scheme' ? 'text-green-600' :
                      'text-purple-600'
                    }`}>
                      {paper.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium text-gray-800">{paper.fileSize}</span>
                  </div>
                </div>

                {/* Description */}
                {paper.description && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {paper.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(paper)}
                    className={`flex-1 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
                      paper.type === 'Question Paper' ? 'bg-blue-600 hover:bg-blue-700' :
                      paper.type === 'Mark Scheme' ? 'bg-green-600 hover:bg-green-700' :
                      'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    📥 Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredPapers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No papers found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSelectedSubject('All')
                setSelectedLevel('All')
                setSelectedExamBoard('All')
                setSelectedYear('All')
                setSelectedType('All')
                setSearchTerm('')
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-200"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Access Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Direct PDF Downloads</h2>
            <p className="text-xl opacity-90">Real past papers from official exam boards - download instantly</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Search & Filter</h3>
              <p className="opacity-90">Use our advanced filters to find exactly what you need</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Downloads</h3>
              <p className="opacity-90">One-click access to real exam papers and mark schemes</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">All Exam Boards</h3>
              <p className="opacity-90">AQA, Edexcel, OCR papers from 2021-2024</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

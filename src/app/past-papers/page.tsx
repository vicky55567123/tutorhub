'use client'

import { motion } from 'framer-motion'

interface BoardLink {
  board: string
  url: string
}

interface SubjectPapers {
  subject: string
  sourcePage: string
  boards: BoardLink[]
}

const papersBySubject: SubjectPapers[] = [
  {
    subject: 'Mathematics',
    sourcePage: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers',
    boards: [
      { board: 'AQA', url: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers/aqa-gcse-maths-past-papers' },
      { board: 'Edexcel', url: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers/edexcel-gcse-maths-past-papers' },
      { board: 'OCR', url: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers/ocr-gcse-maths-past-papers' },
      { board: 'WJEC', url: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers/wjec-gcse-maths-past-papers' },
      { board: 'CCEA', url: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers/ccea-gcse-maths-past-papers' },
      { board: 'Eduqas', url: 'https://revisionmaths.com/gcse-maths/gcse-maths-past-papers/eduqas-gcse-maths-past-papers' },
    ],
  },
  {
    subject: 'Biology',
    sourcePage: 'https://revisionscience.com/gcse-revision/biology/biology-gcse-past-papers',
    boards: [
      { board: 'AQA', url: 'https://revisionscience.com/gcse-revision/biology/biology-gcse-past-papers/aqa-gcse-biology-past-papers' },
      { board: 'Edexcel', url: 'https://revisionscience.com/gcse-revision/biology/biology-gcse-past-papers/edexcel-biology-past-papers' },
      { board: 'OCR', url: 'https://revisionscience.com/gcse-revision/biology/biology-gcse-past-papers/ocr-gateway-gcse-biology-past-papers' },
      { board: 'WJEC', url: 'https://revisionscience.com/gcse-revision/biology/biology-gcse-past-papers/wjec-gcse-biology-past-papers' },
      { board: 'CCEA', url: 'https://revisionscience.com/gcse-revision/biology/biology-gcse-past-papers/ccea-gcse-biology-past-papers' },
    ],
  },
  {
    subject: 'Chemistry',
    sourcePage: 'https://revisionscience.com/gcse-revision/chemistry/chemistry-gcse-past-papers',
    boards: [
      { board: 'AQA', url: 'https://revisionscience.com/gcse-revision/chemistry/chemistry-gcse-past-papers/aqa-gcse-chemistry-past-papers' },
      { board: 'Edexcel', url: 'https://revisionscience.com/gcse-revision/chemistry/chemistry-gcse-past-papers/edexcel-chemistry-past-papers' },
      { board: 'OCR', url: 'https://revisionscience.com/gcse-revision/chemistry/chemistry-gcse-past-papers/ocr-gateway-gcse-chemistry-past-papers' },
      { board: 'WJEC', url: 'https://revisionscience.com/gcse-revision/chemistry/chemistry-gcse-past-papers/wjec-gcse-chemistry-past-papers' },
      { board: 'CCEA', url: 'https://revisionscience.com/gcse-revision/chemistry/chemistry-gcse-past-papers/ccea-gcse-chemistry-past-papers' },
    ],
  },
  {
    subject: 'Physics',
    sourcePage: 'https://revisionscience.com/gcse-revision/physics/physics-gcse-past-papers',
    boards: [
      { board: 'AQA', url: 'https://revisionscience.com/gcse-revision/physics/physics-gcse-past-papers/aqa-gcse-physics-past-papers' },
      { board: 'Edexcel', url: 'https://revisionscience.com/gcse-revision/physics/physics-gcse-past-papers/edexcel-physics-past-papers' },
      { board: 'OCR', url: 'https://revisionscience.com/gcse-revision/physics/physics-gcse-past-papers/ocr-gateway-gcse-physics-past-papers' },
      { board: 'WJEC', url: 'https://revisionscience.com/gcse-revision/physics/physics-gcse-past-papers/wjec-gcse-physics-past-papers' },
      { board: 'CCEA', url: 'https://revisionscience.com/gcse-revision/physics/physics-gcse-past-papers/ccea-gcse-physics-past-papers' },
    ],
  },
  {
    subject: 'Combined Science',
    sourcePage: 'https://revisionscience.com/gcse-revision/science/science-gcse-past-papers',
    boards: [
      { board: 'AQA', url: 'https://revisionscience.com/gcse-revision/science/science-gcse-past-papers/aqa-gcse-science-past-papers' },
      { board: 'Edexcel', url: 'https://revisionscience.com/gcse-revision/science/science-gcse-past-papers/edexcel-gcse-combined-science-past-papers' },
      { board: 'OCR', url: 'https://revisionscience.com/gcse-revision/science/science-gcse-past-papers/ocr-gateway-gcse-science-past-papers' },
      { board: 'WJEC', url: 'https://revisionscience.com/gcse-revision/science/science-gcse-past-papers/wjec-gcse-science-past-papers' },
      { board: 'CCEA', url: 'https://revisionscience.com/gcse-revision/science/science-gcse-past-papers/ccea-gcse-science-past-papers' },
    ],
  },
  {
    subject: 'Computer Science',
    sourcePage: 'https://revisionworld.com/gcse-revision/ict/past-papers',
    boards: [
      { board: 'AQA', url: 'https://revisionworld.com/gcse-revision/ict/past-papers/aqa-gcse-computer-science-past-papers' },
      { board: 'Edexcel', url: 'https://revisionworld.com/gcse-revision/ict/past-papers/edexcel-gcse-computer-science-past-papers' },
      { board: 'OCR', url: 'https://revisionworld.com/gcse-revision/ict/past-papers/ocr-gcse-computer-science-past-papers' },
      { board: 'WJEC', url: 'https://revisionworld.com/gcse-revision/ict/past-papers/wjec-gcse-computer-science-past-papers' },
      { board: 'Eduqas', url: 'https://revisionworld.com/gcse-revision/ict/past-papers/eduqas-gcse-computer-science-past-papers' },
    ],
  },
]

export default function PastPapersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            GCSE Past Papers by Subject & Exam Board
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access past papers using verified subject pages from Revision World, Revision Maths, and Revision Science.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            External links are provided for educational use. Please check each exam board page for the latest papers and mark schemes.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {papersBySubject.map((subject, index) => (
              <motion.article
                key={subject.subject}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{subject.subject}</h2>
                <a
                  href={subject.sourcePage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Open subject overview page ↗
                </a>

                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {subject.boards.map((board) => (
                    <a
                      key={`${subject.subject}-${board.board}`}
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 px-4 py-3 transition-colors"
                    >
                      <p className="font-semibold text-gray-900">{board.board}</p>
                      <p className="text-xs text-gray-500 mt-1">Past papers</p>
                    </a>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

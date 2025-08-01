'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  LightBulbIcon,
  BookOpenIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline'

// Subtopic interface
interface SubtopicData {
  title: string
  description: string
  duration: string
  difficulty: string
  prerequisites: string[]
  learningObjectives: string[]
  keyTopics: string[]
  practiceAreas: string[]
  examTips: string[]
  detailedContent?: {
    introduction: string
    conceptExplanations: {
      title: string
      content: string
      examples?: string[]
      keyFormulas?: string[]
    }[]
    commonMistakes: string[]
    realWorldApplications: string[]
    practiceQuestions: {
      question: string
      answer: string
      explanation: string
      difficulty: 'Easy' | 'Medium' | 'Hard'
    }[]
    furtherReading: string[]
  }
}

// Subtopic data structure
const subtopicsData: Record<number, Record<string, SubtopicData>> = {
  // GCSE Mathematics
  1: {
    'number-and-basic-algebra': {
      title: 'Number and Basic Algebra',
      description: 'Master fundamental number operations, fractions, decimals, percentages, and introduction to algebraic concepts.',
      duration: '3-4 weeks',
      difficulty: 'Foundation',
      prerequisites: ['Basic arithmetic'],
      learningObjectives: [
        'Perform calculations with integers, fractions, and decimals',
        'Convert between fractions, decimals, and percentages',
        'Use BIDMAS/BODMAS order of operations',
        'Solve simple linear equations',
        'Substitute values into algebraic expressions',
        'Understand indices and standard form'
      ],
      keyTopics: [
        'Four operations with integers',
        'Fractions, decimals, and percentages',
        'Order of operations (BIDMAS)',
        'Basic algebra and substitution',
        'Simple equations',
        'Indices and powers',
        'Standard form notation'
      ],
      practiceAreas: [
        'Mental arithmetic techniques',
        'Calculator skills and methods',
        'Real-world percentage problems',
        'Algebraic manipulation',
        'Problem-solving strategies'
      ],
      examTips: [
        'Show all working clearly',
        'Check answers by substitution',
        'Use estimation to verify results',
        'Practice mental math for speed',
        'Learn standard form conversions'
      ],
      detailedContent: {
        introduction: 'Number and Basic Algebra forms the foundation of all mathematics at GCSE level. This topic bridges the gap between arithmetic and more advanced mathematical concepts. You\'ll develop fluency in working with different types of numbers and begin to understand how mathematical relationships can be expressed using letters and symbols. Mastery of these fundamentals is essential for success in all other areas of mathematics.',
        conceptExplanations: [
          {
            title: 'Integers and the Four Operations',
            content: 'Integers are whole numbers that can be positive, negative, or zero (..., -3, -2, -1, 0, 1, 2, 3, ...). Understanding how to add, subtract, multiply, and divide integers is fundamental to all mathematics. When working with integers, remember that two negatives make a positive, and signs follow specific rules during operations.',
            examples: [
              '(-3) + (-5) = -8',
              '(-4) - (-7) = (-4) + 7 = 3',
              '(-6) × (-2) = 12',
              '(-15) ÷ 3 = -5'
            ],
            keyFormulas: [
              'Addition: Same signs add, different signs subtract',
              'Multiplication/Division: Same signs = positive, different signs = negative'
            ]
          },
          {
            title: 'Fractions, Decimals, and Percentages',
            content: 'These three ways of representing parts of a whole are interconnected and essential for real-world problem solving. Converting between them fluently allows you to choose the most appropriate form for any given situation. Remember that percentages are just fractions out of 100, and decimals show the same information using place value.',
            examples: [
              '3/4 = 0.75 = 75%',
              '0.6 = 6/10 = 3/5 = 60%',
              '25% = 25/100 = 1/4 = 0.25'
            ],
            keyFormulas: [
              'Fraction to decimal: divide numerator by denominator',
              'Decimal to percentage: multiply by 100',
              'Percentage to fraction: write over 100 and simplify'
            ]
          },
          {
            title: 'Order of Operations (BIDMAS/BODMAS)',
            content: 'BIDMAS (Brackets, Indices, Division/Multiplication, Addition/Subtraction) ensures that mathematical expressions are calculated consistently. This order prevents ambiguity and ensures everyone gets the same answer. Division and multiplication have equal priority (work left to right), as do addition and subtraction.',
            examples: [
              '2 + 3 × 4 = 2 + 12 = 14 (not 20)',
              '(5 + 3) × 2² = 8 × 4 = 32',
              '20 ÷ 4 × 2 = 5 × 2 = 10'
            ],
            keyFormulas: [
              'BIDMAS: Brackets → Indices → Division/Multiplication → Addition/Subtraction'
            ]
          },
          {
            title: 'Basic Algebra and Substitution',
            content: 'Algebra uses letters (variables) to represent unknown numbers or quantities that can change. This allows us to write general rules and solve problems systematically. Substitution means replacing the letters with specific numbers to calculate a numerical answer.',
            examples: [
              'If x = 5, then 3x + 2 = 3(5) + 2 = 17',
              'If a = 4 and b = 3, then 2a - b = 2(4) - 3 = 5',
              'Area of rectangle: A = lw, if l = 6 and w = 4, then A = 24'
            ],
            keyFormulas: [
              'Always substitute values carefully using brackets',
              'Follow BIDMAS when evaluating expressions'
            ]
          },
          {
            title: 'Simple Linear Equations',
            content: 'Equations are mathematical statements showing that two expressions are equal. Solving equations means finding the value of the unknown that makes the statement true. Use inverse operations to isolate the variable, and always check your answer by substitution.',
            examples: [
              'x + 7 = 12, so x = 12 - 7 = 5',
              '3x = 15, so x = 15 ÷ 3 = 5',
              '2x + 3 = 11, so 2x = 8, so x = 4'
            ],
            keyFormulas: [
              'Whatever you do to one side, do to the other',
              'Use inverse operations: +/-, ×/÷',
              'Check by substituting back into original equation'
            ]
          },
          {
            title: 'Indices and Powers',
            content: 'Indices (or powers) provide a shorthand way of writing repeated multiplication. Understanding the laws of indices is crucial for working with very large and very small numbers, and for advancing to higher-level mathematics.',
            examples: [
              '2⁴ = 2 × 2 × 2 × 2 = 16',
              '5² × 5³ = 5⁵ = 3125',
              '10⁻² = 1/10² = 1/100 = 0.01'
            ],
            keyFormulas: [
              'aᵐ × aⁿ = aᵐ⁺ⁿ',
              'aᵐ ÷ aⁿ = aᵐ⁻ⁿ',
              'a⁻ⁿ = 1/aⁿ',
              'a⁰ = 1 (for a ≠ 0)'
            ]
          },
          {
            title: 'Standard Form',
            content: 'Standard form (scientific notation) is a way of writing very large or very small numbers using powers of 10. This makes calculations more manageable and helps in comparing the size of numbers. The format is a × 10ⁿ where 1 ≤ a < 10 and n is an integer.',
            examples: [
              '3000 = 3 × 10³',
              '0.0045 = 4.5 × 10⁻³',
              '5.67 × 10⁶ = 5,670,000'
            ],
            keyFormulas: [
              'Large numbers: positive power of 10',
              'Small numbers: negative power of 10',
              'Count decimal places to find the power'
            ]
          }
        ],
        commonMistakes: [
          'Forgetting to follow BIDMAS order - always do operations in the correct sequence',
          'Sign errors with negative numbers - be extra careful with minus signs',
          'Not simplifying fractions to lowest terms - always look for common factors',
          'Mixing up operations when solving equations - use inverse operations systematically',
          'Calculation errors with percentages - remember to convert properly',
          'Forgetting to check answers - substitution catches most errors',
          'Confusing indices rules - practice the laws of indices regularly'
        ],
        realWorldApplications: [
          'Financial calculations: interest, loans, mortgages, and budgeting',
          'Shopping and discounts: calculating percentage reductions and VAT',
          'Cooking and recipes: scaling ingredients up or down proportionally',
          'Construction and DIY: measuring, area calculations, and material quantities',
          'Science: expressing very large distances or very small measurements',
          'Technology: data storage sizes, processing speeds, and network capacity',
          'Sports statistics: averages, percentages, and performance analysis'
        ],
        practiceQuestions: [
          {
            question: 'Calculate: 2 + 3 × (5 - 2)²',
            answer: '29',
            explanation: 'Following BIDMAS: 2 + 3 × (3)² = 2 + 3 × 9 = 2 + 27 = 29',
            difficulty: 'Easy'
          },
          {
            question: 'Convert 3/8 to a decimal and percentage',
            answer: '0.375 and 37.5%',
            explanation: '3 ÷ 8 = 0.375, then 0.375 × 100 = 37.5%',
            difficulty: 'Easy'
          },
          {
            question: 'Solve: 3x + 7 = 22',
            answer: 'x = 5',
            explanation: '3x = 22 - 7 = 15, so x = 15 ÷ 3 = 5. Check: 3(5) + 7 = 22 ✓',
            difficulty: 'Medium'
          },
          {
            question: 'If y = 2x² - 3x + 1, find y when x = 4',
            answer: 'y = 21',
            explanation: 'y = 2(4)² - 3(4) + 1 = 2(16) - 12 + 1 = 32 - 12 + 1 = 21',
            difficulty: 'Medium'
          },
          {
            question: 'Express 0.00456 in standard form',
            answer: '4.56 × 10⁻³',
            explanation: 'Move decimal point 3 places right to get 4.56, so power is -3',
            difficulty: 'Hard'
          },
          {
            question: 'Simplify: (2³ × 2⁵) ÷ 2⁴',
            answer: '2⁴ = 16',
            explanation: 'Using indices laws: 2³ × 2⁵ = 2⁸, then 2⁸ ÷ 2⁴ = 2⁴ = 16',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'BBC Bitesize: Number and Algebra fundamentals',
          'Khan Academy: Basic arithmetic and early algebra',
          'Corbett Maths: Number basics video tutorials',
          'ExamSolutions: GCSE Number revision videos',
          'MyMaths: Interactive number and algebra exercises'
        ]
      }
    },
    'advanced-algebra-and-functions': {
      title: 'Advanced Algebra and Functions',
      description: 'Explore quadratic equations, simultaneous equations, inequalities, and function notation.',
      duration: '4-5 weeks',
      difficulty: 'Higher',
      prerequisites: ['Number and Basic Algebra'],
      learningObjectives: [
        'Solve quadratic equations using multiple methods',
        'Solve simultaneous equations algebraically and graphically',
        'Work with inequalities and represent solutions',
        'Understand function notation and transformations',
        'Expand and factorize algebraic expressions',
        'Apply algebraic skills to real-world problems'
      ],
      keyTopics: [
        'Expanding and factorizing expressions',
        'Quadratic equations and formula',
        'Simultaneous equations',
        'Inequalities and graphs',
        'Function notation f(x)',
        'Graph transformations',
        'Algebraic fractions'
      ],
      practiceAreas: [
        'Factorization techniques',
        'Quadratic formula applications',
        'Graphical solution methods',
        'Inequality representations',
        'Function transformations'
      ],
      examTips: [
        'Learn factorization patterns',
        'Practice quadratic formula',
        'Use substitution to check solutions',
        'Draw accurate graphs',
        'Understand function transformations'
      ],
      detailedContent: {
        introduction: 'Advanced Algebra and Functions represents a significant step up from basic algebra, introducing powerful mathematical tools used extensively in higher mathematics, science, and engineering. You\'ll learn to solve complex equations, work with mathematical functions, and understand how algebraic relationships can model real-world situations. These skills form the foundation for A-level mathematics and beyond.',
        conceptExplanations: [
          {
            title: 'Expanding and Factorizing Algebraic Expressions',
            content: 'Expanding means multiplying out brackets to create a single expression, while factorizing is the reverse process - taking a common factor out or recognizing special patterns. These are fundamental skills that you\'ll use throughout mathematics.',
            examples: [
              'Expand: 3(x + 4) = 3x + 12',
              'Expand: (x + 3)(x + 5) = x² + 8x + 15',
              'Factorize: 6x + 9 = 3(2x + 3)',
              'Factorize: x² + 7x + 12 = (x + 3)(x + 4)'
            ],
            keyFormulas: [
              'FOIL: (a + b)(c + d) = ac + ad + bc + bd',
              'Difference of squares: a² - b² = (a + b)(a - b)',
              'Perfect square: a² + 2ab + b² = (a + b)²'
            ]
          },
          {
            title: 'Quadratic Equations',
            content: 'Quadratic equations have the form ax² + bx + c = 0 and can be solved using factorization, completing the square, or the quadratic formula. These equations model many real-world situations involving area, projectile motion, and optimization.',
            examples: [
              'x² + 5x + 6 = 0 → (x + 2)(x + 3) = 0 → x = -2 or x = -3',
              'x² - 4x + 3 = 0 → (x - 1)(x - 3) = 0 → x = 1 or x = 3',
              'x² + 2x - 1 = 0 → x = (-2 ± √8)/2 = -1 ± √2'
            ],
            keyFormulas: [
              'Quadratic formula: x = (-b ± √(b² - 4ac))/2a',
              'Discriminant: b² - 4ac determines number of solutions',
              'Sum of roots: -b/a, Product of roots: c/a'
            ]
          },
          {
            title: 'Simultaneous Equations',
            content: 'Simultaneous equations are sets of equations that share common variables. Solving them means finding values that satisfy all equations at the same time. Methods include elimination, substitution, and graphical approaches.',
            examples: [
              'x + y = 7 and 2x - y = 2 → Adding: 3x = 9, so x = 3, y = 4',
              'x + 2y = 8 and 3x - y = 1 → Substitution gives x = 2, y = 3',
              'y = x² and y = 2x + 3 → x² = 2x + 3 → x² - 2x - 3 = 0'
            ],
            keyFormulas: [
              'Elimination: multiply equations to eliminate one variable',
              'Substitution: express one variable in terms of another',
              'Graphical: intersection point of two graphs'
            ]
          },
          {
            title: 'Inequalities',
            content: 'Inequalities show relationships where one expression is greater than, less than, or equal to another. They can be solved algebraically and represented graphically, showing ranges of possible solutions rather than exact values.',
            examples: [
              '2x + 3 > 11 → 2x > 8 → x > 4',
              'x² < 9 → -3 < x < 3',
              '|x - 2| ≤ 5 → -3 ≤ x ≤ 7'
            ],
            keyFormulas: [
              'When multiplying/dividing by negative, flip the inequality sign',
              'Quadratic inequalities: consider the parabola shape',
              'Modulus inequalities: consider both positive and negative cases'
            ]
          },
          {
            title: 'Function Notation f(x)',
            content: 'Functions are mathematical machines that take an input (x) and produce an output f(x). Function notation provides a clear way to describe mathematical relationships and transformations. Understanding functions is crucial for advanced mathematics.',
            examples: [
              'f(x) = 2x + 3, then f(5) = 2(5) + 3 = 13',
              'g(x) = x² - 4x, then g(-2) = 4 + 8 = 12',
              'h(x) = 1/x, domain is all real numbers except x = 0'
            ],
            keyFormulas: [
              'Domain: set of possible input values',
              'Range: set of possible output values',
              'Composite functions: (f ∘ g)(x) = f(g(x))'
            ]
          },
          {
            title: 'Graph Transformations',
            content: 'Graph transformations show how the graph of a function changes when we modify the function. These transformations include translations (shifts), reflections, and stretches, each with predictable effects on the graph\'s shape and position.',
            examples: [
              'f(x) + k shifts the graph k units up',
              'f(x + k) shifts the graph k units left',
              '-f(x) reflects the graph in the x-axis',
              'af(x) stretches the graph vertically by factor a'
            ],
            keyFormulas: [
              'y = f(x) + a: translation up by a units',
              'y = f(x - a): translation right by a units',
              'y = af(x): stretch scale factor a parallel to y-axis',
              'y = f(ax): stretch scale factor 1/a parallel to x-axis'
            ]
          }
        ],
        commonMistakes: [
          'Sign errors when expanding brackets - be careful with negative terms',
          'Forgetting to check solutions by substituting back into original equations',
          'Confusing elimination and substitution methods for simultaneous equations',
          'Not flipping inequality signs when multiplying/dividing by negatives',
          'Mixing up function notation - f(x+2) is not the same as f(x)+2',
          'Incorrectly applying the quadratic formula - check the discriminant first',
          'Forgetting that quadratic equations can have 0, 1, or 2 solutions'
        ],
        realWorldApplications: [
          'Business: profit maximization, break-even analysis, cost optimization',
          'Physics: projectile motion, acceleration, wave equations',
          'Engineering: structural design, electrical circuits, optimization problems',
          'Economics: supply and demand curves, market equilibrium',
          'Computer graphics: animation, transformations, game development',
          'Architecture: design optimization, structural calculations',
          'Data analysis: curve fitting, trend modeling, regression analysis'
        ],
        practiceQuestions: [
          {
            question: 'Expand and simplify: (2x + 3)(x - 4)',
            answer: '2x² - 5x - 12',
            explanation: 'Using FOIL: 2x·x + 2x·(-4) + 3·x + 3·(-4) = 2x² - 8x + 3x - 12 = 2x² - 5x - 12',
            difficulty: 'Easy'
          },
          {
            question: 'Factorize: x² - 9x + 20',
            answer: '(x - 4)(x - 5)',
            explanation: 'Need two numbers that multiply to 20 and add to -9: -4 and -5. So (x - 4)(x - 5)',
            difficulty: 'Easy'
          },
          {
            question: 'Solve: x² - 6x + 8 = 0',
            answer: 'x = 2 or x = 4',
            explanation: 'Factorizing: (x - 2)(x - 4) = 0, so x = 2 or x = 4',
            difficulty: 'Medium'
          },
          {
            question: 'Solve simultaneously: 3x + 2y = 16 and x - y = 2',
            answer: 'x = 4, y = 2',
            explanation: 'From equation 2: x = y + 2. Substituting: 3(y + 2) + 2y = 16 → 5y = 10 → y = 2, x = 4',
            difficulty: 'Medium'
          },
          {
            question: 'If f(x) = x² - 3x + 2, find f(x + 1)',
            answer: 'x² - x',
            explanation: 'f(x + 1) = (x + 1)² - 3(x + 1) + 2 = x² + 2x + 1 - 3x - 3 + 2 = x² - x',
            difficulty: 'Hard'
          },
          {
            question: 'Solve: x² - 4x + 1 = 0 using the quadratic formula',
            answer: 'x = 2 ± √3',
            explanation: 'a = 1, b = -4, c = 1. x = (4 ± √(16 - 4))/2 = (4 ± √12)/2 = (4 ± 2√3)/2 = 2 ± √3',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Advanced Algebra and Functions',
          'BBC Bitesize: Quadratic equations and graphs',
          'Corbett Maths: Simultaneous equations methods',
          'ExamSolutions: Function notation and transformations',
          'Dr Frost Maths: Algebraic manipulation practice'
        ]
      }
    },
    'geometry-and-measures': {
      title: 'Geometry and Measures',
      description: 'Master geometric properties, measurements, area, volume, and trigonometry.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Basic arithmetic', 'Number and Basic Algebra'],
      learningObjectives: [
        'Calculate areas and volumes of 2D and 3D shapes',
        'Apply Pythagoras theorem and trigonometry',
        'Understand geometric properties and angle relationships',
        'Work with similar shapes and scale factors',
        'Apply geometric concepts to real-world problems',
        'Use circle theorems and properties'
      ],
      keyTopics: [
        'Areas of triangles, quadrilaterals, circles',
        'Volumes of prisms, cylinders, spheres',
        'Pythagoras theorem',
        'Trigonometry (SOH CAH TOA)',
        'Similar shapes and scale factors',
        'Circle theorems',
        'Vectors and transformations'
      ],
      practiceAreas: [
        'Geometric calculations',
        'Trigonometric problem solving',
        '3D shape analysis',
        'Scale factor applications',
        'Circle geometry'
      ],
      examTips: [
        'Draw clear diagrams',
        'Label all given information',
        'Use appropriate formulas',
        'Check units in answers',
        'Practice trigonometry calculations'
      ],
      detailedContent: {
        introduction: 'Geometry and Measures combines the visual aspects of mathematics with practical measurement skills. This topic is essential for understanding the world around us, from calculating spaces in your home to understanding engineering designs. You\'ll develop spatial reasoning skills and learn to apply mathematical formulas to solve real-world problems involving shape, size, and position.',
        conceptExplanations: [
          {
            title: 'Areas of 2D Shapes',
            content: 'Area measures the amount of space inside a 2D shape, expressed in square units. Different shapes have specific formulas, but understanding the underlying principles helps you remember and apply them effectively. Always ensure your measurements are in the same units before calculating.',
            examples: [
              'Rectangle: Area = length × width = 8 × 5 = 40 cm²',
              'Triangle: Area = ½ × base × height = ½ × 6 × 4 = 12 cm²',
              'Circle: Area = πr² = π × 3² = 9π ≈ 28.3 cm²',
              'Parallelogram: Area = base × height = 7 × 4 = 28 cm²'
            ],
            keyFormulas: [
              'Rectangle: A = lw',
              'Triangle: A = ½bh',
              'Circle: A = πr²',
              'Parallelogram: A = bh',
              'Trapezium: A = ½(a + b)h'
            ]
          },
          {
            title: 'Volumes of 3D Shapes',
            content: 'Volume measures the amount of space inside a 3D shape, expressed in cubic units. For prisms, volume equals the area of the cross-section multiplied by the length. For other shapes, specific formulas apply. Always visualize the shape to understand what you\'re calculating.',
            examples: [
              'Cuboid: Volume = 4 × 3 × 5 = 60 cm³',
              'Cylinder: Volume = πr²h = π × 2² × 10 = 40π ≈ 125.7 cm³',
              'Sphere: Volume = (4/3)πr³ = (4/3)π × 3³ = 36π ≈ 113.1 cm³',
              'Cone: Volume = (1/3)πr²h = (1/3)π × 4² × 9 = 48π ≈ 150.8 cm³'
            ],
            keyFormulas: [
              'Cuboid: V = lwh',
              'Cylinder: V = πr²h',
              'Sphere: V = (4/3)πr³',
              'Cone: V = (1/3)πr²h',
              'Prism: V = area of cross-section × length'
            ]
          },
          {
            title: 'Pythagoras Theorem',
            content: 'Pythagoras theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides. This fundamental relationship allows us to find unknown sides in right triangles and has countless applications in measurement and design.',
            examples: [
              'Find hypotenuse: a = 3, b = 4, so c² = 3² + 4² = 25, c = 5',
              'Find shorter side: c = 13, a = 5, so b² = 13² - 5² = 144, b = 12',
              'Check right triangle: 5² + 12² = 25 + 144 = 169 = 13² ✓'
            ],
            keyFormulas: [
              'a² + b² = c² (where c is the hypotenuse)',
              'To find hypotenuse: c = √(a² + b²)',
              'To find shorter side: a = √(c² - b²)'
            ]
          },
          {
            title: 'Trigonometry (SOH CAH TOA)',
            content: 'Trigonometry relates angles to side ratios in right triangles. The three main ratios are sine, cosine, and tangent. SOH CAH TOA helps remember: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent. These ratios allow us to find unknown angles and sides.',
            examples: [
              'sin(30°) = 0.5, so in a triangle with hypotenuse 10, opposite = 5',
              'tan(45°) = 1, so opposite = adjacent when angle is 45°',
              'cos(60°) = 0.5, so adjacent = hypotenuse/2 when angle is 60°'
            ],
            keyFormulas: [
              'sin(θ) = opposite/hypotenuse',
              'cos(θ) = adjacent/hypotenuse',
              'tan(θ) = opposite/adjacent',
              'To find angle: θ = sin⁻¹(o/h) or cos⁻¹(a/h) or tan⁻¹(o/a)'
            ]
          },
          {
            title: 'Similar Shapes and Scale Factors',
            content: 'Similar shapes have the same angles but different sizes. The scale factor tells us how much larger or smaller one shape is compared to another. When shapes are similar, corresponding lengths are in the same ratio, areas are in the ratio of (scale factor)², and volumes are in the ratio of (scale factor)³.',
            examples: [
              'Scale factor 2: length ratio 2:1, area ratio 4:1, volume ratio 8:1',
              'If model car is 1:50 scale, real car 200cm long = model 4cm long',
              'Map scale 1:25000 means 1cm on map = 250m in reality'
            ],
            keyFormulas: [
              'Length scale factor = corresponding length ratio',
              'Area scale factor = (length scale factor)²',
              'Volume scale factor = (length scale factor)³'
            ]
          },
          {
            title: 'Circle Theorems',
            content: 'Circle theorems describe the relationships between angles, chords, tangents, and arcs in circles. These theorems are powerful tools for solving geometric problems and understanding circular geometry. Each theorem has a specific condition and conclusion that must be carefully applied.',
            examples: [
              'Angles in same segment are equal: both angles subtending arc AB are equal',
              'Angle in semicircle is 90°: any angle in a semicircle is a right angle',
              'Tangent perpendicular to radius: tangent meets radius at 90°'
            ],
            keyFormulas: [
              'Circumference = 2πr or πd',
              'Arc length = (θ/360°) × 2πr',
              'Sector area = (θ/360°) × πr²',
              'Angle at center = 2 × angle at circumference'
            ]
          }
        ],
        commonMistakes: [
          'Confusing radius and diameter in circle calculations',
          'Forgetting to square the radius in area and volume formulas',
          'Using degrees instead of the correct mode on calculator for trigonometry',
          'Not drawing diagrams to visualize the problem',
          'Mixing up opposite and adjacent sides in trigonometry',
          'Forgetting that scale factor for area is squared, for volume is cubed',
          'Not checking if triangle is right-angled before using Pythagoras'
        ],
        realWorldApplications: [
          'Architecture and construction: calculating materials, designing structures, ensuring stability',
          'Navigation and GPS: using trigonometry to determine positions and distances',
          'Engineering: designing bridges, buildings, and mechanical components',
          'Art and design: creating accurate scale drawings and proportional designs',
          'Sports: analyzing ball trajectories, field dimensions, and optimal strategies',
          'Photography: understanding angles, perspectives, and lens calculations',
          'Astronomy: measuring distances to stars and planets using trigonometry'
        ],
        practiceQuestions: [
          {
            question: 'Find the area of a triangle with base 12 cm and height 8 cm.',
            answer: '48 cm²',
            explanation: 'Area = ½ × base × height = ½ × 12 × 8 = 48 cm²',
            difficulty: 'Easy'
          },
          {
            question: 'A cylinder has radius 5 cm and height 12 cm. Find its volume.',
            answer: '300π cm³ ≈ 942.5 cm³',
            explanation: 'Volume = πr²h = π × 5² × 12 = π × 25 × 12 = 300π cm³',
            difficulty: 'Easy'
          },
          {
            question: 'In a right triangle, two sides are 9 cm and 12 cm. Find the hypotenuse.',
            answer: '15 cm',
            explanation: 'Using Pythagoras: c² = 9² + 12² = 81 + 144 = 225, so c = √225 = 15 cm',
            difficulty: 'Medium'
          },
          {
            question: 'In a right triangle, find angle θ if opposite = 7 cm and hypotenuse = 14 cm.',
            answer: '30°',
            explanation: 'sin(θ) = opposite/hypotenuse = 7/14 = 0.5, so θ = sin⁻¹(0.5) = 30°',
            difficulty: 'Medium'
          },
          {
            question: 'Two similar triangles have areas 36 cm² and 81 cm². Find the scale factor.',
            answer: '2:3',
            explanation: 'Area ratio = 36:81 = 4:9. Since area ratio = (scale factor)², scale factor = √(4:9) = 2:3',
            difficulty: 'Hard'
          },
          {
            question: 'Find the length of arc AB if the central angle is 60° and radius is 9 cm.',
            answer: '3π cm ≈ 9.42 cm',
            explanation: 'Arc length = (θ/360°) × 2πr = (60°/360°) × 2π × 9 = (1/6) × 18π = 3π cm',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Geometry and measurement fundamentals',
          'BBC Bitesize: Pythagoras and trigonometry',
          'Corbett Maths: Circle theorems and properties',
          'ExamSolutions: 3D shapes and volume calculations',
          'Dr Frost Maths: Similar shapes and scale factors',
          'Mathcentre: Trigonometry applications and problem solving'
        ]
      }
    },
    'statistics-and-data-analysis': {
      title: 'Statistics and Data Analysis',
      description: 'Analyze data using measures of central tendency, spread, and various statistical representations.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Number and Basic Algebra'],
      learningObjectives: [
        'Calculate mean, median, mode, and range',
        'Interpret and create statistical charts and graphs',
        'Understand correlation and causation',
        'Work with frequency distributions',
        'Apply statistical concepts to real data',
        'Compare different data sets'
      ],
      keyTopics: [
        'Measures of central tendency',
        'Measures of spread (range, IQR)',
        'Frequency tables and histograms',
        'Scatter graphs and correlation',
        'Box plots and cumulative frequency',
        'Sampling methods',
        'Data interpretation'
      ],
      practiceAreas: [
        'Statistical calculations',
        'Graph interpretation',
        'Data collection methods',
        'Comparative analysis',
        'Real-world applications'
      ],
      examTips: [
        'Read scales carefully',
        'Show calculation methods',
        'Interpret results in context',
        'Practice graph drawing',
        'Understand correlation vs causation'
      ],
      detailedContent: {
        introduction: 'Statistics and Data Analysis is essential in our data-driven world. This topic teaches you how to collect, organize, analyze, and interpret numerical information. You\'ll learn to spot patterns, make predictions, and draw meaningful conclusions from data. These skills are crucial for making informed decisions in science, business, politics, and everyday life.',
        conceptExplanations: [
          {
            title: 'Measures of Central Tendency',
            content: 'Central tendency describes the center or typical value of a dataset. The three main measures are mean (average), median (middle value), and mode (most frequent value). Each measure has strengths and weaknesses, and the choice depends on the data type and distribution.',
            examples: [
              'Data: 2, 5, 7, 8, 8, 12, 15',
              'Mean = (2+5+7+8+8+12+15) ÷ 7 = 57 ÷ 7 = 8.14',
              'Median = 8 (middle value when ordered)',
              'Mode = 8 (appears twice, most frequent)'
            ],
            keyFormulas: [
              'Mean = sum of all values ÷ number of values',
              'Median = middle value (or average of two middle values)',
              'Mode = most frequently occurring value(s)'
            ]
          },
          {
            title: 'Measures of Spread',
            content: 'Spread measures show how much the data varies from the central tendency. Range is the simplest measure (highest - lowest), while interquartile range (IQR) is more robust as it focuses on the middle 50% of data, ignoring extreme values.',
            examples: [
              'Data: 3, 7, 8, 12, 15, 18, 21',
              'Range = 21 - 3 = 18',
              'Q1 = 7, Q3 = 18, so IQR = 18 - 7 = 11',
              'Lower quartile Q1 = 25th percentile, Upper quartile Q3 = 75th percentile'
            ],
            keyFormulas: [
              'Range = highest value - lowest value',
              'IQR = Q3 - Q1 (interquartile range)',
              'Outlier if value < Q1 - 1.5×IQR or > Q3 + 1.5×IQR'
            ]
          },
          {
            title: 'Frequency Tables and Histograms',
            content: 'Frequency tables organize data by counting how often each value or range of values occurs. Histograms visually represent this frequency data using bars. The key difference from bar charts is that histogram bars touch because they represent continuous data ranges.',
            examples: [
              'Height ranges: 150-160cm (5 people), 160-170cm (12 people), 170-180cm (8 people)',
              'Frequency density = frequency ÷ class width',
              'For unequal class widths, use frequency density on y-axis'
            ],
            keyFormulas: [
              'Frequency density = frequency ÷ class width',
              'Estimated mean = Σ(midpoint × frequency) ÷ total frequency',
              'Modal class = class with highest frequency (or frequency density)'
            ]
          },
          {
            title: 'Scatter Graphs and Correlation',
            content: 'Scatter graphs plot paired data to show relationships between two variables. Correlation describes the strength and direction of linear relationship: positive (both increase together), negative (one increases as other decreases), or no correlation. Remember: correlation does not imply causation.',
            examples: [
              'Strong positive correlation: r ≈ +0.9 (height vs shoe size)',
              'Strong negative correlation: r ≈ -0.8 (altitude vs temperature)',
              'No correlation: r ≈ 0 (shoe size vs exam score)',
              'Perfect correlation: r = ±1 (extremely rare in real data)'
            ],
            keyFormulas: [
              'Correlation coefficient r ranges from -1 to +1',
              'Line of best fit: y = mx + c (minimizes squared distances)',
              '|r| > 0.8 suggests strong correlation, |r| < 0.3 suggests weak correlation'
            ]
          },
          {
            title: 'Box Plots and Quartiles',
            content: 'Box plots (box-and-whisker diagrams) show the distribution of data using five key values: minimum, Q1, median, Q3, and maximum. They make it easy to compare datasets and identify outliers. The box contains the middle 50% of data.',
            examples: [
              'Data: 12, 15, 18, 22, 25, 28, 35, 40, 42',
              'Min=12, Q1=17, Median=25, Q3=37.5, Max=42',
              'Box from Q1 to Q3, line at median, whiskers to min/max'
            ],
            keyFormulas: [
              'Q1 = value at 25% position when data ordered',
              'Q3 = value at 75% position when data ordered',
              'Whiskers extend to min/max (unless outliers present)'
            ]
          },
          {
            title: 'Sampling Methods',
            content: 'Sampling is the process of selecting a representative subset from a larger population. Different methods have different advantages: random sampling avoids bias, stratified sampling ensures representation of subgroups, systematic sampling is practical for large populations.',
            examples: [
              'Simple random: every person has equal chance (lottery system)',
              'Stratified: sample proportionally from each group (age, gender)',
              'Systematic: every nth person (every 10th person from a list)',
              'Quota: predetermined numbers from each category'
            ],
            keyFormulas: [
              'Sample size should be large enough to be representative',
              'Stratified sample size per group = (group size/population size) × total sample size',
              'Systematic interval = population size ÷ sample size'
            ]
          }
        ],
        commonMistakes: [
          'Confusing mean, median, and mode - choose the appropriate measure for the context',
          'Not ordering data before finding median',
          'Forgetting to use frequency density for histograms with unequal class widths',
          'Assuming correlation implies causation',
          'Not reading graph scales carefully',
          'Mixing up quartiles (Q1 is lower quartile, Q3 is upper quartile)',
          'Not considering outliers when interpreting data'
        ],
        realWorldApplications: [
          'Healthcare: analyzing treatment effectiveness, epidemiological studies',
          'Business: market research, quality control, sales forecasting',
          'Education: student performance analysis, curriculum effectiveness',
          'Sports: player statistics, performance analysis, team strategies',
          'Economics: inflation rates, unemployment statistics, GDP analysis',
          'Environmental science: climate data, pollution monitoring',
          'Social sciences: survey analysis, demographic studies'
        ],
        practiceQuestions: [
          {
            question: 'Find the mean of: 4, 7, 9, 12, 15, 18, 23',
            answer: '12.57 (to 2 d.p.)',
            explanation: 'Mean = (4+7+9+12+15+18+23) ÷ 7 = 88 ÷ 7 = 12.57',
            difficulty: 'Easy'
          },
          {
            question: 'Find the median and range of: 3, 8, 12, 15, 19, 22, 28',
            answer: 'Median = 15, Range = 25',
            explanation: 'Median is the middle value = 15. Range = 28 - 3 = 25',
            difficulty: 'Easy'
          },
          {
            question: 'A histogram shows: 0-10 (frequency 5), 10-20 (frequency 12), 20-30 (frequency 8). Find the modal class.',
            answer: '10-20',
            explanation: 'Modal class is the class with highest frequency = 10-20 (frequency 12)',
            difficulty: 'Medium'
          },
          {
            question: 'Calculate Q1 and Q3 for: 2, 5, 8, 11, 14, 17, 20, 23, 26',
            answer: 'Q1 = 6.5, Q3 = 19.5',
            explanation: 'Q1 is average of 2nd and 3rd values: (5+8)/2 = 6.5. Q3 is average of 7th and 8th values: (20+17)/2 = 19.5',
            difficulty: 'Medium'
          },
          {
            question: 'In a scatter graph, if increasing x leads to decreasing y, what type of correlation is shown?',
            answer: 'Negative correlation',
            explanation: 'When one variable increases while the other decreases, this shows negative correlation',
            difficulty: 'Hard'
          },
          {
            question: 'A stratified sample of 200 students from a school of 1000 (600 girls, 400 boys). How many girls should be in the sample?',
            answer: '120 girls',
            explanation: 'Proportion of girls = 600/1000 = 0.6. Sample girls = 0.6 × 200 = 120',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Statistics and probability fundamentals',
          'BBC Bitesize: Data handling and statistics',
          'Corbett Maths: Statistical measures and graphs',
          'ExamSolutions: Probability and statistics problems',
          'Dr Frost Maths: Data analysis and interpretation',
          'Mathcentre: Statistical reasoning and applications'
        ]
      }
    },
    'probability-and-combined-events': {
      title: 'Probability and Combined Events',
      description: 'Master probability calculations, tree diagrams, and conditional probability.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Fractions, decimals, percentages'],
      learningObjectives: [
        'Calculate probability of single and combined events',
        'Use tree diagrams and Venn diagrams',
        'Apply conditional probability concepts',
        'Understand mutually exclusive and independent events',
        'Solve probability problems using different methods',
        'Apply probability to real-world scenarios'
      ],
      keyTopics: [
        'Basic probability calculations',
        'Combined events (AND, OR)',
        'Tree diagrams',
        'Conditional probability',
        'Venn diagrams',
        'Mutually exclusive events',
        'Independent events'
      ],
      practiceAreas: [
        'Probability calculations',
        'Tree diagram construction',
        'Conditional probability problems',
        'Real-world applications',
        'Problem-solving strategies'
      ],
      examTips: [
        'Use systematic approaches',
        'Draw clear diagrams',
        'Check probabilities sum to 1',
        'Practice tree diagrams',
        'Understand probability language'
      ],
      detailedContent: {
        introduction: 'Probability is the mathematics of uncertainty and chance. It helps us quantify how likely events are to occur and make informed decisions in uncertain situations. From weather forecasting to medical diagnosis, from insurance to gaming, probability is everywhere. Understanding probability develops logical thinking and helps you evaluate risks and opportunities in daily life.',
        conceptExplanations: [
          {
            title: 'Basic Probability',
            content: 'Probability measures the likelihood of an event occurring, expressed as a number between 0 and 1 (or 0% to 100%). A probability of 0 means impossible, 1 means certain. For equally likely outcomes, probability equals the number of favorable outcomes divided by total possible outcomes.',
            examples: [
              'Rolling a 6 on a fair die: P(6) = 1/6 ≈ 0.167',
              'Drawing a red card from standard deck: P(red) = 26/52 = 1/2 = 0.5',
              'Getting heads on fair coin: P(heads) = 1/2 = 0.5'
            ],
            keyFormulas: [
              'P(event) = number of favorable outcomes / total number of possible outcomes',
              '0 ≤ P(event) ≤ 1',
              'P(not A) = 1 - P(A)',
              'Sum of all probabilities = 1'
            ]
          },
          {
            title: 'Combined Events (AND, OR)',
            content: 'When combining events, we use AND (intersection) and OR (union). For independent events, P(A AND B) = P(A) × P(B). For mutually exclusive events, P(A OR B) = P(A) + P(B). For non-mutually exclusive events, use the addition rule.',
            examples: [
              'Two coins: P(both heads) = P(H) × P(H) = 1/2 × 1/2 = 1/4',
              'Rolling die: P(1 or 2) = P(1) + P(2) = 1/6 + 1/6 = 1/3',
              'Cards: P(King or Heart) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13'
            ],
            keyFormulas: [
              'Independent events: P(A AND B) = P(A) × P(B)',
              'Mutually exclusive: P(A OR B) = P(A) + P(B)',
              'General addition: P(A OR B) = P(A) + P(B) - P(A AND B)'
            ]
          },
          {
            title: 'Tree Diagrams',
            content: 'Tree diagrams visually represent sequential events and their probabilities. Each branch shows a possible outcome with its probability. To find the probability of a complete path, multiply the probabilities along the branches. Tree diagrams are especially useful for conditional probability problems.',
            examples: [
              'Drawing two balls without replacement: first branch shows P(red) = 3/10',
              'Second branch from red shows P(red|first red) = 2/9',
              'P(both red) = 3/10 × 2/9 = 6/90 = 1/15'
            ],
            keyFormulas: [
              'Multiply along branches for path probability',
              'Add path probabilities for OR outcomes',
              'All branches from a point must sum to 1'
            ]
          },
          {
            title: 'Conditional Probability',
            content: 'Conditional probability is the probability of event A occurring given that event B has already occurred. This is written as P(A|B). Conditional probability changes the sample space - we only consider outcomes where B has occurred.',
            examples: [
              'P(red card | face card drawn) = 6/12 = 1/2 (6 red face cards out of 12 face cards)',
              'P(six | even number rolled) = 1/3 (one six out of three even numbers: 2,4,6)',
              'Medical test: P(disease | positive test) depends on test accuracy and disease prevalence'
            ],
            keyFormulas: [
              'P(A|B) = P(A AND B) / P(B)',
              'P(B) ≠ 0 for conditional probability to be defined',
              'For independent events: P(A|B) = P(A)'
            ]
          },
          {
            title: 'Venn Diagrams',
            content: 'Venn diagrams use overlapping circles to show relationships between sets and events. The overlap represents elements common to both sets. Venn diagrams help visualize complex probability problems involving multiple events and their intersections.',
            examples: [
              '30 students: 18 like math, 15 like science, 8 like both',
              'Only math: 18 - 8 = 10 students',
              'Only science: 15 - 8 = 7 students',
              'Neither: 30 - 10 - 8 - 7 = 5 students'
            ],
            keyFormulas: [
              'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
              'n(A only) = n(A) - n(A ∩ B)',
              'Total = n(A only) + n(B only) + n(A ∩ B) + n(neither)'
            ]
          },
          {
            title: 'Independent vs Mutually Exclusive Events',
            content: 'Independent events: the outcome of one doesn\'t affect the other (coin flips). Mutually exclusive events: cannot happen at the same time (rolling 3 and 5 on one die). These concepts are often confused but are fundamentally different.',
            examples: [
              'Independent: successive coin flips, drawing with replacement',
              'Mutually exclusive: getting heads and tails on one flip',
              'Not mutually exclusive: being tall and being smart (can be both)',
              'Dependent: drawing cards without replacement'
            ],
            keyFormulas: [
              'Independent: P(A AND B) = P(A) × P(B)',
              'Mutually exclusive: P(A AND B) = 0',
              'Mutually exclusive: P(A OR B) = P(A) + P(B)'
            ]
          }
        ],
        commonMistakes: [
          'Confusing independent and mutually exclusive events',
          'Adding probabilities when should multiply (AND vs OR confusion)',
          'Forgetting to account for replacement in sampling problems',
          'Not updating probabilities in conditional probability',
          'Assuming events are independent when they\'re not',
          'Misreading tree diagram branches',
          'Not checking that probabilities sum to 1'
        ],
        realWorldApplications: [
          'Medicine: diagnostic test accuracy, treatment success rates',
          'Insurance: risk assessment, premium calculations',
          'Finance: investment risk, market probability',
          'Weather: forecasting probability, climate predictions',
          'Quality control: defect rates, manufacturing reliability',
          'Sports: game outcomes, player performance statistics',
          'Genetics: inheritance patterns, genetic disorders probability'
        ],
        practiceQuestions: [
          {
            question: 'A bag contains 5 red and 3 blue balls. Find P(red).',
            answer: '5/8',
            explanation: 'P(red) = number of red balls / total balls = 5 / (5+3) = 5/8',
            difficulty: 'Easy'
          },
          {
            question: 'Rolling two dice, find P(sum = 7).',
            answer: '1/6',
            explanation: 'Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total = 36. P = 6/36 = 1/6',
            difficulty: 'Easy'
          },
          {
            question: 'Two coins flipped. Find P(at least one head).',
            answer: '3/4',
            explanation: 'P(at least one head) = 1 - P(both tails) = 1 - (1/2 × 1/2) = 1 - 1/4 = 3/4',
            difficulty: 'Medium'
          },
          {
            question: 'Box has 4 red, 6 blue balls. Draw 2 without replacement. Find P(both red).',
            answer: '2/15',
            explanation: 'P(1st red) = 4/10, P(2nd red | 1st red) = 3/9. P(both red) = 4/10 × 3/9 = 12/90 = 2/15',
            difficulty: 'Medium'
          },
          {
            question: 'A test is 90% accurate. 2% of population has disease. If test positive, find P(has disease).',
            answer: '≈ 0.154',
            explanation: 'Using Bayes: P(D|+) = P(+|D)×P(D) / P(+) = (0.9×0.02) / (0.9×0.02 + 0.1×0.98) = 0.018/0.116 ≈ 0.154',
            difficulty: 'Hard'
          },
          {
            question: 'Events A and B: P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.1. Find P(A∪B).',
            answer: '0.6',
            explanation: 'P(A∪B) = P(A) + P(B) - P(A∩B) = 0.3 + 0.4 - 0.1 = 0.6',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Probability and statistics',
          'BBC Bitesize: Probability fundamentals',
          'Corbett Maths: Tree diagrams and conditional probability',
          'ExamSolutions: Probability problem solving',
          'Dr Frost Maths: Venn diagrams and set theory',
          'Mathcentre: Probability applications and theory'
        ]
      }
    },
    'problem-solving-and-exam-techniques': {
      title: 'Problem Solving and Exam Techniques',
      description: 'Develop advanced problem-solving strategies and master exam techniques for peak performance.',
      duration: '2-3 weeks',
      difficulty: 'All levels',
      prerequisites: ['All previous modules'],
      learningObjectives: [
        'Apply mathematical reasoning to complex problems',
        'Use systematic problem-solving strategies',
        'Master time management in exams',
        'Practice multi-step problems',
        'Develop exam confidence and technique',
        'Apply mathematics to real-world contexts'
      ],
      keyTopics: [
        'Problem-solving strategies',
        'Mathematical reasoning',
        'Multi-step problems',
        'Exam time management',
        'Past paper practice',
        'Real-world applications',
        'Mathematical communication'
      ],
      practiceAreas: [
        'Complex problem solving',
        'Exam paper practice',
        'Time management',
        'Mathematical reasoning',
        'Application problems'
      ],
      examTips: [
        'Read questions carefully',
        'Plan your approach',
        'Show all working',
        'Check answers',
        'Manage time effectively'
      ]
    }
  },
  // GCSE Physics
  2: {
    'forces-and-motion': {
      title: 'Forces and Motion',
      description: 'Understand forces, motion, and their relationships through Newton\'s laws and kinematic equations.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Basic mathematics', 'Vector concepts'],
      learningObjectives: [
        'Apply Newton\'s laws of motion',
        'Calculate speed, velocity, and acceleration',
        'Understand force diagrams and equilibrium',
        'Analyze motion using kinematic equations',
        'Apply conservation of momentum',
        'Understand friction and drag forces'
      ],
      keyTopics: [
        'Speed, velocity, and acceleration',
        'Distance-time and velocity-time graphs',
        'Newton\'s three laws of motion',
        'Force diagrams and resultant forces',
        'Momentum and impulse',
        'Circular motion',
        'Terminal velocity'
      ],
      practiceAreas: [
        'Graph analysis and interpretation',
        'Force calculations',
        'Motion equations',
        'Momentum problems',
        'Real-world applications'
      ],
      examTips: [
        'Draw clear force diagrams',
        'Use correct units throughout',
        'Practice graph sketching',
        'Learn motion equations',
        'Understand vector nature of forces'
      ],
      detailedContent: {
        introduction: 'Forces and Motion is fundamental to understanding how objects move and interact in our universe. This topic combines mathematical analysis with physical intuition to explain everything from walking to rocket launches. Newton\'s laws provide the framework for understanding motion, while kinematic equations allow us to make precise predictions about moving objects.',
        conceptExplanations: [
          {
            title: 'Speed, Velocity, and Acceleration',
            content: 'Speed is how fast an object moves (scalar), velocity includes direction (vector), and acceleration is the rate of change of velocity. Understanding the difference between these quantities is crucial for analyzing motion correctly.',
            examples: [
              'Speed: 30 m/s (no direction specified)',
              'Velocity: 30 m/s north (includes direction)',
              'Acceleration: 2 m/s² means velocity increases by 2 m/s every second',
              'Negative acceleration (deceleration): -3 m/s²'
            ],
            keyFormulas: [
              'Speed = distance / time',
              'Velocity = displacement / time',
              'Acceleration = change in velocity / time',
              'v = u + at (kinematic equation)'
            ]
          },
          {
            title: 'Newton\'s First Law (Law of Inertia)',
            content: 'An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force. This law defines inertia - the tendency of objects to resist changes in motion.',
            examples: [
              'A book on a table remains stationary (balanced forces)',
              'A hockey puck sliding on ice continues moving (minimal friction)',
              'Passengers jerk forward when a car brakes suddenly',
              'A satellite in space continues orbiting without fuel'
            ],
            keyFormulas: [
              'Net force = 0 → constant velocity (including zero)',
              'Unbalanced force → acceleration occurs',
              'Inertia depends on mass'
            ]
          },
          {
            title: 'Newton\'s Second Law (F = ma)',
            content: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This law quantifies the relationship between force, mass, and acceleration.',
            examples: [
              'F = ma: 10 N force on 2 kg mass gives 5 m/s² acceleration',
              'Same force on 5 kg mass gives 2 m/s² acceleration',
              'Weight = mg: 5 kg mass has weight 49 N (g = 9.8 m/s²)'
            ],
            keyFormulas: [
              'F = ma (force = mass × acceleration)',
              'Weight = mg (mass × gravitational field strength)',
              'Net force = ma (sum of all forces)'
            ]
          },
          {
            title: 'Newton\'s Third Law (Action-Reaction)',
            content: 'For every action force, there is an equal and opposite reaction force. These forces act on different objects and cannot cancel each other out. This law explains how we walk, how rockets work, and many everyday phenomena.',
            examples: [
              'Walking: foot pushes back on ground, ground pushes forward on foot',
              'Swimming: swimmer pushes water backward, water pushes swimmer forward',
              'Rocket propulsion: exhaust gases pushed down, rocket pushed up',
              'Book on table: book pushes down, table pushes up'
            ],
            keyFormulas: [
              'Action force = Reaction force (in magnitude)',
              'Forces act on different objects',
              'Forces are opposite in direction'
            ]
          },
          {
            title: 'Momentum and Conservation',
            content: 'Momentum is the product of mass and velocity. In isolated systems, total momentum is conserved during collisions and interactions. This principle is fundamental to understanding crashes, explosions, and particle physics.',
            examples: [
              'Momentum = mv: 2 kg at 10 m/s has momentum 20 kg⋅m/s',
              'Collision: 5 kg at 4 m/s + 3 kg at 0 m/s = 8 kg at 2.5 m/s',
              'Explosion: stationary object splits into two moving parts',
              'Recoil: gun fires bullet forward, gun moves backward'
            ],
            keyFormulas: [
              'Momentum = mass × velocity (p = mv)',
              'Conservation: total momentum before = total momentum after',
              'Impulse = change in momentum = force × time'
            ]
          },
          {
            title: 'Motion Graphs and Equations',
            content: 'Distance-time and velocity-time graphs visualize motion, while kinematic equations allow precise calculations. The gradient of distance-time graphs gives velocity; the gradient of velocity-time graphs gives acceleration.',
            examples: [
              'Straight line on d-t graph: constant velocity',
              'Curved line on d-t graph: changing velocity (acceleration)',
              'Horizontal line on v-t graph: constant velocity',
              'Sloped line on v-t graph: constant acceleration'
            ],
            keyFormulas: [
              'v = u + at',
              's = ut + ½at²',
              'v² = u² + 2as',
              's = (u + v)t / 2'
            ]
          }
        ],
        commonMistakes: [
          'Confusing speed and velocity - remember velocity includes direction',
          'Thinking heavier objects fall faster in vacuum (they don\'t)',
          'Forgetting that forces in Newton\'s third law act on different objects',
          'Not drawing complete force diagrams showing all forces',
          'Mixing up distance and displacement in calculations',
          'Assuming acceleration is always positive (it can be negative)',
          'Not using consistent units throughout calculations'
        ],
        realWorldApplications: [
          'Automotive safety: airbags, crumple zones, seatbelts use momentum principles',
          'Space exploration: rocket propulsion, orbital mechanics, gravitational assists',
          'Sports analysis: projectile motion in football, momentum in collisions',
          'Transportation: train braking distances, aircraft takeoff and landing',
          'Engineering: structural design, machinery operation, safety systems',
          'Medical physics: understanding forces in human movement and injury',
          'Renewable energy: wind turbine design, hydroelectric systems'
        ],
        practiceQuestions: [
          {
            question: 'A car accelerates from 0 to 20 m/s in 5 seconds. Calculate the acceleration.',
            answer: '4 m/s²',
            explanation: 'Acceleration = (v - u) / t = (20 - 0) / 5 = 4 m/s²',
            difficulty: 'Easy'
          },
          {
            question: 'Calculate the force needed to accelerate a 500 kg car at 2 m/s².',
            answer: '1000 N',
            explanation: 'F = ma = 500 kg × 2 m/s² = 1000 N',
            difficulty: 'Easy'
          },
          {
            question: 'A 3 kg object moving at 8 m/s collides with a stationary 2 kg object. If they stick together, find their final velocity.',
            answer: '4.8 m/s',
            explanation: 'Conservation of momentum: (3×8) + (2×0) = (3+2)×v, so 24 = 5v, v = 4.8 m/s',
            difficulty: 'Medium'
          },
          {
            question: 'A ball is thrown upward with initial velocity 15 m/s. How high does it go? (g = 10 m/s²)',
            answer: '11.25 m',
            explanation: 'At maximum height, v = 0. Using v² = u² + 2as: 0 = 15² + 2(-10)s, so s = 225/20 = 11.25 m',
            difficulty: 'Medium'
          },
          {
            question: 'A 1200 kg car traveling at 25 m/s brakes and stops in 50 m. Calculate the braking force.',
            answer: '3750 N',
            explanation: 'First find acceleration: v² = u² + 2as, 0 = 25² + 2a(50), a = -6.25 m/s². Then F = ma = 1200 × 6.25 = 7500 N braking force',
            difficulty: 'Hard'
          },
          {
            question: 'Two objects with masses 4 kg and 6 kg approach each other at 3 m/s and 2 m/s respectively. Find their velocities after a perfectly elastic collision.',
            answer: 'v₁ = -2.2 m/s, v₂ = 2.8 m/s',
            explanation: 'Use conservation of momentum and energy for elastic collision. Complex calculation involving simultaneous equations.',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Classical mechanics and Newton\'s laws',
          'BBC Bitesize: Forces and motion fundamentals',
          'Physics Classroom: Motion graphs and kinematics',
          'Isaac Physics: Advanced mechanics problems',
          'Crash Course Physics: Motion and forces series'
        ]
      }
    },
    'energy-and-power': {
      title: 'Energy and Power',
      description: 'Explore different forms of energy, conservation laws, and power calculations.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Basic mathematics', 'Forces and Motion'],
      learningObjectives: [
        'Identify different forms of energy',
        'Apply conservation of energy principles',
        'Calculate work done and power',
        'Understand energy transfers and efficiency',
        'Analyze energy in various systems',
        'Apply energy concepts to real situations'
      ],
      keyTopics: [
        'Kinetic and potential energy',
        'Work done and power',
        'Conservation of energy',
        'Energy transfers and stores',
        'Efficiency calculations',
        'Renewable and non-renewable energy',
        'Energy resources'
      ],
      practiceAreas: [
        'Energy calculations',
        'Efficiency problems',
        'Energy transfer diagrams',
        'Power calculations',
        'Real-world energy systems'
      ],
      examTips: [
        'Learn energy formulas',
        'Practice unit conversions',
        'Draw energy transfer diagrams',
        'Understand efficiency concepts',
        'Apply conservation principles'
      ],
      detailedContent: {
        introduction: 'Energy is the ability to do work and is fundamental to everything that happens in the universe. Understanding energy helps explain how machines work, why we need food, how power stations operate, and why energy conservation is crucial for our planet. Energy cannot be created or destroyed, only transferred or transformed from one form to another.',
        conceptExplanations: [
          {
            title: 'Kinetic Energy',
            content: 'Kinetic energy is the energy an object has due to its motion. It depends on both mass and velocity, with velocity having a greater effect because it\'s squared in the formula. All moving objects possess kinetic energy.',
            examples: [
              'Car moving at 20 m/s: KE = ½mv² = ½ × 1000 × 20² = 200,000 J',
              'Running person (70 kg at 5 m/s): KE = ½ × 70 × 25 = 875 J',
              'Bullet (0.01 kg at 300 m/s): KE = ½ × 0.01 × 90,000 = 450 J'
            ],
            keyFormulas: [
              'KE = ½mv² (kinetic energy)',
              'Doubling speed quadruples kinetic energy',
              'Doubling mass doubles kinetic energy'
            ]
          },
          {
            title: 'Gravitational Potential Energy',
            content: 'Gravitational potential energy is stored energy due to position in a gravitational field. Objects gain GPE when lifted against gravity and lose it when falling. This energy can be converted to kinetic energy.',
            examples: [
              'Book (2 kg) on 3 m shelf: GPE = mgh = 2 × 9.8 × 3 = 58.8 J',
              'Water in reservoir: high GPE converted to electricity in hydroelectric plants',
              'Roller coaster at top of hill: maximum GPE, zero KE'
            ],
            keyFormulas: [
              'GPE = mgh (gravitational potential energy)',
              'g = 9.8 m/s² (gravitational field strength on Earth)',
              'Change in GPE = mg × change in height'
            ]
          },
          {
            title: 'Work Done and Power',
            content: 'Work is done when a force moves an object through a distance. Power is the rate of doing work or transferring energy. Understanding these concepts helps analyze machines, engines, and human performance.',
            examples: [
              'Lifting 50 N weight 2 m: Work = F × d = 50 × 2 = 100 J',
              'Car engine: 60 kW power means 60,000 J of energy per second',
              'Light bulb: 60 W means 60 J of electrical energy per second'
            ],
            keyFormulas: [
              'Work done = Force × distance (W = Fd)',
              'Power = Work done / time (P = W/t)',
              'Power = Energy transferred / time'
            ]
          },
          {
            title: 'Conservation of Energy',
            content: 'Energy cannot be created or destroyed, only transferred from one form to another. The total energy in a closed system remains constant. This principle is fundamental to physics and helps solve many problems.',
            examples: [
              'Pendulum: KE ↔ GPE conversion at different positions',
              'Falling object: GPE decreases, KE increases, total energy constant',
              'Burning fuel: chemical energy → thermal energy → kinetic energy'
            ],
            keyFormulas: [
              'Total energy before = Total energy after',
              'Energy lost = Energy gained (in transfers)',
              'KE + GPE = constant (in conservative systems)'
            ]
          },
          {
            title: 'Efficiency and Energy Transfers',
            content: 'Efficiency measures how much useful energy output you get from energy input. No machine is 100% efficient due to energy losses, usually as heat. Understanding efficiency helps design better machines and systems.',
            examples: [
              'Car engine: 30% efficient (70% lost as heat)',
              'LED bulb: 80% efficient (20% lost as heat)',
              'Human muscle: 25% efficient (75% lost as heat)'
            ],
            keyFormulas: [
              'Efficiency = (useful energy output / total energy input) × 100%',
              'Efficiency = (useful power output / total power input) × 100%',
              'Energy wasted = Total energy input - Useful energy output'
            ]
          },
          {
            title: 'Energy Resources and Sustainability',
            content: 'Energy resources are classified as renewable (constantly replenished) or non-renewable (finite supplies). Understanding different energy sources helps make informed decisions about sustainable energy use.',
            examples: [
              'Renewable: solar, wind, hydroelectric, geothermal, biomass',
              'Non-renewable: coal, oil, natural gas, nuclear fuel',
              'Energy storage: batteries, pumped storage, compressed air'
            ],
            keyFormulas: [
              'Solar power = Solar irradiance × Area × Efficiency',
              'Wind power ∝ Air density × Area × (Wind speed)³',
              'Hydroelectric power = ρ × g × Q × h × efficiency'
            ]
          }
        ],
        commonMistakes: [
          'Confusing energy and power - energy is measured in joules, power in watts',
          'Forgetting to square velocity in kinetic energy calculations',
          'Not converting units consistently (mixing kg, g, m, cm)',
          'Thinking efficiency can be greater than 100%',
          'Not accounting for all energy forms in conservation problems',
          'Confusing work done with distance traveled',
          'Mixing up renewable and non-renewable energy sources'
        ],
        realWorldApplications: [
          'Renewable energy: solar panels, wind turbines, hydroelectric dams',
          'Transportation: fuel efficiency, electric vehicles, hybrid systems',
          'Building design: insulation, energy-efficient appliances, smart systems',
          'Sports science: analyzing athlete performance and energy expenditure',
          'Space exploration: gravitational assists, solar power systems',
          'Medical devices: pacemakers, defibrillators, imaging equipment',
          'Industrial processes: manufacturing efficiency, waste heat recovery'
        ],
        practiceQuestions: [
          {
            question: 'Calculate the kinetic energy of a 1500 kg car traveling at 25 m/s.',
            answer: '468,750 J',
            explanation: 'KE = ½mv² = ½ × 1500 × 25² = ½ × 1500 × 625 = 468,750 J',
            difficulty: 'Easy'
          },
          {
            question: 'A 2 kg object is lifted 5 m high. Calculate its gravitational potential energy.',
            answer: '98 J',
            explanation: 'GPE = mgh = 2 × 9.8 × 5 = 98 J',
            difficulty: 'Easy'
          },
          {
            question: 'A motor does 12,000 J of work in 20 seconds. Calculate its power output.',
            answer: '600 W',
            explanation: 'Power = Work done / time = 12,000 J / 20 s = 600 W',
            difficulty: 'Medium'
          },
          {
            question: 'A machine uses 500 J of electrical energy to lift a 10 kg object 4 m high. Calculate its efficiency.',
            answer: '78.4%',
            explanation: 'Useful energy = mgh = 10 × 9.8 × 4 = 392 J. Efficiency = (392/500) × 100% = 78.4%',
            difficulty: 'Medium'
          },
          {
            question: 'A 0.5 kg ball is dropped from 20 m height. Find its speed just before hitting the ground.',
            answer: '19.8 m/s',
            explanation: 'Using energy conservation: GPE = KE, so mgh = ½mv². Cancel m: gh = ½v², so v = √(2gh) = √(2×9.8×20) = 19.8 m/s',
            difficulty: 'Hard'
          },
          {
            question: 'A 60 kg person runs up stairs gaining 3 m height in 5 seconds. Calculate their power output.',
            answer: '352.8 W',
            explanation: 'Work done = mgh = 60 × 9.8 × 3 = 1764 J. Power = Work/time = 1764/5 = 352.8 W',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Energy and energy conservation',
          'BBC Bitesize: Energy, work and power',
          'Physics Classroom: Energy concepts and calculations',
          'Isaac Physics: Energy and power problems',
          'National Geographic: Renewable energy sources'
        ]
      }
    },
    'waves-and-electromagnetic-spectrum': {
      title: 'Waves and Electromagnetic Spectrum',
      description: 'Study wave properties, electromagnetic spectrum, and wave applications.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Basic mathematics'],
      learningObjectives: [
        'Understand wave properties and behavior',
        'Apply wave equation calculations',
        'Explore electromagnetic spectrum',
        'Understand reflection, refraction, diffraction',
        'Study sound waves and their properties',
        'Apply wave concepts to technology'
      ],
      keyTopics: [
        'Wave properties (frequency, wavelength, amplitude)',
        'Wave equation: v = fλ',
        'Electromagnetic spectrum',
        'Reflection and refraction',
        'Diffraction and interference',
        'Sound waves and hearing',
        'Wave applications in technology'
      ],
      practiceAreas: [
        'Wave calculations',
        'Electromagnetic spectrum problems',
        'Wave behavior analysis',
        'Sound wave properties',
        'Technology applications'
      ],
      examTips: [
        'Learn wave equation',
        'Practice frequency calculations',
        'Understand wave behaviors',
        'Know EM spectrum order',
        'Draw clear wave diagrams'
      ],
      detailedContent: {
        introduction: 'Waves are disturbances that transfer energy without transferring matter. They are fundamental to understanding light, sound, and electromagnetic radiation that surrounds us every day.',
        conceptExplanations: [
          {
            title: 'Wave Properties and Characteristics',
            content: 'All waves share fundamental properties: amplitude (maximum displacement), wavelength (distance between identical points), frequency (waves per second), and period (time for one complete wave). These properties determine how waves behave and interact.',
            keyFormulas: [
              'v = fλ (wave speed = frequency × wavelength)',
              'f = 1/T (frequency = 1/period)',
              'T = 1/f (period = 1/frequency)'
            ],
            examples: [
              'Sound waves: frequency determines pitch, amplitude determines loudness',
              'Water waves: wavelength is distance between wave crests',
              'Light waves: frequency determines color, amplitude determines brightness'
            ]
          },
          {
            title: 'Electromagnetic Spectrum',
            content: 'The electromagnetic spectrum encompasses all electromagnetic radiation from radio waves to gamma rays. All EM waves travel at the speed of light in vacuum (3×10⁸ m/s) but have different frequencies and wavelengths.',
            keyFormulas: [
              'c = fλ (speed of light = frequency × wavelength)',
              'E = hf (energy = Planck constant × frequency)'
            ],
            examples: [
              'Radio waves: longest wavelength, lowest frequency, used for communication',
              'Visible light: small portion humans can see, wavelength ~400-700nm',
              'X-rays: high frequency, high energy, penetrate soft tissue',
              'Gamma rays: highest frequency, most energetic, from nuclear decay'
            ]
          },
          {
            title: 'Wave Behaviors: Reflection, Refraction, and Diffraction',
            content: 'Waves exhibit characteristic behaviors when encountering boundaries or obstacles. Reflection occurs when waves bounce off surfaces, refraction when they change speed entering new materials, and diffraction when they bend around obstacles.',
            keyFormulas: [
              'Angle of incidence = Angle of reflection',
              'n₁sin θ₁ = n₂sin θ₂ (Snell\'s law for refraction)'
            ],
            examples: [
              'Light reflection in mirrors follows law of reflection',
              'Light refraction in glass prisms separates white light into colors',
              'Sound diffraction allows hearing around corners',
              'Water waves diffract through harbor entrances'
            ]
          },
          {
            title: 'Sound Waves and Hearing',
            content: 'Sound waves are longitudinal mechanical waves that require a medium to travel. They consist of compressions and rarefactions moving through air, liquids, or solids. Human hearing detects frequencies from ~20 Hz to 20,000 Hz.',
            keyFormulas: [
              'v = 343 m/s (speed of sound in air at 20°C)',
              'Intensity ∝ (amplitude)²'
            ],
            examples: [
              'Musical notes: higher frequency = higher pitch',
              'Ultrasound: frequencies above human hearing, used in medical imaging',
              'Echolocation: bats and dolphins use reflected sound waves',
              'Noise pollution: high amplitude sound waves can damage hearing'
            ]
          },
          {
            title: 'Wave Applications in Technology',
            content: 'Wave principles enable countless technologies from communication to medical imaging. Understanding wave behavior allows engineers to design systems that manipulate electromagnetic and sound waves for specific purposes.',
            examples: [
              'Mobile phones: use radio waves for communication',
              'Optical fibers: use total internal reflection for data transmission',
              'Medical ultrasound: uses sound wave reflection for imaging',
              'Radar: uses radio wave reflection to detect objects',
              'Microwave ovens: use microwave radiation to heat food',
              'Night vision: detects infrared radiation from warm objects'
            ]
          }
        ],
        commonMistakes: [
          'Confusing wave speed with frequency - they are related but different',
          'Thinking waves carry matter - they transfer energy without matter transfer',
          'Mixing up wavelength and amplitude measurements',
          'Forgetting that EM waves don\'t need a medium unlike sound waves',
          'Not converting units correctly in wave calculations',
          'Confusing longitudinal and transverse wave types',
          'Assuming all waves behave identically regardless of type'
        ],
        realWorldApplications: [
          'Communication technology: radio, TV, mobile phones, WiFi, Bluetooth',
          'Medical imaging: X-rays, ultrasound, MRI, CT scans',
          'Navigation systems: GPS satellites, radar, sonar',
          'Entertainment: music, television, virtual reality, 3D movies',
          'Scientific research: radio telescopes, spectroscopy, laser interferometry',
          'Security systems: metal detectors, body scanners, motion sensors',
          'Energy applications: solar panels, microwave power transmission'
        ],
        practiceQuestions: [
          {
            question: 'Calculate the frequency of a wave with wavelength 2 m traveling at 10 m/s.',
            answer: '5 Hz',
            explanation: 'Using v = fλ, rearrange to f = v/λ = 10/2 = 5 Hz',
            difficulty: 'Easy'
          },
          {
            question: 'What is the wavelength of red light with frequency 4.3 × 10¹⁴ Hz?',
            answer: '7.0 × 10⁻⁷ m',
            explanation: 'Using c = fλ, λ = c/f = (3×10⁸)/(4.3×10¹⁴) = 7.0×10⁻⁷ m = 700 nm',
            difficulty: 'Medium'
          },
          {
            question: 'A sound wave travels 1020 m in 3 seconds. Calculate its speed and compare to typical sound speed.',
            answer: '340 m/s, very close to typical sound speed in air',
            explanation: 'Speed = distance/time = 1020/3 = 340 m/s. This matches typical sound speed in air (343 m/s at 20°C)',
            difficulty: 'Medium'
          },
          {
            question: 'Which has higher energy: blue light (λ = 450 nm) or red light (λ = 700 nm)?',
            answer: 'Blue light has higher energy',
            explanation: 'Energy E = hf = hc/λ. Since blue has shorter wavelength, it has higher frequency and therefore higher energy',
            difficulty: 'Hard'
          },
          {
            question: 'Calculate the period of a wave with frequency 50 Hz.',
            answer: '0.02 s',
            explanation: 'Period T = 1/f = 1/50 = 0.02 s. This means one complete wave cycle takes 0.02 seconds',
            difficulty: 'Easy'
          },
          {
            question: 'Explain why we can hear around corners but not see around corners.',
            answer: 'Sound diffracts more because its wavelength is larger relative to typical obstacles',
            explanation: 'Diffraction is significant when wavelength is comparable to obstacle size. Sound waves (~1 m) are similar to building sizes, while light waves (~500 nm) are much smaller',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Introduction to waves and electromagnetic spectrum',
          'BBC Bitesize: Waves and electromagnetic radiation',
          'Physics Classroom: Wave properties and behaviors',
          'NASA: Tour of the electromagnetic spectrum',
          'Institute of Physics: Wave phenomena'
        ]
      }
    },
    'electricity-and-magnetism': {
      title: 'Electricity and Magnetism',
      description: 'Master electrical circuits, magnetism, and electromagnetic induction.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Basic mathematics', 'Energy concepts'],
      learningObjectives: [
        'Analyze electrical circuits using Ohm\'s law',
        'Calculate electrical power and energy',
        'Understand magnetic fields and forces',
        'Apply electromagnetic induction',
        'Work with transformers and generators',
        'Apply electrical safety principles'
      ],
      keyTopics: [
        'Current, voltage, and resistance',
        'Ohm\'s law and electrical power',
        'Series and parallel circuits',
        'Magnetic fields and forces',
        'Electromagnetic induction',
        'Transformers and generators',
        'Electrical safety'
      ],
      practiceAreas: [
        'Circuit analysis',
        'Electrical calculations',
        'Magnetic field problems',
        'Transformer calculations',
        'Safety applications'
      ],
      examTips: [
        'Learn electrical formulas',
        'Practice circuit diagrams',
        'Understand power calculations',
        'Know magnetic field rules',
        'Apply safety principles'
      ],
      detailedContent: {
        introduction: 'Electricity and magnetism are intimately connected phenomena that form the foundation of modern technology. Understanding electrical circuits and magnetic fields enables us to harness these forces for countless applications.',
        conceptExplanations: [
          {
            title: 'Current, Voltage, and Resistance',
            content: 'Electric current is the flow of charge carriers (usually electrons) through a conductor. Voltage is the electrical potential difference that drives current flow. Resistance opposes current flow and converts electrical energy to heat.',
            keyFormulas: [
              'V = IR (Ohm\'s law: Voltage = Current × Resistance)',
              'I = Q/t (Current = Charge / time)',
              'R = ρL/A (Resistance = resistivity × length / area)'
            ],
            examples: [
              'Household wiring: 230V mains voltage drives current through appliances',
              'LED circuits: low voltage (3V) with current-limiting resistors',
              'Car batteries: 12V system provides current for starter motor and lights',
              'Phone chargers: convert 230V AC to 5V DC for safe device charging'
            ]
          },
          {
            title: 'Electrical Power and Energy',
            content: 'Electrical power is the rate at which electrical energy is transferred or converted. Power calculations help determine energy costs and safety requirements in electrical systems.',
            keyFormulas: [
              'P = VI (Power = Voltage × Current)',
              'P = I²R (Power = Current² × Resistance)',
              'P = V²/R (Power = Voltage² / Resistance)',
              'E = Pt (Energy = Power × time)'
            ],
            examples: [
              '100W light bulb: converts 100J of electrical energy per second to light and heat',
              'Electric kettle: 3kW power rating heats water quickly',
              'Phone battery: 3000mAh at 3.7V stores about 40kJ of energy',
              'Electric car: might use 20kWh for 100km journey'
            ]
          },
          {
            title: 'Series and Parallel Circuits',
            content: 'Components can be connected in series (single path) or parallel (multiple paths). Each configuration has distinct properties for current flow, voltage distribution, and total resistance.',
            keyFormulas: [
              'Series: Rtotal = R₁ + R₂ + R₃...',
              'Parallel: 1/Rtotal = 1/R₁ + 1/R₂ + 1/R₃...',
              'Series: Isame everywhere, Vtotal = V₁ + V₂ + V₃',
              'Parallel: Vsame everywhere, Itotal = I₁ + I₂ + I₃'
            ],
            examples: [
              'Christmas lights: older sets in series (one fails, all go out)',
              'Household circuits: parallel wiring (each device independent)',
              'Car headlights: parallel connection ensures both work if one fails',
              'Battery packs: series for higher voltage, parallel for longer life'
            ]
          },
          {
            title: 'Magnetic Fields and Forces',
            content: 'Magnetic fields exert forces on moving charges and current-carrying conductors. This relationship between electricity and magnetism enables motors, generators, and many other devices.',
            keyFormulas: [
              'F = BIL (Force on conductor = Magnetic field × Current × Length)',
              'F = qvB (Force on moving charge = charge × velocity × magnetic field)',
              'B = μ₀I/(2πr) (Magnetic field around straight wire)'
            ],
            examples: [
              'Electric motors: magnetic fields create rotational motion',
              'MRI machines: strong magnetic fields align atomic nuclei for imaging',
              'Compass needles: align with Earth\'s magnetic field',
              'Particle accelerators: magnetic fields bend charged particle paths'
            ]
          },
          {
            title: 'Electromagnetic Induction',
            content: 'Changing magnetic fields induce electrical currents in conductors. This principle enables generators, transformers, and wireless charging systems.',
            keyFormulas: [
              'ε = -dΦ/dt (Faraday\'s law: induced EMF = -rate of flux change)',
              'ε = BLv (Induced EMF = magnetic field × length × velocity)',
              'Φ = BA (Magnetic flux = magnetic field × area)'
            ],
            examples: [
              'Power generators: rotating coils in magnetic fields produce electricity',
              'Transformers: changing current in primary coil induces current in secondary',
              'Induction cooktops: changing magnetic fields heat metal cookware',
              'Electric guitar pickups: vibrating strings change magnetic flux'
            ]
          },
          {
            title: 'Transformers and Electrical Safety',
            content: 'Transformers change voltage levels efficiently using electromagnetic induction. Understanding electrical safety prevents accidents and equipment damage.',
            keyFormulas: [
              'Vs/Vp = Ns/Np (transformer voltage ratio = turns ratio)',
              'VpIp = VsIs (ideal transformer: power in = power out)',
              'Safety: Earth wire, fuses, circuit breakers'
            ],
            examples: [
              'Power distribution: step-up transformers for transmission, step-down for homes',
              'Phone chargers: transformers reduce mains voltage to safe levels',
              'RCD devices: detect current imbalances and cut power for safety',
              'Insulation: prevents accidental contact with live conductors'
            ]
          }
        ],
        commonMistakes: [
          'Confusing current and voltage - voltage drives current, but they\'re different',
          'Adding resistances incorrectly in parallel circuits',
          'Forgetting that power depends on both voltage and current',
          'Mixing up magnetic field direction with force direction',
          'Not considering safety earthing in electrical installations',
          'Assuming ideal conditions (no energy losses) in real circuits',
          'Confusing AC and DC properties in calculations'
        ],
        realWorldApplications: [
          'Power generation and distribution: generators, transformers, power grids',
          'Electric vehicles: motors, regenerative braking, battery management',
          'Home appliances: motors, heating elements, electronic controls',
          'Medical devices: MRI scanners, defibrillators, pacemakers',
          'Communication systems: antennas, transmission lines, signal processing',
          'Industrial automation: servo motors, magnetic separators, induction heating',
          'Renewable energy: wind turbines, solar inverters, energy storage'
        ],
        practiceQuestions: [
          {
            question: 'Calculate the current through a 220Ω resistor connected to a 12V battery.',
            answer: '0.055 A',
            explanation: 'Using Ohm\'s law: I = V/R = 12/220 = 0.055 A = 55 mA',
            difficulty: 'Easy'
          },
          {
            question: 'A 100W bulb operates at 230V. Calculate its resistance.',
            answer: '529Ω',
            explanation: 'From P = V²/R, rearrange to R = V²/P = 230²/100 = 52,900/100 = 529Ω',
            difficulty: 'Medium'
          },
          {
            question: 'Two 10Ω resistors are connected in parallel. What is the total resistance?',
            answer: '5Ω',
            explanation: '1/Rtotal = 1/R₁ + 1/R₂ = 1/10 + 1/10 = 2/10, so Rtotal = 10/2 = 5Ω',
            difficulty: 'Medium'
          },
          {
            question: 'A transformer has 200 turns on primary and 50 turns on secondary. If primary voltage is 240V, find secondary voltage.',
            answer: '60V',
            explanation: 'Vs/Vp = Ns/Np, so Vs = Vp × (Ns/Np) = 240 × (50/200) = 240 × 0.25 = 60V',
            difficulty: 'Medium'
          },
          {
            question: 'Calculate the force on a 0.5m wire carrying 2A current in a 0.1T magnetic field (perpendicular).',
            answer: '0.1 N',
            explanation: 'F = BIL = 0.1 × 2 × 0.5 = 0.1 N',
            difficulty: 'Hard'
          },
          {
            question: 'An electric heater uses 3kW for 2 hours. Calculate energy consumed and cost at 15p per kWh.',
            answer: '6 kWh, 90p',
            explanation: 'Energy = Power × time = 3kW × 2h = 6kWh. Cost = 6 × 15p = 90p',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Circuits and Ohm\'s law',
          'BBC Bitesize: Electricity and magnetism',
          'Physics Classroom: Electric circuits and magnetic fields',
          'IET: Electrical installation safety guidelines',
          'OpenStax: College Physics - Electricity and Magnetism'
        ]
      }
    },
    'particle-physics-and-atomic-structure': {
      title: 'Particle Physics and Atomic Structure',
      description: 'Explore atomic structure, radioactivity, and fundamental particles.',
      duration: '3-4 weeks',
      difficulty: 'Higher',
      prerequisites: ['Basic atomic concepts'],
      learningObjectives: [
        'Understand atomic structure and particles',
        'Study radioactive decay processes',
        'Calculate half-life and decay',
        'Explore fundamental particles',
        'Understand nuclear reactions',
        'Apply nuclear physics concepts'
      ],
      keyTopics: [
        'Atomic structure (protons, neutrons, electrons)',
        'Isotopes and radioactivity',
        'Alpha, beta, and gamma radiation',
        'Half-life calculations',
        'Nuclear fission and fusion',
        'Fundamental particles',
        'Particle accelerators'
      ],
      practiceAreas: [
        'Atomic structure problems',
        'Radioactivity calculations',
        'Half-life problems',
        'Nuclear reaction analysis',
        'Particle physics concepts'
      ],
      examTips: [
        'Learn radiation properties',
        'Practice half-life calculations',
        'Understand atomic notation',
        'Know particle properties',
        'Apply nuclear concepts'
      ],
      detailedContent: {
        introduction: 'Particle physics explores the fundamental building blocks of matter and the forces that govern their interactions. Understanding atomic structure and radioactivity reveals the microscopic world that shapes our universe.',
        conceptExplanations: [
          {
            title: 'Atomic Structure and Subatomic Particles',
            content: 'Atoms consist of a tiny, dense nucleus containing protons and neutrons, surrounded by electrons in energy levels. The number of protons defines the element, while electron arrangements determine chemical properties.',
            keyFormulas: [
              'Mass number A = protons + neutrons',
              'Atomic number Z = number of protons',
              'Number of neutrons = A - Z',
              'Electric charge = +Ze for nucleus, -e for each electron'
            ],
            examples: [
              'Carbon-12: 6 protons, 6 neutrons, 6 electrons (neutral atom)',
              'Sodium ion Na⁺: 11 protons, 12 neutrons, 10 electrons (lost 1 electron)',
              'Uranium-235: 92 protons, 143 neutrons (fissionable isotope)',
              'Hydrogen: simplest atom with 1 proton, 0 neutrons, 1 electron'
            ]
          },
          {
            title: 'Isotopes and Radioactive Decay',
            content: 'Isotopes are atoms with the same number of protons but different numbers of neutrons. Unstable isotopes undergo radioactive decay, emitting particles and energy to reach stable configurations.',
            keyFormulas: [
              'N(t) = N₀e^(-λt) (exponential decay law)',
              'Half-life: t₁/₂ = ln(2)/λ',
              'Activity A = λN (decays per second)',
              'α decay: ⁴₂He nucleus, β⁻ decay: electron, γ decay: photon'
            ],
            examples: [
              'Carbon-14 dating: measures age of organic materials (half-life 5,730 years)',
              'Uranium-238 decay chain: ends in stable lead-206 after multiple steps',
              'Technetium-99m: medical imaging isotope (half-life 6 hours)',
              'Radon gas: naturally occurring radioactive gas in buildings'
            ]
          },
          {
            title: 'Types of Radiation and Their Properties',
            content: 'Radioactive decay produces three main types of radiation: alpha particles (helium nuclei), beta particles (electrons or positrons), and gamma rays (high-energy photons). Each has different penetrating power and ionizing ability.',
            keyFormulas: [
              'Alpha: ⁴₂He or ⁴₂α (low penetration, high ionization)',
              'Beta-minus: ⁰₋₁e or β⁻ (medium penetration)',
              'Beta-plus: ⁰₊₁e or β⁺ (positron emission)',
              'Gamma: ⁰₀γ (high penetration, low ionization)'
            ],
            examples: [
              'Alpha radiation: stopped by paper, dangerous if inhaled',
              'Beta radiation: stopped by aluminum foil, penetrates skin',
              'Gamma radiation: requires lead shielding, penetrates most materials',
              'Medical uses: gamma rays for sterilization, beta for cancer treatment'
            ]
          },
          {
            title: 'Half-Life and Radioactive Calculations',
            content: 'Half-life is the time required for half of a radioactive sample to decay. This concept allows prediction of radiation levels and is crucial for nuclear medicine, dating methods, and waste management.',
            keyFormulas: [
              'After n half-lives: N = N₀ × (1/2)ⁿ',
              'Percentage remaining = (1/2)ⁿ × 100%',
              'Activity decreases following same pattern as number of atoms'
            ],
            examples: [
              'Iodine-131: half-life 8 days, after 24 days only 1/8 remains',
              'Plutonium-239: half-life 24,000 years, long-term storage problem',
              'Fluorine-18: half-life 110 minutes, used in PET scans',
              'Cobalt-60: half-life 5.3 years, used in radiotherapy'
            ]
          },
          {
            title: 'Nuclear Fission and Fusion',
            content: 'Nuclear fission splits heavy nuclei into lighter fragments, releasing enormous energy. Nuclear fusion combines light nuclei to form heavier ones, powering stars and offering potential clean energy.',
            keyFormulas: [
              'E = mc² (mass-energy equivalence)',
              'Chain reaction: each fission triggers more fissions',
              'Critical mass: minimum mass for sustained reaction',
              'Binding energy per nucleon determines stability'
            ],
            examples: [
              'Nuclear power plants: controlled fission of uranium-235',
              'Nuclear weapons: uncontrolled chain reaction',
              'Sun\'s energy: hydrogen fusion to helium',
              'Future fusion reactors: deuterium + tritium → helium + neutron'
            ]
          },
          {
            title: 'Fundamental Particles and Forces',
            content: 'Matter consists of fundamental particles: quarks (building blocks of protons and neutrons) and leptons (including electrons and neutrinos). Four fundamental forces govern all interactions in the universe.',
            examples: [
              'Standard Model: describes all known fundamental particles',
              'Quarks: up and down quarks form protons and neutrons',
              'Leptons: electrons, muons, neutrinos and their properties',
              'Forces: electromagnetic, weak nuclear, strong nuclear, gravitational',
              'Particle accelerators: LHC discovers new particles like Higgs boson',
              'Antimatter: positrons, antiprotons annihilate with matter'
            ]
          }
        ],
        commonMistakes: [
          'Confusing atomic number with mass number',
          'Thinking electrons orbit like planets - they exist in probability clouds',
          'Assuming all radiation is equally dangerous - varies by type and energy',
          'Confusing half-life with total decay time',
          'Not understanding that isotopes have same chemical but different nuclear properties',
          'Mixing up fission and fusion processes',
          'Thinking radioactivity can be turned off or controlled at atomic level'
        ],
        realWorldApplications: [
          'Medical imaging: X-rays, CT scans, PET scans, nuclear medicine',
          'Cancer treatment: radiotherapy using focused radiation beams',
          'Archaeological dating: carbon-14 for organic materials, other isotopes for rocks',
          'Nuclear power: electricity generation from controlled fission',
          'Security: radiation detectors at airports and borders',
          'Industrial applications: thickness measurement, sterilization',
          'Research: particle accelerators probe fundamental nature of matter'
        ],
        practiceQuestions: [
          {
            question: 'An element has 17 protons and 20 neutrons. What is its mass number and atomic number?',
            answer: 'Mass number = 37, Atomic number = 17',
            explanation: 'Atomic number = number of protons = 17. Mass number = protons + neutrons = 17 + 20 = 37',
            difficulty: 'Easy'
          },
          {
            question: 'A radioactive sample has a half-life of 10 days. What fraction remains after 30 days?',
            answer: '1/8 or 12.5%',
            explanation: '30 days = 3 half-lives. After each half-life, half remains: 1 → 1/2 → 1/4 → 1/8',
            difficulty: 'Medium'
          },
          {
            question: 'What type of radiation is stopped by a sheet of paper?',
            answer: 'Alpha radiation',
            explanation: 'Alpha particles are large (helium nuclei) and have low penetrating power, easily stopped by paper',
            difficulty: 'Easy'
          },
          {
            question: 'Calculate the number of neutrons in Uranium-238.',
            answer: '146 neutrons',
            explanation: 'Uranium has atomic number 92 (92 protons). Mass number 238, so neutrons = 238 - 92 = 146',
            difficulty: 'Medium'
          },
          {
            question: 'A 100g sample of isotope with 6-hour half-life. How much remains after 18 hours?',
            answer: '12.5g',
            explanation: '18 hours = 3 half-lives. 100g → 50g → 25g → 12.5g',
            difficulty: 'Medium'
          },
          {
            question: 'Why is nuclear fusion considered cleaner than fission?',
            answer: 'Fusion produces less radioactive waste and uses abundant fuel',
            explanation: 'Fusion uses hydrogen isotopes (abundant), produces helium (stable), less long-lived radioactive waste than fission',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'CERN: Introduction to particle physics',
          'Khan Academy: Nuclear chemistry and radioactivity',
          'BBC Bitesize: Atomic structure and radioactivity',
          'National Nuclear Laboratory: Nuclear science basics',
          'Fermilab: Particle physics for students'
        ]
      }
    },
    'space-physics-and-earth-science': {
      title: 'Space Physics and Earth Science',
      description: 'Study planetary motion, stellar evolution, and Earth\'s place in the universe.',
      duration: '2-3 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Forces and Motion', 'Energy concepts'],
      learningObjectives: [
        'Understand gravitational forces and orbits',
        'Study stellar lifecycle and evolution',
        'Explore the solar system',
        'Understand cosmological concepts',
        'Apply physics to space exploration',
        'Study Earth\'s magnetic field'
      ],
      keyTopics: [
        'Gravitational forces and orbits',
        'Solar system structure',
        'Stellar lifecycle',
        'Big Bang theory',
        'Redshift and expanding universe',
        'Earth\'s magnetic field',
        'Space exploration'
      ],
      practiceAreas: [
        'Gravitational calculations',
        'Orbital mechanics',
        'Stellar evolution',
        'Cosmological concepts',
        'Space technology'
      ],
      examTips: [
        'Understand gravitational concepts',
        'Learn stellar lifecycle stages',
        'Know solar system facts',
        'Practice space calculations',
        'Apply physics principles'
      ],
      detailedContent: {
        introduction: 'Space physics applies fundamental physics principles to understand the cosmos, from planetary motion in our solar system to stellar evolution and the structure of the universe. Earth science connects our planet to these cosmic processes.',
        conceptExplanations: [
          {
            title: 'Gravitational Forces and Orbital Motion',
            content: 'Gravity governs the motion of celestial bodies, creating stable orbits around massive objects. Understanding gravitational principles explains planetary motion, satellite orbits, and tidal effects.',
            keyFormulas: [
              'F = GMm/r² (Newton\'s law of universal gravitation)',
              'g = GM/r² (gravitational field strength)',
              'v = √(GM/r) (orbital velocity for circular orbit)',
              'T² ∝ r³ (Kepler\'s third law)'
            ],
            examples: [
              'Earth\'s orbit: gravitational force from Sun provides centripetal force',
              'Satellite orbits: higher altitude = slower orbital speed, longer period',
              'Tidal forces: Moon\'s gravity creates high and low tides on Earth',
              'Geostationary satellites: orbit period matches Earth\'s rotation (24 hours)'
            ]
          },
          {
            title: 'Solar System Structure and Formation',
            content: 'Our solar system formed from a collapsing nebula 4.6 billion years ago. The arrangement of planets, moons, asteroids, and comets reflects the conditions during formation and subsequent evolution.',
            examples: [
              'Inner planets: rocky, dense (Mercury, Venus, Earth, Mars)',
              'Outer planets: gas giants with many moons (Jupiter, Saturn, Uranus, Neptune)',
              'Asteroid belt: rocky debris between Mars and Jupiter',
              'Kuiper belt: icy objects beyond Neptune including dwarf planets',
              'Oort cloud: source of long-period comets at solar system\'s edge',
              'Planet formation: accretion of material in protoplanetary disk'
            ]
          },
          {
            title: 'Stellar Lifecycle and Evolution',
            content: 'Stars form from collapsing gas clouds, shine by nuclear fusion, and end their lives in various ways depending on their mass. Understanding stellar evolution reveals the origin of chemical elements.',
            keyFormulas: [
              'Hydrogen fusion: 4H → He + energy',
              'Main sequence lifetime ∝ M/L ∝ 1/M³',
              'L ∝ M³ (mass-luminosity relation)',
              'Stefan-Boltzmann law: L = 4πR²σT⁴'
            ],
            examples: [
              'Star formation: gravitational collapse heats gas until fusion begins',
              'Main sequence: stars spend most life fusing hydrogen to helium',
              'Red giants: stars expand and cool as hydrogen fuel depletes',
              'White dwarfs: low-mass stars end as hot, dense stellar remnants',
              'Supernovae: massive stars explode, creating and dispersing heavy elements',
              'Neutron stars and black holes: extreme endpoints of massive stellar evolution'
            ]
          },
          {
            title: 'The Big Bang and Expanding Universe',
            content: 'The universe began with the Big Bang 13.8 billion years ago and has been expanding ever since. Evidence includes cosmic microwave background radiation, redshift of distant galaxies, and abundance of light elements.',
            keyFormulas: [
              'Hubble\'s law: v = H₀d (recession velocity ∝ distance)',
              'Redshift: z = (λ_observed - λ_emitted)/λ_emitted',
              'Age of universe ≈ 1/H₀'
            ],
            examples: [
              'Cosmic microwave background: afterglow of Big Bang, now cooled to 2.7K',
              'Redshift observations: distant galaxies moving away from us',
              'Nucleosynthesis: Big Bang produced hydrogen, helium, and lithium',
              'Galaxy formation: dark matter helped structure formation',
              'Dark energy: mysterious force accelerating cosmic expansion',
              'Observable universe: limited by speed of light and age of universe'
            ]
          },
          {
            title: 'Earth\'s Magnetic Field and Space Weather',
            content: 'Earth\'s magnetic field, generated by motion in the liquid iron core, protects us from harmful solar radiation and cosmic rays. Solar activity affects this magnetic environment and can impact technology.',
            examples: [
              'Magnetic field generation: convection in Earth\'s liquid outer core',
              'Van Allen radiation belts: trapped charged particles around Earth',
              'Aurora phenomena: solar particles interact with atmosphere at magnetic poles',
              'Solar wind: stream of charged particles from the Sun',
              'Magnetic storms: solar flares disrupt Earth\'s magnetic field',
              'Navigation: compasses align with magnetic field lines',
              'Satellite protection: magnetic field deflects harmful radiation'
            ]
          },
          {
            title: 'Space Exploration and Technology',
            content: 'Space exploration applies physics principles to overcome challenges of launch, navigation, and survival in space. Understanding orbital mechanics, life support, and radiation protection enables human and robotic missions.',
            examples: [
              'Rocket propulsion: Newton\'s third law enables spaceflight',
              'Escape velocity: minimum speed to overcome gravitational binding',
              'Gravitational assists: spacecraft use planetary gravity to change trajectory',
              'Orbital rendezvous: precise calculations for spacecraft docking',
              'Life support systems: oxygen generation, CO₂ removal, temperature control',
              'Radiation shielding: protection from cosmic rays and solar particles',
              'Space telescopes: observing universe without atmospheric interference'
            ]
          }
        ],
        commonMistakes: [
          'Thinking astronauts float because there\'s no gravity - they\'re in continuous free fall',
          'Confusing weight and mass - weight changes with gravity, mass doesn\'t',
          'Assuming stars are all the same size and temperature',
          'Thinking the Big Bang was an explosion in space - space itself expanded',
          'Confusing redshift with Doppler effect - cosmological redshift is due to space expansion',
          'Not understanding that light from distant objects shows the past',
          'Assuming Earth\'s magnetic field is perfectly aligned with rotation axis'
        ],
        realWorldApplications: [
          'Satellite technology: GPS navigation, weather forecasting, communications',
          'Space exploration: Mars rovers, International Space Station, lunar missions',
          'Astronomy research: space telescopes discover exoplanets and distant galaxies',
          'Climate monitoring: satellites track global warming and environmental changes',
          'Natural disaster prediction: satellite monitoring of earthquakes, hurricanes',
          'Navigation systems: magnetic compasses, GPS relies on satellite orbits',
          'Energy research: studying fusion in stars guides fusion power development'
        ],
        practiceQuestions: [
          {
            question: 'Calculate the gravitational field strength on the Moon\'s surface (mass = 7.3×10²² kg, radius = 1.7×10⁶ m).',
            answer: '1.6 N/kg',
            explanation: 'g = GM/r² = (6.67×10⁻¹¹ × 7.3×10²²)/(1.7×10⁶)² = 1.6 N/kg',
            difficulty: 'Medium'
          },
          {
            question: 'Why do geostationary satellites orbit at a specific altitude?',
            answer: 'They must have a 24-hour orbital period to match Earth\'s rotation',
            explanation: 'Orbital period depends on altitude. Only one altitude gives exactly 24 hours, allowing satellite to stay above same point on Earth',
            difficulty: 'Medium'
          },
          {
            question: 'What evidence supports the Big Bang theory?',
            answer: 'Cosmic microwave background, redshift of galaxies, abundance of light elements',
            explanation: 'These three key pieces of evidence all match predictions from Big Bang cosmology',
            difficulty: 'Hard'
          },
          {
            question: 'Why do we see auroras mainly at polar regions?',
            answer: 'Earth\'s magnetic field channels solar particles toward magnetic poles',
            explanation: 'Charged particles from solar wind follow magnetic field lines, which converge at magnetic poles',
            difficulty: 'Medium'
          },
          {
            question: 'A star is 100 times more massive than the Sun. How does its lifetime compare?',
            answer: 'About 1 million times shorter',
            explanation: 'Stellar lifetime ∝ 1/M³. If M = 100M_sun, then lifetime = 1/100³ = 1/1,000,000 of Sun\'s lifetime',
            difficulty: 'Hard'
          },
          {
            question: 'Why don\'t astronauts feel Earth\'s gravity on the ISS?',
            answer: 'They are in continuous free fall around Earth',
            explanation: 'ISS and astronauts are constantly falling toward Earth but moving fast enough horizontally to miss it',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'NASA: Solar system exploration and space science',
          'ESA: European Space Agency educational resources',
          'Khan Academy: Cosmology and astronomy',
          'BBC Sky at Night: Astronomy and space exploration',
          'Institute of Physics: Space physics resources'
        ]
      }
    }
  },
  // GCSE Chemistry
  3: {
    'atomic-structure-and-periodic-table': {
      title: 'Atomic Structure and Periodic Table',
      description: 'Master atomic theory, electron configuration, and periodic trends.',
      duration: '3-4 weeks',
      difficulty: 'Foundation',
      prerequisites: ['Basic mathematics'],
      learningObjectives: [
        'Understand atomic structure and subatomic particles',
        'Apply electron configuration principles',
        'Interpret the periodic table organization',
        'Predict element properties from position',
        'Calculate relative atomic mass',
        'Understand isotopes and ions'
      ],
      keyTopics: [
        'Protons, neutrons, and electrons',
        'Atomic number and mass number',
        'Electron shells and configuration',
        'Periodic table organization',
        'Groups and periods',
        'Isotopes and relative atomic mass',
        'Ion formation'
      ],
      practiceAreas: [
        'Atomic structure calculations',
        'Electron configuration practice',
        'Periodic table navigation',
        'Isotope problems',
        'Ion formation'
      ],
      examTips: [
        'Learn atomic notation',
        'Practice electron configurations',
        'Understand periodic trends',
        'Know group properties',
        'Calculate atomic masses'
      ],
      detailedContent: {
        introduction: 'Atomic structure forms the foundation of chemistry, explaining how elements differ and why they behave uniquely. The periodic table organizes this knowledge, revealing patterns that help predict chemical properties.',
        conceptExplanations: [
          {
            title: 'Subatomic Particles and Atomic Structure',
            content: 'Atoms consist of protons and neutrons in the nucleus, with electrons orbiting in shells. The number and arrangement of these particles determines an element\'s identity and chemical behavior.',
            keyFormulas: [
              'Atomic number (Z) = number of protons',
              'Mass number (A) = protons + neutrons',
              'Relative atomic mass = average mass of isotopes',
              'Number of electrons = number of protons (in neutral atoms)'
            ],
            examples: [
              'Hydrogen: 1 proton, 0 neutrons, 1 electron (simplest atom)',
              'Carbon: 6 protons, 6 neutrons, 6 electrons (forms 4 bonds)',
              'Chlorine: 17 protons, 18 neutrons, 17 electrons (forms 1 bond)',
              'Iron: 26 protons, 30 neutrons, 26 electrons (transition metal)'
            ]
          },
          {
            title: 'Electron Configuration and Shells',
            content: 'Electrons occupy specific energy levels (shells) around the nucleus. The outermost shell (valence shell) determines chemical bonding behavior and reactivity.',
            keyFormulas: [
              'Maximum electrons per shell: 2n² (where n = shell number)',
              'Shell 1: max 2 electrons, Shell 2: max 8 electrons, Shell 3: max 18 electrons',
              'Valence electrons = electrons in outermost shell'
            ],
            examples: [
              'Sodium (2,8,1): 1 valence electron, forms Na⁺ ion easily',
              'Chlorine (2,8,7): 7 valence electrons, gains 1 to form Cl⁻',
              'Neon (2,8): 8 valence electrons, stable noble gas configuration',
              'Magnesium (2,8,2): 2 valence electrons, forms Mg²⁺ ion'
            ]
          },
          {
            title: 'Periodic Table Organization and Trends',
            content: 'The periodic table arranges elements by atomic number, creating groups (columns) with similar properties and periods (rows) showing gradual changes across.',
            examples: [
              'Groups: elements with same number of valence electrons',
              'Group 1 (alkali metals): reactive metals, 1 valence electron',
              'Group 7 (halogens): reactive non-metals, 7 valence electrons',
              'Group 0 (noble gases): unreactive, complete outer shells',
              'Periods: atomic radius decreases, ionization energy increases across periods',
              'Metallic character: decreases across periods, increases down groups'
            ]
          },
          {
            title: 'Isotopes and Relative Atomic Mass',
            content: 'Isotopes are atoms of the same element with different numbers of neutrons. Relative atomic mass accounts for the abundance of different isotopes.',
            keyFormulas: [
              'Relative atomic mass = Σ(isotope mass × abundance)/100',
              'Isotope notation: ¹²C (mass number as superscript)',
              'All isotopes of an element have same chemical properties'
            ],
            examples: [
              'Carbon isotopes: ¹²C (98.9%), ¹³C (1.1%), ¹⁴C (trace, radioactive)',
              'Chlorine: ³⁵Cl (75%) and ³⁷Cl (25%) give relative atomic mass 35.5',
              'Uranium: ²³⁵U (0.7%) fissionable, ²³⁸U (99.3%) more stable',
              'Hydrogen isotopes: ¹H (protium), ²H (deuterium), ³H (tritium)'
            ]
          },
          {
            title: 'Ion Formation and Ionic Charges',
            content: 'Atoms form ions by gaining or losing electrons to achieve stable electron configurations, usually resembling the nearest noble gas.',
            keyFormulas: [
              'Cation: positive ion (lost electrons)',
              'Anion: negative ion (gained electrons)',
              'Ionic charge = protons - electrons'
            ],
            examples: [
              'Metal ions: Na⁺, Mg²⁺, Al³⁺ (lose electrons to form positive ions)',
              'Non-metal ions: Cl⁻, O²⁻, N³⁻ (gain electrons to form negative ions)',
              'Transition metals: can form multiple ions (Fe²⁺, Fe³⁺)',
              'Polyatomic ions: SO₄²⁻, NO₃⁻, NH₄⁺ (groups of atoms with charge)'
            ]
          },
          {
            title: 'Predicting Properties from Position',
            content: 'The periodic table allows prediction of element properties based on position, including bonding behavior, reactivity, and physical characteristics.',
            examples: [
              'Reactivity trends: Group 1 increases down group, Group 7 decreases down group',
              'Atomic radius: increases down groups, decreases across periods',
              'Ionization energy: decreases down groups, increases across periods',
              'Electronegativity: decreases down groups, increases across periods',
              'Melting/boiling points: complex trends based on bonding type',
              'Metallic character: strongest bottom-left, weakest top-right'
            ]
          }
        ],
        commonMistakes: [
          'Confusing atomic number with mass number',
          'Forgetting that electrons equal protons in neutral atoms',
          'Mixing up groups and periods on the periodic table',
          'Thinking all atoms of an element are identical (ignoring isotopes)',
          'Assuming electron shells fill completely before starting next shell',
          'Confusing ion charge with number of electrons gained/lost',
          'Not understanding that chemical properties depend on electron arrangement'
        ],
        realWorldApplications: [
          'Medical imaging: radioisotopes for scans and cancer treatment',
          'Materials science: understanding bonding predicts material properties',
          'Semiconductor industry: precise control of electron behavior in silicon',
          'Nuclear power: isotope separation for fuel enrichment',
          'Chemistry analysis: atomic spectroscopy identifies elements',
          'Pharmaceutical design: understanding how atoms interact to create drugs',
          'Environmental monitoring: detecting pollutants by atomic composition'
        ],
        practiceQuestions: [
          {
            question: 'An element has 11 protons and 12 neutrons. What is its atomic number and mass number?',
            answer: 'Atomic number = 11, Mass number = 23',
            explanation: 'Atomic number equals number of protons (11). Mass number = protons + neutrons = 11 + 12 = 23',
            difficulty: 'Easy'
          },
          {
            question: 'Write the electron configuration for chlorine (atomic number 17).',
            answer: '2,8,7',
            explanation: 'Chlorine has 17 electrons: 2 in first shell, 8 in second shell, 7 in third shell',
            difficulty: 'Easy'
          },
          {
            question: 'Calculate the relative atomic mass of chlorine given ³⁵Cl (75%) and ³⁷Cl (25%).',
            answer: '35.5',
            explanation: 'Relative atomic mass = (35 × 75 + 37 × 25)/100 = (2625 + 925)/100 = 35.5',
            difficulty: 'Medium'
          },
          {
            question: 'Explain why elements in Group 1 have similar chemical properties.',
            answer: 'They all have 1 electron in their outer shell',
            explanation: 'Group 1 elements all have 1 valence electron, so they react similarly by losing this electron to form +1 ions',
            difficulty: 'Medium'
          },
          {
            question: 'A magnesium ion has a 2+ charge. How many electrons does it have?',
            answer: '10 electrons',
            explanation: 'Magnesium has 12 protons. Mg²⁺ has lost 2 electrons, so 12 - 2 = 10 electrons',
            difficulty: 'Medium'
          },
          {
            question: 'Predict and explain the trend in atomic radius down Group 1.',
            answer: 'Atomic radius increases down the group',
            explanation: 'Each element has one more electron shell than the one above, making atoms progressively larger',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Atomic structure and the periodic table',
          'BBC Bitesize: Atomic structure and periodic table',
          'Royal Society of Chemistry: Periodic table interactive',
          'IUPAC: Official periodic table of elements',
          'ChemGuide: Electronic structure and the periodic table'
        ]
      }
    },
    'chemical-bonding-and-structure': {
      title: 'Chemical Bonding and Structure',
      description: 'Explore ionic, covalent, and metallic bonding with their properties.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Atomic Structure and Periodic Table'],
      learningObjectives: [
        'Understand different types of chemical bonding',
        'Predict bonding from element properties',
        'Draw dot-and-cross diagrams',
        'Relate structure to properties',
        'Understand intermolecular forces',
        'Apply bonding theory to materials'
      ],
      keyTopics: [
        'Ionic bonding and lattices',
        'Covalent bonding and molecules',
        'Metallic bonding and structures',
        'Dot-and-cross diagrams',
        'Giant and simple structures',
        'Intermolecular forces',
        'Properties and bonding'
      ],
      practiceAreas: [
        'Bonding type prediction',
        'Diagram drawing',
        'Structure-property relationships',
        'Material properties',
        'Molecular shapes'
      ],
      examTips: [
        'Practice diagram drawing',
        'Learn bonding rules',
        'Understand property links',
        'Know structure types',
        'Apply bonding theory'
      ],
      detailedContent: {
        introduction: 'Chemical bonding explains how atoms combine to form compounds. Understanding the different types of bonds and their properties is crucial for predicting material behavior and chemical reactivity.',
        conceptExplanations: [
          {
            title: 'Ionic Bonding and Lattice Structures',
            content: 'Ionic bonds form when electrons transfer from metal atoms to non-metal atoms, creating charged ions that attract each other. The resulting compounds form regular lattice structures.',
            keyFormulas: [
              'Electrostatic force ∝ (charge₁ × charge₂)/distance²',
              'Lattice energy ∝ (charge product)/distance',
              'Common ionic charges: Na⁺, Ca²⁺, Al³⁺, Cl⁻, O²⁻, N³⁻'
            ],
            examples: [
              'Sodium chloride (NaCl): Na⁺ and Cl⁻ ions in cubic lattice',
              'Magnesium oxide (MgO): high melting point due to 2+ and 2- charges',
              'Calcium fluoride (CaF₂): one Ca²⁺ ion for every two F⁻ ions',
              'Aluminum oxide (Al₂O₃): complex lattice, very high melting point'
            ]
          },
          {
            title: 'Covalent Bonding and Molecular Structures',
            content: 'Covalent bonds form when atoms share electron pairs. This sharing can be equal (non-polar) or unequal (polar), affecting molecular properties and behavior.',
            keyFormulas: [
              'Single bond: one shared electron pair (H-H)',
              'Double bond: two shared electron pairs (O=O)',
              'Triple bond: three shared electron pairs (N≡N)',
              'Electronegativity difference determines polarity'
            ],
            examples: [
              'Water (H₂O): bent molecule, polar bonds, hydrogen bonding',
              'Methane (CH₄): tetrahedral, non-polar molecule',
              'Carbon dioxide (CO₂): linear, polar bonds but non-polar molecule',
              'Ammonia (NH₃): pyramidal, polar molecule, hydrogen bonding'
            ]
          },
          {
            title: 'Metallic Bonding and Properties',
            content: 'Metallic bonding involves a "sea of electrons" that move freely between metal atoms. This explains metals\' unique properties like conductivity and malleability.',
            examples: [
              'Electrical conductivity: mobile electrons carry electric current',
              'Thermal conductivity: electrons transfer kinetic energy',
              'Malleability: atoms can slide past each other without breaking bonds',
              'Metallic luster: electrons interact with light photons',
              'Alloys: mixing metals creates new properties (steel, bronze)',
              'Strength varies: from soft sodium to hard tungsten'
            ]
          },
          {
            title: 'Drawing Dot-and-Cross Diagrams',
            content: 'Dot-and-cross diagrams show how electrons are arranged in bonds and lone pairs. Different symbols represent electrons from different atoms.',
            examples: [
              'Simple molecules: H₂O, NH₃, CH₄ showing shared electron pairs',
              'Ionic compounds: show electron transfer and resulting charges',
              'Multiple bonds: O₂ (double bond), N₂ (triple bond)',
              'Lone pairs: electron pairs not involved in bonding',
              'Coordinate bonds: both electrons come from the same atom',
              'Complex ions: NH₄⁺, SO₄²⁻ showing all electron arrangements'
            ]
          },
          {
            title: 'Giant vs Simple Molecular Structures',
            content: 'Compounds can have giant structures (continuous networks) or simple molecular structures (discrete molecules), leading to very different properties.',
            examples: [
              'Giant ionic: NaCl, high melting point, conducts when molten',
              'Giant covalent: diamond (hard), graphite (conducts), SiO₂',
              'Giant metallic: iron, copper, aluminum with metallic properties',
              'Simple molecular: H₂O, CO₂, low melting points, don\'t conduct',
              'Polymers: long chain molecules like plastics',
              'Network solids: 3D covalent networks, very hard materials'
            ]
          },
          {
            title: 'Intermolecular Forces',
            content: 'Forces between molecules are weaker than bonds within molecules but still affect physical properties like boiling point and solubility.',
            keyFormulas: [
              'van der Waals forces: temporary dipole attractions',
              'Dipole-dipole forces: between polar molecules',
              'Hydrogen bonding: H bonded to N, O, or F',
              'Force strength: hydrogen bonding > dipole-dipole > van der Waals'
            ],
            examples: [
              'Water: hydrogen bonding gives high boiling point',
              'Alkanes: van der Waals forces increase with chain length',
              'Alcohols: hydrogen bonding makes them soluble in water',
              'Noble gases: only van der Waals forces, low boiling points'
            ]
          }
        ],
        commonMistakes: [
          'Confusing ionic and covalent bonding - check if electrons transfer or share',
          'Drawing incorrect dot-and-cross diagrams - count all electrons carefully',
          'Assuming all molecules with polar bonds are polar overall',
          'Forgetting that intermolecular forces are much weaker than bonds',
          'Not relating structure to properties - giant structures have higher melting points',
          'Mixing up different types of covalent structures',
          'Assuming all metals have identical properties'
        ],
        realWorldApplications: [
          'Materials design: understanding bonding predicts material properties',
          'Drug development: molecular shape and polarity affect biological activity',
          'Catalysis: surface bonding enables chemical reactions',
          'Electronics: semiconductor properties depend on bonding type',
          'Construction: concrete, ceramics based on ionic/covalent bonding',
          'Plastics industry: polymer design using covalent bonding principles',
          'Metallurgy: alloy development using metallic bonding theory'
        ],
        practiceQuestions: [
          {
            question: 'Explain why sodium chloride has a high melting point while water has a low melting point.',
            answer: 'NaCl has giant ionic structure with strong electrostatic forces; water has simple molecular structure with weaker intermolecular forces',
            explanation: 'Giant structures require more energy to break apart than simple molecular structures',
            difficulty: 'Medium'
          },
          {
            question: 'Draw a dot-and-cross diagram for ammonia (NH₃).',
            answer: 'N in center with 3 H atoms, showing 3 bonding pairs and 1 lone pair on nitrogen',
            explanation: 'Nitrogen has 5 outer electrons, forms 3 bonds with hydrogen, leaving 1 lone pair',
            difficulty: 'Medium'
          },
          {
            question: 'Why do metals conduct electricity while ionic compounds only conduct when molten?',
            answer: 'Metals have mobile electrons; ionic compounds need mobile ions which only exist when molten',
            explanation: 'Electrical conduction requires mobile charge carriers - electrons in metals, ions in molten ionics',
            difficulty: 'Hard'
          },
          {
            question: 'Predict the bonding type between magnesium and oxygen.',
            answer: 'Ionic bonding',
            explanation: 'Magnesium is a metal, oxygen is a non-metal, so electrons transfer forming Mg²⁺ and O²⁻ ions',
            difficulty: 'Easy'
          },
          {
            question: 'Which is stronger: the O-H bond in water or the hydrogen bonding between water molecules?',
            answer: 'The O-H covalent bond is much stronger',
            explanation: 'Covalent bonds (within molecules) are stronger than intermolecular forces (between molecules)',
            difficulty: 'Medium'
          },
          {
            question: 'Explain why diamond is hard while graphite can be used as a lubricant.',
            answer: 'Diamond has 3D network of strong bonds; graphite has layers held by weak forces',
            explanation: 'Different structures give different properties despite both being carbon',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Chemical bonding and molecular structure',
          'BBC Bitesize: Types of chemical bonding',
          'ChemGuide: Bonding and structure in chemistry',
          'Royal Society of Chemistry: Chemical bonding resources',
          'OpenStax: Chemistry - Chemical bonding and molecular geometry'
        ]
      }
    },
    'chemical-reactions-and-equations': {
      title: 'Chemical Reactions and Equations',
      description: 'Master chemical equations, reaction types, and energy changes.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Atomic Structure', 'Chemical Bonding'],
      learningObjectives: [
        'Balance chemical equations accurately',
        'Classify different reaction types',
        'Understand energy changes in reactions',
        'Apply collision theory principles',
        'Predict reaction products',
        'Understand reaction mechanisms'
      ],
      keyTopics: [
        'Balancing chemical equations',
        'Types of chemical reactions',
        'Exothermic and endothermic reactions',
        'Energy profiles and activation energy',
        'Collision theory',
        'Catalysts and reaction rates',
        'Reversible reactions'
      ],
      practiceAreas: [
        'Equation balancing',
        'Reaction type classification',
        'Energy change calculations',
        'Rate of reaction experiments',
        'Product prediction'
      ],
      examTips: [
        'Practice equation balancing',
        'Learn reaction patterns',
        'Understand energy concepts',
        'Know catalyst effects',
        'Apply collision theory'
      ],
      detailedContent: {
        introduction: 'Chemical reactions involve the breaking and forming of bonds to create new substances. Understanding reaction types, energy changes, and rates is fundamental to predicting and controlling chemical processes.',
        conceptExplanations: [
          {
            title: 'Balancing Chemical Equations',
            content: 'Chemical equations must be balanced to obey the law of conservation of mass. The same number of each type of atom must appear on both sides of the equation.',
            keyFormulas: [
              'Law of conservation of mass: mass reactants = mass products',
              'Balance atoms systematically: metals → non-metals → hydrogen → oxygen',
              'Use coefficients, never change chemical formulas'
            ],
            examples: [
              'H₂ + Cl₂ → 2HCl (simple 1:1:2 ratio)',
              '2Mg + O₂ → 2MgO (2:1:2 ratio)',
              'CH₄ + 2O₂ → CO₂ + 2H₂O (combustion of methane)',
              'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ (acid-carbonate reaction)'
            ]
          },
          {
            title: 'Types of Chemical Reactions',
            content: 'Chemical reactions can be classified into patterns that help predict products and understand reaction mechanisms.',
            examples: [
              'Synthesis: A + B → AB (combining elements or compounds)',
              'Decomposition: AB → A + B (breaking down compounds)',
              'Single replacement: A + BC → AC + B (more reactive displaces less)',
              'Double replacement: AB + CD → AD + CB (ions swap partners)',
              'Combustion: hydrocarbon + oxygen → CO₂ + H₂O',
              'Acid-base: acid + base → salt + water',
              'Redox: reactions involving electron transfer'
            ]
          },
          {
            title: 'Energy Changes in Reactions',
            content: 'Chemical reactions either release energy (exothermic) or absorb energy (endothermic). This energy change determines whether reactions occur spontaneously.',
            keyFormulas: [
              'ΔH = H_products - H_reactants',
              'Exothermic: ΔH negative (energy released)',
              'Endothermic: ΔH positive (energy absorbed)',
              'Bond breaking requires energy, bond forming releases energy'
            ],
            examples: [
              'Combustion reactions: highly exothermic (burning fuel)',
              'Photosynthesis: endothermic (requires light energy)',
              'Hand warmers: exothermic crystallization reactions',
              'Instant cold packs: endothermic dissolution reactions',
              'Respiration: exothermic breakdown of glucose',
              'Thermal decomposition: endothermic (heating limestone)'
            ]
          },
          {
            title: 'Activation Energy and Energy Profiles',
            content: 'All reactions require minimum energy (activation energy) to break initial bonds. Energy profile diagrams show the energy pathway from reactants to products.',
            keyFormulas: [
              'Activation energy (Ea): minimum energy needed to start reaction',
              'Catalysts lower activation energy without being consumed',
              'Rate ∝ e^(-Ea/RT) (higher Ea = slower reaction)'
            ],
            examples: [
              'Lighting a match: activation energy provided by striking',
              'Enzyme catalysis: biological catalysts lower activation energy',
              'Industrial catalysts: iron in Haber process, platinum in catalytic converters',
              'Temperature effect: higher temperature increases reaction rate'
            ]
          },
          {
            title: 'Collision Theory and Reaction Rates',
            content: 'For reactions to occur, particles must collide with sufficient energy and correct orientation. This explains how various factors affect reaction rates.',
            keyFormulas: [
              'Rate = collision frequency × fraction with Ea × orientation factor',
              'Factors affecting rate: concentration, temperature, pressure, surface area, catalyst'
            ],
            examples: [
              'Concentration: more particles = more collisions = faster rate',
              'Temperature: higher energy = more successful collisions',
              'Surface area: powder reacts faster than lumps',
              'Pressure (gases): higher pressure = more collisions',
              'Catalysts: provide alternative pathway with lower Ea',
              'Inhibitors: slow reactions by interfering with mechanism'
            ]
          },
          {
            title: 'Reversible Reactions and Equilibrium',
            content: 'Some reactions can proceed in both directions, establishing dynamic equilibrium where forward and reverse reaction rates are equal.',
            keyFormulas: [
              'A + B ⇌ C + D (reversible reaction notation)',
              'At equilibrium: rate forward = rate reverse',
              'Le Chatelier\'s principle: system responds to oppose changes'
            ],
            examples: [
              'Haber process: N₂ + 3H₂ ⇌ 2NH₃ (industrial ammonia production)',
              'Ester formation: acid + alcohol ⇌ ester + water',
              'Weak acid dissociation: CH₃COOH ⇌ CH₃COO⁻ + H⁺',
              'Physical equilibria: evaporation ⇌ condensation'
            ]
          }
        ],
        commonMistakes: [
          'Changing chemical formulas instead of using coefficients when balancing',
          'Confusing exothermic and endothermic reactions',
          'Thinking catalysts are consumed in reactions',
          'Not understanding that equilibrium is dynamic, not static',
          'Assuming all reactions go to completion',
          'Confusing activation energy with enthalpy change',
          'Not considering all factors that affect reaction rate'
        ],
        realWorldApplications: [
          'Industrial processes: optimizing conditions for maximum yield and rate',
          'Environmental chemistry: understanding pollutant formation and breakdown',
          'Biochemistry: enzyme-catalyzed reactions in living organisms',
          'Materials science: controlling reactions to synthesize new materials',
          'Energy production: combustion in power plants and vehicle engines',
          'Food chemistry: cooking processes involving chemical reactions',
          'Pharmaceutical industry: drug synthesis and stability'
        ],
        practiceQuestions: [
          {
            question: 'Balance the equation: Fe + O₂ → Fe₂O₃',
            answer: '4Fe + 3O₂ → 2Fe₂O₃',
            explanation: 'Need 4 Fe atoms and 6 O atoms on each side: 4 Fe + 3 O₂ (6 O) → 2 Fe₂O₃ (4 Fe, 6 O)',
            difficulty: 'Easy'
          },
          {
            question: 'Is the combustion of methane exothermic or endothermic? Explain.',
            answer: 'Exothermic - it releases heat energy',
            explanation: 'Combustion reactions release energy as bonds in products (CO₂, H₂O) are stronger than in reactants',
            difficulty: 'Easy'
          },
          {
            question: 'Explain why increasing temperature increases reaction rate.',
            answer: 'Particles have more kinetic energy, leading to more frequent and more energetic collisions',
            explanation: 'Higher temperature means more particles have energy ≥ activation energy',
            difficulty: 'Medium'
          },
          {
            question: 'How does a catalyst affect the activation energy and overall energy change?',
            answer: 'Lowers activation energy but does not change overall energy change (ΔH)',
            explanation: 'Catalysts provide alternative pathway with lower Ea but don\'t affect thermodynamic stability',
            difficulty: 'Medium'
          },
          {
            question: 'In the Haber process, what happens to equilibrium if pressure is increased?',
            answer: 'Equilibrium shifts right (toward ammonia) as it has fewer gas molecules',
            explanation: 'Le Chatelier\'s principle: system opposes change by shifting toward side with fewer gas particles',
            difficulty: 'Hard'
          },
          {
            question: 'Why does powdered zinc react faster with acid than zinc lumps?',
            answer: 'Greater surface area provides more contact points for reaction',
            explanation: 'More surface area = more particles exposed = more collision opportunities',
            difficulty: 'Medium'
          }
        ],
        furtherReading: [
          'Khan Academy: Chemical reactions and stoichiometry',
          'BBC Bitesize: Types of chemical reactions',
          'ChemGuide: Energetics and equilibrium',
          'Royal Society of Chemistry: Reaction mechanisms',
          'OpenStax: Chemistry - Chemical reactions and reaction rates'
        ]
      }
    },
    'quantitative-chemistry': {
      title: 'Quantitative Chemistry',
      description: 'Master mole calculations, concentration, and chemical mathematics.',
      duration: '4-5 weeks',
      difficulty: 'Higher',
      prerequisites: ['Chemical Reactions and Equations'],
      learningObjectives: [
        'Calculate using the mole concept',
        'Determine empirical and molecular formulas',
        'Calculate concentration and yield',
        'Apply gas calculations',
        'Understand limiting reactants',
        'Perform titration calculations'
      ],
      keyTopics: [
        'The mole and Avogadro\'s number',
        'Molar mass calculations',
        'Empirical and molecular formulas',
        'Concentration and solutions',
        'Percentage yield and atom economy',
        'Gas volumes and molar volume',
        'Titration calculations'
      ],
      practiceAreas: [
        'Mole calculations',
        'Formula determination',
        'Concentration problems',
        'Yield calculations',
        'Titration analysis'
      ],
      examTips: [
        'Learn mole formulas',
        'Practice calculation steps',
        'Understand concentration units',
        'Know gas laws',
        'Apply yield concepts'
      ],
      detailedContent: {
        introduction: 'Quantitative chemistry provides the mathematical tools to calculate amounts of substances in chemical reactions. Understanding moles, concentrations, and yields is essential for practical chemistry applications.',
        conceptExplanations: [
          {
            title: 'The Mole Concept and Avogadro\'s Number',
            content: 'The mole is the fundamental unit for counting particles in chemistry. One mole contains Avogadro\'s number of particles, allowing us to relate microscopic particles to measurable masses.',
            keyFormulas: [
              'Avogadro\'s number = 6.022 × 10²³ particles/mol',
              'Number of moles = mass (g) / molar mass (g/mol)',
              'Number of particles = moles × Avogadro\'s number',
              'Molar mass = relative atomic/molecular mass in g/mol'
            ],
            examples: [
              '1 mole of carbon-12 = 12g = 6.022 × 10²³ atoms',
              '1 mole of water (H₂O) = 18g = 6.022 × 10²³ molecules',
              '0.5 moles of NaCl = 29.25g = 3.011 × 10²³ formula units',
              '2 moles of oxygen gas = 64g = 1.204 × 10²⁴ molecules'
            ]
          },
          {
            title: 'Molar Mass Calculations',
            content: 'Molar mass is the mass of one mole of a substance, calculated by adding the relative atomic masses of all atoms in the formula.',
            keyFormulas: [
              'Molar mass = Σ(number of atoms × relative atomic mass)',
              'Mr(compound) = sum of Ar values for all atoms',
              'Use periodic table for relative atomic masses'
            ],
            examples: [
              'H₂O: (2 × 1) + (1 × 16) = 18 g/mol',
              'CaCO₃: (1 × 40) + (1 × 12) + (3 × 16) = 100 g/mol',
              'C₆H₁₂O₆: (6 × 12) + (12 × 1) + (6 × 16) = 180 g/mol',
              'Ca(OH)₂: (1 × 40) + (2 × 16) + (2 × 1) = 74 g/mol'
            ]
          },
          {
            title: 'Empirical and Molecular Formulas',
            content: 'Empirical formulas show the simplest ratio of atoms, while molecular formulas show the actual number of atoms in a molecule.',
            keyFormulas: [
              'Empirical formula: simplest whole number ratio',
              'Molecular formula = (empirical formula) × n',
              'n = molecular mass / empirical formula mass',
              'Use percentage composition to find empirical formula'
            ],
            examples: [
              'Glucose: molecular C₆H₁₂O₆, empirical CH₂O',
              'Benzene: molecular C₆H₆, empirical CH',
              'Hydrogen peroxide: molecular H₂O₂, empirical HO',
              'From 40% C, 6.7% H, 53.3% O → empirical formula CH₂O'
            ]
          },
          {
            title: 'Concentration and Solutions',
            content: 'Concentration expresses how much solute is dissolved in a given amount of solution. Different units are used for different applications.',
            keyFormulas: [
              'Concentration (mol/dm³) = moles of solute / volume of solution (dm³)',
              'Concentration (g/dm³) = mass of solute / volume of solution',
              'Moles = concentration × volume (in dm³)',
              '1 dm³ = 1000 cm³ = 1 liter'
            ],
            examples: [
              '0.1 mol/dm³ HCl: 0.1 moles of HCl in 1 dm³ of solution',
              'Making 500 cm³ of 0.2 mol/dm³ NaCl: need 0.1 moles = 5.85g NaCl',
              'Dilution: C₁V₁ = C₂V₂ (concentration × volume constant)',
              'Parts per million (ppm): mg of solute per dm³ of solution'
            ]
          },
          {
            title: 'Percentage Yield and Atom Economy',
            content: 'Actual yields are often less than theoretical yields due to practical limitations. Atom economy measures how efficiently atoms are used in reactions.',
            keyFormulas: [
              'Percentage yield = (actual yield / theoretical yield) × 100%',
              'Atom economy = (mass of desired product / total mass of reactants) × 100%',
              'Theoretical yield calculated from balanced equation and limiting reactant'
            ],
            examples: [
              'If theory predicts 10g product but get 7.5g: yield = 75%',
              'Haber process: atom economy for NH₃ = 82% (efficient)',
              'Addition reactions: high atom economy (all atoms used)',
              'Substitution reactions: lower atom economy (waste products)'
            ]
          },
          {
            title: 'Gas Calculations and Molar Volume',
            content: 'At standard temperature and pressure, one mole of any gas occupies the same volume (molar volume). This allows gas volume calculations.',
            keyFormulas: [
              'Molar volume at STP = 24 dm³/mol (24,000 cm³/mol)',
              'Volume = moles × molar volume',
              'Moles of gas = volume (dm³) / 24',
              'PV = nRT (ideal gas equation)'
            ],
            examples: [
              '1 mole of any gas at STP = 24 dm³',
              '0.5 moles of CO₂ = 12 dm³ at STP',
              '48 dm³ of methane = 2 moles = 32g',
              'Gas syringe experiments use volume to calculate moles'
            ]
          },
          {
            title: 'Titration Calculations',
            content: 'Titrations determine unknown concentrations by reacting with solutions of known concentration. Stoichiometry relates the amounts of reactants.',
            keyFormulas: [
              'Moles = concentration × volume (in dm³)',
              'Use balanced equation for mole ratios',
              'At endpoint: moles of acid = moles of base (for 1:1 reactions)',
              'Average titre volume for accuracy'
            ],
            examples: [
              'NaOH + HCl → NaCl + H₂O (1:1 mole ratio)',
              '25 cm³ of 0.1M NaOH neutralizes 25 cm³ of 0.1M HCl',
              'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O (1:2 mole ratio)',
              'Indicator choice: phenolphthalein for strong base-weak acid'
            ]
          }
        ],
        commonMistakes: [
          'Confusing moles with molecules - remember Avogadro\'s number',
          'Not converting cm³ to dm³ when calculating concentration',
          'Forgetting to use molar mass when converting between mass and moles',
          'Not using correct mole ratios from balanced equations',
          'Confusing empirical and molecular formulas',
          'Not accounting for limiting reactants in yield calculations',
          'Mixing up percentage yield and atom economy concepts'
        ],
        realWorldApplications: [
          'Pharmaceutical industry: precise drug dosage calculations',
          'Environmental monitoring: pollutant concentration measurements',
          'Food industry: nutritional content analysis and quality control',
          'Water treatment: chemical dosing for purification',
          'Agriculture: fertilizer composition and soil analysis',
          'Manufacturing: quality control and material purity testing',
          'Medical diagnostics: blood chemistry and laboratory analysis'
        ],
        practiceQuestions: [
          {
            question: 'Calculate the number of moles in 44g of CO₂.',
            answer: '1 mole',
            explanation: 'Molar mass of CO₂ = 12 + (2 × 16) = 44 g/mol. Moles = 44g ÷ 44 g/mol = 1 mole',
            difficulty: 'Easy'
          },
          {
            question: 'What mass of NaCl is needed to make 250 cm³ of 0.2 mol/dm³ solution?',
            answer: '2.925g',
            explanation: 'Moles needed = 0.2 × 0.25 = 0.05 mol. Mass = 0.05 × 58.5 = 2.925g',
            difficulty: 'Medium'
          },
          {
            question: 'Find the empirical formula of a compound with 40% C, 6.7% H, 53.3% O.',
            answer: 'CH₂O',
            explanation: 'C: 40/12 = 3.33, H: 6.7/1 = 6.7, O: 53.3/16 = 3.33. Ratio = 1:2:1 → CH₂O',
            difficulty: 'Hard'
          },
          {
            question: 'What volume of 0.1 mol/dm³ HCl neutralizes 25 cm³ of 0.15 mol/dm³ NaOH?',
            answer: '37.5 cm³',
            explanation: 'Moles NaOH = 0.15 × 0.025 = 0.00375 mol. Volume HCl = 0.00375/0.1 = 0.0375 dm³ = 37.5 cm³',
            difficulty: 'Medium'
          },
          {
            question: 'Calculate the percentage yield if 8g of product is obtained when 10g was theoretically possible.',
            answer: '80%',
            explanation: 'Percentage yield = (8/10) × 100% = 80%',
            difficulty: 'Easy'
          },
          {
            question: 'How many molecules are in 0.5 moles of water?',
            answer: '3.011 × 10²³ molecules',
            explanation: 'Number of molecules = 0.5 × 6.022 × 10²³ = 3.011 × 10²³',
            difficulty: 'Medium'
          }
        ],
        furtherReading: [
          'Khan Academy: The mole and molar mass',
          'BBC Bitesize: Quantitative chemistry calculations',
          'ChemGuide: Basic mole calculations',
          'Royal Society of Chemistry: Practical chemistry calculations',
          'OpenStax: Chemistry - Stoichiometry of chemical reactions'
        ]
      }
    },
    'organic-chemistry-basics': {
      title: 'Organic Chemistry Basics',
      description: 'Introduction to carbon compounds, hydrocarbons, and functional groups.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Chemical Bonding'],
      learningObjectives: [
        'Understand hydrocarbon structures',
        'Classify organic compound types',
        'Predict organic reactions',
        'Understand functional groups',
        'Apply organic nomenclature',
        'Study polymer formation'
      ],
      keyTopics: [
        'Alkanes and alkenes',
        'Functional groups',
        'Isomerism in organic compounds',
        'Combustion and substitution reactions',
        'Addition reactions',
        'Polymers and polymerization',
        'Crude oil and hydrocarbons'
      ],
      practiceAreas: [
        'Structure drawing',
        'Reaction mechanisms',
        'Functional group identification',
        'Polymer analysis',
        'Organic synthesis'
      ],
      examTips: [
        'Learn functional groups',
        'Practice structure drawing',
        'Understand reaction types',
        'Know polymer formation',
        'Apply naming rules'
      ],
      detailedContent: {
        introduction: 'Organic chemistry studies carbon-based compounds that form the basis of all living things. Understanding hydrocarbon structures, functional groups, and reactions is essential for biochemistry and materials science.',
        conceptExplanations: [
          {
            title: 'Hydrocarbon Structures: Alkanes and Alkenes',
            content: 'Hydrocarbons are compounds containing only carbon and hydrogen. Alkanes have single bonds, while alkenes contain double bonds, leading to different properties and reactions.',
            keyFormulas: [
              'Alkanes: CₙH₂ₙ₊₂ (saturated hydrocarbons)',
              'Alkenes: CₙH₂ₙ (unsaturated hydrocarbons)',
              'Homologous series: each member differs by CH₂',
              'Bromine water test: distinguishes alkanes from alkenes'
            ],
            examples: [
              'Methane (CH₄): simplest alkane, natural gas component',
              'Ethane (C₂H₆): two carbons, single bonds only',
              'Ethene (C₂H₄): two carbons with double bond, ripens fruit',
              'Propene (C₃H₆): used to make polypropylene plastic'
            ]
          },
          {
            title: 'Functional Groups and Their Properties',
            content: 'Functional groups are specific arrangements of atoms that determine chemical behavior. Each functional group has characteristic reactions and properties.',
            examples: [
              'Alcohols (-OH): ethanol in drinks, methanol as fuel',
              'Carboxylic acids (-COOH): ethanoic acid in vinegar',
              'Esters (-COO-): fruity smells, fats and oils',
              'Amines (-NH₂): basic compounds, found in proteins',
              'Aldehydes (-CHO): formaldehyde as preservative',
              'Ketones (C=O): acetone as solvent',
              'Halogenoalkanes (-X): CFCs, solvents, anesthetics'
            ]
          },
          {
            title: 'Isomerism in Organic Compounds',
            content: 'Isomers are compounds with the same molecular formula but different structures, leading to different properties despite identical composition.',
            examples: [
              'Structural isomers: different carbon skeleton arrangements',
              'Butane vs methylpropane: both C₄H₁₀ but different shapes',
              'Position isomers: functional group in different positions',
              'Chain isomers: different carbon chain arrangements',
              'Stereoisomers: same bonds but different 3D arrangements',
              'Geometric isomers: cis/trans around double bonds'
            ]
          },
          {
            title: 'Combustion and Substitution Reactions',
            content: 'Organic compounds undergo combustion in oxygen and substitution reactions where atoms are replaced. These reactions are fundamental to energy production and synthesis.',
            keyFormulas: [
              'Complete combustion: hydrocarbon + O₂ → CO₂ + H₂O',
              'Incomplete combustion: produces CO or C (soot)',
              'Substitution: halogen replaces hydrogen in presence of UV light',
              'Chain reaction mechanism: initiation, propagation, termination'
            ],
            examples: [
              'Methane combustion: CH₄ + 2O₂ → CO₂ + 2H₂O + energy',
              'Ethane + chlorine: C₂H₆ + Cl₂ → C₂H₅Cl + HCl',
              'Car engines: incomplete combustion produces toxic CO',
              'Halogenation: making chloroform, dry cleaning solvents'
            ]
          },
          {
            title: 'Addition Reactions of Alkenes',
            content: 'Alkenes undergo addition reactions where the double bond opens to form single bonds with new atoms. This high reactivity makes alkenes useful for synthesis.',
            keyFormulas: [
              'Addition across C=C double bond',
              'Alkene + H₂ → alkane (hydrogenation)',
              'Alkene + Br₂ → dibromoalkane',
              'Alkene + H₂O → alcohol (hydration)'
            ],
            examples: [
              'Ethene + hydrogen → ethane (margarine production)',
              'Ethene + bromine → 1,2-dibromoethane (decolorizes bromine)',
              'Ethene + water → ethanol (industrial alcohol production)',
              'Propene + HBr → 1-bromopropane or 2-bromopropane'
            ]
          },
          {
            title: 'Polymers and Polymerization',
            content: 'Polymers are large molecules made from many small repeat units (monomers). Addition polymerization joins alkene monomers to form plastics.',
            keyFormulas: [
              'nC₂H₄ → (-CH₂-CH₂-)ₙ (polyethene formation)',
              'Addition polymerization: no small molecules eliminated',
              'Condensation polymerization: water eliminated',
              'Polymer properties depend on monomer structure'
            ],
            examples: [
              'Polyethene: from ethene, plastic bags and bottles',
              'Polypropene: from propene, ropes and carpets',
              'Polystyrene: from styrene, packaging and insulation',
              'PVC: from chloroethene, pipes and window frames',
              'Nylon: condensation polymer, clothing and ropes',
              'Natural polymers: starch, cellulose, proteins, DNA'
            ]
          },
          {
            title: 'Crude Oil and Hydrocarbon Sources',
            content: 'Crude oil is a mixture of hydrocarbons formed from ancient marine organisms. Fractional distillation separates it into useful fractions based on boiling points.',
            examples: [
              'Formation: marine organisms → sediment → heat/pressure → oil',
              'Fractional distillation: separates by boiling point',
              'Petroleum gas: lowest boiling point, cooking and heating',
              'Petrol: cars and light vehicles, 4-12 carbon atoms',
              'Kerosene: jet fuel, 9-16 carbon atoms',
              'Diesel: trucks and trains, 15-25 carbon atoms',
              'Lubricating oil: engine oils, 20-50 carbon atoms',
              'Bitumen: highest boiling point, road surfacing'
            ]
          }
        ],
        commonMistakes: [
          'Confusing alkanes and alkenes - check for double bonds',
          'Drawing incorrect structural formulas - count bonds carefully',
          'Not recognizing functional groups in complex molecules',
          'Assuming all isomers have identical properties',
          'Forgetting that polymers are made from monomers',
          'Mixing up addition and substitution reaction conditions',
          'Not understanding that crude oil contains many different hydrocarbons'
        ],
        realWorldApplications: [
          'Petrochemical industry: producing plastics, fuels, and chemicals',
          'Pharmaceutical industry: drug development and synthesis',
          'Food industry: flavoring compounds, preservatives, packaging',
          'Materials science: developing new polymers and composites',
          'Environmental science: biodegradable plastics, pollution cleanup',
          'Agriculture: pesticides, fertilizers, plant growth regulators',
          'Cosmetics industry: fragrances, moisturizers, preservatives'
        ],
        practiceQuestions: [
          {
            question: 'What is the molecular formula for propane?',
            answer: 'C₃H₈',
            explanation: 'Propane has 3 carbons. For alkanes: CₙH₂ₙ₊₂, so C₃H₂×₃₊₂ = C₃H₈',
            difficulty: 'Easy'
          },
          {
            question: 'How can you distinguish between ethane and ethene?',
            answer: 'Add bromine water - ethene decolorizes it, ethane does not',
            explanation: 'Ethene (alkene) undergoes addition reaction with bromine, ethane (alkane) does not react',
            difficulty: 'Medium'
          },
          {
            question: 'Write the equation for complete combustion of propane.',
            answer: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
            explanation: 'Balance carbon atoms first (3 CO₂), then hydrogen (4 H₂O), finally oxygen (5 O₂)',
            difficulty: 'Medium'
          },
          {
            question: 'What monomer is used to make polystyrene?',
            answer: 'Styrene (phenylethene)',
            explanation: 'Polystyrene is formed by addition polymerization of styrene monomers',
            difficulty: 'Easy'
          },
          {
            question: 'Explain why alkenes are more reactive than alkanes.',
            answer: 'Alkenes have C=C double bonds which can undergo addition reactions',
            explanation: 'The double bond in alkenes can open up to form new bonds, while alkanes only have stable single bonds',
            difficulty: 'Medium'
          },
          {
            question: 'Name two products of the cracking of long-chain hydrocarbons.',
            answer: 'Shorter alkane and alkene',
            explanation: 'Cracking breaks long chains into shorter alkanes (useful fuels) and alkenes (for plastics)',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Introduction to organic chemistry',
          'BBC Bitesize: Organic chemistry and carbon compounds',
          'ChemGuide: Introduction to organic chemistry',
          'Royal Society of Chemistry: Organic chemistry resources',
          'OpenStax: Chemistry - Organic chemistry fundamentals'
        ]
      }
    },
    'chemical-analysis-and-testing': {
      title: 'Chemical Analysis and Testing',
      description: 'Master analytical techniques, tests, and instrumental methods.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['All previous modules'],
      learningObjectives: [
        'Perform qualitative analysis tests',
        'Understand instrumental techniques',
        'Apply chromatography methods',
        'Interpret analytical data',
        'Understand purity and identification',
        'Apply analytical chemistry'
      ],
      keyTopics: [
        'Flame tests for metal ions',
        'Chemical tests for anions',
        'Chromatography techniques',
        'Mass spectrometry basics',
        'Instrumental analysis',
        'Purity and melting points',
        'Environmental analysis'
      ],
      practiceAreas: [
        'Test identification',
        'Chromatography analysis',
        'Data interpretation',
        'Instrumental techniques',
        'Purity determination'
      ],
      examTips: [
        'Learn test procedures',
        'Practice data analysis',
        'Understand chromatography',
        'Know instrumental basics',
        'Apply analytical methods'
      ],
      detailedContent: {
        introduction: 'Chemical analysis identifies unknown substances and determines purity through qualitative and quantitative methods. These techniques are essential in research, quality control, and environmental monitoring.',
        conceptExplanations: [
          {
            title: 'Flame Tests for Metal Ion Identification',
            content: 'Flame tests identify metal ions by the characteristic colors they produce when heated. Different metals emit different wavelengths of light due to electronic transitions.',
            keyFormulas: [
              'Metal chloride + heat → colored flame',
              'Energy difference = hf (Planck equation)',
              'Each metal has unique electron configuration',
              'Color corresponds to specific wavelength/energy'
            ],
            examples: [
              'Lithium: bright red flame (crimson)',
              'Sodium: bright yellow/orange flame',
              'Potassium: lilac/purple flame',
              'Calcium: brick red/orange flame',
              'Copper: blue-green flame',
              'Barium: pale green flame'
            ]
          },
          {
            title: 'Chemical Tests for Anions',
            content: 'Anions (negative ions) are identified using specific reagents that produce characteristic precipitates, gases, or color changes.',
            examples: [
              'Chloride (Cl⁻): silver nitrate → white precipitate AgCl',
              'Bromide (Br⁻): silver nitrate → cream precipitate AgBr',
              'Iodide (I⁻): silver nitrate → yellow precipitate AgI',
              'Sulfate (SO₄²⁻): barium chloride → white precipitate BaSO₄',
              'Carbonate (CO₃²⁻): acid → CO₂ gas (turns limewater milky)',
              'Nitrate (NO₃⁻): brown ring test with iron(II) sulfate'
            ]
          },
          {
            title: 'Chromatography Separation Techniques',
            content: 'Chromatography separates mixtures based on different affinities of components for mobile and stationary phases. Rf values help identify substances.',
            keyFormulas: [
              'Rf = distance moved by substance / distance moved by solvent',
              'Rf values are constant for pure substances under same conditions',
              'Paper chromatography: paper = stationary phase',
              'Thin layer chromatography (TLC): silica gel plate'
            ],
            examples: [
              'Separating ink colors: different dyes travel different distances',
              'Food coloring analysis: identifying artificial vs natural colors',
              'Amino acid separation: ninhydrin spray reveals positions',
              'Drug testing: comparing unknown samples to standards'
            ]
          },
          {
            title: 'Mass Spectrometry Fundamentals',
            content: 'Mass spectrometry identifies compounds by measuring mass-to-charge ratios of ions. The molecular ion peak gives the relative molecular mass.',
            keyFormulas: [
              'Mass spectrometer: ionization → acceleration → separation → detection',
              'Molecular ion peak (M⁺): corresponds to molecular mass',
              'Base peak: most abundant ion (100% intensity)',
              'Fragmentation patterns help identify structure'
            ],
            examples: [
              'Water (H₂O): molecular ion at m/z = 18',
              'Methane (CH₄): molecular ion at m/z = 16, fragments at 15, 14, 13',
              'Ethanol (C₂H₅OH): molecular ion at m/z = 46',
              'Isotope peaks: ¹³C and ³⁷Cl contribute to spectrum'
            ]
          },
          {
            title: 'Instrumental Analysis Methods',
            content: 'Modern instruments provide accurate, sensitive analysis of substances. Each technique has specific applications and limitations.',
            examples: [
              'Infrared spectroscopy: identifies functional groups by bond vibrations',
              'UV-visible spectroscopy: measures light absorption by molecules',
              'Nuclear magnetic resonance (NMR): determines molecular structure',
              'Atomic absorption spectroscopy: quantifies metal concentrations',
              'Gas chromatography: separates volatile compounds',
              'High-performance liquid chromatography (HPLC): separates non-volatile compounds'
            ]
          },
          {
            title: 'Purity Assessment and Melting Points',
            content: 'Pure substances have sharp melting points, while impure substances melt over a range. Purity affects physical and chemical properties.',
            keyFormulas: [
              'Pure substance: sharp melting point',
              'Impure substance: melting range (lower and broader)',
              'Depression of melting point by impurities',
              'Boiling point elevation by impurities'
            ],
            examples: [
              'Pure water: melts at exactly 0°C',
              'Salt water: melts below 0°C over a range',
              'Pure aspirin: sharp melting point 138-140°C',
              'Impure aspirin: broad melting range, lower temperature'
            ]
          },
          {
            title: 'Environmental Analysis Applications',
            content: 'Analytical chemistry monitors environmental pollution, food safety, and water quality to protect human health and ecosystems.',
            examples: [
              'Water testing: pH, dissolved oxygen, nitrate levels, heavy metals',
              'Air quality monitoring: CO, SO₂, NO₂, particulate matter',
              'Soil analysis: nutrient levels, pesticide residues, contamination',
              'Food safety: preservatives, additives, contamination detection',
              'Pharmaceutical quality control: active ingredient concentration',
              'Forensic analysis: drug detection, explosive residues, paint analysis'
            ]
          }
        ],
        commonMistakes: [
          'Not cleaning apparatus between flame tests - contamination affects colors',
          'Confusing similar flame colors (sodium and calcium both orange)',
          'Not measuring Rf values correctly in chromatography',
          'Assuming substances with same Rf are identical without further testing',
          'Misinterpreting mass spectra fragmentation patterns',
          'Not considering isotope contributions in mass spectra',
          'Assuming broad melting ranges always indicate impurity'
        ],
        realWorldApplications: [
          'Quality control: pharmaceutical, food, and chemical industries',
          'Environmental monitoring: pollution detection and remediation',
          'Forensic science: crime scene analysis and evidence identification',
          'Medical diagnostics: blood chemistry, drug testing, disease markers',
          'Archaeological analysis: dating artifacts, composition studies',
          'Space exploration: analyzing samples from other planets',
          'Sports testing: detecting performance-enhancing drugs'
        ],
        practiceQuestions: [
          {
            question: 'What color flame would you expect from sodium compounds?',
            answer: 'Bright yellow/orange',
            explanation: 'Sodium ions produce a characteristic bright yellow-orange flame due to electronic transitions',
            difficulty: 'Easy'
          },
          {
            question: 'How would you test for the presence of chloride ions?',
            answer: 'Add silver nitrate solution - white precipitate forms',
            explanation: 'Ag⁺ + Cl⁻ → AgCl (white precipitate), soluble in ammonia solution',
            difficulty: 'Medium'
          },
          {
            question: 'A substance travels 4 cm while the solvent travels 10 cm in chromatography. Calculate the Rf value.',
            answer: '0.4',
            explanation: 'Rf = distance moved by substance / distance moved by solvent = 4/10 = 0.4',
            difficulty: 'Easy'
          },
          {
            question: 'In mass spectrometry, what does the molecular ion peak represent?',
            answer: 'The molecular mass of the compound',
            explanation: 'The molecular ion peak (M⁺) corresponds to the whole molecule minus one electron',
            difficulty: 'Medium'
          },
          {
            question: 'Why do impure substances have lower and broader melting points?',
            answer: 'Impurities disrupt crystal structure, requiring less energy to melt over a range',
            explanation: 'Impurities interfere with regular crystal packing, causing depression and broadening of melting point',
            difficulty: 'Hard'
          },
          {
            question: 'Which test would distinguish between sulfate and carbonate ions?',
            answer: 'Add acid - carbonate produces CO₂ gas, sulfate does not',
            explanation: 'Carbonates react with acid to produce CO₂ which turns limewater milky, sulfates do not react',
            difficulty: 'Medium'
          }
        ],
        furtherReading: [
          'Khan Academy: Analytical chemistry and spectroscopy',
          'BBC Bitesize: Chemical analysis and testing',
          'ChemGuide: Analytical chemistry methods',
          'Royal Society of Chemistry: Analytical science resources',
          'OpenStax: Chemistry - Advanced analytical techniques'
        ]
      }
    }
  },
  // GCSE Biology
  4: {
    'cell-biology-and-microscopy': {
      title: 'Cell Biology and Microscopy',
      description: 'Explore cell structure, function, and microscopy techniques.',
      duration: '3-4 weeks',
      difficulty: 'Foundation',
      prerequisites: ['Basic biology concepts'],
      learningObjectives: [
        'Understand cell structure and organelles',
        'Compare plant and animal cells',
        'Apply microscopy techniques',
        'Study cell division processes',
        'Understand stem cells',
        'Explore cell transport mechanisms'
      ],
      keyTopics: [
        'Animal and plant cell structure',
        'Organelles and their functions',
        'Microscopy and magnification',
        'Cell division (mitosis)',
        'Stem cells and differentiation',
        'Diffusion, osmosis, and active transport',
        'Cell specialization'
      ],
      practiceAreas: [
        'Cell diagram labeling',
        'Microscopy calculations',
        'Transport process analysis',
        'Cell division stages',
        'Specialized cell functions'
      ],
      examTips: [
        'Learn organelle functions',
        'Practice magnification calculations',
        'Understand transport processes',
        'Know cell division stages',
        'Draw clear diagrams'
      ],
      detailedContent: {
        introduction: 'Cell biology forms the foundation of life sciences, studying the basic units of all living organisms. Understanding cell structure, function, and processes is essential for comprehending how life works at its most fundamental level.',
        conceptExplanations: [
          {
            title: 'Animal and Plant Cell Structure',
            content: 'All cells share basic features but plant and animal cells have distinct differences. Animal cells are typically smaller and more flexible, while plant cells have rigid cell walls and specialized organelles.',
            examples: [
              'Common features: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes',
              'Animal cells only: centrioles, lysosomes, smaller vacuoles',
              'Plant cells only: cell wall, chloroplasts, large permanent vacuole',
              'Size differences: animal cells 10-30μm, plant cells 10-100μm',
              'Shape: animal cells flexible, plant cells fixed by cell wall',
              'Energy: animals from food, plants from photosynthesis'
            ]
          },
          {
            title: 'Organelles and Their Functions',
            content: 'Each organelle has specific functions that contribute to cell survival and operation. Understanding these functions explains how cells maintain life processes.',
            examples: [
              'Nucleus: controls cell activities, contains DNA/chromosomes',
              'Mitochondria: cellular respiration, ATP production ("powerhouse")',
              'Ribosomes: protein synthesis, found free or on rough ER',
              'Endoplasmic reticulum: transport system (rough has ribosomes)',
              'Golgi apparatus: modifies and packages proteins',
              'Lysosomes: digest waste materials ("cellular stomach")',
              'Chloroplasts: photosynthesis in plant cells',
              'Vacuoles: storage (large in plants, small in animals)',
              'Cell wall: structural support and protection (plants/fungi)',
              'Cell membrane: controls what enters and leaves cell'
            ]
          },
          {
            title: 'Microscopy and Magnification',
            content: 'Microscopes magnify small objects to make them visible. Different types of microscopes provide different levels of detail and magnification.',
            keyFormulas: [
              'Total magnification = eyepiece magnification × objective magnification',
              'Actual size = image size / magnification',
              'Magnification = image size / actual size',
              'Resolution: ability to distinguish between two close points'
            ],
            examples: [
              'Light microscope: up to 1500× magnification, sees living cells',
              'Electron microscope: up to 500,000× magnification, dead specimens only',
              'Eyepiece typically ×10, objectives ×4, ×10, ×40, ×100',
              'If image is 50mm and magnification ×1000, actual size = 0.05mm',
              'Staining improves contrast (methylene blue, iodine)'
            ]
          },
          {
            title: 'Cell Division and Mitosis',
            content: 'Cell division produces new cells for growth and repair. Mitosis ensures each new cell receives identical genetic information.',
            keyFormulas: [
              'Cell cycle: G1 → S → G2 → Mitosis → Cytokinesis',
              'Mitosis stages: Prophase → Metaphase → Anaphase → Telophase',
              'DNA replication occurs during S phase',
              'Chromosome number maintained in daughter cells'
            ],
            examples: [
              'Growth: multicellular organisms increase size through cell division',
              'Repair: replacing damaged or dead cells',
              'Asexual reproduction: some organisms reproduce by mitosis',
              'Cancer: uncontrolled cell division due to DNA damage',
              'Prophase: chromosomes condense, nuclear membrane breaks down',
              'Metaphase: chromosomes align at cell center',
              'Anaphase: chromosomes separate to opposite poles',
              'Telophase: nuclear membranes reform, chromosomes unwind'
            ]
          },
          {
            title: 'Stem Cells and Differentiation',
            content: 'Stem cells are unspecialized cells that can develop into many different cell types. They are crucial for development, growth, and repair.',
            examples: [
              'Embryonic stem cells: can become any type of cell (totipotent)',
              'Adult stem cells: limited to certain cell types (multipotent)',
              'Differentiation: process of becoming specialized',
              'Bone marrow: produces blood cells',
              'Plant meristems: growing tips of roots and shoots',
              'Medical applications: treating diseases, growing organs',
              'Ethical considerations: use of embryonic stem cells'
            ]
          },
          {
            title: 'Cell Transport Mechanisms',
            content: 'Substances move in and out of cells through various mechanisms. Some require energy (active transport) while others do not (passive transport).',
            keyFormulas: [
              'Diffusion: high to low concentration (passive)',
              'Osmosis: water movement through partially permeable membrane',
              'Active transport: low to high concentration (requires energy)',
              'Rate affected by: concentration gradient, temperature, surface area'
            ],
            examples: [
              'Oxygen diffusion: from lungs into blood, blood into tissues',
              'Osmosis in plants: water uptake by roots, turgor pressure',
              'Active transport: mineral uptake by roots against concentration gradient',
              'Glucose absorption: from intestine into blood using energy',
              'Gas exchange: CO₂ and O₂ movement in lungs',
              'Water regulation: kidney function, maintaining blood concentration'
            ]
          },
          {
            title: 'Cell Specialization',
            content: 'Multicellular organisms have specialized cells adapted for specific functions. Structure relates directly to function.',
            examples: [
              'Red blood cells: no nucleus, biconcave shape for oxygen transport',
              'Nerve cells: long projections for rapid signal transmission',
              'Muscle cells: contain protein filaments for contraction',
              'Root hair cells: increased surface area for water absorption',
              'Palisade cells: packed with chloroplasts for photosynthesis',
              'Sperm cells: flagellum for swimming, mitochondria for energy',
              'White blood cells: flexible shape for engulfing pathogens'
            ]
          }
        ],
        commonMistakes: [
          'Confusing plant and animal cell features',
          'Mixing up magnification and resolution concepts',
          'Not understanding that electron microscopes kill specimens',
          'Forgetting that osmosis is specifically water movement',
          'Assuming all transport requires energy - diffusion is passive',
          'Confusing mitosis with meiosis (which produces gametes)',
          'Not relating cell structure to function'
        ],
        realWorldApplications: [
          'Medical research: understanding diseases at cellular level',
          'Cancer treatment: targeting rapidly dividing cells',
          'Stem cell therapy: treating spinal injuries, blood disorders',
          'Drug development: testing effects on cell cultures',
          'Tissue engineering: growing replacement organs',
          'Biotechnology: using cells to produce medicines',
          'Food preservation: controlling microbial cell growth'
        ],
        practiceQuestions: [
          {
            question: 'Name three organelles found in plant cells but not animal cells.',
            answer: 'Cell wall, chloroplasts, large permanent vacuole',
            explanation: 'These organelles are unique to plant cells and relate to their autotrophic lifestyle and structural needs',
            difficulty: 'Easy'
          },
          {
            question: 'Calculate total magnification if eyepiece is ×10 and objective is ×40.',
            answer: '×400',
            explanation: 'Total magnification = eyepiece × objective = 10 × 40 = 400',
            difficulty: 'Easy'
          },
          {
            question: 'Explain why red blood cells have no nucleus.',
            answer: 'More space for hemoglobin to carry oxygen efficiently',
            explanation: 'Structure relates to function - removing nucleus maximizes oxygen-carrying capacity',
            difficulty: 'Medium'
          },
          {
            question: 'Describe what happens during osmosis.',
            answer: 'Water moves from high to low water concentration through partially permeable membrane',
            explanation: 'Osmosis is passive movement of water down its concentration gradient',
            difficulty: 'Medium'
          },
          {
            question: 'Why do root hair cells have a large surface area?',
            answer: 'To maximize water and mineral absorption from soil',
            explanation: 'Large surface area increases contact with soil for efficient absorption',
            difficulty: 'Medium'
          },
          {
            question: 'Compare the advantages and disadvantages of light vs electron microscopes.',
            answer: 'Light: living specimens, color, cheaper. Electron: higher magnification/resolution, expensive, dead only',
            explanation: 'Each microscope type has specific uses depending on what information is needed',
            difficulty: 'Hard'
          }
        ],
        furtherReading: [
          'Khan Academy: Cell structure and function',
          'BBC Bitesize: Cells and microscopy',
          'Biology Online: Cell biology fundamentals',
          'National Geographic: Cells and life processes',
          'OpenStax: Biology - The cellular foundation of life'
        ]
      }
    },
    'human-body-systems': {
      title: 'Human Body Systems',
      description: 'Study major body systems and their coordination.',
      duration: '5-6 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Cell Biology'],
      learningObjectives: [
        'Understand digestive system processes',
        'Study respiratory system function',
        'Explore circulatory system components',
        'Understand nervous system coordination',
        'Study excretory system',
        'Apply knowledge to health'
      ],
      keyTopics: [
        'Digestive system and enzymes',
        'Respiratory system and gas exchange',
        'Circulatory system and blood',
        'Nervous system and reflexes',
        'Kidney function and excretion',
        'Hormonal coordination',
        'Disease and immunity'
      ],
      practiceAreas: [
        'System diagrams',
        'Process explanations',
        'Health applications',
        'Enzyme investigations',
        'System interactions'
      ],
      examTips: [
        'Learn system functions',
        'Practice diagram labeling',
        'Understand processes',
        'Know health applications',
        'Apply system knowledge'
      ],
      detailedContent: {
        introduction: 'Human body systems work together to maintain life and respond to environmental changes. Understanding how these systems function individually and coordinate with each other is fundamental to biology and health sciences. This topic covers the major body systems including digestive, respiratory, circulatory, and nervous systems, exploring their structures, functions, and interconnections.',
        conceptExplanations: [
          {
            title: 'Digestive System and Nutrition',
            content: 'The digestive system breaks down food into smaller molecules that can be absorbed and used by the body. It consists of the alimentary canal (mouth, esophagus, stomach, small intestine, large intestine) and associated organs (liver, pancreas, gallbladder). Mechanical digestion physically breaks down food, while chemical digestion uses enzymes to break molecular bonds.',
            examples: [
              'Mouth: mechanical breakdown and salivary amylase begins starch digestion',
              'Stomach: protein digestion by pepsin in acidic conditions (pH 1-2)',
              'Small intestine: main site of absorption, villi increase surface area',
              'Large intestine: water absorption and formation of feces',
              'Liver: produces bile for fat emulsification and detoxification',
              'Pancreas: produces digestive enzymes and insulin'
            ]
          },
          {
            title: 'Respiratory System and Gas Exchange',
            content: 'The respiratory system facilitates gas exchange between the body and environment. Oxygen is taken in and carbon dioxide is removed through breathing. The system includes the nose, trachea, bronchi, bronchioles, and alveoli. Gas exchange occurs at the alveoli through diffusion.',
            examples: [
              'Alveoli: thin walls (one cell thick) for efficient gas exchange',
              'Large surface area: millions of alveoli increase exchange efficiency',
              'Rich blood supply: maintains concentration gradients',
              'Ventilation: breathing movements maintain fresh air supply',
              'Hemoglobin: carries oxygen in red blood cells',
              'Control: medulla oblongata regulates breathing rate'
            ]
          },
          {
            title: 'Circulatory System and Blood',
            content: 'The circulatory system transports materials around the body using blood as the transport medium. It consists of the heart (pump), blood vessels (arteries, veins, capillaries), and blood (plasma, red blood cells, white blood cells, platelets). The heart has four chambers and pumps blood in a double circulation system.',
            examples: [
              'Heart structure: four chambers with valves preventing backflow',
              'Arteries: thick walls, carry blood away from heart under high pressure',
              'Veins: thin walls with valves, return blood to heart under low pressure',
              'Capillaries: one cell thick, site of material exchange',
              'Blood composition: plasma (55%), red blood cells, white blood cells, platelets',
              'Double circulation: pulmonary (heart-lungs) and systemic (heart-body)'
            ]
          },
          {
            title: 'Nervous System and Coordination',
            content: 'The nervous system coordinates responses to stimuli and maintains homeostasis. It consists of the central nervous system (brain and spinal cord) and peripheral nervous system (nerves). Neurons transmit electrical impulses, and synapses allow communication between neurons using neurotransmitters.',
            examples: [
              'Neuron structure: cell body, dendrites, axon, and nerve terminals',
              'Reflex arc: receptor → sensory neuron → relay neuron → motor neuron → effector',
              'Brain functions: cerebrum (thinking), cerebellum (balance), medulla (vital functions)',
              'Synapses: gaps between neurons bridged by neurotransmitters',
              'Hormonal coordination: endocrine system works with nervous system',
              'Homeostasis: maintaining constant internal environment'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Explain how the structure of the small intestine is adapted for absorption.',
            answer: 'Villi and microvilli increase surface area, thin walls for short diffusion distance, rich blood supply maintains gradients, large number of mitochondria for active transport',
            explanation: 'Multiple adaptations work together to maximize absorption efficiency',
            difficulty: 'Medium'
          },
          {
            question: 'Describe the pathway of air from the nose to the alveoli.',
            answer: 'Nose → trachea → bronchi → bronchioles → alveoli',
            explanation: 'Air passes through progressively smaller tubes, getting filtered and warmed',
            difficulty: 'Easy'
          },
          {
            question: 'Compare the structure and function of arteries and veins.',
            answer: 'Arteries: thick muscular walls, high pressure, carry oxygenated blood from heart. Veins: thin walls with valves, low pressure, carry deoxygenated blood to heart',
            explanation: 'Structure reflects function - arteries withstand pressure, veins prevent backflow',
            difficulty: 'Medium'
          },
          {
            question: 'Explain how a reflex action protects the body.',
            answer: 'Automatic, rapid response bypassing conscious thought. Stimulus → receptor → sensory neuron → spinal cord → motor neuron → effector muscle → response',
            explanation: 'Speed is crucial for protection - bypassing the brain saves time',
            difficulty: 'Hard'
          }
        ],
        realWorldApplications: [
          'Medical diagnosis: understanding symptoms helps doctors identify system problems',
          'Exercise physiology: knowing how systems respond to activity improves fitness',
          'Nutrition: understanding digestion helps plan healthy diets',
          'Disease prevention: knowledge of how systems work helps prevent illness',
          'Drug development: targeting specific systems and processes',
          'First aid: understanding body systems helps in emergency situations'
        ],
        commonMistakes: [
          'Confusing arteries and veins - remember arteries go Away from heart',
          'Thinking digestion only happens in stomach - most occurs in small intestine',
          'Forgetting that alveoli walls are one cell thick for efficient gas exchange',
          'Mixing up nervous and hormonal coordination - nervous is fast, hormonal is slow',
          'Not understanding that reflexes bypass the brain for speed',
          'Thinking all blood in arteries is oxygenated - pulmonary artery carries deoxygenated blood'
        ],
        furtherReading: [
          'Khan Academy: Human biology and medicine',
          'BBC Bitesize: Human body systems',
          'Crash Course: Anatomy and Physiology',
          'National Geographic: The human body',
          'OpenStax: Anatomy and Physiology textbook'
        ]
      }
    },
    'plant-biology-and-photosynthesis': {
      title: 'Plant Biology and Photosynthesis',
      description: 'Explore plant structure, photosynthesis, and plant transport.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Cell Biology'],
      learningObjectives: [
        'Understand plant cell structure',
        'Study photosynthesis process',
        'Explore plant transport systems',
        'Understand plant responses',
        'Study plant reproduction',
        'Apply plant biology concepts'
      ],
      keyTopics: [
        'Plant cell structure and tissues',
        'Photosynthesis and chloroplasts',
        'Factors affecting photosynthesis',
        'Transpiration and water transport',
        'Plant hormones and responses',
        'Plant reproduction',
        'Plant adaptations'
      ],
      practiceAreas: [
        'Photosynthesis experiments',
        'Plant transport studies',
        'Factor investigations',
        'Adaptation analysis',
        'Plant response experiments'
      ],
      examTips: [
        'Learn photosynthesis equation',
        'Understand limiting factors',
        'Know transport mechanisms',
        'Practice plant diagrams',
        'Apply adaptation concepts'
      ],
      detailedContent: {
        introduction: 'Plant biology encompasses the study of plant structure, function, and processes that enable plants to survive and thrive. Photosynthesis is the fundamental process that converts light energy into chemical energy, supporting virtually all life on Earth. Understanding plant transport systems, responses, and adaptations provides insights into how plants have evolved to occupy diverse environments.',
        conceptExplanations: [
          {
            title: 'Plant Cell Structure and Organization',
            content: 'Plant cells have unique structures that distinguish them from animal cells. The cell wall provides structural support, chloroplasts enable photosynthesis, and the large vacuole maintains turgor pressure. Plant tissues are organized into different systems for specific functions: dermal (protection), vascular (transport), and ground tissue (photosynthesis and storage).',
            examples: [
              'Cell wall: cellulose fibers provide strength and shape',
              'Chloroplasts: contain chlorophyll for light capture and photosynthesis',
              'Vacuole: maintains cell turgor and stores substances',
              'Xylem tissue: transports water and minerals from roots to leaves',
              'Phloem tissue: transports sugars from leaves to other parts',
              'Guard cells: control stomatal opening for gas exchange'
            ]
          },
          {
            title: 'Photosynthesis Process and Factors',
            content: 'Photosynthesis occurs in two stages: light-dependent reactions (in thylakoids) and light-independent reactions (Calvin cycle in stroma). The overall equation is 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Rate of photosynthesis is affected by limiting factors including light intensity, carbon dioxide concentration, and temperature.',
            examples: [
              'Light reactions: chlorophyll absorbs light, water splits, oxygen released',
              'Calvin cycle: CO₂ fixed into glucose using ATP and NADPH',
              'Limiting factors: increase until another factor becomes limiting',
              'Light compensation point: where photosynthesis equals respiration',
              'Chlorophyll a and b: absorb different wavelengths of light',
              'Temperature optimum: around 25°C for most plants'
            ]
          },
          {
            title: 'Plant Transport Systems',
            content: 'Plants transport materials through two main systems: xylem (water and minerals upward) and phloem (sugars and organic compounds). Transpiration drives water movement through the plant, while translocation moves sugars from sources (leaves) to sinks (roots, fruits). Root pressure and cohesion-tension theory explain water transport mechanisms.',
            examples: [
              'Transpiration: water evaporation from leaves creates suction',
              'Cohesion: water molecules stick together forming continuous column',
              'Root pressure: active transport creates pressure in xylem',
              'Translocation: active process requiring energy (ATP)',
              'Source to sink: sugars move from production sites to use/storage sites',
              'Stomatal control: balances water loss with CO₂ uptake'
            ]
          },
          {
            title: 'Plant Responses and Hormones',
            content: 'Plants respond to environmental stimuli through tropisms (growth responses) and hormonal coordination. Auxins control cell elongation and tropisms, gibberellins promote stem elongation, cytokinins stimulate cell division, and abscisic acid regulates stomatal closure and dormancy. These responses help plants optimize resource capture and survival.',
            examples: [
              'Phototropism: growth toward light (auxin redistribution)',
              'Gravitropism: root growth downward, shoot growth upward',
              'Auxin: produced in shoot tips, causes cell elongation',
              'Gibberellins: promote stem elongation and seed germination',
              'Cytokinins: stimulate cell division in roots and shoots',
              'Abscisic acid: closes stomata during water stress'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Write the balanced equation for photosynthesis and explain each component.',
            answer: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. CO₂ from air, H₂O from roots, light captured by chlorophyll, glucose produced for energy, O₂ released as waste',
            explanation: 'Understanding the equation helps explain how plants make food and produce oxygen',
            difficulty: 'Medium'
          },
          {
            question: 'Explain how the structure of a leaf is adapted for photosynthesis.',
            answer: 'Broad surface for light capture, thin for short diffusion distance, palisade cells packed with chloroplasts, stomata for gas exchange, vascular bundles for transport',
            explanation: 'Multiple adaptations work together to maximize photosynthetic efficiency',
            difficulty: 'Medium'
          },
          {
            question: 'Describe how water moves from soil to leaves in a plant.',
            answer: 'Root hairs absorb water → xylem vessels → stem → leaves → transpiration from stomata creates suction → cohesion-tension pulls water column upward',
            explanation: 'Transpiration provides the driving force for water transport',
            difficulty: 'Hard'
          },
          {
            question: 'What happens to a plant shoot when it grows toward light?',
            answer: 'Auxin accumulates on shaded side, causes cells to elongate more, shoot bends toward light source (phototropism)',
            explanation: 'Unequal growth creates bending response toward stimulus',
            difficulty: 'Medium'
          }
        ],
        realWorldApplications: [
          'Agriculture: optimizing crop growth through understanding plant needs',
          'Greenhouse design: controlling light, temperature, and CO₂ for maximum yield',
          'Plant breeding: developing varieties with improved photosynthetic efficiency',
          'Environmental monitoring: plants as indicators of ecosystem health',
          'Biofuels: using plant photosynthesis to produce renewable energy',
          'Urban planning: using plants for air purification and carbon sequestration'
        ],
        commonMistakes: [
          'Thinking photosynthesis only happens during the day - plants respire 24/7',
          'Confusing photosynthesis and respiration - they are opposite processes',
          'Forgetting that xylem transports water UP and phloem transports sugars in both directions',
          'Not understanding limiting factors - only one factor limits rate at a time',
          'Thinking chloroplasts are only in leaves - they are in all green parts',
          'Confusing transpiration (water loss) with respiration (gas exchange)'
        ],
        furtherReading: [
          'Khan Academy: Photosynthesis and plant biology',
          'BBC Bitesize: Plant structure and photosynthesis',
          'National Geographic: The secret life of plants',
          'Botanical Society: Plant science resources',
          'OpenStax: Biology - Photosynthesis and plant processes'
        ]
      }
    },
    'genetics-and-inheritance': {
      title: 'Genetics and Inheritance',
      description: 'Master DNA structure, genetics, and inheritance patterns.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Cell Biology'],
      learningObjectives: [
        'Understand DNA structure and function',
        'Apply genetic inheritance patterns',
        'Study variation and mutation',
        'Understand genetic engineering',
        'Explore human genetics',
        'Apply genetic principles'
      ],
      keyTopics: [
        'DNA structure and replication',
        'Genes, alleles, and chromosomes',
        'Monohybrid and dihybrid crosses',
        'Sex determination and sex-linked traits',
        'Variation and mutation',
        'Genetic engineering and ethics',
        'Human genetic disorders'
      ],
      practiceAreas: [
        'Genetic cross calculations',
        'Pedigree analysis',
        'DNA structure models',
        'Variation studies',
        'Genetic engineering debates'
      ],
      examTips: [
        'Practice genetic crosses',
        'Understand inheritance patterns',
        'Learn DNA structure',
        'Know genetic terminology',
        'Apply probability concepts'
      ],
      detailedContent: {
        introduction: 'Genetics is the study of heredity and variation in living organisms. It explores how traits are passed from parents to offspring through DNA, genes, and chromosomes. Understanding genetic principles helps explain biological diversity, inheritance patterns, and the molecular basis of life. This knowledge is fundamental to medicine, agriculture, and biotechnology.',
        conceptExplanations: [
          {
            title: 'DNA Structure and Function',
            content: 'DNA (deoxyribonucleic acid) is the hereditary material in organisms. It has a double helix structure with complementary base pairing (A-T, G-C). The sequence of bases encodes genetic information. DNA replication is semi-conservative, producing two identical copies. Genes are specific sequences of DNA that code for proteins or RNA molecules.',
            examples: [
              'Double helix: two antiparallel strands twisted around each other',
              'Base pairing: adenine pairs with thymine, guanine pairs with cytosine',
              'Semi-conservative replication: each new DNA molecule has one old and one new strand',
              'Gene expression: DNA → RNA → protein (central dogma)',
              'Chromosomes: DNA molecules containing many genes',
              'Mutations: changes in DNA sequence that can affect protein function'
            ]
          },
          {
            title: 'Mendelian Inheritance Patterns',
            content: 'Gregor Mendel discovered the basic principles of inheritance. Genes exist in different versions called alleles. Dominant alleles mask recessive alleles in heterozygotes. The law of segregation states that allele pairs separate during gamete formation. The law of independent assortment applies to genes on different chromosomes.',
            examples: [
              'Monohybrid cross: studying inheritance of one trait (e.g., Aa × Aa)',
              'Phenotype: observable characteristics (e.g., brown eyes)',
              'Genotype: genetic makeup (e.g., BB, Bb, bb)',
              'Dominant alleles: expressed in heterozygotes (usually uppercase)',
              'Recessive alleles: only expressed in homozygotes (usually lowercase)',
              'Punnett squares: predict offspring ratios from genetic crosses'
            ]
          },
          {
            title: 'Chromosomes and Sex Determination',
            content: 'Chromosomes carry genes and come in homologous pairs. Humans have 46 chromosomes (23 pairs). Sex chromosomes (X and Y) determine gender, while autosomes carry other traits. Sex-linked traits are carried on sex chromosomes and show different inheritance patterns between males and females.',
            examples: [
              'Human chromosomes: 22 pairs of autosomes + 1 pair of sex chromosomes',
              'Female: XX (homogametic), Male: XY (heterogametic)',
              'X-linked traits: more common in males (hemizygous)',
              'Carrier females: heterozygous for X-linked recessive traits',
              'Y-linked traits: passed from father to son only',
              'Karyotype: organized display of all chromosomes'
            ]
          },
          {
            title: 'Genetic Variation and Mutations',
            content: 'Genetic variation arises through sexual reproduction, crossing over, and mutations. Mutations are changes in DNA sequence that can be beneficial, harmful, or neutral. They provide raw material for evolution. Environmental factors can also influence gene expression without changing DNA sequence (epigenetics).',
            examples: [
              'Point mutations: single base changes (substitutions)',
              'Insertion/deletion mutations: adding or removing bases',
              'Chromosomal mutations: changes in chromosome structure or number',
              'Mutagens: factors that increase mutation rate (UV, chemicals)',
              'Beneficial mutations: provide survival advantage',
              'Genetic disorders: caused by harmful mutations'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'In a monohybrid cross between two heterozygotes (Aa × Aa), what are the expected phenotypic and genotypic ratios?',
            answer: 'Phenotypic ratio: 3:1 (dominant:recessive). Genotypic ratio: 1:2:1 (AA:Aa:aa)',
            explanation: 'Punnett square shows all possible combinations of alleles from each parent',
            difficulty: 'Medium'
          },
          {
            question: 'Why are males more likely to be colorblind than females?',
            answer: 'Colorblindness is X-linked recessive. Males only have one X chromosome, so one recessive allele causes the condition. Females need two recessive alleles',
            explanation: 'Sex-linked inheritance patterns differ between males and females',
            difficulty: 'Medium'
          },
          {
            question: 'Explain the difference between genotype and phenotype with an example.',
            answer: 'Genotype is genetic makeup (e.g., Bb), phenotype is observable trait (e.g., brown eyes). Same phenotype can have different genotypes (BB and Bb both give brown eyes)',
            explanation: 'Genotype determines phenotype, but the relationship can be complex',
            difficulty: 'Easy'
          },
          {
            question: 'What is the significance of DNA being double-stranded?',
            answer: 'Allows complementary base pairing for accurate replication, provides backup copy for repair, enables semi-conservative replication, and maintains genetic stability',
            explanation: 'Double-stranded structure is crucial for DNA function and stability',
            difficulty: 'Hard'
          }
        ],
        realWorldApplications: [
          'Medical genetics: diagnosing and treating genetic disorders',
          'Agriculture: breeding crops and livestock for desired traits',
          'Forensics: DNA fingerprinting for criminal investigations',
          'Paternity testing: determining biological relationships',
          'Gene therapy: treating diseases by correcting genetic defects',
          'Genetic counseling: helping families understand inheritance risks'
        ],
        commonMistakes: [
          'Confusing genotype and phenotype - remember genotype is the genetic code',
          'Thinking dominant traits are more common - dominance refers to expression, not frequency',
          'Forgetting that males are hemizygous for X-linked traits',
          'Not understanding that crossing over increases genetic variation',
          'Confusing DNA replication with transcription and translation',
          'Thinking all mutations are harmful - many are neutral or beneficial'
        ],
        furtherReading: [
          'Khan Academy: Classical and molecular genetics',
          'BBC Bitesize: Genetics and inheritance',
          'National Human Genome Research Institute: Genetics resources',
          'Genetics Home Reference: Understanding genetics',
          'OpenStax: Biology - Genetics and heredity'
        ]
      }
    },
    'evolution-and-natural-selection': {
      title: 'Evolution and Natural Selection',
      description: 'Study evolutionary theory, natural selection, and speciation.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Genetics and Inheritance'],
      learningObjectives: [
        'Understand natural selection theory',
        'Study evidence for evolution',
        'Explore adaptation mechanisms',
        'Understand speciation processes',
        'Study human evolution',
        'Apply evolutionary concepts'
      ],
      keyTopics: [
        'Darwin\'s theory of evolution',
        'Natural selection mechanisms',
        'Evidence for evolution',
        'Adaptation and survival',
        'Speciation and biodiversity',
        'Human evolution',
        'Antibiotic resistance'
      ],
      practiceAreas: [
        'Natural selection examples',
        'Evolutionary evidence analysis',
        'Adaptation studies',
        'Speciation mechanisms',
        'Human evolution timeline'
      ],
      examTips: [
        'Understand selection pressures',
        'Know evolution evidence',
        'Learn adaptation examples',
        'Practice evolution explanations',
        'Apply concepts to examples'
      ],
      detailedContent: {
        introduction: 'Evolution is the change in heritable traits of biological populations over successive generations. Charles Darwin\'s theory of natural selection explains how species change over time through differential survival and reproduction. Understanding evolution is fundamental to biology, medicine, and conservation, explaining the diversity of life and ongoing changes in species.',
        conceptExplanations: [
          {
            title: 'Darwin\'s Theory of Natural Selection',
            content: 'Natural selection is the mechanism by which organisms with favorable traits are more likely to survive and reproduce. Darwin proposed that variation exists within populations, traits are heritable, more offspring are produced than can survive, and those with advantageous traits have greater reproductive success. This leads to gradual change in populations over time.',
            examples: [
              'Variation: individuals in a population differ in traits',
              'Inheritance: traits are passed from parents to offspring',
              'Selection pressure: environmental factors that affect survival',
              'Differential reproduction: some individuals produce more offspring',
              'Adaptation: traits that increase survival and reproduction',
              'Time: evolutionary changes occur over many generations'
            ]
          },
          {
            title: 'Evidence for Evolution',
            content: 'Multiple lines of evidence support evolutionary theory. Fossil records show progression of life forms over time. Comparative anatomy reveals homologous structures indicating common ancestry. Molecular biology shows genetic similarities between related species. Biogeography explains distribution patterns of species.',
            examples: [
              'Fossils: transitional forms like Archaeopteryx (bird-reptile link)',
              'Homologous structures: pentadactyl limb in mammals',
              'Vestigial organs: appendix, wisdom teeth in humans',
              'DNA similarities: humans share 98% DNA with chimpanzees',
              'Embryology: similar developmental stages in vertebrates',
              'Biogeography: marsupials isolated in Australia'
            ]
          },
          {
            title: 'Types of Natural Selection',
            content: 'Natural selection can take different forms depending on which traits are favored. Directional selection favors one extreme, stabilizing selection favors intermediate traits, and disruptive selection favors both extremes. Sexual selection involves traits that increase mating success rather than survival.',
            examples: [
              'Directional: peppered moths becoming darker during industrial pollution',
              'Stabilizing: human birth weight - very large or small babies less likely to survive',
              'Disruptive: bird beak sizes adapted to different food sources',
              'Sexual selection: peacock tail feathers attract mates despite survival cost',
              'Frequency-dependent: rare traits may have advantage',
              'Balancing selection: maintains multiple alleles in population'
            ]
          },
          {
            title: 'Speciation and Biodiversity',
            content: 'Speciation is the formation of new species when populations become reproductively isolated. Geographic isolation (allopatric speciation) is common, but species can also form without geographic barriers (sympatric speciation). Adaptive radiation occurs when one species diversifies into many species in different ecological niches.',
            examples: [
              'Allopatric speciation: geographic barriers separate populations',
              'Sympatric speciation: chromosome changes create reproductive isolation',
              'Adaptive radiation: Darwin\'s finches on Galapagos Islands',
              'Ring species: populations at ends of range cannot interbreed',
              'Polyploidy: chromosome duplication creates new plant species',
              'Ecological speciation: adaptation to different environments'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Explain how antibiotic resistance in bacteria is an example of natural selection.',
            answer: 'Some bacteria have random mutations conferring resistance. When antibiotics are used, susceptible bacteria die but resistant ones survive and reproduce. Over time, resistant bacteria become more common in the population',
            explanation: 'This demonstrates natural selection in action - differential survival based on inherited traits',
            difficulty: 'Medium'
          },
          {
            question: 'What evidence suggests that whales evolved from land mammals?',
            answer: 'Fossil evidence shows transitional forms with legs, homologous bone structures with land mammals, vestigial pelvic bones, and molecular evidence showing closest relatives are hippos',
            explanation: 'Multiple lines of evidence converge to support this evolutionary relationship',
            difficulty: 'Hard'
          },
          {
            question: 'How do Darwin\'s finches demonstrate adaptive radiation?',
            answer: 'One ancestral species colonized Galapagos, then diversified into multiple species with different beak shapes adapted to different food sources (seeds, insects, nectar)',
            explanation: 'Shows how one species can diversify to exploit different ecological niches',
            difficulty: 'Medium'
          },
          {
            question: 'Why is the fossil record considered strong evidence for evolution?',
            answer: 'Shows progression from simple to complex life forms over time, transitional fossils link major groups, and sequence matches predictions from other evidence',
            explanation: 'Fossils provide direct historical evidence of evolutionary change',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'Medicine: understanding pathogen evolution and antibiotic resistance',
          'Agriculture: breeding crops and livestock for improved traits',
          'Conservation: protecting species and maintaining genetic diversity',
          'Pest control: managing resistance in agricultural pests',
          'Vaccine development: tracking viral evolution and antigenic drift',
          'Biotechnology: using evolutionary principles in directed evolution'
        ],
        commonMistakes: [
          'Thinking evolution is "just a theory" - scientific theories are well-supported explanations',
          'Believing evolution has a goal or direction - it\'s driven by natural selection, not purpose',
          'Confusing individual adaptation with evolutionary adaptation',
          'Thinking humans evolved from modern apes - we share common ancestors',
          'Believing evolution violates thermodynamics - evolution increases local order using energy',
          'Thinking transitional fossils are missing - many excellent examples exist'
        ],
        furtherReading: [
          'Khan Academy: Evolution and natural selection',
          'BBC Bitesize: Evolution, inheritance and variation',
          'Berkeley Evolution 101: Introduction to evolution',
          'National Geographic: Darwin and evolution',
          'OpenStax: Biology - Evolution and diversity'
        ]
      }
    },
    'ecology-and-environmental-science': {
      title: 'Ecology and Environmental Science',
      description: 'Explore ecosystems, biodiversity, and environmental impact.',
      duration: '4-5 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['All previous modules'],
      learningObjectives: [
        'Understand ecosystem structure',
        'Study biodiversity and conservation',
        'Explore human environmental impact',
        'Understand pollution effects',
        'Study sustainable development',
        'Apply ecological principles'
      ],
      keyTopics: [
        'Ecosystems and food webs',
        'Biodiversity and conservation',
        'Human impact on environment',
        'Pollution and its effects',
        'Global warming and climate change',
        'Sustainable development',
        'Conservation strategies'
      ],
      practiceAreas: [
        'Ecosystem analysis',
        'Food web construction',
        'Environmental impact assessment',
        'Conservation planning',
        'Sustainability projects'
      ],
      examTips: [
        'Understand ecosystem concepts',
        'Learn conservation strategies',
        'Know environmental impacts',
        'Practice ecosystem diagrams',
        'Apply sustainability principles'
      ],
      detailedContent: {
        introduction: 'Ecology studies the interactions between organisms and their environment, including relationships between living things and their physical surroundings. Environmental science examines human impact on natural systems and develops solutions for environmental problems. Understanding these connections is crucial for conservation, sustainability, and addressing global challenges like climate change.',
        conceptExplanations: [
          {
            title: 'Ecosystem Structure and Function',
            content: 'Ecosystems consist of biotic (living) and abiotic (non-living) components that interact through energy flow and nutrient cycling. Producers (plants) capture energy through photosynthesis, primary consumers (herbivores) eat plants, secondary consumers (carnivores) eat other animals, and decomposers break down dead organic matter.',
            examples: [
              'Producers: plants, algae, and some bacteria using photosynthesis',
              'Primary consumers: rabbits, deer, caterpillars eating plants',
              'Secondary consumers: foxes, hawks, frogs eating other animals',
              'Decomposers: bacteria and fungi breaking down dead material',
              'Food chains: linear energy transfer (grass → rabbit → fox)',
              'Food webs: complex interconnected feeding relationships'
            ]
          },
          {
            title: 'Biodiversity and Conservation',
            content: 'Biodiversity encompasses genetic diversity within species, species diversity within ecosystems, and ecosystem diversity across landscapes. Higher biodiversity generally increases ecosystem stability and resilience. Human activities threaten biodiversity through habitat destruction, pollution, climate change, and overexploitation.',
            examples: [
              'Genetic diversity: variations within a species population',
              'Species diversity: number and variety of species in an area',
              'Ecosystem diversity: variety of habitats and ecological processes',
              'Keystone species: disproportionate impact on ecosystem structure',
              'Endemic species: found only in specific geographic areas',
              'Extinction rates: currently 100-1000 times natural background rate'
            ]
          },
          {
            title: 'Human Environmental Impact',
            content: 'Human activities significantly alter natural systems through resource extraction, agriculture, urbanization, and industrial processes. These activities can lead to habitat destruction, pollution, climate change, and biodiversity loss. The ecological footprint measures human demand on natural resources.',
            examples: [
              'Deforestation: clearing forests for agriculture and development',
              'Pollution: air, water, and soil contamination from human activities',
              'Overfishing: depleting fish populations beyond sustainable levels',
              'Urbanization: converting natural habitats to cities and infrastructure',
              'Agriculture: monocultures and pesticide use affecting ecosystems',
              'Carbon footprint: greenhouse gas emissions from human activities'
            ]
          },
          {
            title: 'Climate Change and Global Warming',
            content: 'Climate change refers to long-term shifts in global temperature and weather patterns, primarily caused by increased greenhouse gas concentrations from human activities. Global warming leads to rising sea levels, changing precipitation patterns, extreme weather events, and ecosystem disruption.',
            examples: [
              'Greenhouse gases: CO₂, methane, nitrous oxide trapping heat',
              'Fossil fuels: burning coal, oil, and gas releases CO₂',
              'Deforestation: reduces CO₂ absorption by plants',
              'Rising temperatures: average global temperature increased 1.1°C since 1880',
              'Sea level rise: thermal expansion and melting ice sheets',
              'Extreme weather: more frequent hurricanes, droughts, and floods'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Explain the difference between a food chain and a food web.',
            answer: 'Food chain shows linear energy transfer (A→B→C). Food web shows complex interconnected feeding relationships with multiple paths and interactions between organisms',
            explanation: 'Food webs are more realistic representations of ecosystem feeding relationships',
            difficulty: 'Medium'
          },
          {
            question: 'How does deforestation contribute to climate change?',
            answer: 'Trees absorb CO₂ during photosynthesis. When forests are cut down, this carbon storage is lost and burning/decomposition releases CO₂ back to atmosphere',
            explanation: 'Forests act as carbon sinks - removing them increases atmospheric CO₂',
            difficulty: 'Medium'
          },
          {
            question: 'Why is biodiversity important for ecosystem stability?',
            answer: 'Higher biodiversity provides more species to fill ecological roles, redundancy if species are lost, and greater resilience to environmental changes',
            explanation: 'Diverse ecosystems are more stable and can better withstand disturbances',
            difficulty: 'Hard'
          },
          {
            question: 'What is a keystone species? Give an example.',
            answer: 'Species with disproportionately large impact on ecosystem structure relative to abundance. Example: wolves in Yellowstone controlling deer populations and allowing vegetation recovery',
            explanation: 'Removing keystone species can cause dramatic ecosystem changes',
            difficulty: 'Medium'
          }
        ],
        realWorldApplications: [
          'Conservation planning: protecting endangered species and habitats',
          'Environmental monitoring: tracking ecosystem health and pollution levels',
          'Sustainable agriculture: reducing environmental impact while feeding populations',
          'Climate policy: developing strategies to reduce greenhouse gas emissions',
          'Urban planning: creating green spaces and sustainable cities',
          'Renewable energy: transitioning from fossil fuels to clean energy sources'
        ],
        commonMistakes: [
          'Confusing weather and climate - climate is long-term average weather',
          'Thinking individual actions don\'t matter - collective action creates change',
          'Believing all human environmental impact is negative - sustainable practices exist',
          'Oversimplifying food webs as linear chains',
          'Not understanding that climate change affects all ecosystems globally',
          'Thinking conservation means no human use - sustainable use is possible'
        ],
        furtherReading: [
          'Khan Academy: Ecology and environmental science',
          'BBC Bitesize: Ecosystems and environment',
          'National Geographic: Environment and conservation',
          'NASA Climate Kids: Climate change education',
          'OpenStax: Biology - Ecology and the biosphere'
        ]
      }
    }
  },
  // Continue with other subjects...
  // GCSE Computer Science
  5: {
    'programming-fundamentals-python': {
      title: 'Programming Fundamentals (Python)',
      description: 'Master Python programming basics including syntax, variables, and control structures.',
      duration: '4-5 weeks',
      difficulty: 'Beginner',
      prerequisites: ['Basic computer literacy'],
      learningObjectives: [
        'Understand Python syntax and structure',
        'Work with variables and data types',
        'Apply control structures effectively',
        'Create and use functions',
        'Handle input and output operations',
        'Debug and test programs'
      ],
      keyTopics: [
        'Python syntax and indentation',
        'Variables and data types',
        'Input and output operations',
        'Conditional statements (if/elif/else)',
        'Loops (for and while)',
        'Functions and parameters',
        'Error handling basics'
      ],
      practiceAreas: [
        'Basic program structure',
        'Variable manipulation',
        'Control flow programs',
        'Function creation',
        'Problem-solving exercises'
      ],
      examTips: [
        'Practice syntax regularly',
        'Understand indentation rules',
        'Learn debugging techniques',
        'Master control structures',
        'Write clear, commented code'
      ],
      detailedContent: {
        introduction: 'Python programming fundamentals form the foundation of computer science and software development. Python is a versatile, high-level programming language known for its readability and simplicity. Understanding variables, data types, control structures, and functions is essential for solving computational problems and building applications.',
        conceptExplanations: [
          {
            title: 'Python Syntax and Basic Structure',
            content: 'Python uses indentation to define code blocks, making programs more readable. Every Python program consists of statements executed sequentially. Comments start with # and help document code. Python is case-sensitive and follows specific naming conventions for variables and functions.',
            examples: [
              'Indentation: 4 spaces or 1 tab to define code blocks',
              'Comments: # This is a single-line comment',
              'Case sensitivity: variable and Variable are different',
              'Naming conventions: use snake_case for variables and functions',
              'Line continuation: use \\ to split long lines',
              'Multiple statements: separate with semicolons (not recommended)'
            ]
          },
          {
            title: 'Variables and Data Types',
            content: 'Variables store data values that can be used and modified throughout a program. Python has several built-in data types including integers, floats, strings, and booleans. Variables are created when values are assigned and automatically typed based on the value.',
            examples: [
              'Integer: age = 16 (whole numbers)',
              'Float: height = 5.8 (decimal numbers)',
              'String: name = "Alice" (text in quotes)',
              'Boolean: is_student = True (True or False)',
              'Dynamic typing: same variable can hold different types',
              'Type conversion: int("5") converts string to integer'
            ]
          },
          {
            title: 'Control Structures and Loops',
            content: 'Control structures direct the flow of program execution. Conditional statements (if/elif/else) make decisions based on conditions. Loops repeat code blocks: for loops iterate over sequences, while loops continue until a condition becomes false.',
            examples: [
              'If statement: if age >= 18: print("Adult")',
              'If-else: if score >= 60: print("Pass") else: print("Fail")',
              'For loop: for i in range(5): print(i)',
              'While loop: while count < 10: count += 1',
              'Nested loops: loops inside other loops',
              'Break and continue: control loop execution'
            ]
          },
          {
            title: 'Functions and Parameters',
            content: 'Functions are reusable blocks of code that perform specific tasks. They can accept parameters (inputs) and return values (outputs). Functions help organize code, reduce repetition, and make programs more modular and easier to maintain.',
            examples: [
              'Function definition: def greet(name): return f"Hello, {name}!"',
              'Function call: message = greet("Alice")',
              'Parameters: values passed to functions',
              'Return values: functions can send results back',
              'Local variables: exist only within the function',
              'Global variables: accessible throughout the program'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Write a Python program that calculates the area of a rectangle given length and width.',
            answer: 'length = float(input("Enter length: "))\nwidth = float(input("Enter width: "))\narea = length * width\nprint(f"Area = {area}")',
            explanation: 'Uses input(), type conversion, calculation, and formatted output',
            difficulty: 'Easy'
          },
          {
            question: 'Create a function that determines if a number is even or odd.',
            answer: 'def check_even_odd(number):\n    if number % 2 == 0:\n        return "Even"\n    else:\n        return "Odd"',
            explanation: 'Uses modulo operator (%) to check remainder when divided by 2',
            difficulty: 'Medium'
          },
          {
            question: 'Write a program that prints numbers 1 to 10, but skips 5.',
            answer: 'for i in range(1, 11):\n    if i == 5:\n        continue\n    print(i)',
            explanation: 'Uses for loop with range() and continue statement to skip iteration',
            difficulty: 'Medium'
          },
          {
            question: 'Explain the difference between = and == in Python.',
            answer: '= is assignment operator (assigns values to variables). == is comparison operator (checks if two values are equal and returns True/False)',
            explanation: 'Assignment vs comparison - fundamental distinction in programming',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'Web development: building websites and web applications',
          'Data analysis: processing and analyzing large datasets',
          'Automation: creating scripts to automate repetitive tasks',
          'Game development: creating simple games and interactive applications',
          'Scientific computing: solving mathematical and scientific problems',
          'Artificial intelligence: machine learning and AI applications'
        ],
        commonMistakes: [
          'Forgetting to indent code blocks properly - Python requires consistent indentation',
          'Using = instead of == for comparisons',
          'Forgetting to convert input() to appropriate data type (int, float)',
          'Not closing parentheses, brackets, or quotes',
          'Confusing local and global variables in functions',
          'Using undefined variables or calling functions before defining them'
        ],
        furtherReading: [
          'Python.org: Official Python tutorial',
          'Khan Academy: Intro to programming with Python',
          'BBC Bitesize: Programming with Python',
          'Codecademy: Learn Python course',
          'Real Python: Python basics and tutorials'
        ]
      }
    },
    'computer-systems-and-architecture': {
      title: 'Computer Systems and Architecture',
      description: 'Explore computer hardware, software, and system architecture.',
      duration: '3-4 weeks',
      difficulty: 'Foundation',
      prerequisites: ['Basic computing knowledge'],
      learningObjectives: [
        'Understand computer hardware components',
        'Study CPU architecture and operation',
        'Explore memory hierarchy',
        'Understand operating system functions',
        'Study input/output systems',
        'Apply system architecture concepts'
      ],
      keyTopics: [
        'CPU components and operation',
        'Memory types and hierarchy',
        'Storage devices and systems',
        'Input and output devices',
        'Operating system functions',
        'System software vs application software',
        'Computer performance factors'
      ],
      practiceAreas: [
        'Hardware identification',
        'System specification analysis',
        'Performance calculations',
        'Architecture diagrams',
        'System optimization'
      ],
      examTips: [
        'Learn hardware components',
        'Understand CPU operation',
        'Know memory types',
        'Practice system diagrams',
        'Apply performance concepts'
      ],
      detailedContent: {
        introduction: 'Computer systems and architecture form the foundation of all computing devices. Understanding how hardware components work together and how software interacts with hardware is essential for computer science. This knowledge helps in making informed decisions about system performance, optimization, and troubleshooting.',
        conceptExplanations: [
          {
            title: 'CPU Architecture and Operation',
            content: 'The Central Processing Unit (CPU) is the brain of the computer that executes instructions. It consists of the Arithmetic Logic Unit (ALU) for calculations, Control Unit (CU) for instruction coordination, and registers for temporary data storage. The CPU follows the fetch-decode-execute cycle to process instructions.',
            examples: [
              'Fetch: retrieve instruction from memory',
              'Decode: interpret what the instruction means',
              'Execute: perform the required operation',
              'ALU: performs arithmetic (+, -, ×, ÷) and logical operations (AND, OR, NOT)',
              'Control Unit: coordinates data flow between components',
              'Registers: high-speed storage within CPU (accumulator, program counter)'
            ]
          },
          {
            title: 'Memory Hierarchy and Types',
            content: 'Computer memory is organized in a hierarchy based on speed, capacity, and cost. Primary memory (RAM, ROM) is directly accessible by CPU, while secondary storage (hard drives, SSDs) provides long-term storage. Cache memory provides high-speed access to frequently used data.',
            examples: [
              'RAM (Random Access Memory): volatile, stores running programs and data',
              'ROM (Read Only Memory): non-volatile, stores boot instructions',
              'Cache memory: extremely fast, stores frequently accessed data',
              'Virtual memory: uses hard drive space as extended RAM',
              'Storage hierarchy: Cache > RAM > SSD > HDD (speed decreasing)',
              'Memory addressing: each memory location has unique address'
            ]
          },
          {
            title: 'Input/Output Systems and Devices',
            content: 'Input/Output (I/O) systems allow computers to communicate with the external world. Input devices convert real-world data into digital form, while output devices convert digital data into human-readable form. Device drivers act as translators between hardware and operating system.',
            examples: [
              'Input devices: keyboard, mouse, touchscreen, microphone, camera',
              'Output devices: monitor, printer, speakers, projector',
              'Storage devices: hard drives, SSDs, USB drives, optical discs',
              'Device drivers: software that controls hardware devices',
              'Interrupt handling: CPU responds to device requests',
              'Buffering: temporary storage during data transfer'
            ]
          },
          {
            title: 'Operating Systems and Software',
            content: 'The operating system (OS) manages computer resources and provides interface between user and hardware. System software includes OS, device drivers, and utilities. Application software performs specific tasks for users. The OS handles multitasking, memory management, and file systems.',
            examples: [
              'System software: operating system, device drivers, firmware',
              'Application software: word processors, games, web browsers',
              'Multitasking: running multiple programs simultaneously',
              'File management: organizing and accessing stored data',
              'User interface: command line or graphical interface',
              'Resource allocation: managing CPU time, memory, and devices'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Explain the fetch-decode-execute cycle with an example.',
            answer: 'Fetch: CPU gets instruction from memory. Decode: Control unit interprets instruction (e.g., ADD). Execute: ALU performs addition and stores result. Process repeats for next instruction.',
            explanation: 'This cycle is fundamental to how all computers process instructions',
            difficulty: 'Medium'
          },
          {
            question: 'Why is cache memory faster than RAM?',
            answer: 'Cache memory is located closer to CPU, uses faster memory technology (SRAM vs DRAM), and stores frequently accessed data for quick retrieval',
            explanation: 'Physical proximity and technology differences affect speed',
            difficulty: 'Medium'
          },
          {
            question: 'What is the difference between RAM and ROM?',
            answer: 'RAM is volatile (loses data when power off), read/write, stores running programs. ROM is non-volatile (retains data), read-only, stores permanent instructions like BIOS',
            explanation: 'Volatility and read/write capabilities are key differences',
            difficulty: 'Easy'
          },
          {
            question: 'How does virtual memory work?',
            answer: 'Uses hard drive space as extended RAM. When RAM is full, OS moves less-used data to hard drive (swap file) and retrieves it when needed',
            explanation: 'Allows running more programs than physical RAM capacity',
            difficulty: 'Hard'
          }
        ],
        realWorldApplications: [
          'Computer building: selecting compatible components for custom PCs',
          'System administration: optimizing server performance and resources',
          'Game development: understanding hardware limitations for optimization',
          'Mobile app development: considering device capabilities and constraints',
          'Cloud computing: managing virtual machines and distributed systems',
          'Embedded systems: programming microcontrollers in IoT devices'
        ],
        commonMistakes: [
          'Confusing RAM and storage capacity - they serve different purposes',
          'Thinking faster CPU always means better performance - bottlenecks exist',
          'Not understanding volatile vs non-volatile memory',
          'Confusing bits and bytes - 8 bits = 1 byte',
          'Thinking software and hardware are independent - they work together',
          'Not considering system compatibility when upgrading components'
        ],
        furtherReading: [
          'Khan Academy: Computer science and programming',
          'BBC Bitesize: Computer systems and architecture',
          'How Stuff Works: Inside your computer',
          'TechTerms: Computer hardware glossary',
          'Computer Hope: Hardware and system resources'
        ]
      }
    },
    'algorithms-and-data-structures': {
      title: 'Algorithms and Data Structures',
      description: 'Master fundamental algorithms, sorting, searching, and data structures.',
      duration: '4-5 weeks',
      difficulty: 'Higher',
      prerequisites: ['Programming Fundamentals (Python)'],
      learningObjectives: [
        'Understand algorithmic thinking and design',
        'Implement sorting and searching algorithms',
        'Work with arrays, lists, and stacks',
        'Analyze algorithm efficiency',
        'Apply data structures to problems',
        'Understand algorithm complexity'
      ],
      keyTopics: [
        'Algorithm design principles',
        'Sorting algorithms (bubble, insertion, merge)',
        'Searching algorithms (linear, binary)',
        'Arrays and dynamic arrays',
        'Stacks and queues',
        'Linked lists basics',
        'Algorithm complexity (Big O)'
      ],
      practiceAreas: [
        'Algorithm implementation',
        'Efficiency analysis',
        'Data structure selection',
        'Problem-solving with algorithms',
        'Code optimization'
      ],
      examTips: [
        'Practice algorithm tracing',
        'Understand time complexity',
        'Learn standard algorithms',
        'Practice pseudocode writing',
        'Analyze algorithm efficiency'
      ],
      detailedContent: {
        introduction: 'Algorithms and data structures are fundamental concepts in computer science that enable efficient problem-solving and program optimization. An algorithm is a step-by-step procedure for solving a problem, while data structures organize and store data in computer memory. Understanding these concepts is crucial for writing efficient programs and solving complex computational problems.',
        conceptExplanations: [
          {
            title: 'Algorithm Design and Analysis',
            content: 'Algorithms are systematic approaches to solving problems. Good algorithms should be clear, finite, effective, and efficient. Algorithm analysis involves studying time complexity (how execution time grows with input size) and space complexity (memory usage). Big O notation describes the upper bound of algorithm performance.',
            examples: [
              'Algorithm properties: input, output, definiteness, finiteness, effectiveness',
              'Pseudocode: language-independent algorithm description',
              'Time complexity: O(1) constant, O(n) linear, O(n²) quadratic',
              'Space complexity: additional memory required by algorithm',
              'Big O notation: worst-case scenario analysis',
              'Trade-offs: time vs space, simplicity vs efficiency'
            ]
          },
          {
            title: 'Sorting Algorithms',
            content: 'Sorting algorithms arrange data in a specific order (ascending or descending). Different algorithms have different time complexities and are suitable for different scenarios. Bubble sort is simple but inefficient, insertion sort works well for small datasets, while merge sort is efficient for large datasets.',
            examples: [
              'Bubble sort: O(n²) - repeatedly swaps adjacent elements',
              'Insertion sort: O(n²) - builds sorted array one element at a time',
              'Selection sort: O(n²) - finds minimum and swaps with first element',
              'Merge sort: O(n log n) - divide and conquer approach',
              'Quick sort: O(n log n) average - uses pivot element',
              'Stable sorting: maintains relative order of equal elements'
            ]
          },
          {
            title: 'Searching Algorithms',
            content: 'Searching algorithms find specific elements in data collections. Linear search checks each element sequentially and works on any list. Binary search is much faster but requires sorted data. The choice of algorithm depends on data organization and search frequency.',
            examples: [
              'Linear search: O(n) - checks each element sequentially',
              'Binary search: O(log n) - repeatedly divides search space in half',
              'Prerequisites: binary search requires sorted data',
              'Search efficiency: binary search much faster for large datasets',
              'Best case: element found immediately',
              'Worst case: element not found or at end'
            ]
          },
          {
            title: 'Data Structures Fundamentals',
            content: 'Data structures organize data for efficient access and modification. Arrays store elements in contiguous memory with index-based access. Stacks follow Last-In-First-Out (LIFO) principle, useful for function calls and undo operations. Queues follow First-In-First-Out (FIFO) principle, useful for scheduling and buffering.',
            examples: [
              'Arrays: fixed size, indexed access, O(1) lookup',
              'Dynamic arrays: resizable, automatic memory management',
              'Stacks: push() adds, pop() removes from top',
              'Queues: enqueue() adds to rear, dequeue() removes from front',
              'Linked lists: nodes connected by pointers, dynamic size',
              'Data structure selection: depends on operations needed'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Trace through bubble sort with array [64, 25, 12, 22, 11]. Show the first pass.',
            answer: 'Compare 64,25 → swap → [25,64,12,22,11]. Compare 64,12 → swap → [25,12,64,22,11]. Compare 64,22 → swap → [25,12,22,64,11]. Compare 64,11 → swap → [25,12,22,11,64]',
            explanation: 'Each pass bubbles the largest element to the end',
            difficulty: 'Medium'
          },
          {
            question: 'Why is binary search faster than linear search?',
            answer: 'Binary search eliminates half the remaining elements each step (O(log n)), while linear search checks each element (O(n)). For 1000 elements: binary ~10 steps, linear ~500 steps average',
            explanation: 'Logarithmic growth is much slower than linear growth',
            difficulty: 'Medium'
          },
          {
            question: 'When would you use a stack data structure?',
            answer: 'Function call management, undo operations, expression evaluation, browser back button, parentheses matching - any LIFO scenario',
            explanation: 'LIFO property makes stacks perfect for nested or reversible operations',
            difficulty: 'Easy'
          },
          {
            question: 'What is the time complexity of accessing an element in an array by index?',
            answer: 'O(1) - constant time. Arrays use index arithmetic to calculate memory address directly, regardless of array size',
            explanation: 'Direct memory addressing makes array access very efficient',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'Search engines: indexing and retrieving web pages efficiently',
          'Database systems: organizing and querying large datasets',
          'Operating systems: task scheduling and memory management',
          'GPS navigation: finding shortest paths between locations',
          'Social media: managing friend connections and news feeds',
          'Game development: pathfinding and collision detection'
        ],
        commonMistakes: [
          'Choosing inefficient algorithms for large datasets',
          'Not considering whether data is sorted before using binary search',
          'Confusing time and space complexity',
          'Using wrong data structure for the problem (array vs stack vs queue)',
          'Not understanding that Big O describes worst-case scenario',
          'Implementing algorithms without considering edge cases (empty arrays, single elements)'
        ],
        furtherReading: [
          'Khan Academy: Algorithms and data structures',
          'BBC Bitesize: Computational thinking and algorithms',
          'GeeksforGeeks: Data structures and algorithms',
          'Visualgo: Algorithm visualizations',
          'Big O Cheat Sheet: Time and space complexity reference'
        ]
      }
    },
    'networks-and-internet-technologies': {
      title: 'Networks and Internet Technologies',
      description: 'Explore computer networks, protocols, and internet technologies.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Computer Systems and Architecture'],
      learningObjectives: [
        'Understand network topologies and types',
        'Study network protocols and standards',
        'Explore internet structure and operation',
        'Understand network security principles',
        'Study web technologies',
        'Apply networking concepts'
      ],
      keyTopics: [
        'Network topologies (star, ring, mesh)',
        'LAN, WAN, and internet',
        'TCP/IP protocol suite',
        'HTTP and HTTPS protocols',
        'Network security and encryption',
        'Wireless networks and WiFi',
        'Network hardware (routers, switches)'
      ],
      practiceAreas: [
        'Network diagram analysis',
        'Protocol understanding',
        'Security implementation',
        'Web technology applications',
        'Network troubleshooting'
      ],
      examTips: [
        'Learn protocol functions',
        'Understand network layers',
        'Know security principles',
        'Practice network diagrams',
        'Apply real-world scenarios'
      ],
      detailedContent: {
        introduction: 'Computer networks and internet technologies enable communication and resource sharing between devices worldwide. Understanding how networks operate, from local area networks to the global internet, is essential for modern computing. This knowledge covers network topologies, protocols, security, and the technologies that power our connected world.',
        conceptExplanations: [
          {
            title: 'Network Types and Topologies',
            content: 'Networks are classified by size and coverage: LAN (Local Area Network) covers small areas like schools, WAN (Wide Area Network) covers large geographical areas, and the Internet is a global network of networks. Network topology describes how devices are physically or logically connected, affecting performance, cost, and reliability.',
            examples: [
              'LAN: school network, home WiFi, office network',
              'WAN: connects LANs across cities or countries',
              'Star topology: all devices connect to central hub/switch',
              'Ring topology: devices connected in circular chain',
              'Mesh topology: multiple connections between devices',
              'Bus topology: all devices share single communication line'
            ]
          },
          {
            title: 'Internet Protocols and Standards',
            content: 'The Internet uses a suite of protocols called TCP/IP to enable communication between different networks and devices. HTTP (Hypertext Transfer Protocol) enables web browsing, while HTTPS adds encryption for security. IP addresses identify devices, and domain names provide human-readable addresses.',
            examples: [
              'TCP (Transmission Control Protocol): reliable data delivery',
              'IP (Internet Protocol): addressing and routing packets',
              'HTTP: web page requests and responses',
              'HTTPS: secure HTTP with encryption',
              'DNS (Domain Name System): converts names to IP addresses',
              'SMTP: email transmission protocol'
            ]
          },
          {
            title: 'Network Hardware and Infrastructure',
            content: 'Network hardware enables communication between devices. Routers direct data between different networks, switches connect devices within a network, and access points provide wireless connectivity. The Internet backbone consists of high-speed connections between major network providers.',
            examples: [
              'Router: connects different networks, finds best paths',
              'Switch: connects devices in same network efficiently',
              'Access point: provides wireless network connectivity',
              'Modem: converts digital signals for transmission',
              'Firewall: filters network traffic for security',
              'Network interface card: connects device to network'
            ]
          },
          {
            title: 'Network Security and Encryption',
            content: 'Network security protects data during transmission and prevents unauthorized access. Encryption converts readable data into unreadable form using mathematical algorithms. Firewalls filter network traffic, while authentication verifies user identity. Understanding these concepts is crucial for safe internet use.',
            examples: [
              'Encryption: scrambles data so only authorized users can read it',
              'Public key cryptography: uses two keys for secure communication',
              'Firewall: blocks unauthorized network connections',
              'Authentication: usernames, passwords, biometrics',
              'VPN (Virtual Private Network): secure connection over public internet',
              'SSL/TLS: encryption protocols for web security'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Explain the difference between LAN and WAN with examples.',
            answer: 'LAN covers small area (school, home, office) with high speed and low cost. WAN covers large geographical area (cities, countries) with lower speed and higher cost. Internet is largest WAN.',
            explanation: 'Scope, speed, and cost are key differences between network types',
            difficulty: 'Easy'
          },
          {
            question: 'How does DNS work when you type a website address?',
            answer: 'DNS converts domain name (www.google.com) to IP address (172.217.164.110). Your computer contacts DNS server, gets IP address, then connects to web server at that address.',
            explanation: 'DNS acts like a phone book for the internet',
            difficulty: 'Medium'
          },
          {
            question: 'Why is HTTPS more secure than HTTP?',
            answer: 'HTTPS encrypts data between browser and server using SSL/TLS. HTTP sends data in plain text that can be intercepted and read. HTTPS prevents eavesdropping and data tampering.',
            explanation: 'Encryption is the key difference providing confidentiality and integrity',
            difficulty: 'Medium'
          },
          {
            question: 'What happens if a router fails in a mesh network topology?',
            answer: 'Other routers can find alternative paths to destination. Mesh topology provides redundancy and fault tolerance through multiple connections between devices.',
            explanation: 'Redundant connections make mesh networks more reliable',
            difficulty: 'Hard'
          }
        ],
        realWorldApplications: [
          'Internet browsing: accessing websites and online services',
          'Email communication: sending messages globally',
          'Online gaming: real-time multiplayer interactions',
          'Cloud computing: accessing remote servers and storage',
          'Video streaming: Netflix, YouTube, video calls',
          'IoT devices: smart homes, wearables, connected cars'
        ],
        commonMistakes: [
          'Confusing internet and World Wide Web - web is just one internet service',
          'Thinking WiFi and internet are the same - WiFi is just wireless connection',
          'Not understanding that HTTP is not secure - use HTTPS for sensitive data',
          'Confusing routers and switches - they serve different purposes',
          'Thinking faster internet speed always means better performance',
          'Not considering network security when using public WiFi'
        ],
        furtherReading: [
          'Khan Academy: Internet and computer networks',
          'BBC Bitesize: Networks and internet technologies',
          'How Stuff Works: How internet infrastructure works',
          'Cisco Networking Academy: Introduction to networks',
          'Mozilla Developer Network: Web technologies and protocols'
        ]
      }
    },
    'data-representation-and-storage': {
      title: 'Data Representation and Storage',
      description: 'Study how computers represent and store different types of data.',
      duration: '3-4 weeks',
      difficulty: 'Foundation to Higher',
      prerequisites: ['Computer Systems and Architecture'],
      learningObjectives: [
        'Understand binary and hexadecimal systems',
        'Study data representation methods',
        'Explore image and sound storage',
        'Understand compression techniques',
        'Study character encoding',
        'Apply data representation concepts'
      ],
      keyTopics: [
        'Binary and hexadecimal number systems',
        'Character encoding (ASCII, Unicode)',
        'Image representation and pixels',
        'Sound digitization and sampling',
        'Data compression techniques',
        'File formats and storage',
        'Data capacity calculations'
      ],
      practiceAreas: [
        'Number system conversions',
        'Data size calculations',
        'Compression analysis',
        'File format understanding',
        'Storage optimization'
      ],
      examTips: [
        'Practice number conversions',
        'Understand storage calculations',
        'Learn compression benefits',
        'Know encoding systems',
        'Apply to real examples'
      ],
      detailedContent: {
        introduction: 'Data representation and storage form the foundation of how computers handle all types of information. Computers use binary (0s and 1s) to represent everything from numbers and text to images and sounds. Understanding how different data types are encoded, stored, and compressed is essential for computer science and helps explain file sizes, storage requirements, and data transmission.',
        conceptExplanations: [
          {
            title: 'Number Systems and Conversion',
            content: 'Computers use binary (base 2) internally, but humans prefer decimal (base 10). Hexadecimal (base 16) provides a convenient shorthand for binary. Understanding these number systems and conversion between them is fundamental to computer science and helps in understanding memory addresses, color codes, and data storage.',
            examples: [
              'Binary: uses digits 0 and 1 (e.g., 1010 = 10 in decimal)',
              'Decimal: uses digits 0-9 (everyday counting system)',
              'Hexadecimal: uses digits 0-9 and letters A-F (e.g., A = 10, F = 15)',
              'Binary to decimal: 1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀',
              'Decimal to binary: 13₁₀ = 8+4+1 = 1101₂',
              'Hex to binary: each hex digit = 4 binary digits (A₁₆ = 1010₂)'
            ]
          },
          {
            title: 'Text and Character Encoding',
            content: 'Text is represented using character encoding schemes that assign numbers to letters, symbols, and special characters. ASCII uses 7 bits for basic English characters, while Unicode supports international characters and emojis. Understanding encoding helps explain file sizes and character display issues.',
            examples: [
              'ASCII: 7-bit code for basic characters (A = 65, a = 97)',
              'Extended ASCII: 8-bit code including accented characters',
              'Unicode: supports all world languages and emojis',
              'UTF-8: variable-length Unicode encoding (1-4 bytes per character)',
              'Character storage: "Hello" = 5 bytes in ASCII',
              'Text file size: depends on number of characters and encoding'
            ]
          },
          {
            title: 'Image and Graphics Representation',
            content: 'Digital images are made of pixels (picture elements), each with a specific color value. Image quality depends on resolution (pixels per inch) and color depth (bits per pixel). Different formats offer trade-offs between quality and file size.',
            examples: [
              'Pixel: smallest unit of digital image',
              'Resolution: 1920×1080 = 2,073,600 pixels',
              'Color depth: 1-bit (black/white), 8-bit (256 colors), 24-bit (16.7 million colors)',
              'RGB: Red, Green, Blue values (0-255 each)',
              'Image file size: width × height × color depth (in bits)',
              'Bitmap vs vector: pixel-based vs mathematical shapes'
            ]
          },
          {
            title: 'Sound and Audio Digitization',
            content: 'Analog sound waves are converted to digital format through sampling - measuring amplitude at regular intervals. Sample rate (frequency) and bit depth determine audio quality and file size. Higher quality requires more storage space.',
            examples: [
              'Sampling: measuring sound wave amplitude at regular intervals',
              'Sample rate: CD quality = 44,100 samples per second (44.1 kHz)',
              'Bit depth: 16-bit provides 65,536 possible amplitude values',
              'Audio file size: sample rate × bit depth × channels × time',
              'Mono vs stereo: 1 channel vs 2 channels',
              'Nyquist theorem: sample rate must be twice highest frequency'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Convert the binary number 11010110 to decimal.',
            answer: '11010110₂ = 1×128 + 1×64 + 0×32 + 1×16 + 0×8 + 1×4 + 1×2 + 0×1 = 128+64+16+4+2 = 214₁₀',
            explanation: 'Each position represents a power of 2, starting from 2⁰ on the right',
            difficulty: 'Medium'
          },
          {
            question: 'How much storage is needed for a 5-minute stereo audio file at CD quality?',
            answer: '44,100 samples/sec × 16 bits × 2 channels × 300 seconds = 423,360,000 bits = 52.92 MB',
            explanation: 'Audio file size depends on sample rate, bit depth, channels, and duration',
            difficulty: 'Hard'
          },
          {
            question: 'Why does "A" have a different ASCII code than "a"?',
            answer: 'ASCII treats uppercase and lowercase letters as different characters. "A" = 65, "a" = 97. This allows computers to distinguish between cases.',
            explanation: 'Case sensitivity is important in programming and data processing',
            difficulty: 'Easy'
          },
          {
            question: 'Calculate the file size of a 1920×1080 image with 24-bit color depth.',
            answer: '1920 × 1080 × 24 bits = 49,766,400 bits = 6,220,800 bytes = 6.22 MB (uncompressed)',
            explanation: 'Image file size = pixels × bits per pixel, before compression',
            difficulty: 'Medium'
          }
        ],
        realWorldApplications: [
          'Digital photography: understanding image quality and file sizes',
          'Audio production: recording and editing digital music',
          'Web development: optimizing images and media for faster loading',
          'Data storage: calculating storage requirements for different media',
          'Compression software: reducing file sizes while maintaining quality',
          'International software: supporting multiple languages with Unicode'
        ],
        commonMistakes: [
          'Confusing bits and bytes - 8 bits = 1 byte',
          'Not understanding that higher quality = larger file sizes',
          'Thinking compression is always lossless - JPEG loses some image data',
          'Confusing resolution (pixels per inch) with image dimensions (pixels)',
          'Not considering that text encoding affects file compatibility',
          'Assuming all image formats are the same - each has different characteristics'
        ],
        furtherReading: [
          'Khan Academy: Computer science and binary',
          'BBC Bitesize: Data representation in computer systems',
          'How Stuff Works: Digital image processing',
          'W3Schools: Character encoding and Unicode',
          'Computer Hope: Data storage and file formats'
        ]
      }
    },
    'computational-thinking-and-problem-solving': {
      title: 'Computational Thinking and Problem Solving',
      description: 'Develop computational thinking skills and problem-solving strategies.',
      duration: '3-4 weeks',
      difficulty: 'All levels',
      prerequisites: ['Programming Fundamentals'],
      learningObjectives: [
        'Apply computational thinking principles',
        'Decompose complex problems',
        'Recognize patterns and abstractions',
        'Design algorithmic solutions',
        'Evaluate and optimize solutions',
        'Apply thinking to real problems'
      ],
      keyTopics: [
        'Decomposition techniques',
        'Pattern recognition',
        'Abstraction and modeling',
        'Algorithm design',
        'Problem-solving strategies',
        'Solution evaluation',
        'Real-world applications'
      ],
      practiceAreas: [
        'Problem decomposition',
        'Pattern identification',
        'Abstract thinking',
        'Solution design',
        'Strategy application'
      ],
      examTips: [
        'Practice decomposition',
        'Look for patterns',
        'Think abstractly',
        'Design step-by-step solutions',
        'Evaluate solution quality'
      ],
      detailedContent: {
        introduction: 'Computational thinking is a problem-solving methodology that combines computer science concepts with critical thinking skills. It involves breaking down complex problems into manageable parts, recognizing patterns, creating abstractions, and designing algorithmic solutions. These skills are valuable not just in programming but in all areas of life and work.',
        conceptExplanations: [
          {
            title: 'Decomposition and Problem Breaking',
            content: 'Decomposition involves breaking complex problems into smaller, more manageable sub-problems. This makes large problems less overwhelming and allows teams to work on different parts simultaneously. Good decomposition identifies independent components and clear interfaces between them.',
            examples: [
              'Software project: break into user interface, database, and logic components',
              'Planning a trip: separate tasks like booking flights, hotels, and activities',
              'Cooking a meal: prep ingredients, cook components, assemble final dish',
              'School assignment: research, outline, write sections, edit, format',
              'Game development: graphics, sound, gameplay, user interface',
              'Hierarchical breakdown: top-level goals → tasks → subtasks'
            ]
          },
          {
            title: 'Pattern Recognition and Analysis',
            content: 'Pattern recognition involves identifying similarities, trends, and regularities in data or problems. Recognizing patterns allows us to predict behavior, reuse solutions, and simplify complex information. Patterns can be visual, numerical, behavioral, or structural.',
            examples: [
              'Mathematical sequences: 2, 4, 6, 8... (pattern: add 2)',
              'Data trends: sales increase before holidays',
              'Code patterns: loops for repetitive tasks, functions for reusable code',
              'Natural patterns: seasonal changes, growth patterns',
              'Problem-solving patterns: divide and conquer, trial and error',
              'Visual patterns: symmetry, repetition, fractals'
            ]
          },
          {
            title: 'Abstraction and Modeling',
            content: 'Abstraction involves focusing on essential features while ignoring irrelevant details. It allows us to create simplified models that capture key aspects of complex systems. Good abstractions make problems easier to understand and solve.',
            examples: [
              'Maps: abstract representation focusing on relevant geographical features',
              'Programming functions: abstract complex operations into simple calls',
              'Mathematical models: equations representing real-world relationships',
              'Class diagrams: abstract view of software system structure',
              'Flowcharts: abstract representation of process steps',
              'Scientific models: simplified representations of complex phenomena'
            ]
          },
          {
            title: 'Algorithm Design and Implementation',
            content: 'Algorithm design involves creating step-by-step instructions to solve problems. Good algorithms are clear, efficient, and handle all possible cases including edge cases. The design process includes planning, implementation, testing, and refinement.',
            examples: [
              'Recipe: step-by-step cooking instructions',
              'Navigation: turn-by-turn directions to destination',
              'Search strategy: systematic approach to finding information',
              'Sorting method: organizing items in specific order',
              'Decision tree: systematic approach to making choices',
              'Troubleshooting guide: systematic problem diagnosis'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'How would you decompose the problem of organizing a school sports day?',
            answer: 'Break into: event planning (scheduling, rules), logistics (equipment, venues), participants (registration, teams), safety (first aid, supervision), and coordination (communication, timing)',
            explanation: 'Decomposition identifies distinct areas that can be planned and managed separately',
            difficulty: 'Medium'
          },
          {
            question: 'Identify the pattern in this sequence: 1, 1, 2, 3, 5, 8, 13, ...',
            answer: 'Fibonacci sequence: each number is the sum of the two preceding numbers (1+1=2, 1+2=3, 2+3=5, etc.)',
            explanation: 'Mathematical patterns often have underlying rules that can be expressed formulaically',
            difficulty: 'Medium'
          },
          {
            question: 'Create an abstraction for a library system focusing on book borrowing.',
            answer: 'Key elements: Books (title, author, availability), Users (name, ID, borrowed books), Transactions (borrow date, return date, fines). Ignore details like book color, user height.',
            explanation: 'Abstractions focus on relevant attributes and relationships for the specific use case',
            difficulty: 'Hard'
          },
          {
            question: 'Design an algorithm for finding the largest number in a list.',
            answer: '1. Start with first number as largest. 2. Compare each remaining number with current largest. 3. If number is larger, update largest. 4. Return largest after checking all numbers.',
            explanation: 'Algorithm provides clear, unambiguous steps that work for any list size',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'Business analysis: breaking down complex business processes',
          'Scientific research: designing experiments and analyzing data',
          'Engineering design: decomposing systems into manageable components',
          'Project management: organizing large projects into tasks and milestones',
          'Medical diagnosis: systematic approach to identifying conditions',
          'Urban planning: modeling city systems and infrastructure needs'
        ],
        commonMistakes: [
          'Not breaking problems down enough - trying to solve everything at once',
          'Missing patterns due to insufficient data or premature conclusions',
          'Creating abstractions that are too complex or miss important details',
          'Writing algorithms that don\'t handle edge cases (empty data, extreme values)',
          'Not testing solutions thoroughly before implementation',
          'Focusing on solution before fully understanding the problem'
        ],
        furtherReading: [
          'Khan Academy: Computational thinking and programming',
          'BBC Bitesize: Problem solving and computational thinking',
          'CS Unplugged: Computational thinking activities',
          'Google for Education: Computational thinking course',
          'MIT App Inventor: Computational thinking through app development'
        ]
      }
    }
  },
  // Advanced Mathematics
  6: {
    'introduction-to-calculus': {
      title: 'Introduction to Calculus',
      description: 'Master fundamental calculus concepts including differentiation and integration.',
      duration: '4-5 weeks',
      difficulty: 'Higher',
      prerequisites: ['GCSE Mathematics Grade 7+', 'Advanced Algebra'],
      learningObjectives: [
        'Understand limits and continuity',
        'Master differentiation techniques',
        'Apply derivative rules',
        'Understand integration basics',
        'Solve calculus problems',
        'Apply calculus to real situations'
      ],
      keyTopics: [
        'Limits and continuity',
        'Differentiation from first principles',
        'Product, quotient, and chain rules',
        'Applications of differentiation',
        'Integration techniques',
        'Fundamental theorem of calculus',
        'Area under curves'
      ],
      practiceAreas: [
        'Derivative calculations',
        'Integration problems',
        'Real-world applications',
        'Graph analysis',
        'Optimization problems'
      ],
      examTips: [
        'Learn derivative rules',
        'Practice integration techniques',
        'Understand applications',
        'Draw accurate graphs',
        'Check solutions'
      ],
      detailedContent: {
        introduction: 'Calculus is a fundamental branch of mathematics that deals with rates of change (differential calculus) and accumulation of quantities (integral calculus). It provides powerful tools for solving problems in physics, engineering, economics, and many other fields. Understanding limits, derivatives, and integrals opens doors to advanced mathematical concepts and real-world applications.',
        conceptExplanations: [
          {
            title: 'Limits and Continuity',
            content: 'A limit describes the behavior of a function as the input approaches a particular value. Limits are fundamental to calculus as they define derivatives and integrals. A function is continuous at a point if the limit equals the function value at that point. Understanding limits helps analyze function behavior and solve indeterminate forms.',
            examples: [
              'lim(x→2) (x² - 4)/(x - 2) = lim(x→2) (x + 2) = 4',
              'lim(x→∞) (1 + 1/x)ˣ = e ≈ 2.718',
              'Continuous function: f(x) = x² is continuous everywhere',
              'Discontinuous: f(x) = 1/x has discontinuity at x = 0',
              'One-sided limits: approach from left or right separately',
              'Squeeze theorem: if g(x) ≤ f(x) ≤ h(x) and lim g(x) = lim h(x) = L, then lim f(x) = L'
            ]
          },
          {
            title: 'Derivatives and Differentiation',
            content: 'The derivative represents the instantaneous rate of change of a function. Geometrically, it gives the slope of the tangent line at any point. Derivatives are found using differentiation rules including power rule, product rule, quotient rule, and chain rule. They are essential for optimization, motion analysis, and understanding function behavior.',
            keyFormulas: [
              'Definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h',
              'Power rule: d/dx(xⁿ) = nxⁿ⁻¹',
              'Product rule: d/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
              'Quotient rule: d/dx[f(x)/g(x)] = [f\'(x)g(x) - f(x)g\'(x)]/[g(x)]²',
              'Chain rule: d/dx[f(g(x))] = f\'(g(x)) · g\'(x)'
            ],
            examples: [
              'f(x) = x³, f\'(x) = 3x²',
              'f(x) = sin(x), f\'(x) = cos(x)',
              'f(x) = eˣ, f\'(x) = eˣ',
              'f(x) = ln(x), f\'(x) = 1/x',
              'Second derivative f\'\'(x) indicates concavity',
              'Critical points occur where f\'(x) = 0 or undefined'
            ]
          },
          {
            title: 'Applications of Differentiation',
            content: 'Derivatives have numerous practical applications including finding maximum and minimum values, analyzing motion, and solving optimization problems. First derivative tests identify critical points, while second derivative tests determine concavity. These tools are essential for real-world problem solving in physics, economics, and engineering.',
            examples: [
              'Optimization: maximize area with fixed perimeter',
              'Related rates: how fast is balloon radius changing?',
              'Motion analysis: velocity = ds/dt, acceleration = dv/dt',
              'Marginal cost/revenue in economics',
              'Newton\'s method for finding roots',
              'Curve sketching using derivatives'
            ]
          },
          {
            title: 'Integration and Antiderivatives',
            content: 'Integration is the reverse process of differentiation, used to find areas under curves and solve accumulation problems. The fundamental theorem of calculus connects derivatives and integrals. Integration techniques include substitution, integration by parts, and partial fractions. Definite integrals calculate exact areas and accumulated quantities.',
            keyFormulas: [
              'Fundamental theorem: ∫[a to b] f\'(x)dx = f(b) - f(a)',
              'Power rule: ∫xⁿdx = xⁿ⁺¹/(n+1) + C',
              'Substitution: ∫f(g(x))g\'(x)dx = ∫f(u)du where u = g(x)',
              'Integration by parts: ∫udv = uv - ∫vdu'
            ],
            examples: [
              '∫x²dx = x³/3 + C',
              '∫sin(x)dx = -cos(x) + C',
              '∫eˣdx = eˣ + C',
              'Area under y = x² from 0 to 2 = ∫[0 to 2] x²dx = 8/3',
              'Average value = (1/(b-a))∫[a to b] f(x)dx',
              'Displacement = ∫velocity dt'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Find the derivative of f(x) = x³ - 2x² + 5x - 1',
            answer: 'f\'(x) = 3x² - 4x + 5',
            explanation: 'Apply power rule to each term: d/dx(x³) = 3x², d/dx(-2x²) = -4x, d/dx(5x) = 5, d/dx(-1) = 0',
            difficulty: 'Easy'
          },
          {
            question: 'Evaluate lim(x→0) (sin x)/x',
            answer: 'lim(x→0) (sin x)/x = 1',
            explanation: 'This is a fundamental limit in calculus, proven using squeeze theorem or L\'Hôpital\'s rule',
            difficulty: 'Medium'
          },
          {
            question: 'Find the area under y = x² from x = 0 to x = 3',
            answer: '∫[0 to 3] x²dx = [x³/3]₀³ = 27/3 - 0 = 9 square units',
            explanation: 'Use definite integral: integrate x² to get x³/3, then evaluate at bounds',
            difficulty: 'Medium'
          },
          {
            question: 'Use calculus to find the maximum value of f(x) = -x² + 4x + 1',
            answer: 'f\'(x) = -2x + 4 = 0, so x = 2. f(2) = -4 + 8 + 1 = 5. Maximum value is 5.',
            explanation: 'Find critical points by setting derivative to zero, then check second derivative or evaluate function',
            difficulty: 'Hard'
          }
        ],
        realWorldApplications: [
          'Physics: calculating velocity and acceleration from position functions',
          'Economics: optimizing profit by finding marginal cost and revenue',
          'Engineering: designing optimal structures with maximum strength and minimum material',
          'Medicine: modeling drug concentration and dosage optimization',
          'Environmental science: calculating pollution accumulation and cleanup rates',
          'Computer graphics: creating smooth curves and surfaces'
        ],
        commonMistakes: [
          'Forgetting the constant of integration (+C) in indefinite integrals',
          'Confusing derivative notation: d/dx vs f\'(x)',
          'Not checking domain restrictions when applying rules',
          'Forgetting to use chain rule for composite functions',
          'Mixing up integration and differentiation formulas',
          'Not verifying critical points are actually maxima or minima'
        ],
        furtherReading: [
          'Khan Academy: Calculus fundamentals',
          'MIT OpenCourseWare: Single Variable Calculus',
          'Paul\'s Online Math Notes: Calculus I',
          'Stewart Calculus: comprehensive textbook',
          'Wolfram MathWorld: Calculus reference'
        ]
      }
    },
    'advanced-algebra-and-functions': {
      title: 'Advanced Algebra and Functions',
      description: 'Master advanced algebraic techniques and function analysis.',
      duration: '3-4 weeks',
      difficulty: 'Higher',
      prerequisites: ['GCSE Mathematics Grade 7+'],
      learningObjectives: [
        'Master polynomial and rational functions',
        'Understand exponential and logarithmic functions',
        'Solve complex equations and inequalities',
        'Analyze function properties and transformations',
        'Apply advanced algebraic techniques',
        'Model real-world situations with functions'
      ],
      keyTopics: [
        'Polynomial functions and equations',
        'Rational functions and partial fractions',
        'Exponential and logarithmic functions',
        'Function transformations and compositions',
        'Systems of equations and matrices',
        'Sequences and series',
        'Mathematical modeling'
      ],
      practiceAreas: [
        'Function analysis and graphing',
        'Complex equation solving',
        'Transformation applications',
        'Modeling real-world problems',
        'Matrix operations'
      ],
      examTips: [
        'Master function properties',
        'Practice graph transformations',
        'Learn logarithm rules',
        'Understand domain restrictions',
        'Apply algebraic techniques systematically'
      ],
      detailedContent: {
        introduction: 'Advanced algebra and functions form the bridge between basic algebra and calculus. This topic covers sophisticated algebraic techniques, function analysis, and mathematical modeling. Understanding these concepts is essential for success in higher mathematics, science, and engineering fields.',
        conceptExplanations: [
          {
            title: 'Polynomial Functions and Their Properties',
            content: 'Polynomial functions are expressions involving powers of x with constant coefficients. They have predictable behavior including end behavior, roots, and turning points. The degree determines the maximum number of roots and turning points. Polynomial division and factoring are key techniques for analysis.',
            examples: [
              'Linear: f(x) = 2x + 3 (degree 1, 1 root)',
              'Quadratic: f(x) = x² - 4x + 3 (degree 2, up to 2 roots)',
              'Cubic: f(x) = x³ - 6x² + 9x - 4 (degree 3, up to 3 roots)',
              'End behavior: as x → ±∞, highest degree term dominates',
              'Fundamental theorem: polynomial of degree n has exactly n roots (counting multiplicity)',
              'Factored form reveals roots: f(x) = (x-2)(x+1)(x-3)'
            ]
          },
          {
            title: 'Exponential and Logarithmic Functions',
            content: 'Exponential functions grow or decay at rates proportional to their current value. Logarithms are the inverse operations of exponentials. These functions model many natural phenomena including population growth, radioactive decay, and compound interest.',
            keyFormulas: [
              'Exponential: f(x) = abˣ where a > 0, b > 0, b ≠ 1',
              'Natural exponential: f(x) = aeˣ where e ≈ 2.718',
              'Logarithm: log_b(x) = y ⟺ bʸ = x',
              'Natural logarithm: ln(x) = log_e(x)',
              'Change of base: log_b(x) = ln(x)/ln(b)'
            ],
            examples: [
              'f(x) = 2ˣ: exponential growth, doubles each unit',
              'f(x) = (1/2)ˣ: exponential decay, halves each unit',
              'ln(e³) = 3, log₁₀(1000) = 3',
              'Compound interest: A = P(1 + r/n)^(nt)',
              'Population growth: P(t) = P₀e^(rt)',
              'Half-life: N(t) = N₀(1/2)^(t/h)'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Find all roots of f(x) = x³ - 6x² + 11x - 6',
            answer: 'Factor as (x-1)(x-2)(x-3), so roots are x = 1, 2, 3',
            explanation: 'Use rational root theorem to test possible roots, then factor completely',
            difficulty: 'Medium'
          },
          {
            question: 'Solve the equation 2^(x+1) = 8',
            answer: '2^(x+1) = 2³, so x+1 = 3, therefore x = 2',
            explanation: 'Express both sides with same base, then equate exponents',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'Finance: compound interest and investment growth modeling',
          'Engineering: signal processing and system analysis',
          'Biology: population dynamics and enzyme kinetics',
          'Computer science: algorithm complexity and data structures'
        ],
        commonMistakes: [
          'Confusing function notation f(x-h) vs f(x)-h for shifts',
          'Forgetting domain restrictions for logarithms and rational functions',
          'Not checking extraneous solutions when solving equations'
        ],
        furtherReading: [
          'Khan Academy: Algebra II and precalculus',
          'Paul\'s Online Math Notes: College Algebra',
          'OpenStax: College Algebra textbook'
        ]
      }
    },
    'statistics-and-probability': {
      title: 'Statistics and Probability',
      description: 'Master statistical analysis, probability theory, and data interpretation.',
      duration: '4-5 weeks',
      difficulty: 'Higher',
      prerequisites: ['Advanced Algebra', 'Basic Data Handling'],
      learningObjectives: [
        'Understand probability theory and distributions',
        'Analyze statistical data and measures',
        'Apply hypothesis testing methods',
        'Interpret correlation and regression',
        'Design statistical experiments',
        'Communicate statistical findings'
      ],
      keyTopics: [
        'Probability theory and conditional probability',
        'Discrete and continuous distributions',
        'Statistical measures and data analysis',
        'Hypothesis testing and significance',
        'Correlation and regression analysis',
        'Experimental design and sampling'
      ],
      practiceAreas: [
        'Probability calculations',
        'Statistical analysis projects',
        'Hypothesis testing scenarios',
        'Data interpretation exercises',
        'Real-world statistical studies'
      ],
      examTips: [
        'Master probability rules',
        'Understand distribution properties',
        'Practice hypothesis testing steps',
        'Interpret statistical outputs',
        'Distinguish correlation vs causation'
      ],
      detailedContent: {
        introduction: 'Statistics and probability provide tools for understanding uncertainty, analyzing data, and making informed decisions. These fields are essential in science, business, medicine, and social sciences for drawing conclusions from data and quantifying uncertainty in our increasingly data-driven world.',
        conceptExplanations: [
          {
            title: 'Probability Theory and Rules',
            content: 'Probability quantifies the likelihood of events occurring. It follows specific rules including addition and multiplication principles. Understanding conditional probability and independence is crucial for complex probability calculations and real-world applications.',
            keyFormulas: [
              'P(A) = favorable outcomes / total outcomes',
              'P(A or B) = P(A) + P(B) - P(A and B)',
              'P(A and B) = P(A) × P(B|A) (general multiplication rule)',
              'P(A|B) = P(A and B) / P(B) (conditional probability)'
            ],
            examples: [
              'Rolling dice: P(sum = 7) = 6/36 = 1/6',
              'Drawing cards: P(ace) = 4/52 = 1/13',
              'Conditional: P(heart|red card) = 13/26 = 1/2'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'A bag contains 5 red and 3 blue balls. What\'s the probability of drawing 2 red balls without replacement?',
            answer: 'P(2 red) = (5/8) × (4/7) = 20/56 = 5/14',
            explanation: 'First red: 5/8, second red given first red: 4/7, multiply probabilities',
            difficulty: 'Medium'
          }
        ],
        realWorldApplications: [
          'Medical research: clinical trials and drug effectiveness studies',
          'Business: market research and quality control processes',
          'Sports: player performance analysis and game strategy'
        ],
        commonMistakes: [
          'Confusing correlation with causation',
          'Misinterpreting p-values as probability that null hypothesis is true'
        ],
        furtherReading: [
          'Khan Academy: Statistics and probability',
          'OpenStax: Introductory Statistics'
        ]
      }
    }
    // Add more Advanced Mathematics subtopics...
  },
  // Computer Science Fundamentals
  7: {
    'programming-basics-python': {
      title: 'Programming Basics (Python)',
      description: 'Master Python programming fundamentals with industry best practices.',
      duration: '3-4 weeks',
      difficulty: 'Beginner',
      prerequisites: ['Basic computer literacy'],
      learningObjectives: [
        'Understand Python syntax and semantics',
        'Master control structures and functions',
        'Work with data types and collections',
        'Apply object-oriented concepts',
        'Debug and test programs effectively',
        'Follow coding best practices'
      ],
      keyTopics: [
        'Python syntax and style (PEP 8)',
        'Variables, data types, and operators',
        'Control flow (if/elif/else, loops)',
        'Functions and parameter passing',
        'Lists, dictionaries, and sets',
        'File handling and exceptions',
        'Basic object-oriented programming'
      ],
      practiceAreas: [
        'Coding exercises and projects',
        'Algorithm implementation',
        'Data manipulation tasks',
        'Problem-solving challenges',
        'Code review and debugging'
      ],
      examTips: [
        'Practice coding regularly',
        'Understand error messages',
        'Write clean, readable code',
        'Test your programs thoroughly',
        'Learn debugging techniques'
      ],
      detailedContent: {
        introduction: 'Programming fundamentals with Python provide the foundation for computer science and software development. Python\'s clear syntax and powerful features make it an ideal language for learning programming concepts. Mastering these fundamentals opens doors to web development, data science, artificial intelligence, and many other exciting fields in technology.',
        conceptExplanations: [
          {
            title: 'Python Syntax and Best Practices',
            content: 'Python emphasizes code readability through its use of indentation and clear syntax. Following PEP 8 style guidelines ensures code is readable and maintainable. Understanding Python\'s philosophy and idioms helps write more effective and pythonic code.',
            examples: [
              'Indentation: Use 4 spaces consistently for code blocks',
              'Naming: use_snake_case for variables and functions',
              'Comments: # for single line, \"\"\" for multi-line docstrings',
              'Import statements: at top of file, standard library first',
              'Line length: keep lines under 79 characters when possible',
              'Zen of Python: \"Beautiful is better than ugly\", \"Simple is better than complex\"'
            ]
          },
          {
            title: 'Data Types and Variables',
            content: 'Python provides several built-in data types for different kinds of information. Understanding when to use each type and how they behave is crucial for effective programming. Python\'s dynamic typing allows flexibility while still maintaining type safety.',
            examples: [
              'Numbers: int (42), float (3.14), complex (2+3j)',
              'Strings: \"Hello\" or \'World\' - immutable sequences of characters',
              'Booleans: True, False - results of logical operations',
              'Lists: [1, 2, 3] - mutable, ordered collections',
              'Tuples: (1, 2, 3) - immutable, ordered collections',
              'Dictionaries: {\"key\": \"value\"} - mutable key-value mappings'
            ]
          },
          {
            title: 'Control Structures and Logic',
            content: 'Control structures direct program flow based on conditions and enable repetition of code blocks. Understanding these structures is essential for creating programs that can make decisions and process data efficiently.',
            examples: [
              'if statements: if condition: do_something()',
              'elif chains: multiple condition checking',
              'for loops: for item in sequence: process(item)',
              'while loops: while condition: keep_going()',
              'List comprehensions: [x*2 for x in range(10)]',
              'Conditional expressions: result = value if condition else alternative'
            ]
          },
          {
            title: 'Functions and Modular Programming',
            content: 'Functions encapsulate reusable code blocks that perform specific tasks. They promote code reuse, make programs more organized, and enable testing of individual components. Understanding function design principles leads to better program structure.',
            examples: [
              'Function definition: def function_name(parameters):',
              'Return values: return result or return multiple values',
              'Default parameters: def greet(name, greeting=\"Hello\"):',
              'Variable scope: local vs global variables',
              'Lambda functions: lambda x: x * 2 for simple functions',
              'Docstrings: document function purpose and usage'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Write a function that takes a list of numbers and returns the sum of all even numbers.',
            answer: 'def sum_even(numbers):\n    return sum(num for num in numbers if num % 2 == 0)',
            explanation: 'Use generator expression with condition to filter even numbers, then sum them',
            difficulty: 'Medium'
          },
          {
            question: 'Create a program that counts the frequency of each character in a string.',
            answer: 'def char_frequency(text):\n    freq = {}\n    for char in text:\n        freq[char] = freq.get(char, 0) + 1\n    return freq',
            explanation: 'Use dictionary to store counts, get() method provides default value of 0',
            difficulty: 'Medium'
          },
          {
            question: 'What is the output of: print([i**2 for i in range(5) if i % 2 == 0])?',
            answer: '[0, 4, 16] - squares of even numbers from 0 to 4',
            explanation: 'List comprehension with condition: squares 0², 2², 4² for even numbers only',
            difficulty: 'Easy'
          },
          {
            question: 'Explain the difference between a list and a tuple in Python.',
            answer: 'Lists are mutable (can be changed) and use [], tuples are immutable (cannot be changed) and use (). Lists have methods like append(), tuples do not.',
            explanation: 'Mutability is the key difference - affects what operations are available',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'Web development: building websites with Django or Flask frameworks',
          'Data science: analyzing data with pandas and NumPy libraries',
          'Automation: creating scripts to automate repetitive tasks',
          'Machine learning: building AI models with scikit-learn and TensorFlow',
          'Game development: creating games with Pygame library',
          'Scientific computing: solving mathematical and scientific problems'
        ],
        commonMistakes: [
          'Forgetting to indent code blocks properly - Python requires consistent indentation',
          'Using mutable default arguments in functions - can cause unexpected behavior',
          'Not understanding the difference between = (assignment) and == (comparison)',
          'Trying to modify strings directly - strings are immutable in Python',
          'Not handling exceptions properly - programs should gracefully handle errors',
          'Using global variables excessively - prefer function parameters and return values'
        ],
        furtherReading: [
          'Python.org: Official Python tutorial and documentation',
          'Real Python: Comprehensive Python tutorials and guides',
          'Automate the Boring Stuff: Practical Python for beginners',
          'Python Crash Course: Hands-on introduction to programming',
          'Codecademy: Interactive Python programming course'
        ]
      }
    },
    'object-oriented-programming': {
      title: 'Object-Oriented Programming',
      description: 'Master OOP concepts including classes, objects, inheritance, and polymorphism.',
      duration: '4-5 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['Programming Basics (Python)'],
      learningObjectives: [
        'Understand OOP principles and concepts',
        'Design and implement classes and objects',
        'Apply inheritance and polymorphism',
        'Use encapsulation and abstraction',
        'Design object-oriented systems',
        'Apply design patterns'
      ],
      keyTopics: [
        'Classes and objects',
        'Attributes and methods',
        'Inheritance and super()',
        'Polymorphism and method overriding',
        'Encapsulation and access control',
        'Abstract classes and interfaces',
        'Design patterns'
      ],
      practiceAreas: [
        'Class design exercises',
        'Inheritance hierarchies',
        'Polymorphism examples',
        'Design pattern implementation',
        'Real-world modeling'
      ],
      examTips: [
        'Understand OOP principles',
        'Practice class relationships',
        'Master inheritance concepts',
        'Learn common design patterns',
        'Model real-world scenarios'
      ],
      detailedContent: {
        introduction: 'Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects and classes. It provides powerful tools for modeling real-world entities and relationships, making code more organized, reusable, and maintainable. Understanding OOP principles is essential for modern software development.',
        conceptExplanations: [
          {
            title: 'Classes and Objects Fundamentals',
            content: 'Classes are blueprints that define the structure and behavior of objects. Objects are instances of classes that contain actual data and can perform actions. This relationship enables code organization and reusability through abstraction and encapsulation.',
            examples: [
              'Class definition: class Car: defines blueprint for car objects',
              'Object creation: my_car = Car() creates instance',
              'Attributes: my_car.color = \"red\" stores object data',
              'Methods: my_car.start() performs object actions',
              'Constructor: __init__(self) method initializes new objects',
              'Instance vs class attributes: per-object vs shared data'
            ]
          },
          {
            title: 'Inheritance and Code Reuse',
            content: 'Inheritance allows classes to inherit attributes and methods from parent classes, promoting code reuse and establishing hierarchical relationships. Child classes can extend or override parent functionality while maintaining the interface.',
            examples: [
              'Base class: class Animal: defines common behavior',
              'Derived class: class Dog(Animal): inherits from Animal',
              'Method inheritance: Dog automatically gets Animal methods',
              'Method overriding: Dog can redefine Animal methods',
              'super() function: access parent class methods',
              'Multiple inheritance: class inherits from multiple parents'
            ]
          },
          {
            title: 'Polymorphism and Dynamic Behavior',
            content: 'Polymorphism allows objects of different classes to be treated uniformly through common interfaces. This enables writing flexible code that works with multiple object types without knowing their specific classes.',
            examples: [
              'Method overriding: different classes implement same method differently',
              'Duck typing: \"If it walks like a duck and quacks like a duck...\"',
              'Interface consistency: same method names across classes',
              'Runtime binding: method choice determined at execution time',
              'Abstract methods: force subclasses to implement specific methods',
              'Operator overloading: customize how operators work with objects'
            ]
          },
          {
            title: 'Encapsulation and Data Protection',
            content: 'Encapsulation bundles data and methods together while controlling access to internal details. This protects object integrity and provides clean interfaces for interacting with objects.',
            examples: [
              'Private attributes: _attribute (convention) or __attribute (name mangling)',
              'Property decorators: @property for getter/setter methods',
              'Data validation: ensure object state remains valid',
              'Information hiding: internal implementation details not exposed',
              'Public interface: methods and attributes meant for external use',
              'Accessor methods: controlled ways to read/modify private data'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Create a class hierarchy for geometric shapes with area calculation.',
            answer: 'class Shape:\n    def area(self): raise NotImplementedError\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width, self.height = width, height\n    def area(self): return self.width * self.height',
            explanation: 'Base class defines interface, derived classes implement specific behavior',
            difficulty: 'Medium'
          },
          {
            question: 'Implement a BankAccount class with deposit, withdraw, and balance checking.',
            answer: 'class BankAccount:\n    def __init__(self, initial_balance=0):\n        self._balance = initial_balance\n    def deposit(self, amount):\n        if amount > 0: self._balance += amount\n    def withdraw(self, amount):\n        if 0 < amount <= self._balance: self._balance -= amount\n    @property\n    def balance(self): return self._balance',
            explanation: 'Encapsulation protects balance, methods provide controlled access',
            difficulty: 'Hard'
          },
          {
            question: 'What is the difference between inheritance and composition?',
            answer: 'Inheritance: \"is-a\" relationship (Dog is an Animal). Composition: \"has-a\" relationship (Car has an Engine). Inheritance shares interface, composition uses objects as components.',
            explanation: 'Different ways to establish relationships between classes with different trade-offs',
            difficulty: 'Medium'
          },
          {
            question: 'Explain how polymorphism enables flexible code design.',
            answer: 'Polymorphism allows treating different objects uniformly through common interfaces. Code can work with any object that implements required methods, making it extensible and maintainable.',
            explanation: 'Polymorphism reduces coupling and increases code flexibility',
            difficulty: 'Easy'
          }
        ],
        realWorldApplications: [
          'GUI applications: modeling windows, buttons, and user interface elements',
          'Game development: characters, items, and game world entities',
          'Business software: customers, orders, products, and transactions',
          'Database systems: modeling real-world entities and relationships',
          'Web frameworks: representing users, posts, comments, and content',
          'Scientific simulation: modeling physical systems and phenomena'
        ],
        commonMistakes: [
          'Overusing inheritance when composition would be better',
          'Making everything public - not using encapsulation properly',
          'Creating deep inheritance hierarchies that are hard to understand',
          'Forgetting to call parent constructors with super()',
          'Confusing class attributes with instance attributes',
          'Not following single responsibility principle in class design'
        ],
        furtherReading: [
          'Python OOP Tutorial: Real Python object-oriented programming',
          'Design Patterns: Elements of Reusable Object-Oriented Software',
          'Clean Code: A Handbook of Agile Software Craftsmanship',
          'Effective Python: Writing Better Python Code',
          'Object-Oriented Analysis and Design with Applications'
        ]
      }
    },
    'data-structures-and-algorithms-advanced': {
      title: 'Data Structures and Algorithms (Advanced)',
      description: 'Explore advanced data structures, algorithm design, and complexity analysis.',
      duration: '5-6 weeks',
      difficulty: 'Advanced',
      prerequisites: ['Object-Oriented Programming', 'Basic Algorithms'],
      learningObjectives: [
        'Implement advanced data structures',
        'Design efficient algorithms',
        'Analyze time and space complexity',
        'Apply algorithmic paradigms',
        'Optimize algorithm performance',
        'Solve complex computational problems'
      ],
      keyTopics: [
        'Trees and graph structures',
        'Hash tables and collision handling',
        'Sorting and searching algorithms',
        'Dynamic programming',
        'Greedy algorithms',
        'Graph algorithms',
        'Algorithm complexity analysis'
      ],
      practiceAreas: [
        'Data structure implementation',
        'Algorithm design challenges',
        'Complexity analysis exercises',
        'Optimization problems',
        'Competitive programming'
      ],
      examTips: [
        'Practice implementation from scratch',
        'Understand complexity trade-offs',
        'Learn algorithmic paradigms',
        'Solve variety of problem types',
        'Optimize for both time and space'
      ],
      detailedContent: {
        introduction: 'Advanced data structures and algorithms form the backbone of efficient software systems. Understanding these concepts enables the creation of high-performance applications and provides the foundation for technical interviews and competitive programming. These skills are essential for software engineers and computer scientists.',
        conceptExplanations: [
          {
            title: 'Trees and Hierarchical Data Structures',
            content: 'Trees organize data hierarchically with parent-child relationships. Different tree types optimize for specific operations like searching, insertion, or maintaining balance. Understanding tree algorithms is crucial for databases, file systems, and decision-making systems.',
            examples: [
              'Binary trees: each node has at most two children',
              'Binary search trees: left < parent < right ordering',
              'AVL trees: self-balancing with height constraints',
              'Heaps: complete binary trees with ordering property',
              'Trie: tree for storing and searching strings efficiently',
              'Tree traversals: inorder, preorder, postorder, level-order'
            ]
          },
          {
            title: 'Graph Algorithms and Applications',
            content: 'Graphs model relationships between entities using vertices and edges. Graph algorithms solve problems like shortest paths, connectivity, and network analysis. These algorithms are fundamental to social networks, navigation systems, and network protocols.',
            examples: [
              'Graph representations: adjacency lists vs adjacency matrices',
              'Depth-first search (DFS): exploring as far as possible',
              'Breadth-first search (BFS): exploring level by level',
              'Dijkstra\'s algorithm: shortest paths from single source',
              'Minimum spanning trees: Kruskal\'s and Prim\'s algorithms',
              'Topological sorting: ordering with dependency constraints'
            ]
          },
          {
            title: 'Dynamic Programming and Optimization',
            content: 'Dynamic programming solves complex problems by breaking them into simpler subproblems and storing results to avoid redundant computation. This technique is powerful for optimization problems and has applications in many fields.',
            examples: [
              'Memoization: top-down approach storing computed results',
              'Tabulation: bottom-up approach filling table systematically',
              'Fibonacci sequence: classic DP example avoiding exponential time',
              'Knapsack problem: optimization with constraints',
              'Longest common subsequence: string comparison algorithm',
              'Edit distance: measuring similarity between strings'
            ]
          },
          {
            title: 'Algorithm Complexity and Analysis',
            content: 'Algorithm analysis helps predict performance and choose appropriate algorithms for different scenarios. Understanding complexity helps make informed decisions about algorithm selection and optimization strategies.',
            keyFormulas: [
              'Big O notation: O(f(n)) - upper bound on growth rate',
              'Common complexities: O(1), O(log n), O(n), O(n log n), O(n²)',
              'Space complexity: memory usage in terms of input size',
              'Amortized analysis: average performance over sequence of operations'
            ],
            examples: [
              'Constant time O(1): array access, hash table lookup',
              'Logarithmic O(log n): binary search, balanced tree operations',
              'Linear O(n): array traversal, linear search',
              'Quadratic O(n²): nested loops, bubble sort',
              'Exponential O(2ⁿ): recursive Fibonacci, brute force solutions',
              'Trade-offs: time vs space, simplicity vs efficiency'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Implement a binary search tree with insertion, deletion, and search operations.',
            answer: 'class BST:\n    def __init__(self): self.root = None\n    def insert(self, val): # recursive insertion maintaining BST property\n    def delete(self, val): # handle three cases: leaf, one child, two children\n    def search(self, val): # recursive search comparing values',
            explanation: 'BST maintains ordering property and provides O(log n) average-case operations',
            difficulty: 'Hard'
          },
          {
            question: 'What is the time complexity of merge sort and why?',
            answer: 'O(n log n). Divides array into halves (log n levels) and merges each level in O(n) time. Total: O(n log n).',
            explanation: 'Divide-and-conquer approach with predictable performance regardless of input',
            difficulty: 'Medium'
          },
          {
            question: 'Solve the coin change problem using dynamic programming.',
            answer: 'def coin_change(coins, amount):\n    dp = [float(\"inf\")] * (amount + 1)\n    dp[0] = 0\n    for coin in coins:\n        for x in range(coin, amount + 1):\n            dp[x] = min(dp[x], dp[x - coin] + 1)\n    return dp[amount] if dp[amount] != float(\"inf\") else -1',
            explanation: 'Build up solutions for smaller amounts to solve larger amounts optimally',
            difficulty: 'Hard'
          },
          {
            question: 'Explain when to use a hash table vs a binary search tree.',
            answer: 'Hash table: O(1) average lookup, no ordering, memory overhead. BST: O(log n) lookup, maintains order, range queries. Choose based on whether ordering matters.',
            explanation: 'Different data structures optimize for different use cases and operations',
            difficulty: 'Medium'
          }
        ],
        realWorldApplications: [
          'Database systems: indexing and query optimization using B-trees',
          'Search engines: ranking algorithms and efficient text search',
          'Social networks: finding connections and communities using graph algorithms',
          'GPS navigation: shortest path algorithms for route planning',
          'Compilers: parsing and optimization using various data structures',
          'Machine learning: optimization algorithms and data processing pipelines'
        ],
        commonMistakes: [
          'Not considering worst-case complexity - average case can be misleading',
          'Choosing wrong data structure for the problem requirements',
          'Implementing recursive algorithms without considering stack overflow',
          'Not understanding the difference between stable and unstable sorts',
          'Forgetting to handle edge cases in algorithm implementation',
          'Optimizing prematurely without measuring actual performance bottlenecks'
        ],
        furtherReading: [
          'Introduction to Algorithms (CLRS): comprehensive algorithms textbook',
          'Algorithm Design Manual: practical approach to algorithm design',
          'LeetCode: practice platform for algorithm problems',
          'GeeksforGeeks: tutorials and examples for data structures',
          'Coursera: Algorithms specialization by Stanford University'
        ]
      }
    },
    'software-engineering-principles': {
      title: 'Software Engineering Principles',
      description: 'Learn software development methodologies, version control, and best practices.',
      duration: '4-5 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['Object-Oriented Programming'],
      learningObjectives: [
        'Understand software development lifecycle',
        'Apply version control with Git',
        'Practice code review and collaboration',
        'Learn testing methodologies',
        'Apply software design principles',
        'Use development tools effectively'
      ],
      keyTopics: [
        'SDLC methodologies (Agile, Waterfall)',
        'Version control with Git',
        'Testing strategies and frameworks',
        'Code quality and refactoring',
        'Documentation and commenting',
        'Debugging and troubleshooting',
        'Software architecture patterns'
      ],
      practiceAreas: [
        'Git workflow exercises',
        'Unit testing practice',
        'Code review simulations',
        'Refactoring challenges',
        'Project planning'
      ],
      examTips: [
        'Understand SDLC phases',
        'Master Git commands',
        'Practice writing tests',
        'Learn debugging strategies',
        'Study design patterns'
      ],
      detailedContent: {
        introduction: 'Software engineering principles provide the foundation for building reliable, maintainable, and scalable software systems. These practices distinguish professional software development from simple coding, emphasizing process, collaboration, and quality assurance throughout the development lifecycle.',
        conceptExplanations: [
          {
            title: 'Software Development Lifecycle (SDLC)',
            content: 'SDLC provides structured approaches to software development from conception to deployment and maintenance. Different methodologies offer various advantages depending on project requirements, team size, and organizational constraints.',
            examples: [
              'Waterfall: sequential phases - requirements, design, implementation, testing, deployment',
              'Agile: iterative development with short sprints and frequent delivery',
              'Scrum: specific Agile framework with roles, ceremonies, and artifacts',
              'Kanban: visual workflow management with continuous delivery',
              'DevOps: integration of development and operations for faster delivery',
              'Requirements gathering: understanding user needs and system constraints'
            ]
          },
          {
            title: 'Version Control and Collaboration',
            content: 'Version control systems track changes to code over time and enable collaboration among multiple developers. Git is the industry standard, providing distributed version control with powerful branching and merging capabilities.',
            examples: [
              'Repository: central storage for project code and history',
              'Commits: snapshots of code changes with descriptive messages',
              'Branches: parallel development lines for features or experiments',
              'Merging: combining changes from different branches',
              'Pull requests: code review and discussion before merging',
              'Conflict resolution: handling overlapping changes to same code'
            ]
          },
          {
            title: 'Testing and Quality Assurance',
            content: 'Systematic testing ensures software reliability and correctness. Different testing levels and types provide comprehensive coverage, while automated testing enables continuous integration and rapid feedback.',
            examples: [
              'Unit testing: testing individual functions or methods in isolation',
              'Integration testing: testing interactions between components',
              'System testing: testing complete application functionality',
              'Test-driven development (TDD): writing tests before implementation',
              'Code coverage: measuring percentage of code tested',
              'Continuous integration: automated testing on code changes'
            ]
          },
          {
            title: 'Code Quality and Maintainability',
            content: 'High-quality code is readable, maintainable, and follows established conventions. Code quality practices reduce bugs, improve collaboration, and make systems easier to modify and extend over time.',
            examples: [
              'Clean code: expressive names, small functions, clear structure',
              'Code reviews: peer examination of code changes for quality',
              'Refactoring: improving code structure without changing behavior',
              'Documentation: comments, README files, API documentation',
              'Style guides: consistent formatting and naming conventions',
              'Technical debt: accumulated shortcuts that need future attention'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Explain the difference between unit testing and integration testing.',
            answer: 'Unit testing tests individual components in isolation using mocks/stubs. Integration testing tests how components work together. Unit tests are faster and easier to debug, integration tests catch interface issues.',
            explanation: 'Different testing levels serve different purposes in quality assurance',
            difficulty: 'Medium'
          },
          {
            question: 'What are the benefits of using version control in software development?',
            answer: 'Track changes over time, collaborate safely, backup and recovery, branch for features, merge code changes, maintain release history, and enable rollbacks when needed.',
            explanation: 'Version control is essential for professional software development',
            difficulty: 'Easy'
          },
          {
            question: 'Describe the Agile software development methodology.',
            answer: 'Agile emphasizes iterative development, customer collaboration, responding to change, and working software. Uses short sprints, frequent delivery, and continuous feedback to adapt to changing requirements.',
            explanation: 'Agile provides flexible approach to software development',
            difficulty: 'Medium'
          },
          {
            question: 'What is technical debt and how should it be managed?',
            answer: 'Technical debt represents shortcuts taken for quick delivery that create future maintenance costs. Manage by tracking debt, prioritizing fixes, allocating time for refactoring, and balancing new features with debt reduction.',
            explanation: 'Technical debt management is crucial for long-term software health',
            difficulty: 'Hard'
          }
        ],
        realWorldApplications: [
          'Enterprise software: large-scale applications with complex requirements',
          'Open source projects: collaborative development with global contributors',
          'Startup development: rapid prototyping and iterative improvement',
          'Legacy system maintenance: updating and extending existing systems',
          'Mobile app development: rapid release cycles and user feedback',
          'DevOps implementation: automated testing and deployment pipelines'
        ],
        commonMistakes: [
          'Not writing tests or writing tests after bugs appear',
          'Poor commit messages that don\'t explain changes clearly',
          'Working directly on main branch instead of using feature branches',
          'Ignoring code review feedback or not doing reviews',
          'Not documenting code or keeping documentation outdated',
          'Accumulating technical debt without addressing it systematically'
        ],
        furtherReading: [
          'Clean Code: A Handbook of Agile Software Craftsmanship',
          'The Pragmatic Programmer: From Journeyman to Master',
          'Git Pro: comprehensive guide to Git version control',
          'Test-Driven Development: by Kent Beck',
          'Scrum Guide: official guide to Scrum framework'
        ]
      }
    },
    'database-systems-and-sql': {
      title: 'Database Systems and SQL',
      description: 'Master database design, SQL queries, and data management principles.',
      duration: '4-5 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['Programming Basics (Python)'],
      learningObjectives: [
        'Design relational database schemas',
        'Write complex SQL queries',
        'Understand database normalization',
        'Apply indexing and optimization',
        'Implement database transactions',
        'Connect databases to applications'
      ],
      keyTopics: [
        'Relational database concepts',
        'SQL queries and joins',
        'Database design and normalization',
        'Indexing and performance',
        'Transactions and ACID properties',
        'Database administration',
        'NoSQL alternatives'
      ],
      practiceAreas: [
        'SQL query exercises',
        'Database design projects',
        'Performance optimization',
        'Data modeling scenarios',
        'Application integration'
      ],
      examTips: [
        'Practice complex JOIN operations',
        'Understand normalization forms',
        'Learn query optimization',
        'Study transaction properties',
        'Master data types and constraints'
      ],
      detailedContent: {
        introduction: 'Database systems are fundamental to modern applications, providing reliable data storage, retrieval, and management. Understanding database design principles and SQL mastery enables building efficient, scalable data-driven applications across all domains of software development.',
        conceptExplanations: [
          {
            title: 'Relational Database Design Principles',
            content: 'Relational databases organize data into tables with defined relationships. Proper design eliminates redundancy, ensures data integrity, and supports efficient queries through normalization and careful schema planning.',
            examples: [
              'Tables: structured data storage with rows and columns',
              'Primary keys: unique identifiers for table rows',
              'Foreign keys: references to other tables establishing relationships',
              'Entity-Relationship (ER) diagrams: visual database design',
              'One-to-many relationships: customer has many orders',
              'Many-to-many relationships: students enrolled in multiple courses'
            ]
          },
          {
            title: 'SQL Query Language Mastery',
            content: 'SQL (Structured Query Language) provides powerful tools for data manipulation and retrieval. Advanced SQL techniques enable complex data analysis and reporting from relational databases.',
            examples: [
              'SELECT statements: retrieving data with filtering and sorting',
              'JOIN operations: combining data from multiple tables',
              'Aggregate functions: SUM, COUNT, AVG, MIN, MAX for calculations',
              'Subqueries: nested queries for complex filtering',
              'Window functions: advanced analytics over result sets',
              'Common Table Expressions (CTEs): temporary named result sets'
            ]
          },
          {
            title: 'Database Normalization and Optimization',
            content: 'Normalization eliminates data redundancy and ensures consistency through systematic table design. Understanding normal forms and denormalization trade-offs is crucial for efficient database systems.',
            examples: [
              'First Normal Form (1NF): eliminate repeating groups',
              'Second Normal Form (2NF): remove partial dependencies',
              'Third Normal Form (3NF): eliminate transitive dependencies',
              'Denormalization: trading redundancy for query performance',
              'Indexing: creating fast access paths to data',
              'Query execution plans: understanding database optimization'
            ]
          },
          {
            title: 'Transactions and Data Integrity',
            content: 'Database transactions ensure data consistency and reliability through ACID properties. Understanding transaction management is essential for building robust applications that handle concurrent access.',
            examples: [
              'Atomicity: all operations succeed or all fail',
              'Consistency: database remains in valid state',
              'Isolation: concurrent transactions don\'t interfere',
              'Durability: committed changes survive system failures',
              'Transaction isolation levels: controlling concurrent access',
              'Deadlock prevention: avoiding circular waiting conditions'
            ]
          }
        ],
        practiceQuestions: [
          {
            question: 'Write a SQL query to find the top 5 customers by total purchase amount.',
            answer: 'SELECT c.customer_name, SUM(o.total_amount) as total_purchases\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name\nORDER BY total_purchases DESC\nLIMIT 5;',
            explanation: 'JOIN tables, GROUP BY customer, SUM amounts, ORDER BY total, LIMIT results',
            difficulty: 'Medium'
          },
          {
            question: 'Explain the difference between INNER JOIN and LEFT JOIN.',
            answer: 'INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from left table plus matching rows from right table (NULLs for non-matches).',
            explanation: 'Different JOIN types determine which rows are included in results',
            difficulty: 'Easy'
          },
          {
            question: 'Design a normalized database schema for a library management system.',
            answer: 'Tables: Books (book_id, title, isbn), Authors (author_id, name), BookAuthors (book_id, author_id), Members (member_id, name, email), Loans (loan_id, book_id, member_id, loan_date, return_date)',
            explanation: 'Normalize to eliminate redundancy and establish proper relationships',
            difficulty: 'Hard'
          },
          {
            question: 'What is a database index and when should you use one?',
            answer: 'Index is a data structure that improves query speed by creating fast access paths. Use for frequently searched columns, foreign keys, and columns in WHERE/ORDER BY clauses. Balance query speed vs storage cost.',
            explanation: 'Indexes trade storage space for faster query performance',
            difficulty: 'Medium'
          }
        ],
        realWorldApplications: [
          'E-commerce: managing products, customers, orders, and inventory',
          'Banking systems: transactions, accounts, and financial records',
          'Healthcare: patient records, appointments, and medical history',
          'Social media: user profiles, posts, connections, and interactions',
          'Analytics: data warehousing and business intelligence systems',
          'Content management: articles, media, and user-generated content'
        ],
        commonMistakes: [
          'Not using indexes on frequently queried columns',
          'Over-normalizing leading to complex queries and poor performance',
          'Not handling NULL values properly in queries and comparisons',
          'Using SELECT * instead of specifying needed columns',
          'Not understanding different JOIN types and their results',
          'Ignoring database constraints leading to data integrity issues'
        ],
        furtherReading: [
          'SQL in 10 Minutes: Sams Teach Yourself SQL',
          'Database System Concepts: comprehensive database theory',
          'Learning SQL: Master SQL Fundamentals',
          'High Performance MySQL: optimization and administration',
          'MongoDB Documentation: NoSQL database alternative'
        ]
      }
    }
    // Add more Computer Science Fundamentals subtopics...
  }
  // Continue with other subjects...
}

interface SubtopicPageProps {
  params: Promise<{
    id: string
    subtopic: string
  }>
}

export default function SubtopicPage({ params }: SubtopicPageProps) {
  const [activeSection, setActiveSection] = useState('overview')
  
  // Unwrap the params Promise
  const { id, subtopic } = use(params)
  const courseId = parseInt(id)
  
  // Get subtopic data
  const courseSubtopics = subtopicsData[courseId as keyof typeof subtopicsData]
  const subtopicData = courseSubtopics?.[subtopic as keyof typeof courseSubtopics]
  
  if (!subtopicData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <Link href="/courses" className="text-gray-500 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <Link href={`/courses/${id}`} className="text-gray-500 hover:text-blue-600 transition-colors">
              Course {id}
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{subtopicData.title}</span>
          </nav>
        </div>
      </div>

      {/* Subtopic Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {subtopicData.difficulty}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {subtopicData.duration}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {subtopicData.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {subtopicData.description}
            </p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1 text-gray-600">
                <ClockIcon className="h-5 w-5" />
                <span>{subtopicData.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <AcademicCapIcon className="h-5 w-5" />
                <span>{subtopicData.difficulty}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: DocumentTextIcon },
                { id: 'concepts', label: 'Concepts', icon: AcademicCapIcon },
                { id: 'practice', label: 'Practice', icon: PresentationChartBarIcon },
                { id: 'applications', label: 'Applications', icon: BookOpenIcon },
                { id: 'objectives', label: 'Objectives', icon: AcademicCapIcon },
                { id: 'tips', label: 'Exam Tips', icon: LightBulbIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeSection === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeSection === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Subtopic Overview</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{subtopicData.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Duration</h3>
                        <p className="text-blue-700">{subtopicData.duration}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-2">Difficulty Level</h3>
                        <p className="text-green-700">{subtopicData.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'objectives' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Objectives</h2>
                  <div className="space-y-3">
                    {subtopicData.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'topics' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Topics</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {subtopicData.keyTopics.map((topic, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-gray-800 font-medium">{topic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'concepts' && subtopicData.detailedContent && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Concept Explanations</h2>
                  {subtopicData.detailedContent.introduction && (
                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Introduction</h3>
                      <p className="text-blue-800">{subtopicData.detailedContent.introduction}</p>
                    </div>
                  )}
                  <div className="space-y-6">
                    {subtopicData.detailedContent.conceptExplanations?.map((concept, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{concept.title}</h3>
                        <p className="text-gray-700 mb-4">{concept.content}</p>
                        {concept.keyFormulas && concept.keyFormulas.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Key Formulas:</h4>
                            <div className="space-y-1">
                              {concept.keyFormulas.map((formula, formulaIndex) => (
                                <code key={formulaIndex} className="block text-blue-600 font-mono">{formula}</code>
                              ))}
                            </div>
                          </div>
                        )}
                        {concept.examples && concept.examples.length > 0 && (
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-medium text-green-900 mb-2">Examples:</h4>
                            <div className="space-y-2">
                              {concept.examples.map((example, exampleIndex) => (
                                <p key={exampleIndex} className="text-green-800">{example}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {subtopicData.detailedContent.commonMistakes && subtopicData.detailedContent.commonMistakes.length > 0 && (
                    <div className="bg-red-50 rounded-lg p-6 mt-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Common Mistakes</h3>
                      <div className="space-y-2">
                        {subtopicData.detailedContent.commonMistakes.map((mistake, index) => (
                          <p key={index} className="text-red-800">{mistake}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === 'practice' && subtopicData.detailedContent?.practiceQuestions && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Questions</h2>
                  <div className="space-y-6">
                    {subtopicData.detailedContent.practiceQuestions.map((question, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{question.question}</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
                          <p className="text-gray-800 mb-2">{question.answer}</p>
                          <p className="text-gray-600 text-sm">{question.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'applications' && subtopicData.detailedContent?.realWorldApplications && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-World Applications</h2>
                  <div className="space-y-4">
                    {subtopicData.detailedContent.realWorldApplications.map((application, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                        <p className="text-gray-800 leading-relaxed">{application}</p>
                      </div>
                    ))}
                  </div>
                  {subtopicData.detailedContent.furtherReading && subtopicData.detailedContent.furtherReading.length > 0 && (
                    <div className="bg-purple-50 rounded-lg p-6 mt-6">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Further Reading</h3>
                      <div className="space-y-2">
                        {subtopicData.detailedContent.furtherReading.map((reading, index) => (
                          <p key={index} className="text-purple-800">{reading}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === 'practice' && !subtopicData.detailedContent?.practiceQuestions && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Areas</h2>
                  <div className="space-y-4">
                    {subtopicData.practiceAreas.map((area, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <PresentationChartBarIcon className="h-6 w-6 text-purple-600" />
                          <span className="text-gray-800 font-medium">{area}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'tips' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Exam Tips</h2>
                  <div className="space-y-4">
                    {subtopicData.examTips.map((tip, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <LightBulbIcon className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-800">{tip}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                <div className="space-y-2 mb-6">
                  {subtopicData.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{prerequisite}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    Start Learning
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Download Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Link
          href={`/courses/${id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Course
        </Link>
      </div>
    </div>
  )
}

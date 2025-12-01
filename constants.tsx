import { ReviewItem, Severity } from './types';

export const REVIEW_DATA: ReviewItem[] = [
  // CRITICAL ISSUES
  {
    id: 'c1',
    page: 8,
    location: 'Section 2 Title Area',
    issue: 'Template text remaining: "[说明：介绍本项目的...]"',
    suggestion: 'Delete all instructional text in brackets throughout the document (also found on Page 10 and Page 14).',
    severity: Severity.CRITICAL,
    category: 'Format',
    status: 'open'
  },
  {
    id: 'c2',
    page: 5,
    location: 'Paragraph 2',
    issue: 'Contextual Typo: "难以区分儿童" (Difficult to distinguish children)',
    suggestion: 'This is likely a typo for "难以区分不同噪声" (distinct noises) or similar. "Children" makes no sense in this context.',
    severity: Severity.CRITICAL,
    category: 'Language',
    status: 'open'
  },
  {
    id: 'c3',
    page: 14,
    location: 'Section 4',
    issue: 'Numbering Error: "(1) (1) 研究视角..."',
    suggestion: 'Remove the duplicate numbering. Change to "(1) 研究视角...".',
    severity: Severity.CRITICAL,
    category: 'Format',
    status: 'open'
  },
  
  // IMAGES
  {
    id: 'i1',
    page: '4, 5, 6, 7, 8, 13',
    location: 'Figures 1-6',
    issue: 'Figure Captions are in English ("FIG. 1. Variational quantum computing...")',
    suggestion: 'For a Chinese report, all figure captions MUST be in Chinese. English captions are only acceptable if the report is bilingual or if explicitly required, but titles like "FIG 1" should usually be "图 1".',
    severity: Severity.MAJOR,
    category: 'Image',
    status: 'open'
  },
  {
    id: 'i2',
    page: 4,
    location: 'Figure 1',
    issue: 'Missing Image Citation',
    suggestion: 'This figure appears to be from a paper (likely Cerezo et al. or McClean et al.). You must add "图片改编自 [参考文献]" (Figure adapted from [Ref]) in the caption.',
    severity: Severity.MAJOR,
    category: 'Image',
    status: 'open'
  },

  // LANGUAGE (English Abstract)
  {
    id: 'l1',
    page: 3,
    location: 'English Abstract Line 1',
    issue: 'Grammar: "In Variational quantum algorithms (VQAs) are among..."',
    suggestion: 'Remove "In". Start with "Variational Quantum Algorithms (VQAs) are among...".',
    severity: Severity.MAJOR,
    category: 'Language',
    status: 'open'
  },
  {
    id: 'l2',
    page: 3,
    location: 'English Abstract',
    issue: 'Capitalization Inconsistency',
    suggestion: 'Standardize terms. "barren plateaus" vs "Barren Plateaus". "Variational Quantum Algorithms" should be title case when defined.',
    severity: Severity.MINOR,
    category: 'Language',
    status: 'open'
  },

  // CITATIONS
  {
    id: 'ref4',
    page: '16-17',
    location: 'Bibliography Cross-Check',
    issue: 'Uncited References (Orphaned Bibliography)',
    suggestion: 'Detected several references in the bibliography that are never cited in the main text. Examples include: "Cai, Z. (2023)", "Carroll, M. P. (2022)", "Christensen, B. G. (2019)", and "Dialameh...". Action required: cite them in the text or remove them from the reference list.',
    severity: Severity.MAJOR,
    category: 'Citation',
    status: 'open'
  },
  {
    id: 'ref1',
    page: '15-17',
    location: 'References Section',
    issue: 'Metadata Junk in References',
    suggestion: 'Remove automated citation manager artifacts like "APS Link", "McDermott Lab", "ScienceDirect", "Grafiati", "Quantum Journal". These should not appear in a printed bibliography.',
    severity: Severity.MAJOR,
    category: 'Citation',
    status: 'open'
  },
  {
    id: 'ref2',
    page: 17,
    location: 'Reference (Volpert)',
    issue: 'Incomplete Reference',
    suggestion: '"arXiv:2412.xxxx" indicates a placeholder. Update with the actual number or check if it is published.',
    severity: Severity.MAJOR,
    category: 'Citation',
    status: 'open'
  },
  {
    id: 'ref3',
    page: 'General',
    location: 'In-text Citations',
    issue: 'Inconsistency between "et al." and "等"',
    suggestion: 'Ensure consistency. If writing in Chinese, prefer "Name 等 (Year)" or "Name et al. (Year)". Do not mix styles unless the specific template allows it.',
    severity: Severity.MINOR,
    category: 'Citation',
    status: 'open'
  },

  // MATH / LOGIC
  {
    id: 'm1',
    page: 7,
    location: 'Theory Section',
    issue: 'Missing Math Symbol (f)',
    suggestion: 'The OCR text shows "1/ 噪声". It implies the "f" (frequency) is missing or in a font that did not print/scan. Ensure it reads "1/f 噪声" in italics.',
    severity: Severity.MAJOR,
    category: 'Logic',
    status: 'open'
  },
  {
    id: 'm2',
    page: 4,
    location: 'Figure 1 Caption',
    issue: 'Typo in variable',
    suggestion: '"sample estimate of ℓθ (p, O)" -> Should likely be "ρ" (rho) not "p".',
    severity: Severity.MINOR,
    category: 'Logic',
    status: 'open'
  }
];
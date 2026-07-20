export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface Chapter {
  id: string;
  title: string;
  kannadaTitle: string;
  author: string;
  type: 'prose' | 'poetry' | 'supplementary';
  audioPath: string;
  exercisesAudioPath: string;
  intro: string;
  exercises: QuestionAnswer[];
}

export const KANNADA_DATA: Chapter[] = [
  // PROSE
  {
    id: 'prose_1',
    title: 'Prajanishte',
    kannadaTitle: 'ಪ್ರಜಾನಿಷ್ಠೆ',
    author: 'ಸಾ. ಶಿ. ಮರುಳಯ್ಯ',
    type: 'prose',
    audioPath: '/audio/class_9/kannada/chapter_1_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/chapter_1_exercises.mp3',
    intro: 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ದೊರೆ ವಿಷ್ಣುವರ್ಧನ ಮತ್ತು ನಾಟ್ಯರಾಣಿ ಶಾಂತಲೆಯ ಪ್ರಜಾಪ್ರೇಮ ಹಾಗೂ ತ್ಯಾಗದ ಕಥೆ.',
    exercises: [
      {
        question: 'ಹೊಯ್ಸಳರ ಸೇನೆ ಯಾವ ಕಡೆಗೆ ಜೈತ್ರಯಾತ್ರೆ ಹೊರಟಿತು?',
        answer: 'ಹೊಯ್ಸಳರ ಸೇನೆಯು ತಲಕಾಡಿನ ಕಡೆಗೆ ಜೈತ್ರಯಾತ್ರೆ ಹೊರಟಿತು.'
      },
      {
        question: 'ಚೋಳರ ಪ್ರತಿನಿಧಿಯಾಗಿ ತಲಕಾಡಿನಲ್ಲಿದ್ದವನು ಯಾರು?',
        answer: 'ಚೋಳರ ದೊರೆ ಕುಲೋತ್ತುಂಗನ ಪ್ರತಿನಿಧಿಯಾಗಿ ಆದಿಯಮ ತಲಕಾಡಿನಲ್ಲಿದ್ದನು.'
      },
      {
        question: 'ರಾಜ ದಂಪತಿಗಳು ಯುದ್ಧದ ಸಮಯದಲ್ಲಿ ಯಾವ ವಿಷಯಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಿದರು?',
        answer: 'ವಿಷ್ಣುವರ್ಧನ ಮತ್ತು ಶಾಂತಲಾದೇವಿಯರು ತಮ್ಮ ವೈಯಕ್ತಿಕ ಸುಖಕ್ಕಿಂತ ಪ್ರಜೆಗಳ ರಕ್ಷಣೆ ಮತ್ತು ಕಲ್ಯಾಣಕ್ಕೆ ಹೆಚ್ಚಿನ ಆದ್ಯತೆ ನೀಡಿದರು.'
      }
    ]
  },
  {
    id: 'prose_2',
    title: 'Bedagina Taana Jayapura',
    kannadaTitle: 'ಬೆಡಗಿನ ತಾಣ ಜಯಪುರ',
    author: 'ಶಿವರಾಮ ಕಾರಂತ',
    type: 'prose',
    audioPath: '/audio/class_9/kannada/chapter_2_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/chapter_2_exercises.mp3',
    intro: 'ರಾಜಸ್ಥಾನದ ಗುಲಾಬಿ ನಗರಿ ಜೈಪುರದ ಸುಂದರ ವಾಸ್ತುಶಿಲ್ಪ, ಕೋಟೆಗಳು ಮತ್ತು ಇತಿಹಾಸದ ರೋಮಾಂಚಕ ವಿವರಣೆ.',
    exercises: [
      {
        question: 'ಜೈಪುರವನ್ನು ಯಾವ ನಗರವೆಂದು ಕರೆಯುತ್ತಾರೆ?',
        answer: 'ಜೈಪುರವನ್ನು "ಗುಲಾಬಿ ನಗರಿ" (Pink City) ಎಂದು ಕರೆಯುತ್ತಾರೆ.'
      },
      {
        question: 'ಜೈಪುರದ ಸುಂದರ ಅರಮನೆಗಳ ಹೆಸರೇನು?',
        answer: 'ಜೈಪುರದಲ್ಲಿ ಹವಾ ಮಹಲ್, ಜಲ ಮಹಲ್ ಮತ್ತು ಅಂಬರ್ ಕೋಟೆ ಮುಂತಾದ ಸುಂದರ ಅರಮನೆಗಳಿವೆ.'
      },
      {
        question: 'ಜೈಪುರದ ರಸ್ತೆಗಳ ವೈಶಿಷ್ಟ್ಯವೇನು?',
        answer: 'ಜೈಪುರದ ರಸ್ತೆಗಳು ವಿಶಾಲವಾಗಿದ್ದು, ಅವು ಪರಸ್ಪರ ಲಂಬಕೋನದಲ್ಲಿ ಛೇದಿಸುವಂತೆ ವ್ಯವಸ್ಥಿತವಾಗಿ ನಿರ್ಮಿಸಲ್ಪಟ್ಟಿವೆ.'
      }
    ]
  },
  {
    id: 'prose_3',
    title: 'Ramarajya',
    kannadaTitle: 'ರಾಮರಾಜ್ಯ',
    author: 'ಎನ್. ರಂಗನಾಥ ಶರ್ಮಾ',
    type: 'prose',
    audioPath: '/audio/class_9/kannada/chapter_3_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/chapter_3_exercises.mp3',
    intro: 'ಆದರ್ಶ ಆಡಳಿತಕ್ಕೆ ಮಾದರಿಯಾದ ಶ್ರೀರಾಮನ ರಾಜ್ಯಭಾರದ ಪರಿಕಲ್ಪನೆ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯದ ವಿಚಾರಧಾರೆಗಳು.',
    exercises: [
      {
        question: 'ರಾಮರಾಜ್ಯದ ಪ್ರಮುಖ ಗುಣಲಕ್ಷಣಗಳಾವುವು?',
        answer: 'ರಾಮರಾಜ್ಯದಲ್ಲಿ ಪ್ರಜೆಗಳು ಸತ್ಯವಂತರಾಗಿದ್ದರು, ಕಳ್ಳತನ ಮತ್ತು hipಸೆ ಇಲ್ಲದ ಸುಖೀ ಜೀವನವನ್ನು ನಡೆಸುತ್ತಿದ್ದರು.'
      },
      {
        question: 'ಶ್ರೀರಾಮನು ತನ್ನ ಪ್ರಜೆಗಳನ್ನು ಹೇಗೆ ನಡೆಸಿಕೊಳ್ಳುತ್ತಿದ್ದನು?',
        answer: 'ಶ್ರೀರಾಮನು ತನ್ನ ಪ್ರಜೆಗಳನ್ನು ಸ್ವಂತ ಮಕ್ಕಳಂತೆ ಅತ್ಯಂತ ಪ್ರೀತಿ ಮತ್ತು ಕರುಣೆಯಿಂದ ನೋಡಿಕೊಳ್ಳುತ್ತಿದ್ದನು.'
      }
    ]
  },
  {
    id: 'prose_4',
    title: 'Adarsha Shikshaka Radhakrishnan',
    kannadaTitle: 'ಆದರ್ಶ ಶಿಕ್ಷಕ ಸರ್ವೇಪಲ್ಲಿ ರಾಧಾಕೃಷ್ಣನ್',
    author: 'ಸಮಿತಿ ರಚನೆ',
    type: 'prose',
    audioPath: '/audio/class_9/kannada/chapter_4_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/chapter_4_exercises.mp3',
    intro: 'ಭಾರತದ ಎರಡನೆಯ ರಾಷ್ಟ್ರಪತಿ ಹಾಗೂ ಶ್ರೇಷ್ಠ ತತ್ತ್ವಜ್ಞಾನಿ ಡಾ. ಸರ್ವೇಪಲ್ಲಿ ರಾಧಾಕೃಷ್ಣನ್ ಅವರ ಶೈಕ್ಷಣಿಕ ಕೊಡುಗೆಗಳ ಜೀವನ ಚರಿತ್ರೆ.',
    exercises: [
      {
        question: 'ಡಾ. ರಾಧಾಕೃಷ್ಣನ್ ಅವರ ಜನ್ಮದಿನವನ್ನು ಯಾವ ದಿನವಾಗಿ ಆಚರಿಸಲಾಗುತ್ತದೆ?',
        answer: 'ಡಾ. ರಾಧಾಕೃಷ್ಣನ್ ಅವರ ಜನ್ಮದಿನವಾದ ಸೆಪ್ಟೆಂಬರ್ ೫ ರನ್ನು ದೇಶಾದ್ಯಂತ "ಶಿಕ್ಷಕರ ದಿನ" ಎಂದು ಆಚರಿಸಲಾಗುತ್ತದೆ.'
      },
      {
        question: 'ರಾಧಾಕೃಷ್ಣನ್ ಅವರು ವಹಿಸಿದ ಉನ್ನತ ಹುದ್ದೆಗಳು ಯಾವುವು?',
        answer: 'ಅವರು ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದಲ್ಲಿ ಪ್ರಾಧ್ಯಾಪಕರಾಗಿ, ಆಂಧ್ರ ವಿಶ್ವವಿದ್ಯಾಲಯದ ಉಪಕುಲಪತಿಯಾಗಿ, ರಷ್ಯಾದ ರಾಯಭಾರಿಯಾಗಿ, ಉಪರಾಷ್ಟ್ರಪತಿಯಾಗಿ ಹಾಗೂ ಭಾರತದ ಎರಡನೆಯ ರಾಷ್ಟ್ರಪತಿಯಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದರು.'
      }
    ]
  },

  // POETRY
  {
    id: 'poetry_1',
    title: 'Paarivala',
    kannadaTitle: 'ಪಾರಿವಾಳ',
    author: 'ಸು. ರಂ. ಎಕ್ಕುಂಡಿ',
    type: 'poetry',
    audioPath: '/audio/class_9/kannada/poem_1_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/poem_1_exercises.mp3',
    intro: 'ಯುದ್ಧದ ವಿರುದ್ಧ ಶಾಂತಿ ಮತ್ತು ಸೌಹಾರ್ದತೆಯ ಸಂಕೇತವಾಗಿ ಪಾರಿವಾಳವನ್ನು ಬಳಸಿಕೊಂಡಿರುವ ಸುಂದರ ಕವನ.',
    exercises: [
      {
        question: 'ಪಾರಿವಾಳ ಯಾವುದರ ಸಂಕೇತವಾಗಿದೆ?',
        answer: 'ಪಾರಿವಾಳವು ಪ್ರೀತಿ, ಶಾಂತಿ ಮತ್ತು ಜೀವಪರತೆಯ ಸಂಕೇತವಾಗಿದೆ.'
      },
      {
        question: 'ಕವಿ ಪಾರಿವಾಳಕ್ಕೆ ಏನನ್ನು ತರಲು ವಿನಂತಿಸುತ್ತಾರೆ?',
        answer: 'ಯುದ್ಧದ ಕಿಚ್ಚನ್ನು ಆರಿಸಿ, ಜಗತ್ತಿನಲ್ಲಿ ಸ್ನೇಹ ಮತ್ತು ಪ್ರೇಮದ ವಾತಾವರಣವನ್ನು ತರಲು ಕವಿ ಪಾರಿವಾಳಕ್ಕೆ ವಿನಂತಿಸುತ್ತಾರೆ.'
      }
    ]
  },
  {
    id: 'poetry_2',
    title: 'Hosahaadu',
    kannadaTitle: 'ಹೊಸಹಾಡು',
    author: 'ಕಯ್ಯಾರ ಕಿಞ್ಞಣ್ಣ ರೈ',
    type: 'poetry',
    audioPath: '/audio/class_9/kannada/poem_2_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/poem_2_exercises.mp3',
    intro: 'ದೇಶಪ್ರೇಮ, ಸ್ವಾಭಿಮಾನ ಮತ್ತು ಹೊಸ ಸಮಾಜದ ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಕ್ರಾಂತಿಯ ಕರೆ ನೀಡುವ ಅದ್ಭುತ ಗೀತೆ.',
    exercises: [
      {
        question: 'ಹೊಸಹಾಡನ್ನು ಹಾಡಲು ಕಾರಣವೇನು?',
        answer: 'ದೇಶದ ಜನರಲ್ಲಿ ಜಾಗೃತಿ ತರಲು, ಅನ್ಯಾಯವನ್ನು ವಿರೋಧಿಸಲು ಹಾಗೂ ಹೊಸ ಚೈತನ್ಯ ತುಂಬಲು ಹೊಸಹಾಡನ್ನು ಹಾಡಬೇಕಾಗಿದೆ.'
      },
      {
        question: 'ಕವಿ ದೇಶದ ಯುವಕರಲ್ಲಿ ಯಾವ ಭಾವವನ್ನು ಕಾಣಬಯಸುತ್ತಾರೆ?',
        answer: 'ಕವಿ ಯುವಕರಲ್ಲಿ ದೃಢ ನಿರ್ಧಾರ, ಕ್ರಾಂತಿ ಮನೋಭಾವ ಮತ್ತು ದೇಶ ಸೇವಾ ತತ್ಪರತೆಯನ್ನು ಕಾಣಬಯಸುತ್ತಾರೆ.'
      }
    ]
  },
  {
    id: 'poetry_3',
    title: 'Chakra Grahana',
    kannadaTitle: 'ಚಕ್ರ ಗ್ರಹಣ',
    author: 'ದೇವಿದಾಸ',
    type: 'poetry',
    audioPath: '/audio/class_9/kannada/poem_3_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/poem_3_exercises.mp3',
    intro: 'ಮಹಾಭಾರತದ ಪ್ರಮುಖ ಪ್ರಸಂಗವಾದ ಭೀಷ್ಮ ಪರ್ವದಲ್ಲಿ ಶ್ರೀಕೃಷ್ಣನು ಭೀಷ್ಮರ ಪ್ರತಿಜ್ಞೆಗಾಗಿ ಚಕ್ರ ಹಿಡಿದ ಘಟನೆ.',
    exercises: [
      {
        question: 'ಶ್ರೀಕೃಷ್ಣನು ಚಕ್ರವನ್ನು ಏತಕ್ಕಾಗಿ ಹಿಡಿದನು?',
        answer: 'ರಣರಂಗದಲ್ಲಿ ಭೀಷ್ಮರನ್ನು ಸಂಹರಿಸಲು ಮತ್ತು ಅರ್ಜುನನ ಪ್ರಾಣವನ್ನು ಉಳಿಸಲು ಶ್ರೀಕೃಷ್ಣನು ಸುದರ್ಶನ ಚಕ್ರವನ್ನು ಕೈಗೆತ್ತಿಕೊಂಡನು.'
      },
      {
        question: 'ಭೀಷ್ಮನು ಕೃಷ್ಣನನ್ನು ಕಂಡಾಗ ಯಾವ ಭಾವ ತಳೆದನು?',
        answer: 'ಭೀಷ್ಮನು ಕೃಷ್ಣನನ್ನು ಭಕ್ತಿಭಾವದಿಂದ ನೋಡಿ, ಆತನ ಕೈಯಿಂದ ಸಾವು ಬಂದರೆ ಮುಕ್ತಿ ಸಿಗುತ್ತದೆ ಎಂದು ಪ್ರಾರ್ಥಿಸಿದನು.'
      }
    ]
  },
  {
    id: 'poetry_4',
    title: 'Baliyanittode Munivem',
    kannadaTitle: 'ಬಲಿಯನಿತ್ತೊಡೆ ಮುನಿವೆಂ',
    author: 'ಜನ್ನ',
    type: 'poetry',
    audioPath: '/audio/class_9/kannada/poem_4_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/poem_4_exercises.mp3',
    intro: 'ಅಹಿಂಸಾ ಧರ್ಮದ ಮಹತ್ವವನ್ನು ಸಾರುವ ಕಾವ್ಯ. ಪ್ರಾಣಿಬಲಿ ನೀಡಿದರೆ ದೇವಿ ಕೋಪಗೊಳ್ಳುತ್ತಾಳೆ ಎಂಬ ಸಂದೇಶ.',
    exercises: [
      {
        question: 'ಅಭಯರುಚಿಯ ಸಹೋದರಿಯ ಹೆಸರೇನು?',
        answer: 'ಅಭಯರುಚಿಯ ಸಹೋದರಿಯ ಹೆಸರು ಅಭಯಮತಿ.'
      },
      {
        question: 'ಮಾರಿದತ್ತ ಪಟ್ಟವನ್ನು ಯಾರಿಗೆ ಕಟ್ಟಿದನು?',
        answer: 'ಮಾರಿದತ್ತನು ಕುಸುಮದತ್ತನಿಗೆ ಪಟ್ಟವನ್ನು ಕಟ್ಟಿದನು.'
      },
      {
        question: 'ಚಂಡಮಾರಿ ಜನರನ್ನು ಕುರಿತು ಹೇಳಿದ್ದು ಏನು?',
        answer: 'ನನಗೆ ಜಲ, ಪುಷ್ಪಗಳಿಂದ ಪೂಜೆ ಮಾಡಿ; ಆದರೆ ಪ್ರಾಣಿಗಳನ್ನು ಬಲಿಕೊಟ್ಟರೆ ನಾನು ಕೋಪಗೊಳ್ಳುತ್ತೇನೆ ಎಂದು ಚಂಡಮಾರಿ ಹೇಳಿದಳು.'
      }
    ]
  },

  // SUPPLEMENTARY
  {
    id: 'supp_1',
    title: 'Puttahakki',
    kannadaTitle: 'ಪುಟ್ಟಹಕ್ಕಿ',
    author: 'ಜಂಬಣ್ಣ ಅಮರಚಿಂತ',
    type: 'supplementary',
    audioPath: '/audio/class_9/kannada/supp_1_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/supp_1_exercises.mp3',
    intro: 'ಚಿಕ್ಕ ಹಕ್ಕಿಯ ಮೂಲಕ ಮಾನವನ ಅದಮ್ಯ ಚೇತನ, ಸ್ವಾತಂತ್ರ್ಯ ಮತ್ತು ಹೋರಾಟದ ಗುಣಗಳನ್ನು ಪ್ರತಿಪಾದಿಸುವ ಕವಿತೆ.',
    exercises: [
      {
        question: 'ಪುಟ್ಟಹಕ್ಕಿ ಗೂಡನ್ನು ಹೇಗೆ ಕಟ್ಟುತ್ತದೆ?',
        answer: 'ಕಡ್ಡಿ ಕಡ್ಡಿಗಳನ್ನು ಕೂರಿಸಿ ಪುಟ್ಟಹಕ್ಕಿ ಗೂಡನ್ನು ಕಟ್ಟುತ್ತದೆ.'
      },
      {
        question: 'ಗೀತೆಯನ್ನು ಹಾಡುತ್ತಾ ಪುಟ್ಟಹಕ್ಕಿ ಯಾರನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ?',
        answer: 'ಗೀತೆಯನ್ನು ಹಾಡುತ್ತಾ ಪುಟ್ಟಹಕ್ಕಿ ಸೂರ್ಯನನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ.'
      },
      {
        question: 'ಭೂಮಿ ಮತ್ತು ಆಕಾಶದಲ್ಲಿ ಹಕ್ಕಿಗೆ ಯಾರ ಭಯವಿದೆ?',
        answer: 'ಭೂಮಿಯಲ್ಲಿ ಹಾವಿನ (ಭುಜಂಗನ) ಭಯ ಮತ್ತು ಆಕಾಶದಲ್ಲಿ ಗಿಡುಗನ ಭಯವಿದೆ.'
      }
    ]
  },
  {
    id: 'supp_2',
    title: 'Chennabhairadevi',
    kannadaTitle: 'ಚೆನ್ನಭೈರಾದೇವಿ',
    author: 'ಡಾ. ಗಜಾನನ ಶರ್ಮ',
    type: 'supplementary',
    audioPath: '/audio/class_9/kannada/supp_2_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/supp_2_exercises.mp3',
    intro: 'ಕಾಳುಮೆಣಸಿನ ರಾಣಿ ಚೆನ್ನಭೈರಾದೇವಿಯ ಶೌರ್ಯ, ರಾಜಕೀಯ ಚತುರತೆ ಮತ್ತು ದೇಶಾಭಿಮಾನವನ್ನು ಪರಿಚಯಿಸುವ ನಾಟಕ.',
    exercises: [
      {
        question: 'ಚೆನ್ನಭೈರಾದೇವಿಗೆ ಉದ್ಧಟತನದ ಪತ್ರ ಬರೆದವನು ಯಾರು?',
        answer: 'ಗೋವೆಯ ಪೋರ್ಚುಗೀಸ್ ಗವರ್ನರ್ ಲೂಯಿಸ್ ಅಟಾಯಿಡೆ ಚೆನ್ನಭೈರಾದೇವಿಗೆ ಪತ್ರ ಬರೆದಿದ್ದನು.'
      },
      {
        question: 'ಪೋರ್ಚುಗೀಸರು ಚೆನ್ನಭೈರಾದೇವಿಗೆ ನೀಡಿದ್ದ ಬಿರುದು ಯಾವುದು?',
        answer: 'ಪೋರ್ಚುಗೀಸರು ಆಕೆಗೆ "ಕಾಳುಮೆಣಸಿನ ರಾಣಿ" (ರೈನಾ ದೆ ಪಿಮೆಂಟಾ) ಎಂಬ ಬಿರುದನ್ನು ನೀಡಿದ್ದರು.'
      },
      {
        question: 'ಶಬಲೆ ಹೇಳಿದಂತೆ ಪೋರ್ಚುಗೀಸರು ಯಾವ ಕಾರಣಗಳಿಗಾಗಿ ಯುದ್ಧಕ್ಕೆ ಸಿದ್ಧರಾಗಿದ್ದರು?',
        answer: 'ರೋಜಾರಿಯೋನನ್ನು ಬಂಧಿಸಿ ದಂಡಿಸಲು ಮತ್ತು ಮತಾಂತರಕ್ಕೆ ಅವಕಾಶ ನೀಡದ ರಾಣಿಯನ್ನು ಬಂಧಿಸಿ ಗೋವೆಗೆ ಒಯ್ಯಲು ಅವರು ಯುದ್ಧಕ್ಕೆ ಸಿದ್ಧರಾಗಿದ್ದರು.'
      }
    ]
  },
  {
    id: 'supp_3',
    title: 'Siriyaninnen Bannipenu',
    kannadaTitle: 'ಸಿರಿಯನಿನ್ನೇನ ಬಣ್ಣಿಪೆನು',
    author: 'ರತ್ನಾಕರವರ್ಣಿ',
    type: 'supplementary',
    audioPath: '/audio/class_9/kannada/supp_3_main.mp3',
    exercisesAudioPath: '/audio/class_9/kannada/supp_3_exercises.mp3',
    intro: 'ಭರತೇಶವೈಭವ ಕಾವ್ಯದ ಭಾಗ. ಭರತ ಚಕ್ರವರ್ತಿಯ ಆಡಳಿತದ ವೈಭವ ಮತ್ತು ಕನ್ನಡಿಗರ ಭಾಷಾ ಸ್ವಾಭಿಮಾನದ ಕಥನ.',
    exercises: [
      {
        question: 'ಭರತೇಶವೈಭವ ಕಾವ್ಯದ ಕರ್ತೃ ಯಾರು?',
        answer: 'ಭರತೇಶವೈಭವ ಕಾವ್ಯದ ಕರ್ತೃ ರತ್ನಾಕರವರ್ಣಿ.'
      },
      {
        question: 'ಭರತನನ್ನು ಹೊಗಳುತ್ತಿದ್ದ ಮೂರು ಲೋಕಗಳು ಯಾವುವು?',
        answer: 'ಸ್ವರ್ಗ, ಮರ್ತ್ಯ ಮತ್ತು ಪಾತಾಳ ಲೋಕಗಳು ಭರತನನ್ನು ಹೊಗಳುತ್ತಿದ್ದವು.'
      },
      {
        question: 'ಬೇರೆ ಬೇರೆ ಭಾಷಿಕರು ತನ್ನ ಕೃತಿಯನ್ನು ಹೇಗೆ ಹೊಗಳಬೇಕೆಂದು ಕವಿ ಬಯಸುವನು?',
        answer: 'ಕನ್ನಡಿಗರು "ಅಯ್ಯಯ್ಯ ಚೆನ್ನಾದುದು" ಎಂದೂ, ತೆಲುಗರು "ರಯ್ಯಾ ಮಂಚಿದಿ" ಎಂದೂ, ತುಳುವರು "ಅಯ್ಯಯ್ಯ ಎಂಚ ಪೊರ್ಲಾಂಡ್" ಎಂದೂ ಮೈಯುಬ್ಬಿ ಕೃತಿಯನ್ನು ಹೊಗಳಬೇಕೆಂದು ಕವಿ ಬಯಸುತ್ತಾನೆ.'
      }
    ]
  }
];

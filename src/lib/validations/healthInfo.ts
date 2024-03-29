import { z } from 'zod';

export const HealthFormSchema = z.object({
  SystemReview: z.object({
    head: z.string().min(4, {
      message: 'Revision de cabeza debe tener al menos 4 caracteres.',
    }),
    neck: z.string().min(4, {
      message: 'Revision de cuello debe tener al menos 4 caracteres.',
    }),
    genitourinary: z.string().min(4, {
      message: 'Revision genitourinaria debe tener al menos 4 caracteres.',
    }),
    eyes: z.string().min(4, {
      message: 'Revision de ojos debe tener al menos 4 caracteres.',
    }),
    cardiovascular: z.string().min(4, {
      message: 'Revision cardiovascular debe tener al menos 4 caracteres.',
    }),
    locomotor: z.string().min(4, {
      message: 'Revision locomotora debe tener al menos 4 caracteres.',
    }),
    ORL: z.string().min(4, {
      message: 'Revision de ORL debe tener al menos 4 caracteres.',
    }),
    respiratory: z.string().min(4, {
      message: 'Revision respiratoria debe tener al menos 4 caracteres.',
    }),
    skin: z.string().min(4, {
      message: 'Revision de piel debe tener al menos 4 caracteres.',
    }),
    stomological: z.string().min(4, {
      message: 'Revision estomológica debe tener al menos 4 caracteres.',
    }),
    gastrointestinal: z.string().min(4, {
      message: 'Revision gastrointestinal debe tener al menos 4 caracteres.',
    }),
    circulatory: z.string().min(4, {
      message: 'Revision circulatoria debe tener al menos 4 caracteres.',
    }),
  }),

  FamilyBackground: z
    .object({
      diabetes: z.boolean(),
      familyDiabetes: z.string().optional(),
      cancer: z.boolean(),
      familyCancer: z.string().optional(),
      leukemia: z.boolean(),
      familyLeukemia: z.string().optional(),
      heartDisease: z.boolean(),
      familyHeartDisease: z.string().optional(),
      hypertension: z.boolean(),
      familyHypertension: z.string().optional(),
      others: z.boolean(),
      familyOthers: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.diabetes && !data.familyDiabetes) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción familiar es requerida si diabetes es verdadero.',
        path: ['familyDiabetes'],
      }
    )
    .refine(
      (data) => {
        if (data.cancer && !data.familyCancer) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción familiar es requerida si cancer es verdadero.',
        path: ['familyCancer'],
      }
    )
    .refine(
      (data) => {
        if (data.leukemia && !data.familyLeukemia) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción familiar es requerida si leucemia es verdadero.',
        path: ['familyLeukemia'],
      }
    )
    .refine(
      (data) => {
        if (data.heartDisease && !data.familyHeartDisease) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción familiar es requerida si enfermedad cardiaca es verdadero.',
        path: ['familyHeartDisease'],
      }
    )
    .refine(
      (data) => {
        if (data.hypertension && !data.familyHypertension) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción familiar es requerida si hipertensión es verdadero.',
        path: ['familyHypertension'],
      }
    )
    .refine(
      (data) => {
        if (data.others && !data.familyOthers) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción familiar es requerida si otros es verdadero.',
        path: ['familyOthers'],
      }
    ),

  PersonalBackground: z
    .object({
      allergies: z.string(),
      medications: z.string(),
      habits: z.string().min(4, {
        message: 'Hábitos debe tener al menos 4 caracteres.',
      }),
      habitsDescription: z.string().optional(),

      diabetes: z.boolean(),
      cancer: z.boolean(),
      leukemia: z.boolean(),
      heartDisease: z.boolean(),
      hospitalization: z.boolean(),
      psychological: z.boolean(),
      hypertension: z.boolean(),

      surgeries: z.boolean(),
      surgeriesDescription: z.string().optional(),
      others: z.boolean(),
      othersDescription: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.habits === 'Otros' && !data.habitsDescription) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción de hábitos es requerida si hábitos es "otros".',
        path: ['habitsDescription'],
      }
    )
    .refine(
      (data) => {
        if (data.surgeries && !data.surgeriesDescription) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción de cirugías es requerida si cirugías es verdadero.',
        path: ['surgeriesDescription'],
      }
    )
    .refine(
      (data) => {
        if (data.others && !data.othersDescription) {
          return false;
        }
        return true;
      },
      {
        message: 'La descripción de otros es requerida si otros es verdadero.',
        path: ['othersDescription'],
      }
    ),

  OralSystemReview: z.object({
    faneras: z.string().min(4, {
      message: 'Faneras debe tener al menos 4 caracteres.',
    }),
    oralCavity: z.string().min(4, {
      message: 'Cavidad oral debe tener al menos 4 caracteres.',
    }),
    teeth: z.enum([
      'Temporales',
      'Mixto',
      'Permanentes',
      'EdentuloTotal',
      'EdentuloParcial',
      'Agenesias',
      'Anodoncia',
    ]),
    tongue: z.enum([
      'SinAlteraciones',
      'Bifida',
      'Geografica',
      'Fisurada',
      'Macroglosia',
      'Microglosia',
      'Pliegues',
      'Frenillos',
      'Ulceras',
      'Quemaduras',
      'Mordeduras',
      'Tumores',
      'Crecimiento',
      'Atrofia',
      'Hipertrofia   ',
    ]),
    ATMLeft: z.enum([
      'SinAlteraciones',
      'Brinco',
      'Subluxacion',
      'Luxacion',
      'Retrodisquitis',
      'Sinovitis',
      'Artrosis',
      'Anquilosis',
      'Fractura',
      'Tumores',
      'Crecimiento',
      'Atrofia',
      'Hipertrofia',
    ]),
    ATMRight: z.enum([
      'SinAlteraciones',
      'Brinco',
      'Subluxacion',
      'Luxacion',
      'Retrodisquitis',
      'Sinovitis',
      'Artrosis',
      'Anquilosis',
      'Fractura',
      'Tumores',
      'Crecimiento',
      'Atrofia',
      'Hipertrofia',
    ]),
    salivaryGlands: z.enum([
      'SinAlteraciones',
      'Sialorrea',
      'Xerostomia',
      'Sialolitiasis',
      'Sialoadenitis',
      'Tumores',
      'Crecimiento',
      'Atrofia',
      'Hipertrofia',
      'Fistulas',
      'Quistes',
      'Sialocele',
      'Ranula',
      'Mucocele',
      'Sialadenosis',
      'Sialosis',
    ]),
    occlusion: z.enum([
      'ClaseI',
      'ClaseII',
      'ClaseIII',
      'MordidaAbierta',
      'MordidaCruzada',
      'MordidaProfunda',
      'Organica',
      'EnGrupo',
      'BilateralBalanceada',
    ]),
    teethColor: z.string().min(2, {
      message: 'Color de dientes debe tener al menos 2 caracteres.',
    }),
    painThreshold: z.enum([
      'Normal',
      'Hipersensibilidad',
      'Hiposensibilidad',
      'Anestesia',
      'Parestesia',
      'Alto',
      'Bajo',
    ]),
    maxMandibularOpening: z.string().min(1, {
      message: 'Max. mandibular debe tener al menos 1 caracter.',
    }),
    leftLaterality: z.string().min(1, {
      message: 'Lateridad izquierda debe tener al menos 1 caracter.',
    }),
    rightLaterality: z.string().min(1, {
      message: 'Lateridad derecha debe tener al menos 1 caracter.',
    }),
    protrusion: z.string().min(1, {
      message: 'Protrusión debe tener al menos 1 caracter.',
    }),
    jointSounds: z.enum(['SinAlteraciones', 'Click', 'Brinco', 'Crepitacion']),
  }),
});

export const SystemReviewFields = [
  {
    name: 'SystemReview.head',
    label: 'Cabeza',
    placeholder: 'Revisión de cabeza',
  },
  {
    name: 'SystemReview.neck',
    label: 'Cuello',
    placeholder: 'Revisión de cuello',
  },
  {
    name: 'SystemReview.genitourinary',
    label: 'Genitourinario',
    placeholder: 'Revisión genitourinario',
  },
  {
    name: 'SystemReview.eyes',
    label: 'Ojos',
    placeholder: 'Revisión de ojos',
  },
  {
    name: 'SystemReview.cardiovascular',
    label: 'Cardiovascular',
    placeholder: 'Revisión cardiovascular',
  },
  {
    name: 'SystemReview.locomotor',
    label: 'Locomotor',
    placeholder: 'Revisión locomotora',
  },
  {
    name: 'SystemReview.ORL',
    label: 'ORL',
    placeholder: 'Revisión ORL',
  },
  {
    name: 'SystemReview.respiratory',
    label: 'Respiratoria',
    placeholder: 'Revisión respiratoria',
  },
  {
    name: 'SystemReview.skin',
    label: 'Piel',
    placeholder: 'Revisión de piel',
  },
  {
    name: 'SystemReview.stomological',
    label: 'Estomatologicos',
    placeholder: 'Revisión estomatologica',
  },
  {
    name: 'SystemReview.gastrointestinal',
    label: 'Gastrointestinal',
    placeholder: 'Revisión gastrointestinal',
  },
  {
    name: 'SystemReview.circulatory',
    label: 'Circulatoria',
    placeholder: 'Revisión Circulatoria',
  },
];

export const FamilyBackgroundFields = [
  {
    name: 'FamilyBackground.diabetes',
    label: 'Diabetes',
    inputName: 'FamilyBackground.familyDiabetes',
  },
  {
    name: 'FamilyBackground.cancer',
    label: 'Cancer',
    inputName: 'FamilyBackground.familyCancer',
  },
  {
    name: 'FamilyBackground.leukemia',
    label: 'Leucemia',
    inputName: 'FamilyBackground.familyLeukemia',
  },
  {
    name: 'FamilyBackground.heartDisease',
    label: 'Enfermedad cardiaca',
    inputName: 'FamilyBackground.familyHeartDisease',
  },
  {
    name: 'FamilyBackground.hypertension',
    label: 'Hipertensión',
    inputName: 'FamilyBackground.familyHypertension',
  },
  {
    name: 'FamilyBackground.others',
    label: 'Otros',
    inputName: 'FamilyBackground.familyOthers',
  },
];

export const PersonalBackgroundCheckboxFields = [
  {
    name: 'PersonalBackground.diabetes',
    label: 'Diabetes',
  },
  {
    name: 'PersonalBackground.cancer',
    label: 'Cancer',
  },
  {
    name: 'PersonalBackground.leukemia',
    label: 'Leucemia',
  },
  {
    name: 'PersonalBackground.heartDisease',
    label: 'Enfermedad cardiaca',
  },
  {
    name: 'PersonalBackground.hospitalization',
    label: 'Hospitalización',
  },
  {
    name: 'PersonalBackground.psychological',
    label: 'Psicológico',
  },
  {
    name: 'PersonalBackground.hypertension',
    label: 'Hipertensión',
  },
];

export const OralSystemReviewEnumFields = [
  {
    name: 'OralSystemReview.ATMLeft',
    label: 'ATM Izquierdo',
    placeholder: 'Revisión de ATM izquierdo',
    options: [
      {
        value: 'SinAlteraciones',
        label: 'Sin alteraciones',
      },
      {
        value: 'Brinco',
        label: 'Brinco',
      },
      {
        value: 'Subluxacion',
        label: 'Subluxación',
      },
      {
        value: 'Luxacion',
        label: 'Luxación',
      },
      {
        value: 'Retrodisquitis',
        label: 'Retrodisquitis',
      },
      {
        value: 'Sinovitis',
        label: 'Sinovitis',
      },
      {
        value: 'Artrosis',
        label: 'Artrosis',
      },
      {
        value: 'Anquilosis',
        label: 'Anquilosis',
      },
      {
        value: 'Fractura',
        label: 'Fractura',
      },
      {
        value: 'Tumores',
        label: 'Tumores',
      },
      {
        value: 'Crecimiento',
        label: 'Crecimiento',
      },
      {
        value: 'Atrofia',
        label: 'Atrofia',
      },
      {
        value: 'Hipertrofia',
        label: 'Hipertrofia',
      },
    ],
  },
  {
    name: 'OralSystemReview.ATMRight',
    label: 'ATM Derecho',
    placeholder: 'Revisión de ATM Derecho',
    options: [
      {
        value: 'SinAlteraciones',
        label: 'Sin alteraciones',
      },
      {
        value: 'Brinco',
        label: 'Brinco',
      },
      {
        value: 'Subluxacion',
        label: 'Subluxación',
      },
      {
        value: 'Luxacion',
        label: 'Luxación',
      },
      {
        value: 'Retrodisquitis',
        label: 'Retrodisquitis',
      },
      {
        value: 'Sinovitis',
        label: 'Sinovitis',
      },
      {
        value: 'Artrosis',
        label: 'Artrosis',
      },
      {
        value: 'Anquilosis',
        label: 'Anquilosis',
      },
      {
        value: 'Fractura',
        label: 'Fractura',
      },
      {
        value: 'Tumores',
        label: 'Tumores',
      },
      {
        value: 'Crecimiento',
        label: 'Crecimiento',
      },
      {
        value: 'Atrofia',
        label: 'Atrofia',
      },
      {
        value: 'Hipertrofia',
        label: 'Hipertrofia',
      },
    ],
  },
  {
    name: 'OralSystemReview.tongue',
    label: 'Lengua',
    placeholder: 'Revisión de lengua',
    options: [
      {
        value: 'SinAlteraciones',
        label: 'Sin alteraciones',
      },
      {
        value: 'Bifida',
        label: 'Bifida',
      },
      {
        value: 'Geografica',
        label: 'Geográfica',
      },
      {
        value: 'Fisurada',
        label: 'Fisurada',
      },
      {
        value: 'Macroglosia',
        label: 'Macroglosia',
      },
      {
        value: 'Microglosia',
        label: 'Microglosia',
      },
      {
        value: 'Pliegues',
        label: 'Pliegues',
      },
      {
        value: 'Frenillos',
        label: 'Frenillos',
      },
      {
        value: 'Ulceras',
        label: 'Úlceras',
      },
      {
        value: 'Quemaduras',
        label: 'Quemaduras',
      },
      {
        value: 'Mordeduras',
        label: 'Mordeduras',
      },
      {
        value: 'Tumores',
        label: 'Tumores',
      },
      {
        value: 'Crecimiento',
        label: 'Crecimiento',
      },
      {
        value: 'Atrofia',
        label: 'Atrofia',
      },
      {
        value: 'Hipertrofia',
        label: 'Hipertrofia',
      },
    ],
  },
  {
    name: 'OralSystemReview.salivaryGlands',
    label: 'Glándulas salivales',
    placeholder: 'Revisión de glándulas salivales',
    options: [
      {
        value: 'SinAlteraciones',
        label: 'Sin alteraciones',
      },
      {
        value: 'Sialorrea',
        label: 'Sialorrea',
      },
      {
        value: 'Xerostomia',
        label: 'Xerostomia',
      },
      {
        value: 'Sialolitiasis',
        label: 'Sialolitiasis',
      },
      {
        value: 'Sialoadenitis',
        label: 'Sialoadenitis',
      },
      {
        value: 'Tumores',
        label: 'Tumores',
      },
      {
        value: 'Crecimiento',
        label: 'Crecimiento',
      },
      {
        value: 'Atrofia',
        label: 'Atrofia',
      },
      {
        value: 'Hipertrofia',
        label: 'Hipertrofia',
      },
      {
        value: 'Fistulas',
        label: 'Fistulas',
      },
      {
        value: 'Quistes',
        label: 'Quistes',
      },
      {
        value: 'Sialocele',
        label: 'Sialocele',
      },
      {
        value: 'Ranula',
        label: 'Ranula',
      },
      {
        value: 'Mucocele',
        label: 'Mucocele',
      },
      {
        value: 'Sialadenosis',
        label: 'Sialadenosis',
      },
      {
        value: 'Sialosis',
        label: 'Sialosis',
      },
    ],
  },
  {
    name: 'OralSystemReview.occlusion',
    label: 'Oclusión',
    placeholder: 'Revisión de oclusión',
    options: [
      {
        value: 'ClaseI',
        label: 'Clase I',
      },
      {
        value: 'ClaseII',
        label: 'Clase II',
      },
      {
        value: 'ClaseIII',
        label: 'Clase III',
      },
      {
        value: 'MordidaAbierta',
        label: 'Mordida abierta',
      },
      {
        value: 'MordidaCruzada',
        label: 'Mordida cruzada',
      },
      {
        value: 'MordidaProfunda',
        label: 'Mordida profunda',
      },
      {
        value: 'Organica',
        label: 'Orgánica',
      },
      {
        value: 'EnGrupo',
        label: 'En grupo',
      },
      {
        value: 'BilateralBalanceada',
        label: 'Bilateral balanceada',
      },
    ],
  },
  {
    name: 'OralSystemReview.painThreshold',
    label: 'Umbral del dolor',
    placeholder: 'Revisión del umbral del dolor',
    options: [
      {
        value: 'Normal',
        label: 'Normal',
      },
      {
        value: 'Hipersensibilidad',
        label: 'Hipersensibilidad',
      },
      {
        value: 'Hiposensibilidad',
        label: 'Hiposensibilidad',
      },
      {
        value: 'Anestesia',
        label: 'Anestesia',
      },
      {
        value: 'Parestesia',
        label: 'Parestesia',
      },
      {
        value: 'Alto',
        label: 'Alto',
      },
      {
        value: 'Bajo',
        label: 'Bajo',
      },
    ],
  },
  {
    name: 'OralSystemReview.jointSounds',
    label: 'Sonidos articulares',
    placeholder: 'Revisión de sonidos articulares',
    options: [
      {
        value: 'SinAlteraciones',
        label: 'Sin alteraciones',
      },
      {
        value: 'Click',
        label: 'Click',
      },
      {
        value: 'Brinco',
        label: 'Brinco',
      },
      {
        value: 'Crepitacion',
        label: 'Crepitación',
      },
    ],
  },
];

export const OralSystemReviewTextFields = [
  {
    name: 'OralSystemReview.oralCavity',
    label: 'Cavidad oral',
    placeholder: 'Revisión de cavidad oral',
  },
  {
    name: 'OralSystemReview.maxMandibularOpening',
    label: 'Max. mandibular',
    placeholder: 'Revisión de apertura máxima mandibular',
    endDecorator: true,
  },
  {
    name: 'OralSystemReview.leftLaterality',
    label: 'Lateridad izquierda',
    placeholder: 'Revisión de lateridad izquierda',
    endDecorator: true,
  },
  {
    name: 'OralSystemReview.rightLaterality',
    label: 'Lateridad derecha',
    placeholder: 'Revisión de lateridad derecha',
    endDecorator: true,
  },
  {
    name: 'OralSystemReview.protrusion',
    label: 'Protrusión',
    placeholder: 'Revisión de protrusión',
    endDecorator: true,
  },
];

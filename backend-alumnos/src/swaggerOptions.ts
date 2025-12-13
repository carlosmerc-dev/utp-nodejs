export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API Final de CARLOS MERCEDES',
    version: '1.0.0',
    description: 'Documentación completa de la API de gestión de alumnos y notas - Proyecto Final JavaScript Avanzado',
    contact: {
      name: 'Carlos Mercedes',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo',
    },
  ],
  tags: [
    {
      name: 'Students',
      description: 'Endpoints para gestión de alumnos',
    },
    {
      name: 'Grades',
      description: 'Endpoints para gestión de notas',
    },
  ],
  components: {
    schemas: {
      Student: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID autogenerado del alumno',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'Nombre completo del alumno',
            example: 'Carlos Mercedes',
          },
          course: {
            type: 'string',
            description: 'Curso al que pertenece el alumno',
            example: 'JavaScript Avanzado',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de registro del alumno',
            example: '2025-12-12T10:30:00.000Z',
          },
        },
      },
      Grade: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID autogenerado de la nota',
            example: 1,
          },
          student_id: {
            type: 'integer',
            description: 'ID del alumno (relación con tabla student)',
            example: 1,
          },
          course: {
            type: 'string',
            description: 'Nombre del curso',
            example: 'Matemáticas',
          },
          score: {
            type: 'number',
            format: 'float',
            description: 'Nota obtenida (escala 0-20)',
            example: 18.5,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de registro de la nota',
            example: '2025-12-12T10:30:00.000Z',
          },
        },
      },
    },
  },
  paths: {
    '/api/students': {
      get: {
        summary: 'Obtener todos los alumnos',
        description: 'Retorna la lista completa de alumnos registrados en la base de datos, ordenados por fecha de creación descendente',
        tags: ['Students'],
        responses: {
          200: {
            description: 'Lista de alumnos obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Student',
                  },
                },
                example: [
                  {
                    id: 1,
                    name: 'Carlos Mercedes',
                    course: 'JavaScript Avanzado',
                    createdAt: '2025-12-12T10:30:00.000Z',
                  },
                  {
                    id: 2,
                    name: 'Renzo Torres',
                    course: 'Taller de Programación Web',
                    createdAt: '2025-12-11T15:20:00.000Z',
                  },
                ],
              },
            },
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Error al obtener los alumnos',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Crear un nuevo alumno',
        description: 'Registra un nuevo alumno en la base de datos. OBLIGATORIO: Usa placeholders (?) para prevenir SQL Injection',
        tags: ['Students'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'course'],
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nombre completo del alumno',
                    example: 'Carlos Mercedes',
                  },
                  course: {
                    type: 'string',
                    description: 'Curso al que pertenece el alumno',
                    example: 'JavaScript Avanzado',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Alumno creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    newId: {
                      type: 'integer',
                      description: 'ID del alumno recién creado',
                      example: 6,
                    },
                    name: {
                      type: 'string',
                      example: 'Carlos Mercedes',
                    },
                    course: {
                      type: 'string',
                      example: 'JavaScript Avanzado',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Error al crear el alumno',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Error al crear el alumno',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/students/total/count': {
      get: {
        summary: 'Obtener el conteo total de alumnos',
        description: 'Retorna el número total de alumnos registrados en la base de datos',
        tags: ['Students'],
        responses: {
          200: {
            description: 'Conteo obtenido exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total: {
                      type: 'integer',
                      description: 'Número total de alumnos',
                      example: 5,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Error al obtener el conteo',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Error al obtener el conteo de alumnos',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/students/{id}': {
      delete: {
        summary: 'Eliminar un alumno',
        description: 'Elimina un alumno por su ID. OBLIGATORIO: Usa placeholders (?) para prevenir SQL Injection',
        tags: ['Students'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
            },
            description: 'ID del alumno a eliminar',
            example: 1,
          },
        ],
        responses: {
          200: {
            description: 'Alumno eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Alumno con id 1 eliminado',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Error al eliminar el alumno',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Error al eliminar el alumno',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/grades': {
      post: {
        summary: 'Registrar una nueva nota',
        description: 'Registra una nota para un alumno específico en un curso determinado. OBLIGATORIO: Usa placeholders (?) para prevenir SQL Injection. Inserta el registro en la tabla grades de la base de datos.',
        tags: ['Grades'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['student_id', 'course', 'score'],
                properties: {
                  student_id: {
                    type: 'integer',
                    description: 'ID del alumno (debe existir en la tabla student)',
                    example: 1,
                  },
                  course: {
                    type: 'string',
                    description: 'Nombre del curso para el cual se registra la nota',
                    example: 'Matemáticas',
                  },
                  score: {
                    type: 'number',
                    format: 'float',
                    description: 'Nota obtenida por el alumno (escala 0-20)',
                    example: 18.5,
                    minimum: 0,
                    maximum: 20,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Nota registrada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Nota registrada exitosamente',
                    },
                    gradeId: {
                      type: 'integer',
                      description: 'ID de la nota recién creada',
                      example: 1,
                    },
                    student_id: {
                      type: 'integer',
                      example: 1,
                    },
                    course: {
                      type: 'string',
                      example: 'Matemáticas',
                    },
                    score: {
                      type: 'number',
                      example: 18.5,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Faltan campos requeridos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Faltan campos requeridos: student_id, course, score',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Error al registrar la nota',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Error al registrar la nota',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/grades/student/{student_id}': {
      get: {
        summary: 'Ver notas de un alumno',
        description: 'Obtiene todas las notas registradas de un alumno específico, ordenadas por fecha de creación descendente. OBLIGATORIO: Usa placeholders (?) para prevenir SQL Injection. Recibe el ID del alumno por URL y devuelve la lista de notas de ese alumno.',
        tags: ['Grades'],
        parameters: [
          {
            in: 'path',
            name: 'student_id',
            required: true,
            schema: {
              type: 'integer',
            },
            description: 'ID del alumno del cual se quieren obtener las notas',
            example: 1,
          },
        ],
        responses: {
          200: {
            description: 'Lista de notas obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Grade',
                  },
                },
                example: [
                  {
                    id: 1,
                    student_id: 1,
                    course: 'Matemáticas',
                    score: 18.5,
                    createdAt: '2025-12-12T10:30:00.000Z',
                  },
                  {
                    id: 2,
                    student_id: 1,
                    course: 'Física',
                    score: 16.0,
                    createdAt: '2025-12-11T14:20:00.000Z',
                  },
                ],
              },
            },
          },
          500: {
            description: 'Error al obtener las notas del alumno',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Error al obtener las notas del alumno',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

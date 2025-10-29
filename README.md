Laboratorio REST API
Alumno: Javier Álvarez García

# Ejercicio 1:
Mediante la API de Rick & Morty, traigo todos los personajes, pulsando en cada uno se abre la página con sus detalles. Basándome en los pods y scenes de hoteles he creado character-collection y character

# Ejercicio 2:
Para simular escritura y añadir la bestSentence del personaje, el usuario debe elegir Version Mock API en el select del header, entrar en su página y proporcionarla. Los cambios se mantienen mientras el servidor esté activo y la bestSentence puede verse en la card del personaje siempre que Version Mock API esté activo.

# Opcional:
Incluí la llamada alternativa via GraphQL, el user puede buscar por personaje y moverse por la paginación. CReé los pods y scenes location y episode, las páginas Locations y Episodes tienen también buscador y paginación.

# Rutas:
- '/' - Lista de personajes (GraphQL)
- '/mock' - Lista de personajes (Mock API)
- '/characters/:id' - Detalle de personaje (GraphQL)
- '/mock/characters/:id' - Detalle de personaje (Mock API)
- '/locations' - Lista de lugares (GraphQL)
- '/episodes' - Lista de episodios (GraphQl

# Dificultades:
- No sabía como poder hacer el put de la bestSentence cuando llamaba por GraphQL, así que opté porque algunas rutas usen Mock API y otras GraphQL.


- Tras usar Material y ver lo feos que quedaban los componentes, opté por cambiar a Chakra UI y Tailwind. Me dio bastante guerra implementar el ChakraProvider para declarar estilos y colores



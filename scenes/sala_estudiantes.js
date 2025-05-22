// Definición de la escena "sala_estudiantes"
const salaEstudiantesScene = {
  type: "equirectangular",
  panorama: "imagenes/sala_estudiantes.jpg",
  title: "Sala de Estudiantes",
  hfov: 130,
  hotSpots: [
    {
      pitch: -3,
      yaw: 10,
      type: "scene",
      text: "Entrada Principal",
      sceneId: "entrada",
    },
    {
      pitch: 5,
      yaw: 200,
      type: "scene",
      text: "Casa del Estudiante",
      sceneId: "punto",
    },
    {
      pitch: -5,
      yaw: -131,
      type: "scene",
      text: "Sofas",
      sceneId: "punto",
    },
  ],
};

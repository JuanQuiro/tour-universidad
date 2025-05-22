// Definición de la escena "laboratorio"
const laboratorioScene = {
  type: "equirectangular",
  panorama: "imagenes/laboratorio.jpg",
  title: "CASA",
  hfov: 130,
  hotSpots: [
    {
      pitch: 0,
      yaw: -100,
      type: "scene",
      text: "Sala de Estudiantes",
      sceneId: "sala_estudiantes",
    },
  ],
};

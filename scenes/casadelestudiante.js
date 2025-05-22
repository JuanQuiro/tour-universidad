// Definición de la escena "punto"
const puntoScene = {
  type: "equirectangular",
  panorama: "imagenes/entrada_casadelestudiante.jpeg",
  title: "Casa del Estudiante - Entrada",
  hfov: 130,
  hotSpots: [
    {
      pitch: 2,
      yaw: 1,
      type: "scene",
      text: "Volver a Entrada",
      sceneId: "entrada",
    },
    {
      pitch: -15,
      yaw: -133,
      type: "scene",
      text: "Casa Del Estudiante - Sofas",
      sceneId: "casaDelEstudianteSofa",
    },
    {
      pitch: -16,
      yaw: 89,
      type: "scene",
      text: "Casa Del Estudiante - Cafetin",
      sceneId: "casaDelEstudianteCafetin",
    },
  ],
};

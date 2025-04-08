import { BASE_URL } from "astro:env/server";

export async function fetchConfigData() {
  try {
    const response = await fetch(`${BASE_URL}/api/get.json`);
    if (!response.ok) throw new Error("Error al obtener configuración");
    const configData = await response.json();
    return configData;
  } catch (error) {
    console.error("Error al cargar la configuración:", error);
    return {};
  }
}

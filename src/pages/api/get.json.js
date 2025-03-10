import { GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/server";
import { google } from 'googleapis';

// Api: GET - Lectura de la hoja "Configuracion"
export const GET = async () => {
  try {
    // Autenticación con Google Sheets
    const auth = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Obtener datos de la hoja "Configuracion" en el rango A1:B12
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Configuracion!A1:B12',
    });

    const rows = response.data.values || [];

    // Convertir los datos en un objeto clave-valor
    const configData = {};
    rows.forEach(([key, value]) => {
      configData[key] = value || ""; // Evita valores undefined
    });

    // Responder con los datos
    return new Response(JSON.stringify(configData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: "Error al obtener la configuración" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

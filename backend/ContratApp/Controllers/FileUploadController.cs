using ContratApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace TuNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public FileUploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        // POST: api/FileUpload
        [HttpPost]
        public async Task<IActionResult> UploadFile([FromBody] FileUploadRequest fileUploadRequest)
        {
            if (string.IsNullOrEmpty(fileUploadRequest.FileName) || string.IsNullOrEmpty(fileUploadRequest.FileContentBase64))
            {
                return BadRequest("El nombre del archivo y el contenido en base64 son obligatorios.");
            }

            try
            {
                // Decodificar el contenido Base64
                byte[] fileBytes = Convert.FromBase64String(fileUploadRequest.FileContentBase64);

                // Definir la ruta donde se guardará el archivo
                string uploadsPath = Path.Combine(_env.WebRootPath, "Uploads");

                // Crear la carpeta "Uploads" si no existe
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                // Combinar la ruta de la carpeta con el nombre del archivo
                string filePath = Path.Combine(uploadsPath, fileUploadRequest.FileName);

                // Guardar el archivo en el servidor
                await System.IO.File.WriteAllBytesAsync(filePath, fileBytes);

                // Generar la URL para acceder al archivo
                string fileUrl = $"{Request.Scheme}://{Request.Host}/Uploads/{fileUploadRequest.FileName}";

                return Ok(new { FileUrl = fileUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al guardar el archivo: {ex.Message}");
            }
        }

        // GET: api/FileUpload/List
        [HttpGet("List")]
        public IActionResult GetUploadedFiles()
        {
            try
            {
                // Definir la ruta donde se guardan los archivos
                string uploadsPath = Path.Combine(_env.WebRootPath, "Uploads");

                // Si no existe la carpeta, retornar una lista vacía
                if (!Directory.Exists(uploadsPath))
                {
                    return Ok(Enumerable.Empty<string>());
                }

                // Obtener todos los archivos en la carpeta Uploads
                var files = Directory.GetFiles(uploadsPath)
                                     .Select(file => new
                                     {
                                         FileName = Path.GetFileName(file),
                                         FileUrl = $"{Request.Scheme}://{Request.Host}/Uploads/{Path.GetFileName(file)}"
                                     });

                return Ok(files);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al listar los archivos: {ex.Message}");
            }
        }
    }
}

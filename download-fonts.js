const fs = require("fs")
const path = require("path")
const https = require("https")

const fontsDir = path.join(__dirname, "public", "fonts", "inter", "web")

// Create directories if they don't exist
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true })
}

const fonts = [
  {
    name: "Inter-Regular.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  },
  {
    name: "Inter-Bold.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2",
  },
]

async function downloadFont(font) {
  const filePath = path.join(fontsDir, font.name)

  if (fs.existsSync(filePath)) {
    console.log(`${font.name} already exists. Skipping download.`)
    return
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)

    https
      .get(font.url, (response) => {
        response.pipe(file)

        file.on("finish", () => {
          file.close()
          console.log(`Downloaded ${font.name}`)
          resolve()
        })
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}) // Delete the file on error
        console.error(`Error downloading ${font.name}:`, err.message)
        reject(err)
      })
  })
}

async function downloadAllFonts() {
  try {
    for (const font of fonts) {
      await downloadFont(font)
    }
    console.log("Font download process completed.")
  } catch (error) {
    console.error("Error in font download process:", error)
    process.exit(1)
  }
}

downloadAllFonts()

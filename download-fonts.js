const https = require("https")
const fs = require("fs")
const path = require("path")

// Create public/fonts directory if it doesn't exist
const fontsDir = path.join(__dirname, "public", "fonts")
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true })
}

// Google Fonts URLs for the fonts we need
const fonts = [
  {
    name: "inter-400.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  },
  {
    name: "inter-500.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfAZ9hiA.woff2",
  },
  {
    name: "inter-600.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2",
  },
  {
    name: "inter-700.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2",
  },
]

function downloadFont(font) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(fontsDir, font.name)

    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Font ${font.name} already exists, skipping...`)
      resolve()
      return
    }

    console.log(`Downloading ${font.name}...`)

    const file = fs.createWriteStream(filePath)

    https
      .get(font.url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${font.name}: ${response.statusCode}`))
          return
        }

        response.pipe(file)

        file.on("finish", () => {
          file.close()
          console.log(`Downloaded ${font.name}`)
          resolve()
        })

        file.on("error", (err) => {
          fs.unlink(filePath, () => {}) // Delete the file on error
          reject(err)
        })
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}

async function downloadAllFonts() {
  try {
    console.log("Starting font downloads...")
    await Promise.all(fonts.map(downloadFont))
    console.log("All fonts downloaded successfully!")
  } catch (error) {
    console.error("Error downloading fonts:", error)
    // Don't fail the build if fonts can't be downloaded
    console.log("Continuing build without custom fonts...")
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  downloadAllFonts()
}

module.exports = downloadAllFonts

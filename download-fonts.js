const https = require("https")
const fs = require("fs")
const path = require("path")

// Create fonts directory if it doesn't exist
const fontsDir = path.join(__dirname, "public", "fonts")
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true })
}

// Font URLs (using Google Fonts)
const fonts = [
  {
    name: "inter-regular.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
  },
  {
    name: "inter-medium.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
  },
  {
    name: "inter-semibold.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2",
  },
  {
    name: "inter-bold.woff2",
    url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2",
  },
]

// Download function
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
          console.log(`✓ Downloaded ${font.name}`)
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

// Download all fonts
async function downloadAllFonts() {
  console.log("Starting font download...")

  try {
    await Promise.all(fonts.map(downloadFont))
    console.log("✓ All fonts downloaded successfully!")
  } catch (error) {
    console.error("✗ Error downloading fonts:", error.message)
    // Don't fail the build if fonts can't be downloaded
    console.log("Continuing build without custom fonts...")
  }
}

// Run if called directly
if (require.main === module) {
  downloadAllFonts()
}

module.exports = { downloadAllFonts }

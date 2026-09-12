import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all topics that have worksheets
const topics = ['t1_1', 't1_2', 't1_3', 't1_4'];
const outputDir = path.resolve(__dirname, '../public/worksheets');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generatePdfs() {
  console.log('Starting Vite development server...');
  const viteProcess = spawn('npm', ['run', 'dev'], { 
    cwd: path.resolve(__dirname, '..'),
    shell: true,
    stdio: 'ignore'
  });

  console.log('Waiting for Vite server to be ready on port 5173...');
  
  // Wait for port to be ready using a simple polling mechanism
  const isServerReady = await new Promise((resolve) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5173');
        if (response.ok) {
          clearInterval(interval);
          resolve(true);
        }
      } catch (e) {
        attempts++;
        if (attempts > 30) {
          clearInterval(interval);
          resolve(false);
        }
      }
    }, 1000);
  });

  if (!isServerReady) {
    console.error('Failed to connect to Vite server after 30 seconds.');
    viteProcess.kill();
    process.exit(1);
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const id of topics) {
    console.log(`Generating PDF for ${id}...`);
    try {
      await page.goto(`http://localhost:5173/worksheet/${id}`, { waitUntil: 'networkidle0', timeout: 10000 });
      
      // Give React some time to render the markdown
      await new Promise(r => setTimeout(r, 2000));

      const outputPath = path.join(outputDir, `${id}.pdf`);
      
      // Inject some CSS to hide the print UI controls during PDF generation
      await page.addStyleTag({ content: '.print\\:hidden { display: none !important; }' });

      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
      });
      console.log(`Saved: ${outputPath}`);
    } catch (e) {
      console.error(`Failed to generate PDF for ${id}:`, e.message);
    }
  }

  console.log('Done! Closing browser and server...');
  await browser.close();
  viteProcess.kill();
  process.exit(0);
}

generatePdfs();

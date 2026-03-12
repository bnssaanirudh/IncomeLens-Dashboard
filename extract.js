const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // Go to the Power BI public dashboard
        await page.goto('https://app.powerbi.com/view?r=eyJrIjoiMTMyNDk0ZjItODQwNS00N2E1LTg0NTQtYTg0YWU5MjVkZTQ3IiwidCI6IjgwOGNjODNlLWE1NDYtNDdlNy1hMDNmLTczYTFlYmJhMjRmMyIsImMiOjEwfQ%3D%3D', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        console.log('Page loaded. Waiting for Power BI scripts to initialize...');
        
        // Evaluate script inside the page context to extract report pages
        await page.waitForTimeout(5000); // Wait for Power BI report to render
        
        const pages = await page.evaluate(() => {
            // Power BI embeds store the config in `window.powerConfig` or similar objects.
            // Often, we can just get all report sections from the power bi Javascript object
            try {
                // For publish to web, there's a global array of models or report config
                const reportStr = document.body.innerHTML;
                const matches = reportStr.match(/ReportSection[a-zA-Z0-9_]+/g);
                return Array.from(new Set(matches));
            } catch (e) {
                return e.toString();
            }
        });

        console.log('Extracted Report Sections found in the DOM source:');
        console.log(pages);
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();

const express = require("express");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const app = express();

app.get("/", async (req, res) => {
    const code = req.query.url;

    if (!code) {
        return res.json({
            success: false,
            message: "Missing code"
        });
    }

    const shareUrl = "https://cloud.jazzdrive.com.pk/share/" + code;

    let browser = null;

    try {
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless
        });

        const page = await browser.newPage();

        let finalLink = null;

        // Capture network responses
        page.on("response", async (response) => {
            try {
                const url = response.url();

                if (
                    url.includes(".mp4") ||
                    url.includes(".mkv") ||
                    url.includes("download")
                ) {
                    finalLink = url;
                }
            } catch (e) {}
        });

        await page.goto(shareUrl, {
            waitUntil: "networkidle2",
            timeout: 0
        });

        // simple safe wait (NO waitForTimeout)
        await new Promise(resolve => setTimeout(resolve, 5000));

        await browser.close();

        if (finalLink) {
            return res.json({
                success: true,
                download_url: finalLink
            });
        }

        return res.json({
            success: false,
            message: "Direct link not found"
        });

    } catch (e) {
        if (browser) await browser.close();

        return res.json({
            success: false,
            error: e.toString()
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
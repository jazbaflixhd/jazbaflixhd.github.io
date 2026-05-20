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

    const shareUrl =
        "https://cloud.jazzdrive.com.pk/share/" + code;

    try {

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless
        });

        const page = await browser.newPage();

        let finalLink = null;

        page.on("response", async (response) => {

            const url = response.url();

            if (
                url.includes(".mp4") ||
                url.includes(".mkv") ||
                url.includes("download")
            ) {

                finalLink = url;
            }
        });

        await page.goto(shareUrl, {
            waitUntil: "networkidle2",
            timeout: 0
        });

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

        return res.json({
            success: false,
            error: e.toString()
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
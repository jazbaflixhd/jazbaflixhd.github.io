const express = require("express");
const puppeteer = require("puppeteer");

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
            headless: true,
            args: ["--no-sandbox"]
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

        await page.waitForTimeout(5000);

        await browser.close();

        if (finalLink) {

            return res.json({
                success: true,
                download_url: finalLink
            });
        }

        res.json({
            success: false,
            message: "Direct link not found"
        });

    } catch (e) {

        res.json({
            success: false,
            error: e.toString()
        });
    }
});

app.listen(3000, () => {
    console.log("Server running");
});
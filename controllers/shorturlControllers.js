const prisma = require('../DB/connectionDB');
const generateShortUID = require('../utils/shortIdGenerator');


const getAllURLInfo = async (req, res) => {
    try {
        const allURLs = await prisma.url.findMany();
        console.log("urls: ", allURLs);

        // Sort by id
        const sortedURLs = allURLs.sort((a, b) => a.id - b.id);

        prisma.$disconnect();
        return res.json(sortedURLs);
    } catch (error) {
        console.error("Error fetching URLs: ", error);
        return res.status(500).json({ error: "Failed to fetch URLs" });
    }
};

const getAllMyURL = async (req, res) => {
    try {
        const allURLs = await prisma.url.findMany({
            where: {
                userId: Number(req.user.user.id)
            }
        });

        // Convert BigInt values to Number for visited count
        const formattedURLs = allURLs.map(url => ({
            shortUrl: url.shortUrl,
            redirectUrl: url.redirectUrl
        }));

        console.log("urls: ", formattedURLs);

        return res.status(200).json(formattedURLs);
    } catch (error) {
        console.error("Error fetching URLs: ", error);
        return res.status(500).json({ error: "Failed to fetch URLs" });
    }
};

const generateShortURL = async (req, res) => {
    try {
        const { redirectUrl } = req.body;

        console.log(req.user.user.id)

        // Validate input
        if (!redirectUrl || typeof redirectUrl !== 'string') {
            return res.status(400).json({ error: 'Invalid redirectUrl' });
        }

        // Generate UID
        const uid = generateShortUID(8);
        if (!uid) {
            return res.status(500).json({ message: "UID not generated!" });
        }

        // Create new URL record
        const newUrlInfo = await prisma.url.create({
            data: {
                shortUrl: uid,
                redirectUrl,
                visited: Number(0),
                visit_history: "",
                userId: Number(req.user.user.id)
            },
        });

        return res.status(201).json({
            newUrlInfo: {
                ...newUrlInfo,
                visited: Number(newUrlInfo.visited)
            }
        });
    } catch (error) {
        console.error('Error creating URL:', error.stack);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleRedirectUrl = async (req, res) => {
    try {
        const { uid } = req.params;

        // Fetch the URL entry using the shortUrl
        const url = await prisma.url.findFirst({
            where: {
                shortUrl: uid
            }
        });

        let visit_history = url.visit_history
        let time = new Date()
        visit_history += `-${time}`;

        console.log(visit_history);

        if (url) {
            // Increment the visited count
            const updateVisit = await prisma.url.update({
                where: {
                    id: url.id // It's better to update by the unique `id` rather than `shortUrl`                   
                },
                data: {
                    visited: Number(url.visited) + 1,
                    visit_history
                }
            });

            // Redirect to the original URL
            return res.redirect(url.redirectUrl);
        } else {
            return res.json({ message: "Url may be corrupted! Make a new one!" });
        }
    } catch (error) {
        console.error('Error processing URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleUrlAnalytics = async (req, res) => {
    try {
        const { uid } = req.params;

        console.log(uid)

        // Fetch the URL entry using the shortUrl
        const url = await prisma.url.findFirst({
            where: {
                shortUrl: uid
            }
        });

        if (url) {
            // Redirect to the original URL
            return res.json({ total_visit: Number(url.visited), visit_history: url.visit_history });
        } else {
            return res.json({ message: "Url may be corrupted! Make a new one!" });
        }
    } catch (error) {
        console.error('Error processing URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { generateShortURL, handleRedirectUrl, getAllURLInfo, handleUrlAnalytics, getAllMyURL }
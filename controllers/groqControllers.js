import fetchContent from "../utils/fetchContent.js";
import getSummerization  from "../utils/getSummerization.js";

const handlerGroq = async (req, res) => {
    try {
        const { url } = req.body;
        console.log(url);
        const content = await fetchContent(url);
        const summerization = await getSummerization(content.slice(0, 1000));
        const points = summerization.choices[0].message.content.split("\n").filter((point, i) => {
            return point.trim() !== ""  && typeof parseInt(point[0]) === "number";
        });
        res.json({ message: "success", data: points });
        // return res.json({ message: "success", data: content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export { handlerGroq };

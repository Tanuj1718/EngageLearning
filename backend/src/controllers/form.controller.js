import { analyzeDoc } from "../utils/googleResponse.js";



const createResponse = async (req, res)=>{
    try {
        const {question, answerLength, language, humor} = req.body;
        const response = await analyzeDoc(question, answerLength, language, humor)
        res.status(200).json({
            response
        })

    } catch (error) {
        console.error('Error creating response:', error);
        res.status(500).json({ error: 'An error occurred while creating the response' });
    }

}

export {createResponse}
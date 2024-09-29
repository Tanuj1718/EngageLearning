import { analyzeDoc } from "../utils/googleResponse.js";



const createResponse = async (req, res)=>{
    try {
        const {question, limit, language, humor} = req.body;
        const response = await analyzeDoc(question, limit, language, humor)
        res.status(200).json({
            message: 'Response created successfully',
            ideas: response
        })

    } catch (error) {
        console.error('Error creating response:', error);
        res.status(500).json({ error: 'An error occurred while creating the response' });
    }

}

export {createResponse}
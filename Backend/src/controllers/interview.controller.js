
const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function genrateInterviewReportController(req, res) {
    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription?.trim()) {
        return res.status(400).json({
            message: "Job description is required."
        });
    }

    if (!req.file && !selfDescription?.trim()) {
        return res.status(400).json({
            message: "Upload a resume or provide a self-description."
        });
    }

    const resumeText = req.file
        ? (await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()).text
        : "";

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated and saved successfully",
        interviewReport
    });
}

async function getInterviewReportByIdController(req, res) {
    const interviewReport = await interviewReportModel.findOne({
        _id: req.params.interviewId,
        user: req.user.id
    });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        });
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    });
}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    });
}

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewReportId,
        user: req.user.id
    });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
        resume,
        jobDescription,
        selfDescription
    });

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    });

    res.status(200).send(pdfBuffer);
}

module.exports = {
    genrateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};

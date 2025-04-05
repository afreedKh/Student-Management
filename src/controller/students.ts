import { Request, Response } from "express";
import StudentModel from "../models/studentSchema";

export const getAllList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await StudentModel.find();
    res.render("studentList", { students });
  } catch (error) {
    console.error("getAllList error", error);
    res.status(500).send("Internal Server Error");
  }
};

export const addStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.render("addStudent");
  } catch (error) {
    console.error("addStudent error", error);
    res.status(500).send("Internal Server Error");
  }
};

export const verifyStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface StudentDetails {
      stdID: number;
      studentName: string;
      email: string;
      phone: number;
      course: string;
    }
    const { stdID, studentName, email, phone, course }: StudentDetails =
      req.body;

    const validationError: Record<string, string> = {};

    let existedStdID: number | null = await StudentModel.findOne({
      studentId: stdID,
    });
    let existedEmail: string | null = await StudentModel.findOne({ email });

    if (existedStdID) {
      validationError.Id = "Student ID already Exist";
    }
    if (existedEmail) {
      validationError.email = "Student Email already Exist";
    }

    if (Object.keys(validationError).length > 0) {
      res.status(400).json({ success: false, validationError });
    } else {
      const newStudent = new StudentModel({
        studentId: stdID,
        name: studentName,
        email,
        phone,
        course,
      });
      await newStudent.save();

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("verifyStudent error", error);
    res.status(500).send("verifyStudent error");
  }
};

export const editStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await StudentModel.findById(req.query.id);

    res.render("editStudent", { students });
  } catch (error) {
    console.error(error, "editStudent error");
    res.status(500).send("editStudent error");
  }
};

export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { stdId, studentName, email, phone, course } = req.body;

    const validationError: Record<string, string> = {};

    let student = await StudentModel.findById(req.query.id);

    let existingId = await StudentModel.findOne({ studentId: stdId });
    let existingEmail = await StudentModel.findOne({ email });

    if (student && student.studentId != stdId) {
      if (existingId) {
        validationError.Id = "Student ID already Exist";
      }
    } else if (student && student.email != email) {
      if (existingEmail) {
        validationError.email = "Student email already Exist";
      }
    }

    if (Object.keys(validationError).length > 0) {
      res.status(400).json({ success: false, validationError });
    } else {
      await StudentModel.findByIdAndUpdate(
        req.query.id,
        {
          $set: {
            studentId: stdId,
            name: studentName,
            email,
            phone,
            course,
          },
        },
        { new: true }
      );

      res.json({ success: true });
    }
  } catch (error) {
    console.error("updateStudent error", error);
    res.status(500).send("updateStudent error");
  }
};

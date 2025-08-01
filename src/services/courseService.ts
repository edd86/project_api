import { getTursoClient } from "../config/db";
import { Course } from "../models/Course";

export const createCourse = async (course: Course): Promise<Course> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO Courses (title, description, creationDate, price, duration, isPublished, thumbnailUrl, instructorId, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      course.title,
      course.description,
      course.creationDate.toISOString(),
      course.price,
      course.duration || 0,
      course.isPublished ? 1 : 0,
      course.thumbnailUrl || null,
      course.instructorId,
      course.categoryId!,
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...course,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Course;
};

export const getAllCourses = async (): Promise<Course[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Courses");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Course[];
};

export const getCourseById = async (id: number): Promise<Course | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Courses WHERE id=?", [id]);
  const row = Array.isArray(result) ? result[0] : result.rows;
  if (row.length == 1) {
    return row[0] as Course;
  } else {
    return null;
  }
};

export const getRecentsCreatedCourses = async (): Promise<Course[]> => {
  const client = getTursoClient();
  const result = await client.execute(`
    SELECT *
    FROM courses
    WHERE isPublished = true
    ORDER BY datetime(creationDate) DESC
    LIMIT 10
  `);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Course[];
};

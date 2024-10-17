import fs from "fs";
import path from "path";
import matter from "gray-matter";

const careerDirectory = path.join(process.cwd(), "content", "career");

export function getCareerInfo(): string {
  const fullPath = path.join(careerDirectory, "career.md");
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);
    return content;
  } catch (error) {
    console.error(`Error reading career file: ${fullPath}`, error);
    return "";
  }
}

# AI-Powered Ticket Management System
A smart ticket management system that uses AI to automatically categorize, prioritize, and assign support tickets to the most appropriate moderators.

🚀 Features
AI-Powered Ticket Processing <br>
Automatic ticket categorization <br>
Smart priority assignment <br>
Skill-based moderator matching <br>
AI-generated helpful notes for moderators <br>
Smart Moderator Assignment <br>
<br>
Automatic matching of tickets to moderators based on skills <br>
Fallback to admin assignment if no matching moderator found <br>
Skill-based routing system <br>
User Management :
<br>

Role-based access control (User, Moderator, Admin)<br>
Skill management for moderators<br>
User authentication with JWT<br>
Background Processing<br>

Event-driven architecture using Inngest<br>
Automated email notifications<br>
Asynchronous ticket processing<br>
🛠️ Tech Stack<br>
Backend: Node.js with Express<br>
Database: MongoDB<br>
Authentication: JWT<br>
Background Jobs: Inngest<br>
AI Integration: Google Gemini API<br>
Email: Nodemailer with Mailtrap<br>
Development: Nodemon for hot reloading<br>

🔄 Ticket Processing Flow<br>
Ticket Creation<br>

User submits a ticket with title and description
System creates initial ticket record
AI Processing

Inngest triggers on-ticket-created event
AI analyzes ticket content
Generates:
Required skills
Priority level
Helpful notes
Ticket type
Moderator Assignment

System searches for moderators with matching skills
Uses regex-based skill matching
Falls back to admin if no match found
Updates ticket with assignment
Notification

Sends email to assigned moderator
Includes ticket details and AI-generated notes





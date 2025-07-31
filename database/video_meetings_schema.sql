-- Video Meetings Database Schema
-- This SQL creates the necessary tables for storing video lesson meetings

CREATE TABLE IF NOT EXISTS video_meetings (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100),
  start_time TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL DEFAULT 60,
  meeting_url VARCHAR(500),
  calendar_link VARCHAR(500),
  instructor_id VARCHAR(255),
  student_id VARCHAR(255),
  status ENUM('scheduled', 'in-progress', 'completed', 'cancelled') DEFAULT 'scheduled',
  attendee_emails JSON,
  google_event_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_instructor_id (instructor_id),
  INDEX idx_student_id (student_id),
  INDEX idx_start_time (start_time),
  INDEX idx_status (status),
  INDEX idx_google_event_id (google_event_id)
);

-- Meeting participants table for many-to-many relationship
CREATE TABLE IF NOT EXISTS meeting_participants (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  meeting_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  role ENUM('instructor', 'student', 'observer') DEFAULT 'student',
  joined_at TIMESTAMP NULL,
  left_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meeting_id) REFERENCES video_meetings(id) ON DELETE CASCADE,
  UNIQUE KEY unique_meeting_user (meeting_id, user_id),
  INDEX idx_user_id (user_id),
  INDEX idx_meeting_id (meeting_id)
);

-- Meeting reminders table
CREATE TABLE IF NOT EXISTS meeting_reminders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  meeting_id VARCHAR(255) NOT NULL,
  reminder_type ENUM('email', 'sms', 'push') NOT NULL,
  reminder_time TIMESTAMP NOT NULL,
  sent_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meeting_id) REFERENCES video_meetings(id) ON DELETE CASCADE,
  INDEX idx_meeting_id (meeting_id),
  INDEX idx_reminder_time (reminder_time),
  INDEX idx_sent_at (sent_at)
);

-- Meeting recordings table (for future use)
CREATE TABLE IF NOT EXISTS meeting_recordings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  meeting_id VARCHAR(255) NOT NULL,
  recording_url VARCHAR(500),
  recording_size BIGINT,
  duration_seconds INTEGER,
  recording_status ENUM('processing', 'ready', 'failed') DEFAULT 'processing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (meeting_id) REFERENCES video_meetings(id) ON DELETE CASCADE,
  INDEX idx_meeting_id (meeting_id),
  INDEX idx_status (recording_status)
);

-- Insert some example data (optional)
-- INSERT INTO video_meetings (
--   id, title, description, subject, start_time, duration, 
--   instructor_id, student_id, status
-- ) VALUES (
--   'meet_example_1',
--   'GCSE Mathematics - Algebra Basics',
--   'Introduction to algebraic expressions and solving linear equations',
--   'Mathematics',
--   DATE_ADD(NOW(), INTERVAL 1 DAY),
--   60,
--   'instructor_1',
--   'student_1',
--   'scheduled'
-- );

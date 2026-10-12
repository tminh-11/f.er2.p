export const COURSES = [
  {
    code: 'PRF192',
    name: 'Programming Fundamentals',
    credits: 3,
    semester: 'Fall',
    desc: 'Nhập môn lập trình, thuật toán cơ bản và giải quyết vấn đề bằng C.',
  },
  {
    code: 'WED201c',
    name: 'Web Design',
    credits: 3,
    semester: 'Spring',
    desc: 'Nền tảng thiết kế và xây dựng giao diện website với HTML, CSS và JavaScript.',
  },
  {
    code: 'PRO192',
    name: 'Object-Oriented Programming',
    credits: 3,
    semester: 'Spring',
    desc: 'Lập trình hướng đối tượng với Java, bao gồm lớp, kế thừa và đa hình.',
  },
  {
    code: 'FER202',
    name: 'Front-End Web Development with React',
    credits: 3,
    semester: 'Summer',
    desc: 'Xây dựng giao diện web hiện đại với React, component, props, state và routing.',
  },
  {
    code: 'SWP391',
    name: 'Software Development Project',
    credits: 6,
    semester: 'Fall',
    desc: 'Thực hiện dự án phần mềm theo nhóm qua các giai đoạn phân tích, phát triển và kiểm thử.',
  },
]

export function findCourse(code) {
  return COURSES.find(
    (course) => course.code.toLowerCase() === code.toLowerCase(),
  )
}

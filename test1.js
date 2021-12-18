/**
 * Direction:
 * Return a formatted array of sessions with list of classes & students
 * 
 * Expected Result:
 * [
 *  {
 *    session_id: 1,
 *    time: '09:00',
 *    classes: [
 *      {
 *        class_id: 1,
 *        name: 'A',
 *        students: [
 *          { student_id: 1, name: 'Adi' },
 *          { student_id: 1, name: 'Budi' },
 *        ],
 *      },
 *      {
 *        class_id: 2,
 *        name: 'B',
 *        students: [
 *          { student_id: 3, name: 'Bayu' },
 *          { student_id: 4, name: 'Dharma' },
 *        ],
 *      },
 *    ],
 *  },
 *  {
 *    session_id: 2,
 *    time: '10:00',
 *    classes: [
 *      {
 *        class_id: 3,
 *        name: 'C',
 *        students: [
 *          { student_id: 5, name: 'Surya' },
 *          { student_id: 6, name: 'Maha' },
 *        ],
 *      },
 *      {
 *        class_id: 4,
 *        name: 'D',
 *        students: [
 *          { student_id: 7, name: 'Dede' },
 *          { student_id: 8, name: 'Edi' },
 *        ],
 *      },
 *    ],
 *  },
 * ];
 */

const sessions = [
  { session_id: 1, time: '09:00', student: { student_id: 1, name: 'Adi' }, class: { class_id: 1, name: 'A' } },
  { session_id: 2, time: '10:00', student: { student_id: 5, name: 'Surya' }, class: { class_id: 3, name: 'C' } },
  { session_id: 2, time: '10:00', student: { student_id: 8, name: 'Edi' }, class: { class_id: 4, name: 'D' } },
  { session_id: 2, time: '10:00', student: { student_id: 7, name: 'Dede' }, class: { class_id: 4, name: 'D' } },
  { session_id: 1, time: '09:00', student: { student_id: 3, name: 'Bayu' }, class: { class_id: 2, name: 'B' } },
  { session_id: 1, time: '09:00', student: { student_id: 2, name: 'Budi' }, class: { class_id: 1, name: 'A' } },
  { session_id: 1, time: '09:00', student: { student_id: 4, name: 'Dharma' }, class: { class_id: 2, name: 'B' } },
  { session_id: 2, time: '10:00', student: { student_id: 3, name: 'Maha' }, class: { class_id: 3, name: 'C' } },
];

const castObjToArray = (obj) => {
  const arr = []
  const length = Object.keys(obj).length
  for(let i = 1; i < length + 1; i++) {
    if(!obj[i]){
      arr.push(obj[i + length])
    } else {
      arr.push(obj[i])
    }
  }
  return arr
}

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

function result(sessions) {
  sessions = sessions.sort((a, b) => a.session_id - b.session_id)
  let grouped = castObjToArray(groupBy(sessions, 'session_id'))
  const arr = []
  let classArr = []
  let obj = {}
  let classObj = {}
  grouped.forEach(data => {
    const classes = []
    const finalClass = []
    data.map(item => {
      obj.session_id = item.session_id
      obj.time = item.time
      classes.push(
        {
          ...item.class,
          students:
            {
              ...item.student
            }
        }
      )
      obj.classes = castObjToArray(groupBy(classes, 'class_id'))
    })
    arr.push(obj)
    obj = {}
  })

  arr.forEach(data => {
    data.classes.forEach(c => {
      const students = []
      c.map(i => {
        classObj.class_id = i.class_id
        classObj.name = i.name
        students.push(i.students)
      })
      classObj.students = students
      classArr.push(classObj)
      classObj = {}
    })
    data.classes = classArr
    classArr = []
  })
  return arr
}

console.log(result(sessions));

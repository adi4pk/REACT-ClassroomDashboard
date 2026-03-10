import { useEffect, useState } from "react";
import type { StudentItem } from "./models/StudentItem";
import Student from "./components/Student";
import AddStudentForm from "./components/AddStudentForm";
import StudentStats from "./components/StudentStats";

function App() {
  const initialStudents = [
    { id: 1, nume: "Popescu", nota: 9, status: true },
    { id: 2, nume: "Adeyemi", nota: 6, status: false },
    { id: 3, nume: "Jackson", nota: 7, status: true },

    { id: 4, nume: "Sorescu", nota: 9, status: false }, //pay attention to the IDs - might mess up the add func() - duplicate key
  ];

  const [studentList, setStudentList] = useState<StudentItem[]>(initialStudents);
  const [presentStudentList, setPresentStudentList] = useState<StudentItem[]>([]);

  const [selectedStud, setSelectedStud] = useState<StudentItem | null>(null);
  const [isPresentChecked, setIsPresentChecked] = useState(false);

  const [presentStudNum, setPresentStudNum] = useState(0);
  const [medieNote, setMedieNote] = useState(0);

  // useEffect(() => {
  //   console.log('studentList changed:', studentList);
  // }, [studentList])

  useEffect(() => {
    const presentList = studentList.filter(
      (student) => student?.status === true,
    );
    setPresentStudentList(presentList);

    setPresentStudNum(presentList.length)
    const total = studentList.reduce((count, student) => count + student.nota, 0)
    setMedieNote(total/studentList.length);

  }, [studentList]);

  function togglePrezentaStudent(student: StudentItem | null) {
  

    setStudentList((prevList) => {
      const newList = prevList.map((item) =>
        item.id === student?.id
          ? { ...student, status: !student.status }
          : item,
      );
      console.log(newList);
      console.log(student);
      return newList;
    });
    // let newStud = {student, status: !student.status}
  }

  // function showOnlyPresentStudents(){
  //   const presentList = studentList.filter(student => student?.status === true);
  //   setPresentStudentList(presentList)
  //   }

  function addNewStudent(student: StudentItem) {
    let newArr = [...studentList];
    newArr.push(student);

    setStudentList(newArr);
  }

  // function increaseGrade (student: StudentItem){

  //   setStudentList(prevList =>{
  //     const newArr = studentList.map(item => item.id === student.id ? {...item, nota: student.nota+1} : item);
  //     console.log("Test")
  //     return newArr;
  //   })
  //   // console.log("test increase")
  // }

  function increaseGrade(student: StudentItem) {
    if (student.nota < 10) {
      let newArr = studentList.map((item) =>
        item.id === student.id ? { ...item, nota: student.nota + 1 } : item,
      );
      setStudentList(newArr);
    }
  }

  function decreaseGrade(student: StudentItem) {
    if (student.nota > 1) {
      let newArr = studentList.map((item) =>
        item.id === student.id ? { ...item, nota: student.nota - 1 } : item,
      );
      setStudentList(newArr);
    }
  }

  return (
    <>
      <main className="app" id="app">
        <header className="hero panel">
          <p className="chip">REACT JS</p>
          <h1>Classroom Dashboard</h1>
          <p>
            Demonstratie practica pentru state in parinte si props transmise
            catre copii.
          </p>
        </header>

        <StudentStats
          totalStudNum={studentList}
          // showOnlyPresentStudents={showOnlyPresentStudents}
          isPresentChecked={isPresentChecked}
          setIsPresentChecked={setIsPresentChecked}
          currentStud={selectedStud}
          presentStudNum={presentStudNum}
          medieNote={medieNote}
        />

        <AddStudentForm
          addNewStudent={addNewStudent}
          studentList={studentList}
        />

        <section className="panel" aria-label="Lista elevi">
          <div className="panel-head">
            <h2>StudentCard list</h2>
            <span className="tag props">PROPS</span>
          </div>
          <div id="students-list" className="students-list">
            {isPresentChecked
              ? presentStudentList.map((element) => (
                  <Student
                    key={element.id}
                    student={element} //!!!send props to CHILD component
                    togglePrezenta={togglePrezentaStudent}
                    setSelectedStud={setSelectedStud}
                    handleIncreaseGrade={increaseGrade}
                    handleDecreaseGrade={decreaseGrade}
                  />
                ))
              : studentList.map((element) => (
                  <Student
                    key={element.id}
                    student={element} //!!!send props to CHILD component
                    togglePrezenta={togglePrezentaStudent}
                    setSelectedStud={setSelectedStud}
                    handleIncreaseGrade={increaseGrade}
                    handleDecreaseGrade={decreaseGrade}
                  />
                ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

//// <Student/> cand generam lista -
// Q: ce se intampla cu key-ul, studentii din lista presentStudentList vor avea id-urile schimbate

import { useEffect, useState } from "react";
import type { StudentItem } from "./models/StudentItem";
import Student from "./components/Student";
import AddStudentForm from "./components/AddStudentForm";
import StudentStats from "./components/StudentStats";


function App() {



  const initialStudents = [
    {id: 1, nume: "Popescu", nota: 9, status: true},
    {id: 2, nume: "Adeyemi", nota: 6, status: false},
    {id: 3, nume: "Jackson", nota: 7, status: true},
    
    {id: 4, nume: "Sorescu", nota: 9, status: false},   //pay attention to the IDs - might mess up the add func() - duplicate key
  ]


  const [studentList, setStudentList] = useState<StudentItem[]>(initialStudents);
  const [presentStudentList, setPresentStudentList] = useState<StudentItem[]>([]);

  

  const [selectedStud, setSelectedStud] = useState<StudentItem | null>(null);

  const [isPresentChecked, setIsPresentChecked] = useState(false);
 

  // useEffect(() => {
  //   console.log('studentList changed:', studentList);
  // }, [studentList])

  useEffect(() =>{
    const presentList = studentList.filter(student => student?.status === true);
    setPresentStudentList(presentList)
  }, [studentList])
  
  

  function togglePrezentaStudent(student: StudentItem | null){
    
    // console.log(studentList);
    // setSelectedStud(student);
    // if(student){
    //   setSelectedStud({...student, status: !student.status});
    //   setStudentList(prevList => prevList.map(item => item.id === student?.id ? {...student} : item))
    //   // console.log(studentList)
    // }
    // student.status ? "absent" : "present";

    setStudentList(prevList => {
      const newList = prevList.map(item => item.id === student?.id ? {...student, status: !student.status} : item);
      console.log(newList);
      console.log(student);
      return newList;
    })
    // let newStud = {student, status: !student.status}
  }


  // function showOnlyPresentStudents(){
  //   const presentList = studentList.filter(student => student?.status === true);
  //   setPresentStudentList(presentList)
  //   }


  function addNewStudent (student: StudentItem){

    let newArr = [...studentList]
    newArr.push(student);

    setStudentList(newArr);
  }

  return (
    <>
    <main className="app" id="app">
      <header className="hero panel">
        <p className="chip">Vanilla JS</p>
        <h1>Classroom Dashboard</h1>
        <p>Demonstratie practica pentru state in parinte si props transmise catre copii.</p>
      </header>

    
    <StudentStats
    totalStudNum={studentList}
    // showOnlyPresentStudents={showOnlyPresentStudents}
    isPresentChecked={isPresentChecked}
    setIsPresentChecked={setIsPresentChecked}
    />


    <AddStudentForm
    addNewStudent={addNewStudent}
    studentList={studentList}/>

      <section className="panel" aria-label="Lista elevi">
        <div className="panel-head">
          <h2>StudentCard list</h2>
          <span className="tag props">PROPS</span>
        </div>
        <div id="students-list" className="students-list">
          {isPresentChecked ? (presentStudentList.map((element) => (
            <Student 
            key={element.id}
              student={element} //!!!send props to CHILD component
              togglePrezenta={togglePrezentaStudent}/>  
          ))) : (studentList.map((element) => (
            <Student 
            key={element.id}
              student={element} //!!!send props to CHILD component
              togglePrezenta={togglePrezentaStudent}/>  
          ))
          )
        }
          
        </div>
      </section>

      </main>
    </>
  )
}

export default App



//// <Student/> cand generam lista - 
// Q: ce se intampla cu key-ul, studentii din lista presentStudentList vor avea id-urile schimbate

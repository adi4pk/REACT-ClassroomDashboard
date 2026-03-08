import { useState } from "react";
import type { StudentItem } from "../models/StudentItem";

type AddStudentFormProps={
    addNewStudent: (student: StudentItem) => void;
    studentList: StudentItem[];
}


function AddStudentForm({addNewStudent, studentList}: AddStudentFormProps){

    const [numeElev, setNumeElev] = useState("");
    const [grade, setGrade] = useState(0);
    const [isPresent, setIsPresent] = useState(Boolean);

    function handleAddStud(){

        let stud: StudentItem ={
            id: studentList.length+1,
            nume: numeElev,
            nota: grade,
            status: isPresent, 
        }
        
        addNewStudent(stud);
    
    }

    return(
        <section className="panel" aria-label="Adauga elev">
        <div className="panel-head">
          <h2>AddStudentForm</h2>
          <span className="tag mixed">STATE + PROPS</span>
        </div>
        <form id="add-student-form" className="form" noValidate>
          <label>
            Nume elev
            <input type="text" name="name" placeholder="Ex: Maria Ionescu" required 
            onChange={(event) => setNumeElev(event.target.value)}/>
          </label>
          <label>
            Nota initiala (1-10)
            <input type="number" name="grade" min="1" max="10" placeholder="7" required 
            onChange={(event) => setGrade(event.target.valueAsNumber)}/>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="present"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsPresent(event.target.checked)}
            />
            Este prezent
          </label>
          <button type="button"
          onClick={handleAddStud}>Adauga elev</button>   {/* check why () => handleAddStud does not work */}
          
        </form>
        <p id="form-error" className="error" role="alert" aria-live="polite"></p>
      </section>
    )
}

export default AddStudentForm
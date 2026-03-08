import { useState, useEffect, type ReactEventHandler } from "react"
import type { StudentItem } from "../models/StudentItem"


type StudentStatsProps={
    totalStudNum: StudentItem[];
    // presentStudNum: number;
    // setPresentStudNum: (value: number) => void ;
    // showOnlyPresentStudents: () => void;
    // presentStudentList: StudentItem[];
    setIsPresentChecked: (checked: boolean) => void;
    isPresentChecked: boolean;
    // setIsPresentChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function StudentStats({totalStudNum, isPresentChecked, setIsPresentChecked}: StudentStatsProps){

    const [presentStudNum, setPresentStudNum] = useState(0);
    const [medieNote, setMedieNote] = useState(0);
    
  useEffect(() => {

    let count = 0;      //must be outside the LOOP
    for(let i=0; i<totalStudNum.length; i++){
        // console.log("Test")
        if(totalStudNum[i].status === true){
          count += 1;
          console.log("hello")
        }
      }
    setPresentStudNum(count);

      let totalNote = 0;
      for(let i=0; i<totalStudNum.length; i++){
        totalNote += totalStudNum[i].nota; 
      }
    setMedieNote(totalNote/totalStudNum.length);
  }, [totalStudNum])

    // loadPresentStudNum();

    return (
      <>
        <section className="panel controls" aria-label="Controale">
          <div className="panel-head">
            <h2>Parent State</h2>
            <span className="tag state">STATE</span>
          </div>
          <div className="controls-grid">
            <article className="card" id="stats">
              <div className="card-head">
                <h3>StudentStats</h3>
                <span className="tag props">PROPS</span>
              </div>
              <p>
                Total elevi: <strong>{totalStudNum.length}</strong>
              </p>
              <p>
                Prezenti: <strong>{presentStudNum}</strong>
              </p>
              <p>
                Media notelor: <strong>{medieNote}</strong>
              </p>
            </article>

            {/* <article className="card" id="selected-student">
              <div className="card-head">
                <h3>Selected Student</h3>
                <span className="tag state">STATE</span>
              </div>
              <p>
                Nume: <strong></strong>
              </p>
              <p>
                Nota: <strong></strong>
              </p>
              <p>
                Status: <strong></strong>
              </p>
            </article> */}

            <article className="card" id="presence-filter">
              <div className="card-head">
                <h3>PresenceFilter</h3>
                <span className="tag props">PROPS</span>
              </div>
              <label className="checkbox-label filter-toggle">
                <input id="show-only-present" type="checkbox" 
                checked={isPresentChecked}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIsPresentChecked(event.target.checked)
                    // showOnlyPresentStudents();    
                }
                }/>
                Afiseaza doar elevii prezenti
              </label>
            </article>
          </div>
        </section>
      </>
    );
}

export default StudentStats;
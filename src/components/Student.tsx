import { useState } from "react";
import type { StudentItem } from "../models/StudentItem";

type StudentProps={
    student: StudentItem;
    togglePrezenta: (student: StudentItem) => void;
}


function Student({student, togglePrezenta}: StudentProps){

    return (
      <>
        <article
          className="student-card ${props.isSelected ? 'selected' : ''}"
          data-id="${props.id}"
        >
          <button
            className="student-main"
            data-action="select"
            data-id="${props.id}"
            type="button"
          >
            <span className="student-name">{student.nume}</span>
            <span className="student-meta">{student.nota}</span>
            <span className={`badge ${student.status ? "present" : "absent"}`}>
              {student.status ? "present" : "absent"}
            </span>
          </button>
          <div className="student-actions">
            <button type="button" data-action="decrease" data-id="${props.id}">
              -
            </button>
            <button type="button" data-action="increase" data-id="${props.id}">
              +
            </button>
            <button
              type="button"
              data-action="toggle-presence"
              data-id="${props.id}"
              onClick={() => togglePrezenta(student)}
            >
              Toggle prezenta
            </button>
          </div>
        </article>
      </>
    );
    
}

export default Student
import React, { useState } from 'react'

import data from '../data'

export interface MetaData {
  location: string
  teacher: string
}

interface MetaProps {
  onSubmit(meta: MetaData): void
}

const MetaForm: React.FC<MetaProps> = ({ onSubmit }) => {
  const [teacher, setTeacher] = useState<string | undefined>()
  const [location, setLocation] = useState<string | undefined>()
  const [workshop, setWorkshop] = useState<string | undefined>()

  const isWorkshop = location === 'Workshop'
  const locationName = isWorkshop ? `Workshop - ${workshop}` : location

  const isValid = Boolean(teacher && isWorkshop ? workshop : location)

  return (
    <div className="flex w-100 vh-50 justify-center items-center">
      <div className="flex flex-column w-20 items-center">
        <div className="flex w-100 justify-between pb4">
          <label htmlFor="teacher">Teacher</label>
          <select
            id="teacher"
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
          >
            <option value={undefined}>None</option>
            {data.teachers.map(teacher => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-100 flex-column pb4">
          <div className="flex w-100 justify-between pb2">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              <option value={undefined}>None</option>
              {data.classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          {isWorkshop && (
            <input
              className="ml-auto w-60"
              type="text"
              placeholder="Workshop Name"
              value={workshop || ''}
              onChange={e => setWorkshop(e.target.value)}
            />
          )}
        </div>

        <button
          className="w-50"
          disabled={!isValid}
          onClick={_ =>
            onSubmit({ location: locationName!, teacher: teacher! })
          }
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MetaForm

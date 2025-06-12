import React from 'react'
import ManageExperience from '../Forms/manageExperience'
import ManageEducation from '../Forms/manageEducation'
import ManageCertification from '../Forms/ManageCertifications'

const ResumeManager = () => {
  return (
    <div><ManageExperience/>
    <ManageEducation/>
    <ManageCertification/>
    
    </div>
  )
}

export default ResumeManager
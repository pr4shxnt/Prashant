import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchByProjectName } from '../../../Features/Project/projectSlice';

const ProjectIndividual = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchByProjectName(name));
  }, [dispatch, name]);



  return (
    <div className="h-screen p-5">
    </div>
  );
}

export default ProjectIndividual;

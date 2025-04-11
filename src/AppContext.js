import React, { useEffect, useState } from "react"
import axios from "axios"

export const AppContext = React.createContext()
const BASE_URL = "https://jobapplicationapi.onrender.com"
const STATUS_CODES = {
  applied: 0,
  interview: 1,
  offer: 2,
  rejected: 3,
};

const AppContextPrivider = ({children})=> {
 
    //applications that will be rendered
    const [applications, setApplications] = useState([])
    


    //get all applications
    async function getAllApplications() {
        try {
          const response = await axios.get(`${BASE_URL}/applications`); 
          return response.data
        } catch (error) {
          console.error('Failed to fetch applications:', error);
          throw error; 
        }
      }
    
      async function getApplicationsByStatus(status) {
        console.log('fetching by status...', status)
        try {
          const response = await axios.get(`${BASE_URL}/applications/status/${status}`);
          return response.data;
        } catch (error) {
          console.error(`Failed to fetch applications with status "${status}":`, error);
          throw error;
        }
      }
      async function getApplicationsByRange(startDate, endDate) {
        try {
          const response = await axios.get(`${BASE_URL}/applications/range`, {
            params: {
              start: startDate,
              end: endDate,
            },
          });
          return response.data;
        } catch (error) {
          console.error(`Failed to fetch applications between ${startDate} and ${endDate}:`, error);
          throw error;
        }
      }

      async function fetchApplicationsByFilter(type, value = {}) { 
        try {
          switch (type) {
            case 'nofilter':
              return await getAllApplications()
            case 'statusfilter':
              if (!value.status) throw new Error('Missing status');
              return await getApplicationsByStatus(value.status)
            case 'rangefilter':
              if (!value.start || !value.end) throw new Error('Missing date range');
              return await getApplicationsByRange(value.start, value.end)
            default:
              throw new Error('Unknown filter type');
          }
        } catch (error) {
          console.error('Error fetching applications with filter:', error);
          throw error;
        }
      }

      async function postNewApplication(applicationData) {
        try {
          const { role, company, appliedDate, status, link } = applicationData; 
      
          const payload = {
            role,
            company,
            appliedDate,
            status: parseInt(status),
            link,
          };
      
          const response = await axios.post(`${BASE_URL}/applications`, payload);
          return response.data;
        } catch (error) {
          console.error('❌ Failed to add application:', error);
          throw error;
        }
      }
      
      async function getApplicationById(id) {
        try {
          const response = await axios.get(`${BASE_URL}/applications/${id}`);
          return response.data;
        } catch (error) {
          console.error(`❌ Failed to get application with ID ${id}:`, error);
          throw error;
        }
      }

      async function updateApplicationStatus(id, status) {
        try { 
      
          const response = await axios.patch(`${BASE_URL}/applications/status`, {
            id: id,
            status: status,
          });
      
          return response.data;
        } catch (error) {
          console.error(`❌ Failed to update status for application ${id}:`, error);
          throw error;
        }
      }

      async function deleteApplicationById(id) {
        if(id == '') return
        console.log(id, id.length)
        try {
          console.log('making delte request..')
          const response = await axios.delete(`${BASE_URL}/applications/${id}`); 
          return response.data;
        } catch (error) {
          console.error(`❌ Failed to delete application with id ${id}:`, error);
          window.location.href='/'
          throw error
        } 
      }

    return (
        <AppContext.Provider value={{applications, setApplications, fetchApplicationsByFilter, postNewApplication, getApplicationById, updateApplicationStatus, deleteApplicationById}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextPrivider
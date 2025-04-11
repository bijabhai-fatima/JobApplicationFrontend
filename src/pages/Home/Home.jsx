import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import JobCard from '../../components/JobCard/JobCard';
import './Home.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import StatusTag from '../../components/StatusTag/StatusTag';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';

export default function Home() {
  const STATUS_LABELS = ['Applied', 'Interview', 'Offer', 'Rejected']; 

  const { applications, setApplications, fetchApplicationsByFilter } = useContext(AppContext);

  const [filters, setFilters] = useState('nofilter');

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState('none');

  useEffect(() => {
    setLoading(true); 

    fetchApplicationsByFilter('nofilter')
      .then(res => {
        console.log(res, res.length);
        setApplications(res);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
        setApplications([]); 
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  const handleFilter = async () => {
    setOpenFilter('none');
    setLoading(true);
    try {
      if (startDate && endDate) {
        const data = await fetchApplicationsByFilter('rangefilter', {
          start: startDate.toString(),
          end: endDate.toString(),
        });
        setApplications(data);
      } else if (selectedStatus === 'all') {
        const data = await fetchApplicationsByFilter('nofilter');
        setApplications(data);
      } else {
        const data = await fetchApplicationsByFilter('statusfilter', { status: selectedStatus });
        setApplications(data);
      }
    } catch (err) {
      console.error('Error filtering applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = async () => { 
    setOpenFilter("none")
    setLoading(true)
      fetchApplicationsByFilter('nofilter')
        .then(res => {
          console.log(res, res.length);
          setApplications(res);
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
          setApplications([]); 
        })
        .finally(() => {
          setLoading(false); 
          return;
        }); 
  }

  useEffect(() => {
    handleFilter();
  }, [selectedStatus]);

  return (
    <div>
      <header class="header">
        <h1 class="welcome-text">Welcome, user!</h1>

        {openFilter == 'none' ? (
          <div class="filter-dropdown">
            <button class="filter-button">
              <div>
                Filter <IoIosArrowDown />
              </div>
            </button>
            <div class="filter-options">
              <div class="filter-option" onClick={() => setOpenFilter('status')}>
                Filter By Status
              </div>
              <div class="filter-option" onClick={() => setOpenFilter('range')}>
                Filter By Application date
              </div>
              <div
                class="filter-option"
                onClick={() => {
                  setFilters('nofilter');
                  clearFilter()
                }}
              >
                Clear all Filters
              </div>
            </div>
          </div>
        ) : openFilter == 'status' ? (
          <div class="filter-dropdown up-left-shadow">
            <button class="filter-button up-left-shadow">
              <div>
                Status Filter <IoMdClose onClick={() => setOpenFilter('none')} />
              </div>
            </button>
            <div class="status-filter-options up-left-shadow">
              <StatusTag
                status={'applied'}
                handleClick={() => {
                  setSelectedStatus('applied');
                  setOpenFilter('none');
                }}
              />
              <StatusTag
                status={'interview'}
                handleClick={() => {
                  setSelectedStatus('interview');
                  setOpenFilter('none');
                }}
              />
              <StatusTag
                status={'offer'}
                handleClick={() => {
                  setSelectedStatus('offer');
                  setOpenFilter('none');
                }}
              />
              <StatusTag
                status={'rejected'}
                handleClick={() => {
                  setSelectedStatus('rejected');
                  setOpenFilter('none');
                }}
              />
              <StatusTag
                status={'all'}
                handleClick={() => {
                  setSelectedStatus('all');
                  setOpenFilter('none');
                }}
              />
            </div>
          </div>
        ) : (
          <div class="filter-dropdown up-left-shadow">
            <button class="filter-button up-left-shadow">
              <div>
                Range Filter <IoMdClose onClick={() => setOpenFilter('none')} />
              </div>
            </button>
            <div class="status-filter-options up-left-shadow">
              <div class="range-filter-option-feild">
                <label>Start Date </label>
                <input
                  type="date"
                  class="custom-date"
                  value={startDate}
                  onChange={e => {
                    setFilters('rangefilter');
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div class="range-filter-option-feild">
                <label>End Date </label>
                <input
                  type="date"
                  class="custom-date"
                  value={endDate}
                  onChange={e => {
                    setFilters('rangefilter');
                    setEndDate(e.target.value);
                  }}
                />
              </div>

              <button class="apply-filter" onClick={handleFilter}>
                Apply Filter
              </button>
            </div>
          </div>
        )}
      </header>
      {loading ? ( 
        <LoaderSpinner />
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div class="job-applications-container">
          {applications.map((app, index) => (
            <Link to={`/application/${app._id}`}>
              <JobCard
                role={app.role}
                company={app.company}
                status={STATUS_LABELS[app.status]}
                link={app.link}
                appliedDate={app.appliedDate}
                index={index}
              />
            </Link>
          ))}

          <Link to="/newapplication" style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
            <div class="new-application-button-container">
              <IoMdAdd />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

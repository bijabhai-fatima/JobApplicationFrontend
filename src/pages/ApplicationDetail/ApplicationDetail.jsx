import { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import '../Home/Home.css';
import './ApplicationDetails.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import StatusTag from '../../components/StatusTag/StatusTag';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';

const STATUS_KEYS = ['applied', 'interview', 'offer', 'rejected'];
const statusStyles = {
  applied: {
    backgroundColor: '#6a0dad',
    color: '#fff',
    borderColor: '#6a0dad',
  },
  offer: {
    backgroundColor: '#00c96f',
    color: '#fff',
    borderColor: '#00c96f',
  },
  rejected: {
    backgroundColor: '#fb5757',
    color: '#fff',
    borderColor: '#fb5757',
  },
  interview: {
    backgroundColor: '#ffd966',
    color: '#000',
    borderColor: '#ffd966',
  },
};

function formatDateForInput(dateInput) {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getApplicationById, updateApplicationStatus, deleteApplicationById } =
    useContext(AppContext);

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleteing, setDeleteing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [openDropdawn, setOpenDropdawn] = useState(false);

  useEffect(() => {
    console.log('fetching....');

    if (!id) return;
    setLoading(true);

    getApplicationById(id)
      .then(data => {
        setApplication(data);
      })
      .catch(err => {
        console.error('Error fetching application:', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {}, [application]);

  const handleStatusChange = async newStatus => {
    if (!newStatus || newStatus === STATUS_KEYS[application.status]) return;

    try {
      setUpdating(true);
      const updated = await updateApplicationStatus(id, newStatus);
      setApplication(updated);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this application?');
    if (!confirmDelete) return;
    if (!application._id) return;
    setDeleteing(true);
    try {
      await deleteApplicationById(application._id);
      setApplication(null);
      alert('Job Application deleted sucessfully!');
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Something when while deleting, Please try again!');
    } finally {
      setDeleteing(false);
    }
  };

  return (
    <div>
      {application && (
        <header class="header">
          <h1 class="header-text">Application Details</h1>
        </header>
      )}

      {loading ? (
        <LoaderSpinner />
      ) : application ? (
        <div class="form-container">
          <form>
            <div class="close-icon-container">
              <div>
                <IoMdClose onClick={() => navigate('/')}/>
              </div>
            </div>
            <div>
              <div class="custom-input">{application.role}</div>
            </div>
            <div>
              <div class="custom-input">{application.company}</div>
            </div>
            <div>
              <div class="custom-input">
                <a
                  href={application.link}
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontStyle: 'italic'
                  }}
                >
                  {application.link}
                </a>
              </div>
            </div>
            <div class="date-status-container">
              <div>
                <input
                  class="custom-date accent"
                  type="date"
                  name="appliedDate"
                  value={formatDateForInput(application.appliedDate)}
                  disabled
                />
              </div>
              <div>
                <div class="status-dropdawn">
                  <div
                    class="dropdawn-button"
                    style={{
                      ...statusStyles[STATUS_KEYS[application.status]],
                      ...(updating && { backgroundColor: '#e4f5f0', borderColor: '#fb5757' }),
                    }}
                  >
                    <div
                      style={{
                        ...(updating && {
                          color: '#fb5757',
                        }),
                      }}
                    >
                      {updating ? 'updating...' : STATUS_KEYS[application.status]}
                      <IoIosArrowDown onClick={() => setOpenDropdawn(true)} />
                    </div>
                  </div>
                  {openDropdawn && (
                    <div class="status-options">
                      <StatusTag
                        status={'applied'}
                        handleClick={() => {
                          setOpenDropdawn(false);
                          handleStatusChange('applied');
                        }}
                      />
                      <StatusTag
                        status={'interview'}
                        handleClick={() => {
                          setOpenDropdawn(false);
                          handleStatusChange('interview');
                        }}
                      />
                      <StatusTag
                        status={'offer'}
                        handleClick={() => {
                          setOpenDropdawn(false);
                          handleStatusChange('offer');
                        }}
                      />
                      <StatusTag
                        status={'rejected'}
                        handleClick={() => {
                          setOpenDropdawn(false);
                          handleStatusChange('rejected');
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              class="add-button"
              type="submit"
              disabled={deleteing}
              onClick={() => handleDelete()}
            >
              {deleteing ? 'Deleteing...' : 'Delete'}
            </button>
          </form>
        </div>
      ) : (
        <div class="center">
          <div class="message">This Application is Deleted!</div>
          <div class="add-button" onClick={() => navigate('/')}>
            Go Home
          </div>
        </div>
      )}
    </div>
  );
}

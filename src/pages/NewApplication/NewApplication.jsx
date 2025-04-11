import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import './NewApplication.css';
import '../Home/Home.css';
import StatusTag from '../../components/StatusTag/StatusTag';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';

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
    color: '#222',
    borderColor: '#ffd966',
  },
};

export default function NewApplication() {
  const { postNewApplication } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: '',
    company: '',
    appliedDate: '',
    status: '0',
    link: '',
  });
  const [uploading, setUploading] = useState(false);
  const [openDrpdawn, setOpenDropdawn] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStatusChange = status => {
    setForm({ ...form, ['status']: STATUS_KEYS.indexOf(status) });
    setOpenDropdawn(false);
  };

  const handleSubmit = e => {
    console.log(form);
    e.preventDefault();
    console.log('Submitting new application:', form);
    // TODO: Call API to save application
    setUploading(true);
    postNewApplication(form)
      .then(res => {
        console.log('✅ Application added:', res);
        handlePostCall(0);
      })
      .catch(err => {
        console.error('❌ Error:', err);
        handlePostCall(1);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handlePostCall = res => {
    if (res == 0) {
      alert('Job Application added sucessfully!');
    } else if (res == 1) {
      alert('Something when while uploading, Please try again!');
    }
    setForm({
      role: '',
      company: '',
      appliedDate: '',
      status: '0',
      link: '',
    });
  };

  return (
    <div>
      <header class="header">
        <h1 class="header-text">Add new application!</h1>
      </header>
      <div class="form-container">
        <form onSubmit={handleSubmit}>
          <div class="close-icon-container">
            <div>
              <IoMdClose onClick={() => navigate('/')} />
            </div>
          </div>
          <div>
            <input
              class="custom-input"
              placeholder="Enter role here"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              disabled={uploading}
            />
          </div>
          <div>
            <input
              class="custom-input"
              placeholder="Enter company name here"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              disabled={uploading}
            />
          </div>
          <div>
            <input
              class="custom-input"
              placeholder="Enter job link here"
              name="link"
              value={form.link}
              onChange={handleChange}
              required
              disabled={uploading}
            />
          </div>
          <div class="date-status-container">
            <div>
              <input
                class="custom-date accent"
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
                required
                disabled={uploading}
              />
            </div>
            <div>
              <div class="status-dropdawn">
                <div class="dropdawn-button" style={statusStyles[STATUS_KEYS[form.status]]}>
                  <div>
                    {form.status == '' ? 'Choose Status' : STATUS_KEYS[form.status]}{' '}
                    {openDrpdawn ? (
                      <IoIosArrowUp onClick={() => setOpenDropdawn(false)} />
                    ) : (
                      <IoIosArrowDown onClick={() => setOpenDropdawn(true)} />
                    )}
                  </div>
                </div>
                {openDrpdawn && (
                  <div class="status-options">
                    <StatusTag
                      status={'applied'}
                      handleClick={() => {
                        handleStatusChange('applied');
                      }}
                    />
                    <StatusTag
                      status={'interview'}
                      handleClick={() => {
                        handleStatusChange('interview');
                      }}
                    />
                    <StatusTag
                      status={'offer'}
                      handleClick={() => {
                        handleStatusChange('offer');
                      }}
                    />
                    <StatusTag
                      status={'rejected'}
                      handleClick={() => {
                        handleStatusChange('rejected');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <button class="add-button" type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function AdminCard({ to, icon, title, description, danger = false }) {
  return (
    <div className="col-md-6 col-lg-3">
      <Link to={to} className="admin-card">
        <i className={`fas ${icon} ${danger ? 'text-danger' : ''}`}></i>
        <h5>{title}</h5>
        <p>{description}</p>
      </Link>
    </div>
  );
}
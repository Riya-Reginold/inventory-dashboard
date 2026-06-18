import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">□</span>
        <h2>Inventory Dashboard</h2>
      </div>

      <div className="menu-section">
        <p className="menu-title">MAIN</p>

        <ul>
          <li className="active">□ Dashboard</li>
          
        </ul>
      </div>

      <div className="menu-section">
        <p className="menu-title">REPORTS</p>

        <ul>
          <li>□ Analytics</li>
          <li>□ Reports</li>
        </ul>
      </div>

      <div className="menu-section">
        <p className="menu-title">SETTINGS</p>

        <ul>
          <li>□ Settings</li>
        </ul>
      </div>

      <div className="footer">
        <p>All rights reserved.</p>
      </div>
    </aside>
  );
}
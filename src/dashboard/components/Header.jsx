import { Bell, Search } from 'lucide-react';

function Header() {
  return (
    <header className="header-dashboard">
      <div className="search-box-dashboard">
        <input type="text" placeholder="Search..." />
        <Search size={18} />
      </div>
      <div className="actions-dashboard">
        <Bell size={20} />
        <span className="badge-dashboard">3</span>
      </div>
    </header>
  );
}

export default Header;
import { useState } from "react";
import OperationRowDashboard from "../components/OperationRowDashboard";
import { Plus, Search } from "lucide-react";
import AddOperationModal from "../components/AddOperationModal";
import OperationDetailsModal from "../components/OperationDetailsModal";

export default function Operation() {
  const operationsData = [
    {
      id: "OP-1001",
      name: "Gas Level Monitoring",
      location: "North Shaft - Level 3",
      status: "Critical",
      updated: "5/14/2025, 8:30:00 AM",
      assigned: "John Doe",
    },
    {
      id: "OP-1002",
      name: "Structural Integrity Check",
      location: "East Tunnel - Section B",
      status: "High",
      updated: "5/13/2025, 2:45:00 PM",
      assigned: "Sarah Johnson",
    },
    {
      id: "OP-1003",
      name: "Ventilation System Maintenance",
      location: "Main Entrance - Checkpoint 2",
      status: "Medium",
      updated: "5/12/2025, 11:20:00 AM",
      assigned: "Michael Chen",
    },
    {
      id: "OP-1004",
      name: "Water Drainage Inspection",
      location: "South Ventilation Shaft",
      status: "Low",
      updated: "5/11/2025, 9:15:00 AM",
      assigned: "Lisa Wong",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOperations = operationsData.filter(
    (operation) =>
      operation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operation.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  
const [isDetailsOpen, setIsDetailsOpen] = useState(false);
const [selectedOperation, setSelectedOperation] = useState(null);

const handleViewDetails = (operation) => {
  setSelectedOperation(operation);
  setIsDetailsOpen(true);
};


  const handleAddOperation = (newOperation) => {
    console.log("New operation:", newOperation);
    // يمكنك هنا إضافته للمصفوفة أو إرسال الطلب للباك إند
  };

  return (
    <div className="operations-container-dashboard">
      <h2 className="operations-title-dashboard">Operations Management</h2>
      <p className="operations-subtitle-dashboard">
        Monitor and manage mine operations
      </p>
      <div className="operations-topbar-dashboard">
        <div className="operations-search-container-dashboard">
          <Search className="search-icon-dashboard" size={16} />
          <input
            className="operations-search-dashboard"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-operation-btn-dashboard"
        >
          <Plus size={16} />
          Add Operation
        </button>
      </div>
      <div className="operations-table-dashboard">
        <div className="operations-header-dashboard">
          <span>ID</span>
          <span>Operation Name</span>
          <span>Location</span>
          <span>Status</span>
          <span>Last Updated</span>
          <span>Assigned To</span>
          <span>Actions</span>
        </div>
        {filteredOperations.map((op) => (
          <OperationRowDashboard
            key={op.id}
            data={op}
            setIsModalOpen={setIsModalOpen}
            handleViewDetails={handleViewDetails}
            
          />
        ))}
      </div>
      <OperationDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        operation={selectedOperation}
      />

      <AddOperationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddOperation}
      />
    </div>
  );
}

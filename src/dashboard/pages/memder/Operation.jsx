import { useEffect, useState } from "react";
import OperationRowDashboard from "../../components/OperationRowDashboard";
import { Plus, Search } from "lucide-react";
import AddOperationModal from "../../components/AddOperationModal";
import OperationDetailsModal from "../../components/OperationDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  ActDelete,
  ActGetMyReports,
  ActStore,
  ActUpdate,
  ActShow
} from "../../../store/Dashboard/Users/UsersSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Operation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActGetMyReports());
  }, [dispatch]);
 const { t } = useTranslation();
  const { myReports, loading } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const newdata = myReports?.filter((d) => {
    return d.id == user.id
  })
  
  const operationsData = newdata && newdata[0]?.team?.team_report || [];
  console.log(operationsData)
  const filteredOperations = operationsData?.filter(
    (operation) =>
      operation?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operation?.id?.toString().includes(searchTerm.toLowerCase())
  );

 const handleViewDetails = (operationId) => {
   dispatch(ActShow(operationId))
    .unwrap()
    .then((res) => {
      setSelectedOperation(res);
      setIsDetailsOpen(true);
    })
    .catch(() => {
      toast.error("فشل في تحميل تفاصيل العملية");
    });
  };


  const handleAddOperation = (newOperation) => {
    dispatch(ActStore(newOperation))
      .unwrap()
      .then(() => {
        toast.success(`add successfuly!`);
      })
      .catch(() => {
        toast.error(`add faild!`);
      });
  };
  const handleUpdate = (id , data) => {
    dispatch(ActUpdate({id , data}))
      .unwrap()
      .then(() => {
        toast.success(`update successfuly!`);
      })
      .catch(() => {
        toast.error(`update faild!`);
      });
  };

  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #ccc",
            width: "300px",
          }}
        >
          <p style={{ marginBottom: "12px" }}>
            هل أنت متأكد من حذف العملية <strong></strong>؟
          </p>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: "#6c757d",
                color: "white",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              إلغاء
            </button>
            <button
              onClick={() => {
                dispatch(ActDelete(id));
                toast.dismiss(t.id);
                toast.success(`delete successfuly!`);
              }}
              style={{
                background: "#dc3545",
                color: "white",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              تأكيد
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  return (
    <div className="operations-container-dashboard">
      <h2 className="operations-title-dashboard">{t("Operations Management")}</h2>
      <p className="operations-subtitle-dashboard">
        {t("Monitor and manage mine operations")}
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
          onClick={() => {
            setSelectedOperation(null);
            setIsModalOpen(true);
          }}
          className="add-operation-btn-dashboard"
        >
          <Plus size={16} />
          {t("Add Operation")}
        </button>
      </div>

      <div className="operations-table-dashboard">
        <div className="operations-header-dashboard">
          <span>ID</span>
          <span>description</span>
          <span>statue</span>
          <span>Actions</span>
        </div>
        {filteredOperations.map((op) => (
          <OperationRowDashboard
            key={op.id}
            i_0={op.id}
            i_1={op?.report?.description}
            i_7={op.report?.statue}
            handleDelete={handleDelete}
            setIsModalOpen={() => {
              setSelectedOperation(op);
              setIsModalOpen(true);
            }}
            handleViewDetails={() => handleViewDetails(op.id)}
          />
        ))}
      </div>

      <OperationDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={["description"]}
        data={["location", "user"]}
        operation={selectedOperation}
      />

      <AddOperationModal
        isOpen={isModalOpen}
        loading={loading}
        handleUpdate={handleUpdate}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOperation(null);
        }}
        onSave={handleAddOperation}
        value={selectedOperation}
        select={[
          {label:"status" , data: [{id:"completed"} , {id:"uncompleted"}]},
        ]}
      />
    </div>
  );
}

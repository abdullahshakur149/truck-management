"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { onAuthStateChanged } from "firebase/auth";
import {
  CalendarDaysIcon,
  TruckIcon,
  UserIcon,
  QrCodeIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  EyeIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending Arrival", value: "pending_arrival" },
  { label: "Completed", value: "completed" },
];

export default function TripTicketTable() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [modalError, setModalError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const q = query(collection(db, "tripTickets"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(data);
    } catch (err) {
      setError("Failed to fetch trip tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTicket(null);
    setModalError("");
  };

  const handleCompleteArrival = async () => {
    if (!selectedTicket || !user) return;
    setSaving(true);
    setModalError("");
    try {
      const ticketRef = doc(db, "tripTickets", selectedTicket.id);
      await updateDoc(ticketRef, {
        arrivalTime: new Date().toISOString(),
        status: "completed",
        updatedBy: { uid: user.uid, name: user.displayName || user.email },
        logs: arrayUnion({
          action: "arrival_set",
          by: { uid: user.uid, name: user.displayName || user.email },
          at: Date.now(),
        }),
      });
      handleCloseModal();
      fetchTickets();
    } catch (err) {
      setModalError("Failed to update ticket. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Filtering
  const filteredTickets =
    statusFilter === "all"
      ? tickets
      : tickets.filter((t) => t.status === statusFilter);

  return (
    <div className="w-full py-8 px-2 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <ClipboardDocumentListIcon className="w-6 h-6" /> Trip Tickets
        </h2>
        <div className="flex gap-2 items-center">
          <FunnelIcon className="w-5 h-5 text-blue-500" />
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1 rounded-lg font-medium border transition text-sm flex items-center gap-1
                ${
                  statusFilter === opt.value
                    ? "bg-blue-700 text-white border-blue-700 shadow"
                    : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                }
              `}
            >
              {opt.value === "pending_arrival" && (
                <ClockIcon className="w-4 h-4" />
              )}
              {opt.value === "completed" && (
                <CheckCircleIcon className="w-4 h-4" />
              )}
              {opt.value === "all" && (
                <ClipboardDocumentListIcon className="w-4 h-4" />
              )}
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="overflow-x-auto w-full rounded-xl shadow border border-gray-100 bg-white">
          <table className="w-full min-w-[900px] text-xs md:text-sm text-gray-700">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Date
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Truck ID
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Driver
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Load Type
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Trip QR
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Departure
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Arrival
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Remarks
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Receiver
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Volume (m³)
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Status
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left font-semibold border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="text-center py-8 text-gray-400 border-b"
                  >
                    No trip tickets found.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.date
                        ? new Date(ticket.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.truckId || "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.driverName || "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.loadType || "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.tripQr || "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.departureTime
                        ? new Date(ticket.departureTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.arrivalTime
                        ? new Date(ticket.arrivalTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td
                      className="px-2 py-2 md:px-4 md:py-3"
                      title={ticket.remarks}
                    >
                      {ticket.remarks || "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.receiverName || "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.approvedVolume
                        ? `${ticket.approvedVolume} m³`
                        : "-"}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {ticket.status === "pending_arrival" && (
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                          onClick={() => handleOpenModal(ticket)}
                          aria-label="Complete Arrival"
                        >
                          Complete Arrival
                        </button>
                      )}
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition ml-2"
                        onClick={() => alert("Details coming soon!")}
                        aria-label="View Details"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for completing arrival */}
      <Modal open={modalOpen && selectedTicket} onClose={handleCloseModal}>
        <h3 className="text-lg font-bold text-blue-700 mb-4">
          Complete Arrival
        </h3>
        <p className="mb-4 text-gray-700">
          Are you sure you want to set the arrival time for this trip ticket?
          This will mark it as completed.
        </p>
        {modalError && (
          <ErrorMessage className="mb-2 text-sm">{modalError}</ErrorMessage>
        )}
        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
            onClick={handleCompleteArrival}
            disabled={saving}
          >
            {saving ? "Saving..." : "Confirm"}
          </button>
          <button
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={handleCloseModal}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

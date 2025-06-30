import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CalendarIcon, ClockIcon } from "@/components/icons/Icons";
import LabeledInput from "@/components/ui/LabeledInput";
import LabeledSelect from "@/components/ui/LabeledSelect";
import LabeledTextarea from "@/components/ui/LabeledTextarea";
import LoadingButton from "@/components/ui/LoadingButton";
import { DUMMY_DRIVERS, DUMMY_TRUCKS } from "@/lib/constants";
import TimeSetter from "@/components/ui/TimeSetter";

const initialState = {
  date: null,
  truckId: "",
  driverName: "",
  loadType: "",
  tripQr: "",
  departureTime: null,
  arrivalTime: null,
  approvedVolume: "",
  receiverName: "",
  remarks: "",
};

export default function TripTicketForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [departureSet, setDepartureSet] = useState(false);
  const [arrivalSet, setArrivalSet] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        // Fetch user's name from Firestore
        try {
          const docRef = doc(db, "users", u.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setForm((prev) => ({ ...prev, receiverName: userData.name || "" }));
          } else {
            setForm((prev) => ({ ...prev, receiverName: "" }));
          }
        } catch {
          setForm((prev) => ({ ...prev, receiverName: "" }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.truckId) newErrors.truckId = "Truck ID/No. is required.";
    if (!form.driverName) newErrors.driverName = "Driver name is required.";
    if (!form.loadType) newErrors.loadType = "Load type is required.";
    if (!form.tripQr) newErrors.tripQr = "Trip QR Code ID is required.";
    if (!form.departureTime && !form.arrivalTime)
      newErrors.departureTime = "Either departure or arrival time is required.";
    if (form.departureTime && !form.approvedVolume)
      newErrors.approvedVolume = "Approved volume must be a positive number.";
    if (!form.receiverName)
      newErrors.receiverName = "Receiver name is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => setForm((prev) => ({ ...prev, date }));

  const handleSetDepartureTime = () => {
    if (!departureSet && !arrivalSet) {
      setForm((prev) => ({ ...prev, departureTime: new Date() }));
      setDepartureSet(true);
    }
  };

  const handleSetArrivalTime = () => {
    if (!arrivalSet && !departureSet) {
      setForm((prev) => ({ ...prev, arrivalTime: new Date() }));
      setArrivalSet(true);
    }
  };

  const handleClearDepartureTime = () => {
    setForm((prev) => ({ ...prev, departureTime: null }));
    setDepartureSet(false);
  };

  const handleClearArrivalTime = () => {
    setForm((prev) => ({ ...prev, arrivalTime: null }));
    setArrivalSet(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSaving(true);
      try {
        // Prepare data
        const ticketData = {
          ...form,
          date: form.date ? form.date.toISOString() : null,
          departureTime: form.departureTime
            ? form.departureTime.toISOString()
            : null,
          arrivalTime: form.arrivalTime ? form.arrivalTime.toISOString() : null,
          status: form.arrivalTime ? "completed" : "pending_arrival",
          createdBy: user ? { uid: user.uid, name: form.receiverName } : null,
          updatedBy:
            form.arrivalTime && user
              ? { uid: user.uid, name: form.receiverName }
              : null,
          logs: [
            {
              action: "created",
              by: user ? { uid: user.uid, name: form.receiverName } : null,
              at: Date.now(),
            },
            ...(form.arrivalTime
              ? [
                  {
                    action: "arrival_set",
                    by: user
                      ? { uid: user.uid, name: form.receiverName }
                      : null,
                    at: Date.now(),
                  },
                ]
              : []),
          ],
        };
        // Save to Firestore
        await addDoc(collection(db, "tripTickets"), ticketData);
        setSubmitted(true);
      } catch (err) {
        setErrors({ submit: "Failed to save trip ticket. Please try again." });
      } finally {
        setSaving(false);
      }
    }
  };

  const CustomInput = React.forwardRef(
    ({ value, onClick, placeholder, icon }, ref) => (
      <div className="relative">
        {icon}
        <input
          readOnly
          ref={ref}
          value={value || ""}
          onClick={onClick}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition placeholder-gray-500 cursor-pointer"
        />
      </div>
    )
  );
  CustomInput.displayName = "CustomInput";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto border border-gray-100 animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Trip Ticket Register
      </h2>
      {submitted && (
        <div className="mb-4 text-green-600 text-center font-medium animate-fade-in">
          Form submitted successfully!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Date *</label>
          <DatePicker
            selected={form.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date(2000, 0, 1)}
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            placeholderText="Select date"
            customInput={
              <CustomInput icon={<CalendarIcon />} placeholder="Select date" />
            }
          />
          {errors.date && (
            <div className="text-red-600 text-xs mt-1">{errors.date}</div>
          )}
        </div>
        <LabeledSelect
          label="Truck ID/No. *"
          name="truckId"
          value={form.truckId}
          onChange={handleChange}
          options={DUMMY_TRUCKS}
          error={errors.truckId}
        />
        <LabeledSelect
          label="Driver Name *"
          name="driverName"
          value={form.driverName}
          onChange={handleChange}
          options={DUMMY_DRIVERS}
          error={errors.driverName}
        />
        <LabeledSelect
          label="Load Type *"
          name="loadType"
          value={form.loadType}
          onChange={handleChange}
          options={[
            { label: "Earth", value: "Earth" },
            { label: "Sand", value: "Sand" },
          ]}
          error={errors.loadType}
        />
        <LabeledInput
          label="Trip QR Code ID *"
          name="tripQr"
          value={form.tripQr}
          onChange={handleChange}
          error={errors.tripQr}
        />
        <TimeSetter
          label="Departure Time (Borrow Area) *"
          time={form.departureTime}
          onSet={handleSetDepartureTime}
          onClear={handleClearDepartureTime}
          set={departureSet}
          otherSet={arrivalSet}
          error={errors.departureTime}
        />
        {!form.departureTime && (
          <TimeSetter
            label="Arrival Time (Site) *"
            time={form.arrivalTime}
            onSet={handleSetArrivalTime}
            onClear={handleClearArrivalTime}
            set={arrivalSet}
            otherSet={departureSet}
            error={errors.arrivalTime}
          />
        )}
        <LabeledInput
          label="Approved Volume (m³) *"
          name="approvedVolume"
          type="number"
          value={form.approvedVolume}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          error={errors.approvedVolume}
        />
        <LabeledInput
          label="Receiver Name *"
          name="receiverName"
          value={form.receiverName}
          readOnly
          error={errors.receiverName}
        />
        <div className="md:col-span-2">
          <LabeledTextarea
            label="Remarks"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            rows={2}
            placeholder="Optional"
          />
        </div>
      </div>
      <LoadingButton type="submit" loading={saving}>
        Submit
      </LoadingButton>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease both;
        }
      `}</style>
    </form>
  );
}
